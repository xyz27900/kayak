import{_ as s,c as a,o as e,a as n}from"./app.867a90ae.js";const g=JSON.parse('{"title":"What is Kayak?","description":"","frontmatter":{},"headers":[{"level":2,"title":"Overview","slug":"overview","link":"#overview","children":[]},{"level":2,"title":"Features","slug":"features","link":"#features","children":[{"level":3,"title":"🦊 MetaMask support","slug":"metamask-support","link":"#metamask-support","children":[]},{"level":3,"title":"🤯 Headed and headless modes","slug":"headed-and-headless-modes","link":"#headed-and-headless-modes","children":[]},{"level":3,"title":"📦 Ready for Cypress and Playwright","slug":"ready-for-cypress-and-playwright","link":"#ready-for-cypress-and-playwright","children":[]}]},{"level":2,"title":"Example","slug":"example","link":"#example","children":[]},{"level":2,"title":"Similar projects","slug":"similar-projects","link":"#similar-projects","children":[]}],"relativePath":"guide/index.md"}'),t={name:"guide/index.md"},o=n(`<h1 id="what-is-kayak" tabindex="-1">What is Kayak? <a class="header-anchor" href="#what-is-kayak" aria-hidden="true">#</a></h1><h2 id="overview" tabindex="-1">Overview <a class="header-anchor" href="#overview" aria-hidden="true">#</a></h2><p><strong>Kayak</strong> is a tool that allows you to write end-to-end tests for your web3 applications in a way you&#39;ve never written them before.</p><p><strong>Kayak</strong> does all the dirty work for you so you can focus on writing the tests and not care about how your tests are executing.</p><h2 id="features" tabindex="-1">Features <a class="header-anchor" href="#features" aria-hidden="true">#</a></h2><h3 id="metamask-support" tabindex="-1">🦊 MetaMask support <a class="header-anchor" href="#metamask-support" aria-hidden="true">#</a></h3><p>Using <strong>Kayak</strong>, you are able to do everything you can with Metamask as a &quot;manual&quot; user.</p><h3 id="headed-and-headless-modes" tabindex="-1">🤯 Headed and headless modes <a class="header-anchor" href="#headed-and-headless-modes" aria-hidden="true">#</a></h3><p>With <strong>Kayak,</strong> you are able to execute tests in two modes:</p><ul><li>So-called <strong>headed</strong> mode, when tests are executing in a browser window, and you can see what&#39;s going on.</li><li>So-called <strong>headless</strong> mode, when a browser window is not showing.</li></ul><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>Read more about how it works in the <a href="/kayak/guide/common/overview.html">Common Flow</a> section.</p></div><h3 id="ready-for-cypress-and-playwright" tabindex="-1">📦 Ready for Cypress and Playwright <a class="header-anchor" href="#ready-for-cypress-and-playwright" aria-hidden="true">#</a></h3><p><strong>Kayak</strong> is being shipped with built-in support of <a href="https://www.cypress.io/" target="_blank" rel="noreferrer">Cypress</a> and <a href="https://playwright.dev/" target="_blank" rel="noreferrer">Playwright</a>. You can use <strong>Kayak</strong> as an out-of-the-box solution with these frameworks&#39; APIs or as a plugin for each of them.</p><h2 id="example" tabindex="-1">Example <a class="header-anchor" href="#example" aria-hidden="true">#</a></h2><p>A simple test for <strong>Cypress</strong> testing wallet connection to <a href="https://app.uniswap.org/#/swap" target="_blank" rel="noreferrer">Uniswap</a> may look like this:</p><div class="vp-code-group"><div class="tabs"><input type="radio" name="group-rp_db" id="tab-DP-eXM9" checked="checked"><label for="tab-DP-eXM9">kayak.config.ts</label></div><div class="blocks"><div class="language-typescript active"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki github-dark"><code><span class="line"><span style="color:#FF7B72;">import</span><span style="color:#C9D1D9;"> { defineConfig } </span><span style="color:#FF7B72;">from</span><span style="color:#C9D1D9;"> </span><span style="color:#A5D6FF;">&#39;@kayak/cypress&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FF7B72;">export</span><span style="color:#FFA657;"> </span><span style="color:#FF7B72;">default</span><span style="color:#FFA657;"> </span><span style="color:#D2A8FF;">defineConfig</span><span style="color:#FFA657;">({</span></span>
<span class="line"><span style="color:#FFA657;">  </span><span style="color:#C9D1D9;">testsDir: </span><span style="color:#A5D6FF;">&#39;cypress/tests&#39;</span><span style="color:#FFA657;">,</span></span>
<span class="line"><span style="color:#FFA657;">  </span><span style="color:#C9D1D9;">videosDir: </span><span style="color:#A5D6FF;">&#39;cypress/videos&#39;</span></span>
<span class="line"><span style="color:#FFA657;">})</span></span>
<span class="line"></span></code></pre></div></div></div><div class="vp-code-group"><div class="tabs"><input type="radio" name="group-pl0ya" id="tab-NYJ47hO" checked="checked"><label for="tab-NYJ47hO">tests/uniswap.spec.ts</label></div><div class="blocks"><div class="language-typescript active"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki github-dark"><code><span class="line"><span style="color:#D2A8FF;">it</span><span style="color:#C9D1D9;">(</span><span style="color:#A5D6FF;">&#39;Test Metamask connection&#39;</span><span style="color:#C9D1D9;">, () </span><span style="color:#FF7B72;">=&gt;</span><span style="color:#C9D1D9;"> {</span></span>
<span class="line"><span style="color:#C9D1D9;">  cy.</span><span style="color:#D2A8FF;">open</span><span style="color:#C9D1D9;">(</span><span style="color:#A5D6FF;">&#39;https://app.uniswap.org/#/swap&#39;</span><span style="color:#C9D1D9;">)</span></span>
<span class="line"><span style="color:#C9D1D9;">  cy.</span><span style="color:#D2A8FF;">get</span><span style="color:#C9D1D9;">(</span><span style="color:#A5D6FF;">&#39;[data-test-id=&quot;navbar-connect-wallet&quot;]&#39;</span><span style="color:#C9D1D9;">).</span><span style="color:#D2A8FF;">click</span><span style="color:#C9D1D9;">()</span></span>
<span class="line"><span style="color:#C9D1D9;">  cy.</span><span style="color:#D2A8FF;">get</span><span style="color:#C9D1D9;">(</span><span style="color:#A5D6FF;">&#39;[data-test-id=&quot;wallet-modal-option&quot;]&#39;</span><span style="color:#C9D1D9;">).</span><span style="color:#D2A8FF;">contains</span><span style="color:#C9D1D9;">(</span><span style="color:#A5D6FF;">&#39;Metamask&#39;</span><span style="color:#C9D1D9;">).</span><span style="color:#D2A8FF;">click</span><span style="color:#C9D1D9;">()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C9D1D9;">  cy.</span><span style="color:#D2A8FF;">metamaskApproveConnection</span><span style="color:#C9D1D9;">()</span></span>
<span class="line"><span style="color:#C9D1D9;">  cy.</span><span style="color:#D2A8FF;">get</span><span style="color:#C9D1D9;">(</span><span style="color:#A5D6FF;">&#39;[data-test-id=&quot;web3-status-connected&quot;]&#39;</span><span style="color:#C9D1D9;">).</span><span style="color:#D2A8FF;">should</span><span style="color:#C9D1D9;">(</span><span style="color:#A5D6FF;">&#39;be.visible&#39;</span><span style="color:#C9D1D9;">)</span></span>
<span class="line"><span style="color:#C9D1D9;">})</span></span>
<span class="line"></span></code></pre></div></div></div><h2 id="similar-projects" tabindex="-1">Similar projects <a class="header-anchor" href="#similar-projects" aria-hidden="true">#</a></h2><p><a href="https://github.com/Synthetixio/synpress" target="_blank" rel="noreferrer">Synpress</a> is a similar project that allows you to run end-to-end tests with <strong>Cypress</strong> and <strong>Metamask</strong> as well. It uses several similar approaches, so we recommend you to have a look at it.</p><p><a href="https://github.com/jlesage/docker-baseimage-gui" target="_blank" rel="noreferrer">Docker BaseImage GUI</a> is an awesome and extremely tiny X graphical <strong>Docker</strong> image. <strong>Kayak</strong> uses some techniques and build scripts from this project to build its own <strong>Docker</strong> image.</p>`,20),l=[o];function r(p,i,c,d,h,y){return e(),a("div",null,l)}const D=s(t,[["render",r]]);export{g as __pageData,D as default};
