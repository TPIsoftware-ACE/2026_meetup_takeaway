<script setup>
import { ref } from 'vue'
import TabList from '../common/TabList.vue'
import { IFACE_TABS } from '../../data/content.js'

const tab = ref('dec')
</script>

<template>
  <TabList v-model="tab" :tabs="IFACE_TABS" />
  <div>
    <div v-show="tab === 'dec'" class="card ifaces" data-panel="dec">
      <div style="display:grid;gap:10px">
        <span class="pill ai" style="justify-self:start">Decision Interface</span>
        <h4 class="h3">ChatGPT Apps × Microsoft 365 Permission</h4>
        <p class="small"><i>As an Enterprise Admin, I want to know which permissions are required, so that I can safely enable a capability.</i></p>
        <p>從閱讀文件，變成做決定。欄位只留決策需要的：Capability、Required Permission、Risk、Admin Role。</p>
        <a class="small" href="#ace-finder">這頁的例子：ACE 服務選擇器 →</a>
      </div>
      <div class="mock" aria-hidden="true">
        <span class="mt">選一個功能 → 直接看到需要的權限與風險</span>
        <div class="mtable">
          <span class="h">Capability</span><span class="h">Permission</span><span class="h">Risk</span><span class="h">Admin Role</span>
          <span></span><span></span><span></span><span></span>
          <span class="pick"></span><span class="pick"></span><span class="pick"></span><span class="pick"></span>
          <span></span><span></span><span></span><span></span>
        </div>
      </div>
    </div>
    <div v-show="tab === 'rel'" class="card ifaces" data-panel="rel">
      <div style="display:grid;gap:10px">
        <span class="pill ai" style="justify-self:start">Relationship Interface</span>
        <h4 class="h3">Workspace Agent Settings</h4>
        <p>有些文件難懂的不是文字，而是關係：哪個設定要先開？哪些設定互相依賴？哪個 Policy 控制哪個功能？</p>
        <a class="small" href="#c1-flow">這頁的例子：案例一的工作拆解，每一段都依賴上一段 →</a>
      </div>
      <div class="mock" aria-hidden="true">
        <span class="mt">設定之間的依賴，一眼看出先後</span>
        <svg viewBox="0 0 360 160" role="img">
          <g stroke="var(--p5)" stroke-width="1.5" fill="none">
            <path d="M84 42 L140 38" /><path d="M84 42 L140 122" /><path d="M240 38 L280 80" /><path d="M240 122 L280 80" />
          </g>
          <g font-family="IBM Plex Mono, monospace" font-size="14" text-anchor="middle">
            <rect x="4" y="24" width="80" height="36" rx="8" fill="var(--p9)" /><text x="44" y="47" fill="var(--on-strong)">Policy</text>
            <rect x="140" y="20" width="100" height="36" rx="8" fill="var(--ai-soft)" stroke="var(--ai)" /><text x="190" y="43" fill="var(--ai)">Setting A</text>
            <rect x="140" y="104" width="100" height="36" rx="8" fill="var(--ai-soft)" stroke="var(--ai)" /><text x="190" y="127" fill="var(--ai)">Setting B</text>
            <rect x="280" y="62" width="76" height="36" rx="8" fill="var(--surface)" stroke="var(--line-2)" /><text x="318" y="85" fill="var(--ink)">Feature</text>
          </g>
        </svg>
      </div>
    </div>
    <div v-show="tab === 'exp'" class="card ifaces" data-panel="exp">
      <div style="display:grid;gap:10px">
        <span class="pill ai" style="justify-self:start">Exploration Interface</span>
        <h4 class="h3">Compliance API / Log Response Fields</h4>
        <p>使用者想知道的只有「規格與定義」。互動方式是：選擇 → 篩選 → 查找 → 查看細節。</p>
        <a class="small" href="#c3-explore">這頁的例子：下方的名詞探索 →</a>
      </div>
      <div class="mock" aria-hidden="true">
        <span class="mt">篩選清單，點一筆看完整定義</span>
        <div class="mexp">
          <div class="l"><span></span><span class="pick"></span><span></span><span></span><span></span></div>
          <div class="r"><i style="width:60%;background:var(--ai)"></i><i></i><i></i><i style="width:80%"></i><i style="width:50%"></i></div>
        </div>
      </div>
    </div>
  </div>
</template>
