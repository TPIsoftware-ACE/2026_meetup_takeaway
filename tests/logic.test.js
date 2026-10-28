import { describe, expect, it } from 'vitest'
import {
  cardFields, cardText, countHits, filterTerms, formatDuration, formatHours,
  formatWorkDays, gradeCheck, monthlyHours, readingPosition, readinessLevel, resolveService,
  scrollThumb, sectionProgress
} from '../src/utils/logic.js'
import { F2, FIELDS, RD, TERMS } from '../src/data/content.js'

describe('效益試算', () => {
  it('依單次節省、次數、人數換算每月小時', () => {
    expect(monthlyHours(55, 5, 10)).toBeCloseTo(198.61, 2)
    expect(monthlyHours(59.5, 5, 10)).toBeCloseTo(214.86, 2)
    expect(monthlyHours(60, 1, 1)).toBeCloseTo(52 / 12, 5)
  })

  it('未滿 10 小時保留一位小數，其餘取整數並加千分位', () => {
    expect(formatHours(4.333)).toBe('4.3')
    expect(formatHours(198.61)).toBe('199')
    expect(formatHours(4290)).toBe('4,290')
  })

  it('換算 8 小時工作天', () => {
    expect(formatWorkDays(198.61)).toBe('24.8')
    expect(formatWorkDays(16)).toBe('2')
  })

  it('未滿 1 分鐘以秒表示', () => {
    expect(formatDuration(0.5)).toBe('30 秒')
    expect(formatDuration(5)).toBe('5 分鐘')
  })
})

describe('Human Review 練習判定', () => {
  const ans = ['Deadline', 'Commitment']

  it('區分抓到、漏掉、多選與無關', () => {
    const picked = ['Deadline', 'Fact']
    expect(gradeCheck(ans, picked, 'Deadline')).toBe('hit')
    expect(gradeCheck(ans, picked, 'Commitment')).toBe('miss')
    expect(gradeCheck(ans, picked, 'Fact')).toBe('extra')
    expect(gradeCheck(ans, picked, 'Owner')).toBe('')
  })

  it('計算抓到的數量', () => {
    expect(countHits(ans, [])).toBe(0)
    expect(countHits(ans, ['Deadline', 'Fact'])).toBe(1)
    expect(countHits(ans, ['Commitment', 'Deadline'])).toBe(2)
  })
})

describe('名詞探索篩選', () => {
  it('全部且無關鍵字時回傳全部名詞', () => {
    expect(filterTerms(TERMS, '全部', '')).toHaveLength(TERMS.length)
  })

  it('依分類篩選', () => {
    const list = filterTerms(TERMS, '介面', '')
    expect(list.length).toBeGreaterThan(0)
    expect(list.every(x => x.c === '介面')).toBe(true)
  })

  it('關鍵字比對名詞與定義且不分大小寫', () => {
    expect(filterTerms(TERMS, '全部', 'shadow').map(x => x.t)).toContain('Shadow AI')
    expect(filterTerms(TERMS, '全部', '  種子 ').map(x => x.t)).toEqual(['種子'])
    expect(filterTerms(TERMS, '全部', 'REVIEW').length).toBeGreaterThan(1)
  })

  it('分類與關鍵字同時套用', () => {
    expect(filterTerms(TERMS, '服務', 'Shadow')).toEqual([])
  })
})

describe('落地自評等級', () => {
  it.each([
    [0, '先讓 AI 使用浮上檯面'],
    [2, '先讓 AI 使用浮上檯面'],
    [3, '基礎正在成形'],
    [5, '基礎正在成形'],
    [6, '可以開始擴散'],
    [8, '可以開始擴散'],
    [9, '準備好規模化']
  ])('%i 分 → %s', (score, title) => {
    expect(readinessLevel(RD, score)[1]).toBe(title)
  })
})

describe('服務選擇器', () => {
  it('第二題選項屬於分支時保留選擇', () => {
    expect(resolveService(F2, 'no', 'B')).toMatchObject({ pick: 'B', pool: ['A', 'B'] })
  })

  it('切換分支後改選該分支的第一個選項', () => {
    expect(resolveService(F2, 'yes', 'A')).toMatchObject({ pick: 'C', pool: ['C', 'D'] })
    expect(resolveService(F2, 'no', 'D').pick).toBe('A')
  })
})

describe('Workflow 資產卡', () => {
  it('整理欄位值並去除前後空白', () => {
    const vals = cardFields(FIELDS, { purpose: '  目的 ', owner: '' })
    expect(vals).toHaveLength(7)
    expect(vals[0]).toMatchObject({ en: 'Purpose', v: '目的' })
    expect(vals.find(v => v.k === 'owner').v).toBe('')
    expect(vals.find(v => v.k === 'data').v).toBe('')
  })

  it('產生可複製的卡片文字，未填欄位標示待填', () => {
    const text = cardText('週會追蹤', cardFields(FIELDS, { purpose: '追蹤進度' }))
    expect(text.split('\n')[0]).toBe('【週會追蹤】')
    expect(text).toContain('Purpose：追蹤進度')
    expect(text).toContain('Owner：（待填）')
    expect(text.split('\n')).toHaveLength(8)
  })
})

describe('閱讀進度', () => {
  it('閱讀位置：頂端為頁首偏移，底部等於頁面總高', () => {
    expect(readingPosition(0, 800, 5000, 120)).toBe(120)
    expect(readingPosition(4200, 800, 5000, 120)).toBe(5000)
    expect(readingPosition(2100, 800, 5000, 120)).toBe(2100 + 120 + 0.5 * 680)
  })

  it('捲動超出範圍時仍維持在頁面內', () => {
    expect(readingPosition(-50, 800, 5000, 120)).toBe(70)
    expect(readingPosition(9999, 800, 800, 120)).toBe(9999 + 800)
  })

  it('依章節起點算出長度、填滿比例與目前章節', () => {
    const r = sectionProgress([0, 1000, 3000], 4000, 2000)
    expect(r.lengths).toEqual([1000, 2000, 1000])
    expect(r.fills).toEqual([1, 0.5, 0])
    expect(r.active).toBe(1)
    expect(r.percent).toBe(50)
  })

  it('剛好在章節起點即算進入該章節', () => {
    expect(sectionProgress([0, 1000], 2000, 1000).active).toBe(1)
    expect(sectionProgress([0, 1000], 2000, 999).active).toBe(0)
  })

  it('頁面底部時全部填滿', () => {
    const r = sectionProgress([0, 1000, 3000], 4000, 4000)
    expect(r.fills).toEqual([1, 1, 1])
    expect(r.active).toBe(2)
    expect(r.percent).toBe(100)
  })
})

describe('導覽水平捲軸', () => {
  it('內容放得下時不顯示', () => {
    expect(scrollThumb(0, 300, 300)).toEqual({ overflow: false, size: 100, offset: 0 })
    expect(scrollThumb(0, 301, 300).overflow).toBe(false)
  })

  it('滑塊長度依可視比例，起點依捲動位置', () => {
    expect(scrollThumb(0, 400, 300)).toEqual({ overflow: true, size: 75, offset: 0 })
    expect(scrollThumb(50, 400, 300)).toEqual({ overflow: true, size: 75, offset: 12.5 })
    expect(scrollThumb(100, 400, 300)).toEqual({ overflow: true, size: 75, offset: 25 })
  })

  it('彈性捲動超出範圍時滑塊不超出軌道', () => {
    expect(scrollThumb(-20, 400, 300).offset).toBe(0)
    expect(scrollThumb(140, 400, 300).offset).toBe(25)
  })
})
