import{_ as e,c as i,o as t,a as o}from"./app.3d6b22f6.js";const g=JSON.parse('{"title":"Configuration file","description":"","frontmatter":{},"headers":[{"level":2,"title":"slowMo","slug":"slowmo","link":"#slowmo","children":[]},{"level":2,"title":"testsDir","slug":"testsdir","link":"#testsdir","children":[]},{"level":2,"title":"testMatch","slug":"testmatch","link":"#testmatch","children":[]},{"level":2,"title":"videosDir","slug":"videosdir","link":"#videosdir","children":[]},{"level":2,"title":"retries","slug":"retries","link":"#retries","children":[]},{"level":2,"title":"viewport","slug":"viewport","link":"#viewport","children":[]}],"relativePath":"guide/common/configuration-file.md"}'),r={name:"guide/common/configuration-file.md"},l=o('<h1 id="configuration-file" tabindex="-1">Configuration file <a class="header-anchor" href="#configuration-file" aria-hidden="true">#</a></h1><p>After the initialization you have <code>kayak.config.ts</code> or <code>kayak.config.js</code> file in the root of your project.</p><p>In this section we will cover only common options. Vendor-specific options are described in the corresponding sections of the API documentation:</p><ul><li><a href="/kayak/api/cypress/configuration.html">Cypress</a></li><li><a href="/kayak/api/playwright/configuration.html">Playwright</a></li></ul><h2 id="slowmo" tabindex="-1">slowMo <a class="header-anchor" href="#slowmo" aria-hidden="true">#</a></h2><ul><li>Type: <code>number</code></li><li>Default: <code>0</code></li></ul><p>Slows down the execution of tests by the specified amount of milliseconds.</p><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>This option is useful for debugging purposes.</p></div><h2 id="testsdir" tabindex="-1">testsDir <a class="header-anchor" href="#testsdir" aria-hidden="true">#</a></h2><ul><li>Type: <code>string</code></li><li>Default: <code>cypress/tests</code> or <code>playwright/tests</code> — depending on the test runner.</li></ul><h2 id="testmatch" tabindex="-1">testMatch <a class="header-anchor" href="#testmatch" aria-hidden="true">#</a></h2><ul><li>Type: <code>string</code></li><li>Default: <code>**/*.{spec,test,cy}.{js,ts}</code></li></ul><p>Glob pattern for test files.</p><h2 id="videosdir" tabindex="-1">videosDir <a class="header-anchor" href="#videosdir" aria-hidden="true">#</a></h2><ul><li>Type: <code>string</code></li><li>Default: <code>cypress/videos</code> or <code>playwright/videos</code> — depending on the test runner.</li></ul><p>Path to the directory with videos.</p><h2 id="retries" tabindex="-1">retries <a class="header-anchor" href="#retries" aria-hidden="true">#</a></h2><ul><li>Type: <code>number</code></li><li>Default: <code>0</code></li></ul><p>Number of times to retry a failed test before actually failing it.</p><h2 id="viewport" tabindex="-1">viewport <a class="header-anchor" href="#viewport" aria-hidden="true">#</a></h2><ul><li>Type: <code>{ width: number, height: number }</code></li><li>Default: <code>{ width: 1280, height: 720 }</code></li></ul><p>Default viewport size for tests.</p>',22),s=[l];function a(d,c,n,h,u,p){return t(),i("div",null,s)}const m=e(r,[["render",a]]);export{g as __pageData,m as default};
