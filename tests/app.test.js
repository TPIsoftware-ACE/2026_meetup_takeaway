import { afterEach, describe, expect, it, vi } from 'vitest'
import { defineComponent, h } from 'vue'
import { mount } from '@vue/test-utils'
import App from '../src/App.vue'
import TheHeader from '../src/components/layout/TheHeader.vue'
import TheFooter from '../src/components/layout/TheFooter.vue'
import TabList from '../src/components/common/TabList.vue'
import { useActiveSection } from '../src/composables/useActiveSection.js'
import { useReveal } from '../src/composables/useReveal.js'

afterEach(() => {
  document.body.innerHTML = ''
  document.documentElement.className = ''
  vi.unstubAllGlobals()
})

describe('App', () => {
  it('依簡報順序渲染所有章節', () => {
    const wrapper = mount(App)
    const ids = wrapper.findAll('main > section').map(s => s.attributes('id') || '')
    expect(ids).toEqual(['overview', '', 'keynote', 'case1', 'case2', 'case3', 'ace', ''])
    expect(wrapper.find('h1').text()).toBe('拒絕無效導入！OpenAI Select Partner帶你打造安全 AI 工作流')
    expect(wrapper.find('.hero .eyebrow').text()).toBe('Meetup 技術小聚 · TPIsoftware × OpenAI Select Partner')
  })
})

describe('TheHeader', () => {
  it('顯示 TPIsoftware Logo 並連回頁首', () => {
    const wrapper = mount(TheHeader)
    const brand = wrapper.find('a.brand')
    expect(brand.attributes('href')).toBe('#overview')
    expect(brand.find('img').attributes('alt')).toBe('TPIsoftware')
  })

  it('導覽列包含六個章節，第一個預設為目前章節', () => {
    const links = mount(TheHeader).findAll('.navlinks a')
    expect(links.map(a => a.text())).toEqual(['總覽', 'Keynote', '案例一', '案例二', '案例三', 'ACE'])
    expect(links[0].classes()).toContain('on')
  })
})

describe('TheFooter', () => {
  it('顯示 ACE Team 與可點擊的 email', () => {
    const wrapper = mount(TheFooter)
    expect(wrapper.find('.team').text()).toBe('TPIsoftware ACE Team')
    const mail = wrapper.find('a.mail')
    expect(mail.attributes('href')).toBe('mailto:ace@tpisoftware.com')
    expect(mail.text()).toBe('ace@tpisoftware.com')
    expect(mail.find('svg').exists()).toBe(true)
  })

  it('不再顯示簡報出處說明', () => {
    expect(mount(App).text()).not.toContain('內容整理自')
  })
})

describe('TabList', () => {
  const tabs = [{ id: 'a', label: 'A' }, { id: 'b', label: 'B' }]

  it('標示目前分頁，點擊後更新 v-model', async () => {
    const wrapper = mount(TabList, { props: { tabs, modelValue: 'a', 'onUpdate:modelValue': v => wrapper.setProps({ modelValue: v }) } })
    const btns = wrapper.findAll('[role="tab"]')
    expect(btns.map(b => b.attributes('aria-selected'))).toEqual(['true', 'false'])
    await btns[1].trigger('click')
    expect(wrapper.emitted('update:modelValue')[0]).toEqual(['b'])
    expect(btns.map(b => b.attributes('aria-selected'))).toEqual(['false', 'true'])
  })
})

describe('useActiveSection', () => {
  it('依捲動位置回傳目前章節', () => {
    document.body.innerHTML = '<div id="s1"></div><div id="s2"></div>'
    Object.defineProperty(document.getElementById('s1'), 'offsetTop', { value: 0 })
    Object.defineProperty(document.getElementById('s2'), 'offsetTop', { value: 1000 })
    let state
    mount(defineComponent({ setup() { state = useActiveSection(['s1', 's2']); return () => h('div') } }))
    expect(state.active.value).toBe(0)
    window.scrollY = 900
    state.update()
    expect(state.active.value).toBe(1)
    window.scrollY = 0
  })
})

describe('useReveal', () => {
  const Host = defineComponent({ setup() { useReveal('.block'); return () => h('div', [h('div', { class: 'block' })]) } })

  it('不支援 IntersectionObserver 時不隱藏內容', () => {
    vi.stubGlobal('IntersectionObserver', undefined)
    delete window.IntersectionObserver
    mount(Host, { attachTo: document.body })
    expect(document.documentElement.classList.contains('rv-on')).toBe(false)
  })

  it('支援時標記元素，進入畫面後加上 in', () => {
    let cb
    const observe = vi.fn()
    vi.stubGlobal('IntersectionObserver', class { constructor(fn) { cb = fn } observe(el) { observe(el) } unobserve() {} disconnect() {} })
    vi.stubGlobal('matchMedia', () => ({ matches: false }))
    mount(Host, { attachTo: document.body })
    const el = document.querySelector('.block')
    expect(document.documentElement.classList.contains('rv-on')).toBe(true)
    expect(el.classList.contains('rv')).toBe(true)
    expect(observe).toHaveBeenCalledWith(el)
    cb([{ isIntersecting: true, target: el }])
    expect(el.classList.contains('in')).toBe(true)
  })

  it('使用者要求減少動態時不啟用', () => {
    vi.stubGlobal('IntersectionObserver', class { observe() {} })
    vi.stubGlobal('matchMedia', () => ({ matches: true }))
    mount(Host, { attachTo: document.body })
    expect(document.documentElement.classList.contains('rv-on')).toBe(false)
  })
})
