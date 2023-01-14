import{_ as e,c as s,o as a,a as o}from"./app.f5729140.js";const n="/kayak/images/diagram.png",k=JSON.parse('{"title":"Common Flow","description":"","frontmatter":{},"headers":[{"level":2,"title":"Overview","slug":"overview","link":"#overview","children":[]},{"level":2,"title":"Setup","slug":"setup","link":"#setup","children":[]},{"level":2,"title":"Running Tests","slug":"running-tests","link":"#running-tests","children":[]}],"relativePath":"guide/common/overview.md"}'),t={name:"guide/common/overview.md"},l=o('<h1 id="common-flow" tabindex="-1">Common Flow <a class="header-anchor" href="#common-flow" aria-hidden="true">#</a></h1><h2 id="overview" tabindex="-1">Overview <a class="header-anchor" href="#overview" aria-hidden="true">#</a></h2><p>In the common <strong>Kayak</strong> usage flow your tests are executing in a Docker container. This is a simple scheme displaying how this actually works:</p><p><div style="border-radius:8px;overflow:hidden;"><img src="'+n+`" alt=""></div></p><p>The <strong>Display</strong> container is a sort of bus — <strong>Test Runner</strong> opens a browser on a virtual X server display, and at the same time the <strong>Video Recorder</strong> container captures that virtual display and records a video.</p><p>During the test execution, you can observe what’s going on in your browser by opening the page accessible at <code>127.0.0.1:5800/vnc.html</code>.</p><p>To automatically setup <strong>Kayak</strong>, just run the following command:</p><h2 id="setup" tabindex="-1">Setup <a class="header-anchor" href="#setup" aria-hidden="true">#</a></h2><div class="vp-code-group"><div class="tabs"><input type="radio" name="group-3fto8" id="tab-xAkzR1y" checked="checked"><label for="tab-xAkzR1y">Cypress</label><input type="radio" name="group-3fto8" id="tab-6G48EC_"><label for="tab-6G48EC_">Playwright</label></div><div class="blocks"><div class="language-shell active"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark"><code><span class="line"><span style="color:#FFA657;">npx</span><span style="color:#C9D1D9;"> </span><span style="color:#A5D6FF;">kayak</span><span style="color:#C9D1D9;"> </span><span style="color:#A5D6FF;">init</span><span style="color:#C9D1D9;"> </span><span style="color:#79C0FF;">--cypress</span></span>
<span class="line"></span></code></pre></div><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark"><code><span class="line"><span style="color:#FFA657;">npx</span><span style="color:#C9D1D9;"> </span><span style="color:#A5D6FF;">kayak</span><span style="color:#C9D1D9;"> </span><span style="color:#A5D6FF;">init</span><span style="color:#C9D1D9;"> </span><span style="color:#79C0FF;">--playwright</span></span>
<span class="line"></span></code></pre></div></div></div><p>This command performs several actions:</p><ol><li>Creates <code>kayak.config.ts</code> of <code>kayak.config.js</code> — depending on the language you choose in the initialization wizard.</li><li>Creates <code>.kayak</code> directory with <strong>Docker</strong> setup.</li><li>Creates <code>.env.kayak</code> file with two environment variables — <code>SEED_PHRASE</code> and <code>PASSWORD</code> which you specified in the initialization wizard.</li><li>Adds necessary dependencies to the <code>package.json</code> file — all you need is to install them.</li><li>Adds <code>kayak</code> script to the <code>package.json</code> file — you can either use it as your test command or run it in combination with anything else.</li></ol><p>For example, to run <strong>Kayak</strong> and the server, you can use <a href="https://www.npmjs.com/package/start-server-and-test" target="_blank" rel="noreferrer">this package</a> like this:</p><div class="vp-code-group"><div class="tabs"><input type="radio" name="group-WhXUy" id="tab-wfO7rVU" checked="checked"><label for="tab-wfO7rVU">package.json</label></div><div class="blocks"><div class="language-json active"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki github-dark"><code><span class="line"><span style="color:#C9D1D9;">{</span></span>
<span class="line"><span style="color:#C9D1D9;">  </span><span style="color:#7EE787;">&quot;scripts&quot;</span><span style="color:#C9D1D9;">: {</span></span>
<span class="line"><span style="color:#C9D1D9;">    </span><span style="color:#7EE787;">&quot;serve&quot;</span><span style="color:#C9D1D9;">: </span><span style="color:#A5D6FF;">&quot;serve -s dist&quot;</span><span style="color:#C9D1D9;">,</span></span>
<span class="line"><span style="color:#C9D1D9;">    </span><span style="color:#7EE787;">&quot;kayak&quot;</span><span style="color:#C9D1D9;">: </span><span style="color:#A5D6FF;">&quot;kayak test --cypress&quot;</span><span style="color:#C9D1D9;">, </span><span style="color:#8B949E;">// or --playwright</span></span>
<span class="line"><span style="color:#C9D1D9;">    </span><span style="color:#7EE787;">&quot;test&quot;</span><span style="color:#C9D1D9;">: </span><span style="color:#A5D6FF;">&quot;start-server-and-test serve http://localhost:3000 kayak&quot;</span></span>
<span class="line"><span style="color:#C9D1D9;">  }</span></span>
<span class="line"><span style="color:#C9D1D9;">}</span></span>
<span class="line"></span></code></pre></div><h2 id="running-tests" tabindex="-1">Running Tests <a class="header-anchor" href="#running-tests" aria-hidden="true">#</a></h2><p>To run your tests, execute <code>npm run kayak</code>.</p><p>This command will run <strong>Kayak</strong> executor which will perform the action under the <code>test</code> script in the <code>package.json</code> file. To change the default command, just edit the <code>CMD</code> instruction in the <code>.kayak/Dockerfile</code> file. Read more about <a href="/kayak/guide/common/dockerfile.html">Dockerfile</a>.</p></div></div>`,13),i=[l];function r(c,p,d,u,h,y){return a(),s("div",null,i)}const v=e(t,[["render",r]]);export{k as __pageData,v as default};