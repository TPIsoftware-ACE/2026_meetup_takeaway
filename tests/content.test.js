import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import App from '../src/App.vue'
import {
  CATS, CHECKS, F2, FIELDS, FN, FN_TABS, NAV, PILOT_ITEMS, PILOT_MSGS, PRESETS,
  QZ, RD, READINESS_GROUPS, SAVE, SERVICES, TERMS, WF, WHO
} from '../src/data/content.js'

describe('內容資料一致性', () => {
  it('練習題的答案都是存在的檢查點', () => {
    const keys = CHECKS.map(c => c.k)
    QZ.forEach(q => q.ans.forEach(a => expect(keys).toContain(a)))
  })

  it('工作流每一段的角色都有對應標籤', () => {
    WF.forEach(s => expect(WHO[s.who]).toBeTruthy())
  })

  it('試點訊息數量 = 條件數 + 1（含 0 項）', () => {
    expect(PILOT_MSGS).toHaveLength(PILOT_ITEMS.length + 1)
  })

  it('職能案例與分頁一一對應，有量化數字的才有試算', () => {
    expect(FN_TABS.map(t => t.id).sort()).toEqual(Object.keys(FN).sort())
    Object.keys(SAVE).forEach(k => expect(FN[k].beforeMin - FN[k].afterMin).toBe(SAVE[k]))
  })

  it('名詞分類都列在分類按鈕中', () => {
    TERMS.forEach(t => expect(CATS).toContain(t.c))
  })

  it('範例卡片填滿所有欄位', () => {
    ['pm', 'legal'].forEach(k => FIELDS.forEach(f => expect(PRESETS[k][f.k]).toBeTruthy()))
  })

  it('服務選擇器的選項都對應到服務卡', () => {
    const letters = SERVICES.map(s => s.L)
    Object.values(F2).forEach(cfg => cfg.opts.forEach(o => expect(letters).toContain(o[0])))
  })

  it('自評最高門檻等於題目總數', () => {
    const total = READINESS_GROUPS.reduce((n, g) => n + g.items.length, 0)
    expect(RD[RD.length - 1][0]).toBe(total)
  })

  it('導覽與名詞出處的錨點都存在於頁面', () => {
    const wrapper = mount(App, { attachTo: document.body })
    const ids = new Set(Array.from(document.querySelectorAll('[id]')).map(e => e.id))
    NAV.forEach(n => expect(ids).toContain(n.id))
    TERMS.forEach(t => expect(ids).toContain(t.href.slice(1)))
    document.querySelectorAll('main a[href^="#"]').forEach(a => expect(ids).toContain(a.getAttribute('href').slice(1)))
    wrapper.unmount()
  })
})

describe('用語一致', () => {
  it('頁面不再出現 Operating Model，統一為「營運模式」', () => {
    const text = mount(App).text()
    expect(text).not.toContain('Operating Model')
    expect(TERMS.map(t => t.t)).toContain('營運模式')
  })
})
