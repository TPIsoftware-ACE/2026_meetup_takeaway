/** v-show 是否顯示。未掛載到 document 的 jsdom 節點，isVisible() 會沿用舊的樣式結果，因此直接檢查 inline style。 */
export const shown = w => !(w.attributes('style') || '').includes('display: none')
