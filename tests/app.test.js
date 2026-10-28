import { afterEach, describe, expect, it, vi } from 'vitest'
import { defineComponent, h } from 'vue'
import { mount } from '@vue/test-utils'
import App from '../src/App.vue'
import TheHeader from '../src/components/layout/TheHeader.vue'
import TheFooter from '../src/components/layout/TheFooter.vue'
import TabList from '../src/components/common/TabList.vue'
import BackToTop from '../src/components/layout/BackToTop.vue'
import { useSectionProgress } from '../src/composables/useSectionProgress.js'
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
    expect(wrapper.find('h1').text()).toBe('拒絕無效導入！OpenAI Select Partner 帶你打造安全 AI 工作流')
    expect(wrapper.text()).not.toContain('Meetup 技術小聚')
  })

  it('封面為滿版活動主視覺、位於內容區上方，標題保留給螢幕閱讀器', () => {
    const wrapper = mount(App)
    expect(wrapper.find('h1').classes()).toContain('sr')
    const cover = wrapper.find('.hero > picture > img.cover')
    expect(cover.element.parentElement.nextElementSibling.classList.contains('wrap')).toBe(true)
    const mobile = wrapper.find('.hero picture source')
    expect(mobile.attributes('media')).toBe('(max-width: 764.98px)')
    expect(mobile.attributes('srcset')).toMatch(/760w, .+ 1254w$/)
    expect([mobile.attributes('width'), mobile.attributes('height')]).toEqual(['1254', '1254'])
    expect(cover.attributes('sizes')).toBe('100vw')
    expect(cover.attributes('alt')).toContain('拒絕無效導入！')
    expect(cover.attributes('srcset')).toMatch(/1036w, .+ 2073w$/)
    expect(cover.attributes('width')).toBe('2073')
    expect(cover.attributes('height')).toBe('758')
    expect(wrapper.find('.hero .lede').exists()).toBe(false)
  })
})

