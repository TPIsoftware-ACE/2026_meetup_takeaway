import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import StageExplorer from '../src/components/widgets/StageExplorer.vue'
import PilotChecklist from '../src/components/widgets/PilotChecklist.vue'
import ToolPicker from '../src/components/widgets/ToolPicker.vue'
import { shown } from './helpers.js'

describe('StageExplorer 導入階段', () => {
  it('預設顯示第一階段', () => {
    const wrapper = mount(StageExplorer)
    expect(wrapper.find('.stage-panel h3').text()).toBe('我知道怎麼用 AI')
    expect(wrapper.find('.stage-meter i').attributes('style')).toContain('width: 25%')
    expect(wrapper.findAll('.stage-btn').map(b => b.attributes('aria-pressed'))).toEqual(['true', 'false', 'false', 'false'])
    expect(wrapper.findAll('.stage-btn .n').map(n => n.text())).toEqual(['自己使用', '實務分享', '團隊工作流程', '營運模式'])
  })

  it('點選階段後切換內容與進度條', async () => {
    const wrapper = mount(StageExplorer)
    await wrapper.findAll('.stage-btn')[2].trigger('click')
    expect(wrapper.find('.stage-panel .eyebrow').text()).toBe('STAGE 03 · 團隊工作流程 · 範圍：部門')
    expect(wrapper.find('.stage-panel h3').text()).toBe('AI 進入工作流程')
    expect(wrapper.find('.kv').text()).toContain('AI 負責哪一段？誰確認？誰維護？')
    expect(wrapper.find('.stage-meter i').attributes('style')).toContain('width: 75%')
    expect(wrapper.findAll('.stage-btn')[2].attributes('aria-pressed')).toBe('true')
  })
})

describe('PilotChecklist 試點條件', () => {
  it('未勾選時顯示 0 / 5 與起步建議', () => {
    const wrapper = mount(PilotChecklist)
    expect(wrapper.find('.progress .mono').text()).toBe('0 / 5')
    expect(wrapper.find('[aria-live]').text()).toBe('還沒開始也沒關係，先選一個主管支持的部門。')
  })

  it('勾選數量更新進度與訊息，全部勾選時可開始驗證', async () => {
    const wrapper = mount(PilotChecklist)
    const boxes = wrapper.findAll('input[type="checkbox"]')
    expect(boxes).toHaveLength(5)
    await boxes[0].setValue(true)
    await boxes[3].setValue(true)
    expect(wrapper.find('.progress .mono').text()).toBe('2 / 5')
    expect(wrapper.find('.progress i').attributes('style')).toContain('width: 40%')
    for (const b of boxes) await b.setValue(true)
    expect(wrapper.find('[aria-live]').text()).toBe('試點條件齊全，可以開始做快速、低風險的驗證。')
    await boxes[4].setValue(false)
    expect(wrapper.find('.progress .mono').text()).toBe('4 / 5')
  })
})

describe('ToolPicker 工具選擇', () => {
  it('一次只顯示一種工作類型，切換後顯示對應工具', async () => {
    const wrapper = mount(ToolPicker)
    const visible = () => wrapper.findAll('[data-panel]').filter(shown)
    expect(visible()).toHaveLength(1)
    expect(visible()[0].find('.num').text()).toBe('ChatGPT')
    await wrapper.findAll('[role="tab"]')[1].trigger('click')
    expect(visible()).toHaveLength(1)
    expect(visible()[0].find('.num').text()).toBe('Codex / AI Coding Tools')
  })
})
