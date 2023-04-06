import{_ as s,c as a,o as n,a as e}from"./app.c795a2d8.js";const F=JSON.parse('{"title":"Dockerfile","description":"","frontmatter":{},"headers":[],"relativePath":"guide/common/dockerfile.md"}'),o={name:"guide/common/dockerfile.md"},p=e(`<h1 id="dockerfile" tabindex="-1">Dockerfile <a class="header-anchor" href="#dockerfile" aria-hidden="true">#</a></h1><p>The <code>Dockerfile</code> is located in the <code>.kayak</code> directory and looks like this:</p><div class="vp-code-group"><div class="tabs"><input type="radio" name="group-2Z1KH" id="tab-jQlbjrC" checked="checked"><label for="tab-jQlbjrC">Cypress</label><input type="radio" name="group-2Z1KH" id="tab-juDo5mF"><label for="tab-juDo5mF">Playwright</label></div><div class="blocks"><div class="language-docker active"><button title="Copy Code" class="copy"></button><span class="lang">docker</span><pre class="shiki github-dark"><code><span class="line"><span style="color:#FF7B72;">FROM</span><span style="color:#C9D1D9;"> node:16-alpine </span><span style="color:#FF7B72;">AS</span><span style="color:#C9D1D9;"> dependencies</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FF7B72;">WORKDIR</span><span style="color:#C9D1D9;"> /tmp</span></span>
<span class="line"><span style="color:#FF7B72;">COPY</span><span style="color:#C9D1D9;"> package.json package.json</span></span>
<span class="line"><span style="color:#FF7B72;">RUN</span><span style="color:#C9D1D9;"> npm install</span></span>
<span class="line"></span>
<span class="line"><span style="color:#8B949E;"># ------------ #</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FF7B72;">FROM</span><span style="color:#C9D1D9;"> kayak/chromium:cypress</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FF7B72;">WORKDIR</span><span style="color:#C9D1D9;"> /app</span></span>
<span class="line"><span style="color:#FF7B72;">COPY</span><span style="color:#C9D1D9;"> . .</span></span>
<span class="line"><span style="color:#FF7B72;">COPY</span><span style="color:#C9D1D9;"> --from=dependencies /tmp/node_modules /app/node_modules</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FF7B72;">CMD</span><span style="color:#C9D1D9;"> [</span><span style="color:#A5D6FF;">&quot;npm&quot;</span><span style="color:#C9D1D9;">, </span><span style="color:#A5D6FF;">&quot;run&quot;</span><span style="color:#C9D1D9;">, </span><span style="color:#A5D6FF;">&quot;test&quot;</span><span style="color:#C9D1D9;">]</span></span>
<span class="line"></span></code></pre></div><div class="language-docker"><button title="Copy Code" class="copy"></button><span class="lang">docker</span><pre class="shiki github-dark"><code><span class="line"><span style="color:#FF7B72;">FROM</span><span style="color:#C9D1D9;"> node:16-alpine </span><span style="color:#FF7B72;">AS</span><span style="color:#C9D1D9;"> dependencies</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FF7B72;">WORKDIR</span><span style="color:#C9D1D9;"> /tmp</span></span>
<span class="line"><span style="color:#FF7B72;">COPY</span><span style="color:#C9D1D9;"> package.json package.json</span></span>
<span class="line"><span style="color:#FF7B72;">RUN</span><span style="color:#C9D1D9;"> npm install</span></span>
<span class="line"></span>
<span class="line"><span style="color:#8B949E;"># ------------ #</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FF7B72;">FROM</span><span style="color:#C9D1D9;"> kayak/chromium:playwright</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FF7B72;">WORKDIR</span><span style="color:#C9D1D9;"> /app</span></span>
<span class="line"><span style="color:#FF7B72;">COPY</span><span style="color:#C9D1D9;"> . .</span></span>
<span class="line"><span style="color:#FF7B72;">COPY</span><span style="color:#C9D1D9;"> --from=dependencies /tmp/node_modules /app/node_modules</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FF7B72;">CMD</span><span style="color:#C9D1D9;"> [</span><span style="color:#A5D6FF;">&quot;npm&quot;</span><span style="color:#C9D1D9;">, </span><span style="color:#A5D6FF;">&quot;run&quot;</span><span style="color:#C9D1D9;">, </span><span style="color:#A5D6FF;">&quot;test&quot;</span><span style="color:#C9D1D9;">]</span></span>
<span class="line"></span></code></pre></div></div></div><p>It uses <code>kayak/chromium</code> as a base image and installs the dependencies from the <code>package.json</code> file. You can modify it to your needs.</p><p>The <code>kayak/chromium</code> image has two tags: <code>cypress</code> and <code>playwright</code> — depending on the framework you use.</p><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>Tehnically, you can run <code>playwright</code> tests in the <code>cypress</code> image, but vice versa is not possible.</p></div><p>By default, <code>Dockerfile</code> uses a two-stage build to reduce building time.</p><p>The <code>CMD</code> instruction is the default command that will be executed in the container. Change it if you want to run something else.</p><div class="language-docker"><button title="Copy Code" class="copy"></button><span class="lang">docker</span><pre class="shiki github-dark"><code><span class="line"><span style="color:#FF7B72;">CMD</span><span style="color:#C9D1D9;"> [</span><span style="color:#A5D6FF;">&quot;npm&quot;</span><span style="color:#C9D1D9;">, </span><span style="color:#A5D6FF;">&quot;run&quot;</span><span style="color:#C9D1D9;">, </span><span style="color:#A5D6FF;">&quot;test&quot;</span><span style="color:#C9D1D9;">]</span></span>
<span class="line"></span></code></pre></div>`,9),l=[p];function c(t,r,i,d,y,D){return n(),a("div",null,l)}const C=s(o,[["render",c]]);export{F as __pageData,C as default};
