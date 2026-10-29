<script setup>
import coverLarge from '../../assets/cover-2073.webp'
import coverSmall from '../../assets/cover-1036.webp'
import mobileLarge from '../../assets/cover-mobile-1254.webp'
import mobileSmall from '../../assets/cover-mobile-760.webp'
</script>

<template>
  <section class="hero" id="overview">
  <!-- 封面圖已包含主標、副標與顏色說明；完整標題保留給螢幕閱讀器與搜尋引擎 -->
  <h1 class="sr">拒絕無效導入！OpenAI Select Partner 帶你打造安全 AI 工作流</h1>
  <!-- 螢幕小於 765px 改用直式手機版主視覺 -->
  <picture>
  <source
    media="(max-width: 764.98px)"
    :srcset="`${mobileSmall} 760w, ${mobileLarge} 1254w`"
    sizes="100vw"
    width="1254"
    height="1254"
  >
  <img
    class="cover"
    :src="coverLarge"
    :srcset="`${coverSmall} 1036w, ${coverLarge} 2073w`"
    sizes="100vw"
    width="2073"
    height="758"
    fetchpriority="high"
    alt="AI Consulting and Enablement｜拒絕無效導入！先從一個人、一條具體的工作開始，再變成整個組織能重複使用的工作方法。顏色說明：AI 負責、人負責、資料來源、產出與下一步。"
  >
  </picture>
  <div class="wrap">
    <nav class="arc" aria-label="活動流程">
      <a href="#keynote"><span class="eyebrow">Keynote · Henry</span><span class="q">從最簡單的開始嘗試</span><span class="t">產業趨勢與「從 5 個人開始」的導入方法</span></a>
      <a href="#case1"><span class="eyebrow">案例一 · Tim</span><span class="q">讓 AI 一起工作</span><span class="t">從對話到工作應用，把 AI 放進工作流動的位置</span></a>
      <a href="#case2"><span class="eyebrow">案例二 · Tim</span><span class="q">建立可複用工作流程</span><span class="t">從個人工具到可複用的組織 Workflow</span></a>
      <a href="#case3"><span class="eyebrow">案例三 · Blaze</span><span class="q">讓靜態文件動起來</span><span class="t">用 Codex 把企業文件轉成互動介面</span></a>
      <a href="#ace"><span class="eyebrow">ACE 顧問服務</span><span class="q">讓 ACE 陪你一起完成</span><span class="t">平台＋陪跑，找到適合的下一步</span></a>
    </nav>
  </div>
</section>
</template>
