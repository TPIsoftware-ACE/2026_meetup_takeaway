import { afterEach, describe, expect, it, vi } from 'vitest'
import { flushPromises, mount } from '@vue/test-utils'
import FunctionCases from '../src/components/widgets/FunctionCases.vue'
import SavingsCalculator from '../src/components/widgets/SavingsCalculator.vue'
import WorkflowBuilder from '../src/components/widgets/WorkflowBuilder.vue'

afterEach(() => vi.unstubAllGlobals())

describe('FunctionCases 三個職能', () => {
  it('預設顯示專案經理的流程與量化效益', () => {
    const wrapper = mount(FunctionCases)
    expect(wrapper.find('.split b').text()).toBe('從「會議紀錄」到「推進工作」')
    const labels = wrapper.findAll('.split > .card')[0].findAll('.eyebrow')
    expect(labels.map(l => l.text())).toEqual(['BEFORE', 'AFTER'])
    expect(labels[0].element.nextElementSibling.classList.contains('beforeline')).toBe(true)
    expect(wrapper.find('.beforeline').text()).toBe('Meeting → 逐字稿 → 人工整理 → 會議紀錄，流程在紀錄寫完時就結束。')
    expect(wrapper.findAll('.flow .node')).toHaveLength(5)
    expect(wrapper.find('.metric .big').text()).toBe('1 小時→5 分鐘')
    expect(wrapper.find('.timebar .after i').attributes('style')).toContain(`width: ${5 / 60 * 100}%`)
  })

  it('法務以秒顯示，進度條保留最小寬度', async () => {
    const wrapper = mount(FunctionCases)
    await wrapper.findAll('[role="tab"]')[2].trigger('click')
    expect(wrapper.find('.metric .big').text()).toBe('1 小時→30 秒')
    expect(wrapper.find('.metric .small').text()).toBe('時間節省 99.17%　效率提升 120 倍')
    expect(wrapper.find('.timebar .after i').attributes('style')).toContain('width: 0.8333')
  })

  it('系統分析沒有量化數字時改為質化描述', async () => {
    const wrapper = mount(FunctionCases)
    await wrapper.findAll('[role="tab"]')[1].trigger('click')
    expect(wrapper.find('.timebar').exists()).toBe(false)
    expect(wrapper.find('.metric p').text()).toBe('將文件轉換成知識庫')
  })
})

describe('SavingsCalculator 效益試算', () => {
  const out = (w, k) => w.find(`[data-out="${k}"]`).text()

  it('預設 PM 會議摘要、每週 5 次、10 人', () => {
    const wrapper = mount(SavingsCalculator)
    expect(wrapper.findAll('output').map(o => o.text())).toEqual(['5', '10'])
    expect(out(wrapper, 'month')).toBe('199')
    expect(out(wrapper, 'days')).toBe('24.8')
  })

  it('調整滑桿與案例後即時重算', async () => {
    const wrapper = mount(SavingsCalculator)
    await wrapper.find('#calcTimes').setValue('1')
    await wrapper.find('#calcPeople').setValue('1')
    expect(out(wrapper, 'month')).toBe('4')
    await wrapper.findAll('[role="tab"]')[1].trigger('click')
    expect(out(wrapper, 'month')).toBe('4.3')
    expect(out(wrapper, 'days')).toBe('0.5')
  })
})

describe('WorkflowBuilder Workflow 資產卡', () => {
  it('預設載入 PM 範例且七欄皆填', () => {
    const wrapper = mount(WorkflowBuilder)
    expect(wrapper.find('#wf-name').element.value).toBe('PM 會議摘要')
    expect(wrapper.find('.wcard .hd b').text()).toBe('PM 會議摘要')
    expect(wrapper.find('.ft .mono').text()).toBe('7 / 7')
    expect(wrapper.find('.warn').exists()).toBe(false)
    expect(wrapper.find('.ft p.small').text()).toBe('七個欄位都有了，這個方法可以交給下一個人使用。')
  })

  it('空白卡列出前三個缺漏與剩餘數量', async () => {
    const wrapper = mount(WorkflowBuilder)
    await wrapper.find('[data-preset="blank"]').trigger('click')
    expect(wrapper.find('[data-preset="blank"]').attributes('aria-pressed')).toBe('true')
    expect(wrapper.find('.wcard .hd b').text()).toBe('未命名的 Workflow')
    expect(wrapper.find('.ft .mono').text()).toBe('0 / 7')
    const warns = wrapper.findAll('.warn span').map(s => s.text())
    expect(warns).toHaveLength(4)
    expect(warns[0]).toBe('· Purpose：沒有目的，別人不知道什麼時候該用這個 Workflow。')
    expect(warns[3]).toBe('· 還有 4 個欄位待補')
    expect(wrapper.findAll('dd.empty')).toHaveLength(7)
  })

  it('輸入欄位即時更新卡片', async () => {
    const wrapper = mount(WorkflowBuilder)
    await wrapper.find('[data-preset="blank"]').trigger('click')
    await wrapper.find('#wf-name').setValue('週會追蹤')
    await wrapper.find('#wf-owner').setValue('  PMO  ')
    expect(wrapper.find('.wcard .hd b').text()).toBe('週會追蹤')
    expect(wrapper.find('.ft .mono').text()).toBe('1 / 7')
    expect(wrapper.findAll('.wcard dd')[6].text()).toBe('PMO')
  })

  it('複製卡片文字到剪貼簿', async () => {
    const writeText = vi.fn().mockResolvedValue()
    vi.stubGlobal('navigator', { clipboard: { writeText } })
    const wrapper = mount(WorkflowBuilder)
    await wrapper.find('.ft .btn').trigger('click')
    await flushPromises()
    expect(writeText.mock.calls[0][0]).toMatch(/^【PM 會議摘要】\nPurpose：把會議內容變成可追蹤的下一步/)
    expect(wrapper.find('.ft [aria-live]').text()).toBe('已複製')
  })

  it('無法複製時提示手動選取', async () => {
    vi.stubGlobal('navigator', { clipboard: { writeText: vi.fn().mockRejectedValue(new Error('denied')) } })
    const wrapper = mount(WorkflowBuilder)
    await wrapper.find('.ft .btn').trigger('click')
    await flushPromises()
    expect(wrapper.find('.ft [aria-live]').text()).toBe('無法複製，請手動選取卡片文字')
  })
})