describe('TheHeader', () => {
  it('顯示 TPIsoftware Logo 並連回頁首', () => {
    const wrapper = mount(TheHeader)
    const brand = wrapper.find('a.brand')
    expect(brand.attributes('href')).toBe('#overview')
    expect(brand.find('img').attributes('alt')).toBe('TPIsoftware')
  })

  it('Logo 旁顯示 OpenAI Select Partner 標章', () => {
    const imgs = mount(TheHeader).findAll('.brands img')
    expect(imgs.map(i => i.attributes('alt'))).toEqual(['TPIsoftware', 'OpenAI Select Partner'])
    expect(imgs[1].classes()).toContain('partner')
    expect(imgs[1].attributes('src')).toBeTruthy()
  })

  it('導覽列包含六個章節，第一個預設為目前章節', () => {
    const links = mount(TheHeader).findAll('.navlinks a')
    expect(links.map(a => a.text())).toEqual(['總覽', 'Keynote', '案例一', '案例二', '案例三', 'ACE'])
    expect(links[0].classes()).toContain('on')
  })

  it('導覽放不下時顯示左右箭頭，點擊後捲動導覽', async () => {
    const wrapper = mount(TheHeader)
    const nav = wrapper.find('.navlinks').element
    const prev = () => wrapper.find('.nav-arrow.prev')
    const next = () => wrapper.find('.nav-arrow.next')
    expect(prev().attributes('hidden')).toBeDefined()
    expect(next().attributes('hidden')).toBeDefined()

    Object.defineProperty(nav, 'scrollWidth', { configurable: true, value: 400 })
    Object.defineProperty(nav, 'clientWidth', { configurable: true, value: 300 })
    nav.scrollBy = vi.fn()
    nav.dispatchEvent(new Event('scroll'))
    await wrapper.vm.$nextTick()
    expect(prev().attributes('hidden')).toBeDefined()
    expect(next().attributes('hidden')).toBeUndefined()
    expect(wrapper.find('.navbox').classes()).toEqual(['navbox', 'can-right'])
    expect(next().attributes('aria-label')).toBe('往後捲動章節')

    await next().trigger('click')
    expect(nav.scrollBy).toHaveBeenCalledWith({ left: 180, behavior: 'smooth' })

    nav.scrollLeft = 100
    nav.dispatchEvent(new Event('scroll'))
    await wrapper.vm.$nextTick()
    expect(prev().attributes('hidden')).toBeUndefined()
    expect(next().attributes('hidden')).toBeDefined()
    await prev().trigger('click')
    expect(nav.scrollBy).toHaveBeenLastCalledWith({ left: -180, behavior: 'smooth' })
  })

  it('頁首下方的閱讀進度條：每個章節一段，並標示目前章節', () => {
    const wrapper = mount(TheHeader)
    const bar = wrapper.find('.readbar')
    expect(bar.attributes('role')).toBe('progressbar')
    expect(bar.attributes('aria-valuetext')).toMatch(/^目前在「總覽」，已讀 \d+%$/)
    const segs = bar.findAll('.seg')
    expect(segs.map(s => s.attributes('data-label'))).toEqual(['總覽', 'Keynote', '案例一', '案例二', '案例三', 'ACE'])
    expect(segs.map(s => s.attributes('href'))).toEqual(['#overview', '#keynote', '#case1', '#case2', '#case3', '#ace'])
    expect(segs[0].classes()).toContain('on')
    expect(segs.every(s => s.attributes('tabindex') === '-1')).toBe(true)
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

describe('useSectionProgress', () => {
  function setup() {
    document.body.innerHTML = '<header></header><div id="s1"></div><div id="s2"></div>'
    Object.defineProperty(document.querySelector('header'), 'offsetHeight', { configurable: true, value: 64 })
    Object.defineProperty(document.getElementById('s2'), 'offsetTop', { configurable: true, value: 1000 })
    Object.defineProperty(document.documentElement, 'scrollHeight', { configurable: true, value: 3000 })
    window.innerHeight = 800
    let state
    mount(defineComponent({ setup() { state = useSectionProgress(['s1', 's2']); return () => h('div') } }))
    return state
  }

  afterEach(() => { window.scrollY = 0 })

  it('頁面頂端：在第一個章節，第二段尚未開始', () => {
    const state = setup()
    expect(state.active.value).toBe(0)
    expect(state.lengths.value).toEqual([1000, 2000])
    expect(state.fills.value[0]).toBeCloseTo(0.12, 2)
    expect(state.fills.value[1]).toBe(0)
  })

  it('捲過第二章節起點後切換章節，前一段填滿', () => {
    const state = setup()
    window.scrollY = 900
    state.update()
    expect(state.active.value).toBe(1)
    expect(state.fills.value[0]).toBe(1)
    expect(state.fills.value[1]).toBeGreaterThan(0)
  })

  it('捲到底時全部填滿、整體 100%', () => {
    const state = setup()
    window.scrollY = 2200
    state.update()
    expect(state.fills.value).toEqual([1, 1])
    expect(state.percent.value).toBe(100)
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

describe('BackToTop', () => {
  afterEach(() => {
    vi.useRealTimers()
    window.scrollY = 0
  })

  it('捲動超過 400px 才出現', async () => {
    const wrapper = mount(BackToTop)
    expect(wrapper.classes()).not.toContain('show')
    expect(wrapper.attributes('tabindex')).toBe('-1')
    window.scrollY = 401
    window.dispatchEvent(new Event('scroll'))
    await wrapper.vm.$nextTick()
    expect(wrapper.classes()).toContain('show')
    expect(wrapper.attributes('tabindex')).toBe('0')
    expect(wrapper.attributes('aria-label')).toBe('回到頁首')
  })

  it('靜置 1 秒後標記 idle，有操作就恢復', async () => {
    vi.useFakeTimers()
    const wrapper = mount(BackToTop)
    vi.advanceTimersByTime(999)
    await wrapper.vm.$nextTick()
    expect(wrapper.classes()).not.toContain('idle')
    vi.advanceTimersByTime(1)
    await wrapper.vm.$nextTick()
    expect(wrapper.classes()).toContain('idle')
    window.dispatchEvent(new Event('pointermove'))
    await wrapper.vm.$nextTick()
    expect(wrapper.classes()).not.toContain('idle')
    window.dispatchEvent(new Event('scroll'))
    vi.advanceTimersByTime(1000)
    await wrapper.vm.$nextTick()
    expect(wrapper.classes()).toContain('idle')
  })

  it('點擊後回到頁首', async () => {
    const scrollTo = vi.fn()
    vi.stubGlobal('scrollTo', scrollTo)
    const wrapper = mount(BackToTop)
    await wrapper.trigger('click')
    expect(scrollTo).toHaveBeenCalledWith({ top: 0 })
  })
})

describe('講者資訊', () => {
  it('Keynote 與各案例只顯示講者名稱與職稱', () => {
    const speakers = mount(App).findAll('.speaker').map(s => [s.find('b').text(), s.find('span').text()])
    expect(speakers).toEqual([
      ['Henry Li', 'Head of Enterprise AI Advisory & Solutions'],
      ['Tim', 'AI Strategy Planner'],
      ['Tim', 'AI Strategy Planner'],
      ['Blaze', 'Principal Engineer']
    ])
  })
})
