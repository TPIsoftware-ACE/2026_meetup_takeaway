import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import WorkflowStepper from '../src/components/widgets/WorkflowStepper.vue'
import ReviewQuiz from '../src/components/widgets/ReviewQuiz.vue'
import RoleNotes from '../src/components/widgets/RoleNotes.vue'
import { shown } from './helpers.js'

describe('WorkflowStepper 工作拆解', () => {
  const nodes = w => w.findAll('button.node')
  const [prevBtn, nextBtn] = [w => w.findAll('.btnrow .btn')[0], w => w.findAll('.btnrow .btn')[1]]

  it('六段流程，從第一段開始且不能往前', () => {
    const wrapper = mount(WorkflowStepper)
    expect(nodes(wrapper)).toHaveLength(6)
    expect(wrapper.findAll('.flow .arrow')).toHaveLength(5)
    expect(nodes(wrapper)[0].attributes('aria-current')).toBe('step')
    expect(wrapper.find('.wf-detail .pill').text()).toBe('資料 · 第 1 / 6 段')
    expect(prevBtn(wrapper).attributes('disabled')).toBeDefined()
  })

  it('下一步前進並標示走過的段落', async () => {
    const wrapper = mount(WorkflowStepper)
    await nextBtn(wrapper).trigger('click')
    await nextBtn(wrapper).trigger('click')
    expect(wrapper.find('.wf-detail h4').text()).toBe('AI Task：整理與比較')
    expect(wrapper.find('.wf-detail .pill').classes()).toContain('ai')
    expect(nodes(wrapper)[0].classes()).toContain('past')
    expect(nodes(wrapper)[2].attributes('aria-current')).toBe('step')
    expect(nodes(wrapper)[3].attributes('aria-current')).toBeUndefined()
    await prevBtn(wrapper).trigger('click')
    expect(wrapper.find('.wf-detail h4').text()).toBe('Input：散在四處的資料')
    expect(wrapper.findAll('.wf-detail li').map(l => l.text())).toEqual(['會議邀請', 'Email', 'Teams 訊息', 'SharePoint 文件'])
  })

  it('點擊節點直接跳段，最後一段可從頭再看', async () => {
    const wrapper = mount(WorkflowStepper)
    await nodes(wrapper)[5].trigger('click')
    expect(nextBtn(wrapper).text()).toBe('從頭再看')
    await nextBtn(wrapper).trigger('click')
    expect(wrapper.find('.wf-detail .pill').text()).toBe('資料 · 第 1 / 6 段')
    expect(nextBtn(wrapper).text()).toBe('下一步 →')
  })
})

describe('ReviewQuiz Human Review 練習', () => {
  const chk = (w, k) => w.find(`[data-c="${k}"]`)
  const checkBtn = w => w.findAll('.btnrow .btn').find(b => b.text() === '檢查')
  const nextBtn = w => w.findAll('.btnrow .btn').find(b => b.text() === '下一題')

  it('未選檢查點時不能送出，原始訊息先隱藏', () => {
    const wrapper = mount(ReviewQuiz)
    expect(wrapper.find('.ai-said .txt').text()).toBe('「IT 已確認週五完成資料修正。」')
    expect(wrapper.find('.orig .txt').text()).toBe('先選檢查點，再按「檢查」揭曉')
    expect(checkBtn(wrapper).attributes('disabled')).toBeDefined()
    expect(wrapper.find('.verdict').text()).toBe('選出你認為這句話沒通過的檢查點，可以多選。')
  })

  it('可複選與取消選取', async () => {
    const wrapper = mount(ReviewQuiz)
    await chk(wrapper, 'Fact').trigger('click')
    await chk(wrapper, 'Owner').trigger('click')
    await chk(wrapper, 'Fact').trigger('click')
    expect(chk(wrapper, 'Fact').attributes('aria-pressed')).toBe('false')
    expect(chk(wrapper, 'Owner').attributes('aria-pressed')).toBe('true')
    expect(checkBtn(wrapper).attributes('disabled')).toBeUndefined()
  })

  it('檢查後揭曉原文並標示抓到、漏掉、多選', async () => {
    const wrapper = mount(ReviewQuiz)
    await chk(wrapper, 'Deadline').trigger('click')
    await chk(wrapper, 'Fact').trigger('click')
    await checkBtn(wrapper).trigger('click')
    expect(wrapper.find('.orig .txt').text()).toBe('「我們目標看看能不能週五前完成。」')
    expect(chk(wrapper, 'Deadline').classes()).toContain('hit')
    expect(chk(wrapper, 'Commitment').classes()).toContain('miss')
    expect(chk(wrapper, 'Fact').classes()).toContain('extra')
    expect(chk(wrapper, 'Owner').classes()).toEqual(['chk'])
    expect(wrapper.find('.verdict b').text()).toBe('抓到 1 / 2 個重點檢查')
    expect(chk(wrapper, 'Owner').attributes('disabled')).toBeDefined()
    expect(checkBtn(wrapper).attributes('disabled')).toBeDefined()
  })

  it('下一題重置選擇，三題後回到第一題', async () => {
    const wrapper = mount(ReviewQuiz)
    await chk(wrapper, 'Fact').trigger('click')
    await checkBtn(wrapper).trigger('click')
    await nextBtn(wrapper).trigger('click')
    expect(wrapper.find('.eyebrow').text()).toBe('練習 2 / 3')
    expect(wrapper.find('.ai-said .txt').text()).toBe('「客戶同意上線時程延後兩週。」')
    expect(wrapper.findAll('.chk').every(b => b.attributes('aria-pressed') === 'false')).toBe(true)
    await nextBtn(wrapper).trigger('click')
    await nextBtn(wrapper).trigger('click')
    expect(wrapper.find('.eyebrow').text()).toBe('練習 1 / 3')
  })
})

describe('RoleNotes 角色化紀錄', () => {
  it('預設顯示 PM 版，切換角色顯示對應紀錄', async () => {
    const wrapper = mount(RoleNotes)
    const visible = () => wrapper.findAll('.notesheet').filter(shown)
    expect(visible()).toHaveLength(1)
    expect(visible()[0].find('.hd b').text()).toBe('UAT 進度會議 · PM 版')
    expect(visible()[0].findAll('.flag')).toHaveLength(2)
    await wrapper.findAll('[role="tab"]')[3].trigger('click')
    expect(visible()[0].find('.hd b').text()).toBe('UAT 進度會議 · 法遵／資安版')
    expect(visible()[0].findAll('.row')).toHaveLength(4)
  })
})
