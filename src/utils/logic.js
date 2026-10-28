/* 互動區塊的純邏輯，與畫面分開以便單元測試。 */

/** 每月省下的小時數：單次節省分鐘 × 每人每週次數 × 人數，以一年 52 週平均到每月。 */
export function monthlyHours(savedMinutes, timesPerWeek, people) {
  return savedMinutes * timesPerWeek * people * 52 / 12 / 60
}

/** 小時數顯示：未滿 10 小時保留一位小數，其餘取整數。 */
export function formatHours(hours) {
  return hours.toLocaleString('zh-TW', { maximumFractionDigits: hours < 10 ? 1 : 0 })
}

/** 換算成 8 小時工作天，保留一位小數。 */
export function formatWorkDays(hours) {
  return (hours / 8).toLocaleString('zh-TW', { maximumFractionDigits: 1 })
}

/** 分鐘轉成顯示文字：未滿 1 分鐘以秒表示。 */
export function formatDuration(minutes) {
  return minutes < 1 ? `${minutes * 60} 秒` : `${minutes} 分鐘`
}

/** Human Review 練習：單一檢查點的判定結果。 */
export function gradeCheck(answers, picked, key) {
  const inAns = answers.includes(key)
  const sel = picked.includes(key)
  if (inAns && sel) return 'hit'
  if (inAns) return 'miss'
  if (sel) return 'extra'
  return ''
}

export function countHits(answers, picked) {
  return answers.filter(a => picked.includes(a)).length
}

/** 名詞探索：依分類與關鍵字（比對名詞與定義、不分大小寫）篩選。 */
export function filterTerms(terms, cat, query) {
  const q = query.trim().toLowerCase()
  return terms.filter(x => (cat === '全部' || x.c === cat) && (!q || (x.t + x.d).toLowerCase().includes(q)))
}

/** 落地自評：取分數達到門檻的最高一級。 */
export function readinessLevel(levels, score) {
  return levels.filter(x => score >= x[0]).pop()
}

/** 服務選擇器：若目前的第二題選項不屬於第一題的分支，改選該分支的第一個。 */
export function resolveService(f2Map, f1, f2) {
  const cfg = f2Map[f1]
  const pool = cfg.opts.map(o => o[0])
  const pick = pool.includes(f2) ? f2 : pool[0]
  return { cfg, pool, pick }
}

/** Workflow 資產卡：把表單值整理成卡片欄位。 */
export function cardFields(fields, values) {
  return fields.map(f => ({ ...f, v: (values[f.k] || '').trim() }))
}

export function cardText(name, vals) {
  return `【${name}】\n` + vals.map(v => `${v.en}：${v.v || '（待填）'}`).join('\n')
}

/**
 * 閱讀位置（頁面座標）：從視窗頂端加上頁首偏移開始，隨捲動比例往視窗底部推進；
 * 捲到頂時接近頁首下緣，捲到底時等於頁面總高，最後一個章節因此一定能填滿。
 */
export function readingPosition(scrollY, viewportHeight, docHeight, offset) {
  const max = Math.max(docHeight - viewportHeight, 1)
  const p = Math.min(Math.max(scrollY / max, 0), 1)
  return scrollY + offset + p * (viewportHeight - offset)
}

/** 依各章節起點與頁面總高，算出每段長度、填滿比例（0–1）、目前章節與整體百分比。 */
export function sectionProgress(starts, docHeight, pos) {
  const ends = starts.slice(1).concat(docHeight)
  const lengths = starts.map((s, i) => Math.max(ends[i] - s, 1))
  const fills = starts.map((s, i) => Math.min(Math.max((pos - s) / lengths[i], 0), 1))
  let active = 0
  starts.forEach((s, i) => { if (pos >= s) active = i })
  const total = lengths.reduce((a, b) => a + b, 0)
  const percent = Math.round(fills.reduce((a, f, i) => a + f * lengths[i], 0) / total * 100)
  return { lengths, fills, active, percent }
}

/** 水平捲動指示：可視比例決定滑塊長度，捲動位置決定滑塊起點（皆為軌道寬度的百分比）。 */
export function scrollThumb(scrollLeft, scrollWidth, clientWidth) {
  const overflow = scrollWidth - clientWidth > 1
  if (!overflow) return { overflow, size: 100, offset: 0 }
  const size = clientWidth / scrollWidth * 100
  const maxLeft = scrollWidth - clientWidth
  const ratio = Math.min(Math.max(scrollLeft / maxLeft, 0), 1)
  return { overflow, size, offset: ratio * (100 - size) }
}
