import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'

// Vitest 以專案根目錄為 cwd
const root = process.cwd()
const html = readFileSync(resolve(root, 'index.html'), 'utf8')
const doc = new DOMParser().parseFromString(html, 'text/html')

describe('index.html', () => {
  it('提供 TPIsoftware 網站圖示，且檔案存在', () => {
    const icons = Array.from(doc.querySelectorAll('link[rel="icon"], link[rel="apple-touch-icon"]'))
    expect(icons.map(l => [l.getAttribute('rel'), l.getAttribute('sizes')])).toEqual([
      ['icon', '32x32'], ['icon', '192x192'], ['apple-touch-icon', '180x180']
    ])
    icons.forEach(l => expect(existsSync(resolve(root, 'public', l.getAttribute('href').slice(1)))).toBe(true))
  })

  it('頁面標題', () => {
    expect(doc.title).toBe('拒絕無效導入！OpenAI Select Partner 帶你打造安全 AI 工作流')
  })
})
