import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import QuestionFlip from '../src/components/widgets/QuestionFlip.vue'
import InterfaceTypes from '../src/components/widgets/InterfaceTypes.vue'
import GlossaryExplorer from '../src/components/widgets/GlossaryExplorer.vue'
import { TERMS } from '../src/data/content.js'
import { shown } from './helpers.js'

describe('QuestionFlip 換個問題', () => {
  it('在 Before 與 After 之間切換問題', async () => {
    const wrapper = mount(QuestionFlip)
    const [before, after] = wrapper.findAll('.btn')
    expect(wrapper.find('.qbox').text()).toBe('我要怎麼把這份文件整理好？')
    expect(wrapper.find('.qbox').classes()).toContain('b')
    await after.trigger('click')
    expect(wrapper.find('.qbox').text()).toBe('使用者到底想用這份資訊做什麼？')
    expect(wrapper.find('.qbox').classes()).toContain('a')
    expect([before, after].map(b => b.attributes('aria-pressed'))).toEqual(['false', 'true'])
    await before.trigger('click')
    expect(wrapper.find('.qbox').text()).toBe('我要怎麼把這份文件整理好？')
  })
})

describe('InterfaceTypes 三種介面', () => {
  it('切換分頁顯示對應的介面示範', async () => {
    const wrapper = mount(InterfaceTypes)
    const visible = () => wrapper.findAll('[data-panel]').filter(shown).map(p => p.attributes('data-panel'))
    expect(visible()).toEqual(['dec'])
    await wrapper.findAll('[role="tab"]')[1].trigger('click')
    expect(visible()).toEqual(['rel'])
    expect(wrapper.find('[data-panel="rel"] svg g[font-size]').attributes('font-size')).toBe('14')
    await wrapper.findAll('[role="tab"]')[2].trigger('click')
    expect(visible()).toEqual(['exp'])
  })
})

describe('GlossaryExplorer 名詞探索', () => {
  const items = w => w.findAll('.ex-list [role="option"]')

  it('預設列出全部名詞並顯示 Human Review', () => {
    const wrapper = mount(GlossaryExplorer)
    expect(items(wrapper)).toHaveLength(TERMS.length)
    expect(wrapper.find('.ex-detail h3').text()).toBe('Human Review')
    expect(wrapper.find('[data-term="Human Review"]').attributes('aria-selected')).toBe('true')
  })

  it('依分類與關鍵字篩選，找不到時顯示提示', async () => {
    const wrapper = mount(GlossaryExplorer)
    await wrapper.find('[data-cat="介面"]').trigger('click')
    expect(items(wrapper).map(i => i.find('.cat').text())).toEqual(['介面', '介面', '介面'])
    await wrapper.find('#exSearch').setValue('decision')
    expect(items(wrapper)).toHaveLength(1)
    await wrapper.find('#exSearch').setValue('不存在的名詞')
    expect(items(wrapper)).toHaveLength(0)
    expect(wrapper.find('.empty-note').exists()).toBe(true)
  })

  it('點選名詞顯示定義、出處與段落連結', async () => {
    const wrapper = mount(GlossaryExplorer)
    await wrapper.find('[data-term="種子"]').trigger('click')
    expect(wrapper.find('.ex-detail h3').text()).toBe('種子')
    expect(wrapper.find('.ex-detail .pill').text()).toBe('方法')
    expect(wrapper.find('.ex-detail a').attributes('href')).toBe('#c2-seed')
    expect(wrapper.find('.ex-detail .small').text()).toContain('出處：案例二')
  })
})
