import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import ReadinessCheck from '../src/components/widgets/ReadinessCheck.vue'
import ServiceFinder from '../src/components/widgets/ServiceFinder.vue'

describe('ReadinessCheck 落地自評', () => {
  const out = (w, k) => w.find(`[data-out="${k}"]`).text()

  it('九個項目，預設 0 分', () => {
    const wrapper = mount(ReadinessCheck)
    expect(wrapper.findAll('input[type="checkbox"]')).toHaveLength(9)
    expect(out(wrapper, 'score')).toBe('0')
    expect(wrapper.find('.score .small').text()).toBe('/ 9')
    expect(out(wrapper, 'title')).toBe('先讓 AI 使用浮上檯面')
  })

  it('依勾選數量升級建議', async () => {
    const wrapper = mount(ReadinessCheck)
    const boxes = wrapper.findAll('input[type="checkbox"]')
    for (const b of boxes.slice(0, 3)) await b.setValue(true)
    expect(out(wrapper, 'title')).toBe('基礎正在成形')
    for (const b of boxes.slice(3, 6)) await b.setValue(true)
    expect(out(wrapper, 'title')).toBe('可以開始擴散')
    for (const b of boxes.slice(6)) await b.setValue(true)
    expect(out(wrapper, 'score')).toBe('9')
    expect(out(wrapper, 'title')).toBe('準備好規模化')
    expect(wrapper.find('.progress i').attributes('style')).toContain('width: 100%')
  })
})

describe('ServiceFinder 服務選擇器', () => {
  const svc = (w, L) => w.find(`[data-svc="${L}"]`)

  it('預設建議 A，C 與 D 變淡', () => {
    const wrapper = mount(ServiceFinder)
    expect(svc(wrapper, 'A').classes()).toContain('pick')
    expect(svc(wrapper, 'C').classes()).toContain('dim')
    expect(svc(wrapper, 'D').classes()).toContain('dim')
    expect(svc(wrapper, 'B').classes()).not.toContain('dim')
  })

  it('已有目標時改問範圍並預選 C', async () => {
    const wrapper = mount(ServiceFinder)
    await wrapper.find('[data-f1="yes"]').trigger('click')
    expect(wrapper.findAll('.fq .q')[1].text()).toBe('2. 目標的範圍是？')
    expect(wrapper.findAll('[data-f2]').map(b => b.attributes('data-f2'))).toEqual(['C', 'D'])
    expect(svc(wrapper, 'C').classes()).toContain('pick')
    expect(svc(wrapper, 'A').classes()).toContain('dim')
    await wrapper.find('[data-f2="D"]').trigger('click')
    expect(svc(wrapper, 'D').classes()).toContain('pick')
    expect(wrapper.find('[data-f2="D"]').attributes('aria-pressed')).toBe('true')
  })

  it('切回沒有目標時回到該分支第一個選項', async () => {
    const wrapper = mount(ServiceFinder)
    await wrapper.find('[data-f2="B"]').trigger('click')
    await wrapper.find('[data-f1="yes"]').trigger('click')
    await wrapper.find('[data-f1="no"]').trigger('click')
    expect(svc(wrapper, 'A').classes()).toContain('pick')
    expect(wrapper.find('[data-f1="no"]').attributes('aria-pressed')).toBe('true')
  })
})
