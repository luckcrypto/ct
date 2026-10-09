/* calculate.to calc3d.js
   A small hand-built WebGL desk calculator for the index hero and the 404 page.
   No library: rounded-box geometry, one lighting shader, and an LCD drawn to a canvas texture.
   Tap its keys and it calculates; type in the hero search and its display mirrors the answer.
   Without WebGL the inline icon shows instead; reduced motion gets a still calculator that still works. */
(function(){
  'use strict';
  var W = window, D = document;
  var RM = !!(W.matchMedia && W.matchMedia('(prefers-reduced-motion: reduce)').matches);

  /* ---------- colour ---------- */
  function hex(h){ var n = parseInt(h.slice(1), 16); return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255]; }
  function lin(h){ return hex(h).map(function(v){ return Math.pow(v, 2.2); }); }

  /* ---------- 4x4 matrices, column-major ---------- */
  var TMP = new Float32Array(16);
  function m4(){ var m = new Float32Array(16); m[0] = m[5] = m[10] = m[15] = 1; return m; }
  function ident(m){ m.fill(0); m[0] = m[5] = m[10] = m[15] = 1; return m; }
  function mul(o, a, b){
    for (var i = 0; i < 4; i++) for (var j = 0; j < 4; j++) {
      TMP[i * 4 + j] = a[j] * b[i * 4] + a[4 + j] * b[i * 4 + 1] + a[8 + j] * b[i * 4 + 2] + a[12 + j] * b[i * 4 + 3];
    }
    o.set(TMP); return o;
  }
  function persp(m, fovy, asp, n, f){ var t = 1 / Math.tan(fovy / 2); m.fill(0); m[0] = t / asp; m[5] = t; m[10] = (f + n) / (n - f); m[11] = -1; m[14] = 2 * f * n / (n - f); return m; }
  function trans(m, x, y, z){ ident(m); m[12] = x; m[13] = y; m[14] = z; return m; }
  function rotX(m, a){ ident(m); var c = Math.cos(a), s = Math.sin(a); m[5] = c; m[6] = s; m[9] = -s; m[10] = c; return m; }
  function rotY(m, a){ ident(m); var c = Math.cos(a), s = Math.sin(a); m[0] = c; m[2] = -s; m[8] = s; m[10] = c; return m; }
  function rotZ(m, a){ ident(m); var c = Math.cos(a), s = Math.sin(a); m[0] = c; m[1] = s; m[4] = -s; m[5] = c; return m; }
  function scl(m, x, y, z){ ident(m); m[0] = x; m[5] = y; m[10] = z; return m; }
  function xf(m, x, y, z){ return [m[0] * x + m[4] * y + m[8] * z + m[12], m[1] * x + m[5] * y + m[9] * z + m[13], m[2] * x + m[6] * y + m[10] * z + m[14]]; }

  /* ---------- geometry: a subdivided cube pushed out into a rounded box ---------- */
  function samples(h, r, n){
    var a = [], k;
    for (k = n; k >= 1; k--) a.push(-(h - r) - r * Math.sin(Math.PI / 2 * k / n));
    a.push(-(h - r), h - r);
    for (k = 1; k <= n; k++) a.push((h - r) + r * Math.sin(Math.PI / 2 * k / n));
    return a;
  }
  function roundedBox(hx, hy, hz, r, n){
    var H = [hx, hy, hz], P = [], N = [], T = [], I = [];
    var faces = [[2, 1, 0, 1], [2, -1, 1, 0], [0, 1, 1, 2], [0, -1, 2, 1], [1, 1, 2, 0], [1, -1, 0, 2]];
    faces.forEach(function(f){
      var ax = f[0], sg = f[1], ua = f[2], va = f[3];
      var su = samples(H[ua], r, n), sv = samples(H[va], r, n), base = P.length / 3;
      for (var i = 0; i < su.length; i++) for (var j = 0; j < sv.length; j++) {
        var c = [0, 0, 0]; c[ax] = sg * H[ax]; c[ua] = su[i]; c[va] = sv[j];
        var inr = [0, 1, 2].map(function(k){ var lim = H[k] - r; return Math.max(-lim, Math.min(lim, c[k])); });
        var o = [c[0] - inr[0], c[1] - inr[1], c[2] - inr[2]], L = Math.hypot(o[0], o[1], o[2]) || 1;
        var nn = [o[0] / L, o[1] / L, o[2] / L];
        var p = [inr[0] + nn[0] * r, inr[1] + nn[1] * r, inr[2] + nn[2] * r];
        P.push(p[0], p[1], p[2]); N.push(nn[0], nn[1], nn[2]); T.push((p[0] + hx) / (2 * hx), (p[1] + hy) / (2 * hy));
      }
      var nv = sv.length;
      for (i = 0; i < su.length - 1; i++) for (j = 0; j < nv - 1; j++) {
        var a = base + i * nv + j, b = base + (i + 1) * nv + j, c2 = base + (i + 1) * nv + j + 1, d = base + i * nv + j + 1;
        I.push(a, b, c2, a, c2, d);
      }
    });
    return { P: P, N: N, T: T, I: I };
  }
  function quad(hx, hy){ return { P: [-hx, -hy, 0, hx, -hy, 0, hx, hy, 0, -hx, hy, 0], N: [0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1], T: [0, 0, 1, 0, 1, 1, 0, 1], I: [0, 1, 2, 0, 2, 3] }; }

  /* ---------- the calculator's own arithmetic (no eval) ---------- */
  var OPS = '+\u2212\u00d7\u00f7';
  function evaluate(s){
    var i = 0;
    function num(){
      var neg = false;
      if (s[i] === '\u2212') { neg = true; i++; }
      var st = i;
      while (i < s.length && /[0-9.]/.test(s[i])) i++;
      if (i === st) return null;
      var v = parseFloat(s.slice(st, i)), pct = false;
      if (s[i] === '%') { v = v / 100; pct = true; i++; }
      return { v: neg ? -v : v, pct: pct };
    }
    function term(){
      var a = num(); if (!a) return null;
      var single = a.pct;
      while (i < s.length && (s[i] === '\u00d7' || s[i] === '\u00f7')) {
        var op = s[i++], b = num(); if (!b) break;
        single = false;
        a = { v: op === '\u00d7' ? a.v * b.v : (b.v === 0 ? NaN : a.v / b.v), pct: false };
      }
      a.pct = single; return a;
    }
    var left = term(); if (!left) return null;
    var v = left.v;
    while (i < s.length && (s[i] === '+' || s[i] === '\u2212')) {
      var op = s[i++], r = term(); if (!r) break;
      var rv = r.pct ? v * r.v : r.v;
      v = op === '+' ? v + rv : v - rv;
    }
    return v;
  }
  function fmt(v){
    if (v === null || v === undefined) return '';
    if (!isFinite(v)) return 'Err';
    var a = Math.abs(v);
    if (a !== 0 && (a >= 1e10 || a < 1e-6)) return v.toPrecision(5).replace('e+', 'e');
    return v.toLocaleString('en-US', { maximumFractionDigits: 6 });
  }

  /* ---------- key layout, in the calculator's own units (face 1.0 x 1.44) ---------- */
  var COLS = [-0.33, -0.11, 0.11, 0.33], ROWS = [0.15, -0.02, -0.19, -0.36, -0.53];
  var KEYS = [
    ['C', 0, 0, 'c'], ['%', 1, 0, 'o'], ['\u00f7', 2, 0, 'o'], ['\u00d7', 3, 0, 'o'],
    ['7', 0, 1, 'n'], ['8', 1, 1, 'n'], ['9', 2, 1, 'n'], ['\u2212', 3, 1, 'o'],
    ['4', 0, 2, 'n'], ['5', 1, 2, 'n'], ['6', 2, 2, 'n'], ['+', 3, 2, 'o'],
    ['1', 0, 3, 'n'], ['2', 1, 3, 'n'], ['3', 2, 3, 'n'], ['=', 3, 3, 'e'],
    ['0', 0, 4, 'n'], ['.', 2, 4, 'n']
  ];
  var KHX = 0.093, KHY = 0.07, KHZ = 0.03, KZ = 0.07 + KHZ - 0.008;
  var MAT = {
    body: { c: lin('#2b2926'), r: 0.55 },
    bezel: { c: lin('#171613'), r: 0.3 },
    n: { c: lin('#f1ede4'), r: 0.42, ink: lin('#1c1b19') },
    o: { c: lin('#d6d0c3'), r: 0.45, ink: lin('#1c1b19') },
    c: { c: lin('#2f4858'), r: 0.4, ink: lin('#f3efe6') },
    e: { c: lin('#c96a1b'), r: 0.34, ink: lin('#fff8ee') },
    mark: { ink: lin('#b9b2a3') }
  };
  function keyShape(k){
    var wide = k[0] === '0', tall = k[0] === '=';
    return {
      x: wide ? (COLS[0] + COLS[1]) / 2 : COLS[k[1]],
      y: tall ? (ROWS[3] + ROWS[4]) / 2 : ROWS[k[2]],
      hx: wide ? KHX + 0.11 : KHX,
      hy: tall ? KHY + 0.085 : KHY,
      g: wide ? 'wide' : (tall ? 'tall' : 'std')
    };
  }
  var MAXX = 0.28, MAXY = 0.36;   /* furthest tilt, radians: about 16 and 21 degrees */
  function clamp(v, a, b){ return v < a ? a : (v > b ? b : v); }
  var CHARMAP = { '*': '\u00d7', 'x': '\u00d7', 'X': '\u00d7', '/': '\u00f7', '-': '\u2212', '\u2013': '\u2212' };

  var VS = 'attribute vec3 aP;attribute vec3 aN;attribute vec2 aT;uniform mat4 uM;uniform mat4 uVP;' +
    'varying vec3 vN;varying vec3 vW;varying vec2 vT;varying float vTop;' +
    'void main(){vec4 w=uM*vec4(aP,1.0);vW=w.xyz;vN=mat3(uM[0].xyz,uM[1].xyz,uM[2].xyz)*aN;vT=aT;vTop=aN.z;gl_Position=uVP*w;}';
  var FS = 'precision mediump float;varying vec3 vN;varying vec3 vW;varying vec2 vT;varying float vTop;' +
    'uniform vec3 uCol;uniform float uRough;uniform int uMode;uniform sampler2D uTex;uniform vec4 uCell;uniform vec3 uInk;uniform vec3 uEye;uniform float uGlow;uniform float uAlpha;' +
    'void main(){' +
    'if(uMode==3){vec2 q=abs(vT*2.0-1.0)-vec2(0.55,0.62);float d=length(max(q,0.0))+min(max(q.x,q.y),0.0);' +
    'float a=(1.0-smoothstep(-0.35,0.36,d))*uAlpha;gl_FragColor=vec4(0.09,0.08,0.06,a);return;}' +
    'vec3 n=normalize(vN);vec3 v=normalize(uEye-vW);' +
    'if(uMode==2){vec3 t=pow(texture2D(uTex,vT).rgb,vec3(2.2));float fr=pow(1.0-max(dot(n,v),0.0),2.0);' +
    'vec3 c=t*uGlow+vec3(0.05,0.048,0.044)*fr+vec3(0.018)*(1.0-vT.y);gl_FragColor=vec4(pow(c,vec3(1.0/2.2)),1.0);return;}' +
    'vec3 base=uCol;if(uMode==1&&vTop>0.9){float a=texture2D(uTex,uCell.xy+vT*uCell.zw).a;base=mix(base,uInk,a);}' +
    'vec3 l1=normalize(vec3(-0.5,0.78,0.62));vec3 l2=normalize(vec3(0.85,0.25,-0.35));' +
    'float d1=max(dot(n,l1),0.0);float d2=max(dot(n,l2),0.0);float hemi=n.y*0.5+0.5;' +
    'vec3 amb=mix(vec3(0.19,0.18,0.165),vec3(0.44,0.43,0.41),hemi);' +
    'float sh=exp2(10.0*(1.0-uRough)+1.0);vec3 h1=normalize(l1+v);float s1=pow(max(dot(n,h1),0.0),sh)*(1.0-uRough)*0.85;' +
    'float fr=pow(1.0-max(dot(n,v),0.0),3.0);' +
    'vec3 c=base*(amb+d1*vec3(1.0,0.97,0.92)*0.92+d2*vec3(0.55,0.62,0.72)*0.32)+s1*vec3(1.0,0.98,0.95)+fr*0.09*vec3(0.95,0.95,1.0);' +
    'gl_FragColor=vec4(pow(c,vec3(1.0/2.2)),1.0);}';

  function Calc3D(host){
    this.host = host;
    this.mode = host.getAttribute('data-mode') || 'hero';
    this.expr = ''; this.ans = null; this.done = false;
    this.top = ''; this.main = '0'; this.mirror = null;
    this.press = {}; this.glow = 1; this.glowT = -1;
    this.touched = false; this.demoOn = this.mode === 'hero' && !RM;
    this.visible = true; this.raf = 0; this.t0 = 0; this.frames = []; this.low = false;
    this.tilt = [0, 0]; this.tiltT = [0, 0]; this.tiltLive = false;
    this.pose = { x: 0, y: 0, z: 0 };   /* front facing; tilt comes from the pointer or the phone */
    if (this.mode === 'error') { this.top = '404'; this.main = 'Err'; }
  }

  function mk(n){ try { if (W.performance && W.performance.mark) W.performance.mark(n); } catch (e) {} }

  Calc3D.prototype.fail = function(){
    this.dead = true;
    if (this.cv && this.cv.parentNode) this.cv.parentNode.removeChild(this.cv);
    this.host.classList.add('no-webgl');
  };

  /* every step runs in its own task, after a frame, so the page keeps painting and answering input */
  Calc3D.prototype.run = function(steps, i){
    var self = this; i = i || 0;
    if (i >= steps.length || this.dead) return;
    W.requestAnimationFrame(function(){ W.setTimeout(function(){
      var r;
      try { r = steps[i].call(self); } catch (e) { if (W.console) console.error('calculate.to calc3d', e); self.fail(); return; }
      if (r === false) self.run(steps, i); else self.run(steps, i + 1);
    }, 0); });
  };

  Calc3D.prototype.init = function(){
    mk('c3:init');
    var cv = D.createElement('canvas');
    cv.className = 'c3-cv'; cv.setAttribute('aria-hidden', 'true');
    var gl = null;
    try { gl = cv.getContext('webgl', { antialias: true, alpha: false, depth: true, powerPreference: 'low-power', premultipliedAlpha: false }); } catch (e) { gl = null; }
    if (!gl) { this.host.classList.add('no-webgl'); return false; }
    this.cv = cv; this.gl = gl; this.ready = false; this.polls = 0;
    mk('c3:context');
    this.run([
      function(){ this.bg = this.findBg(); if (!this.program()) { this.fail(); return true; } mk('c3:compile-started'); },
      function(){ return this.linked(); },
      function(){ this.meshes(); mk('c3:meshes'); },
      function(){ this.textures(); mk('c3:textures'); },
      function(){
        this.host.appendChild(this.cv);
        this.size(); this.events(); this.ready = true;
        this.draw(W.performance ? W.performance.now() : 0);
        mk('c3:first-draw');
        var self = this;
        W.requestAnimationFrame(function(){ self.host.classList.add('is-live'); mk('c3:live'); });
        if (this.demoOn) this.demoTimer = W.setTimeout(function(){ self.demo(); }, 2200);
        this.loop();
      }
    ]);
    return true;
  };

  Calc3D.prototype.findBg = function(){
    var e = this.host;
    while (e && e.nodeType === 1) {
      var c = getComputedStyle(e).backgroundColor, m = c.match(/rgba?\(([^)]+)\)/);
      if (m) { var p = m[1].split(/[ ,\/]+/).filter(Boolean).map(Number); if (p.length < 4 || p[3] >= 1) return [p[0] / 255, p[1] / 255, p[2] / 255]; }
      e = e.parentElement;
    }
    return hex('#f6f4ef');
  };

  Calc3D.prototype.program = function(){
    var gl = this.gl;
    function sh(t, src){ var s = gl.createShader(t); gl.shaderSource(s, src); gl.compileShader(s); return s; }
    this.vs = sh(gl.VERTEX_SHADER, VS); this.fs = sh(gl.FRAGMENT_SHADER, FS);
    var p = gl.createProgram(); gl.attachShader(p, this.vs); gl.attachShader(p, this.fs); gl.linkProgram(p);
    this.p = p; this.ext = gl.getExtension('KHR_parallel_shader_compile');
    return true;
  };

  /* with parallel compile the driver works off the main thread and we only look once it has finished */
  Calc3D.prototype.linked = function(){
    var gl = this.gl, p = this.p, self = this;
    if (this.ext && this.polls++ < 180 && !gl.getProgramParameter(p, this.ext.COMPLETION_STATUS_KHR)) return false;
    if (!gl.getShaderParameter(this.vs, gl.COMPILE_STATUS) || !gl.getShaderParameter(this.fs, gl.COMPILE_STATUS) || !gl.getProgramParameter(p, gl.LINK_STATUS)) { this.fail(); return true; }
    gl.useProgram(p);
    this.a = {}; this.u = {};
    ['aP', 'aN', 'aT'].forEach(function(n){ self.a[n] = gl.getAttribLocation(p, n); });
    ['uM', 'uVP', 'uCol', 'uRough', 'uMode', 'uTex', 'uCell', 'uInk', 'uEye', 'uGlow', 'uAlpha'].forEach(function(n){ self.u[n] = gl.getUniformLocation(p, n); });
    gl.enable(gl.DEPTH_TEST); gl.enable(gl.CULL_FACE);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    mk('c3:linked');
    return true;
  };

  Calc3D.prototype.upload = function(g){
    var gl = this.gl, m = { n: g.I.length };
    function buf(t, data, T){ var b = gl.createBuffer(); gl.bindBuffer(t, b); gl.bufferData(t, new T(data), gl.STATIC_DRAW); return b; }
    m.p = buf(gl.ARRAY_BUFFER, g.P, Float32Array); m.nb = buf(gl.ARRAY_BUFFER, g.N, Float32Array);
    m.t = buf(gl.ARRAY_BUFFER, g.T, Float32Array); m.i = buf(gl.ELEMENT_ARRAY_BUFFER, g.I, Uint16Array);
    return m;
  };

  Calc3D.prototype.meshes = function(){
    this.g = {
      body: this.upload(roundedBox(0.5, 0.72, 0.07, 0.07, 6)),
      bezel: this.upload(roundedBox(0.44, 0.17, 0.012, 0.012, 3)),
      std: this.upload(roundedBox(KHX, KHY, KHZ, 0.03, 4)),
      wide: this.upload(roundedBox(KHX + 0.11, KHY, KHZ, 0.03, 4)),
      tall: this.upload(roundedBox(KHX, KHY + 0.085, KHZ, 0.03, 4)),
      lcd: this.upload(quad(0.405, 0.135)),
      shadow: this.upload(quad(0.62, 0.84)),
      unit: this.upload(quad(1, 1))
    };
    this.keys = KEYS.map(function(k){ var s = keyShape(k); s.label = k[0]; s.kind = k[3]; return s; });
    this.M = { vp: m4(), body: m4(), base: m4(), part: m4(), a: m4(), b: m4(), c: m4() };
  };

  Calc3D.prototype.textures = function(){
    /* legend atlas: each key gets a cell with its own aspect so glyphs never stretch */
    var px = 420, cx = 4, cy = 4, rowH = 0, S = 1024;
    function cell(w, h){
      if (cx + w > S - 4) { cx = 4; cy += rowH + 4; rowH = 0; }
      var c = [cx, cy, w, h]; cx += w + 4; rowH = Math.max(rowH, h); return c;
    }
    this.keys.forEach(function(k){ k.px = cell(Math.round(2 * k.hx * px), Math.round(2 * k.hy * px)); });
    this.bodyPx = cell(300, 432);
    function uv(c){ return [c[0] / S, 1 - (c[1] + c[3]) / S, c[2] / S, c[3] / S]; }
    this.keys.forEach(function(k){ k.cell = uv(k.px); });
    this.bodyCell = uv(this.bodyPx);
    this.atlasSize = S;
    this.paintAtlas();
    var L = D.createElement('canvas'); L.width = 480; L.height = 160;
    this.lcdCv = L; this.lcdCtx = L.getContext('2d');
    this.lcdTex = this.tex(null);
    this.paintLcd();
    var self = this;
    if (D.fonts && D.fonts.ready) D.fonts.ready.then(function(){ self.paintAtlas(); self.paintLcd(); self.kick(); });
  };

  Calc3D.prototype.paintAtlas = function(){
    var S = this.atlasSize, A = D.createElement('canvas'); A.width = S; A.height = S;
    var x = A.getContext('2d'); x.fillStyle = '#fff'; x.textAlign = 'center'; x.textBaseline = 'middle';
    var mono = "600 {s}px 'IBM Plex Mono',ui-monospace,Menlo,monospace";
    this.keys.forEach(function(k){
      var c = k.px, s = Math.round(Math.min(c[3] * 0.52, c[2] * 0.5));
      x.font = mono.replace('{s}', s);
      var dx = k.label === '0' ? -c[2] * 0.25 : 0;
      x.fillText(k.label, c[0] + c[2] / 2 + dx, c[1] + c[3] / 2 + s * 0.04);
    });
    var b = this.bodyPx;
    x.font = "600 " + Math.round(b[2] * 0.058) + "px 'IBM Plex Sans',system-ui,sans-serif";
    x.fillText('=Calculate.to', b[0] + b[2] / 2, b[1] + b[3] * 0.044);
    var old = this.atlas;
    this.atlas = this.tex(A);
    if (old) this.gl.deleteTexture(old);
  };

  Calc3D.prototype.tex = function(src){
    var gl = this.gl, t = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, t);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    if (src) gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, src);
    else gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([22, 21, 18, 255]));
    return t;
  };

  Calc3D.prototype.paintLcd = function(){
    var x = this.lcdCtx, w = 480, h = 160;
    var g = x.createLinearGradient(0, 0, 0, h); g.addColorStop(0, '#1d1b18'); g.addColorStop(1, '#141310');
    x.fillStyle = g; x.fillRect(0, 0, w, h);
    x.textAlign = 'right'; x.textBaseline = 'alphabetic';
    var mono = "{w} {s}px 'IBM Plex Mono',ui-monospace,Menlo,monospace";
    x.font = mono.replace('{w}', '500').replace('{s}', 92); x.fillStyle = '#26231f';
    x.fillText('8888888', w - 22, 136);
    x.font = mono.replace('{w}', '500').replace('{s}', 30); x.fillStyle = '#9a9384';
    var top = this.top.length > 22 ? '\u2026' + this.top.slice(-21) : this.top;
    x.fillText(top, w - 24, 44);
    var s = 92, main = this.main;
    x.font = mono.replace('{w}', '600').replace('{s}', s);
    while (x.measureText(main).width > w - 44 && s > 30) { s -= 4; x.font = mono.replace('{w}', '600').replace('{s}', s); }
    x.fillStyle = '#f39a3e';
    x.fillText(main, w - 22, 136);
    var gl = this.gl; gl.bindTexture(gl.TEXTURE_2D, this.lcdTex);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.lcdCv);
  };

  Calc3D.prototype.size = function(){
    var r = this.host.getBoundingClientRect();
    var dpr = Math.min(W.devicePixelRatio || 1, this.low ? 1 : 2);
    var w = Math.max(1, Math.round(r.width * dpr)), h = Math.max(1, Math.round(r.height * dpr));
    if (this.cv.width !== w || this.cv.height !== h) { this.cv.width = w; this.cv.height = h; }
    this.asp = r.width / Math.max(1, r.height);
    this.fit();
  };

  /* camera distance that fits the whole calculator in the canvas, whatever its shape */
  Calc3D.prototype.fit = function(){
    var fov = 0.5, t = Math.tan(fov / 2), asp = this.asp, M = this.M, self = this;
    var sets = [];
    [[0, 0, 0.96], [MAXX, MAXY, 1.0], [-MAXX, MAXY, 1.0], [MAXX, -MAXY, 1.0], [-MAXX, -MAXY, 1.0]].forEach(function(q){
      self.poseMatrix(M.a, q[0], q[1], 0.05);
      var pts = [];
      [-0.5, 0.5].forEach(function(x){ [-0.72, 0.72].forEach(function(y){ [-0.07, 0.13].forEach(function(z){ pts.push(xf(M.a, x, y, z)); }); }); });
      sets.push([pts, q[2]]);
    });
    this.poseMatrix(M.a, 0, 0, 0);
    var sh = [];
    [-0.52, 0.62].forEach(function(x){ [-0.84, 0.72].forEach(function(y){ sh.push(xf(M.a, x, y, -0.12)); }); });   /* where the shadow is visibly above zero */
    sets.push([sh, 1.0]);
    var lo = 1, hi = 40;
    for (var k = 0; k < 40; k++) {
      var d = (lo + hi) / 2, ok = true;
      for (var s2 = 0; s2 < sets.length && ok; s2++) {
        var pts2 = sets[s2][0], lim = sets[s2][1];
        for (var i = 0; i < pts2.length; i++) {
          var p = pts2[i], z = d - p[2];
          if (Math.abs(p[0] / z / (t * asp)) > lim || Math.abs(p[1] / z / t) > lim) { ok = false; break; }
        }
      }
      if (ok) hi = d; else lo = d;
    }
    this.dist = hi; this.fov = fov;
  };

  Calc3D.prototype.poseMatrix = function(o, ex, ey, lift){
    var M = this.M;
    rotY(o, this.pose.y + ey);
    mul(o, o, rotX(M.b, this.pose.x + ex));
    mul(o, o, rotZ(M.b, this.pose.z));
    mul(o, o, trans(M.b, 0, 0, lift));
    return o;
  };

  Calc3D.prototype.events = function(){
    var self = this, cv = this.cv;
    cv.addEventListener('pointerdown', function(e){
      var k = self.hit(e);
      if (!k) return;
      e.preventDefault();
      self.touched = true; self.stopDemo();
      self.input(k.label, true);
    });
    cv.addEventListener('pointermove', function(e){
      if (e.pointerType === 'touch') return;
      cv.style.cursor = self.hit(e) ? 'pointer' : 'default';
    });
    if (!RM) {
      /* any mouse or pen turns it toward the pointer; touch is left to the phone's own tilt */
      W.addEventListener('pointermove', function(e){
        if (e.pointerType === 'touch' || !self.visible) return;
        var r = self.host.getBoundingClientRect();
        var dx = (e.clientX - (r.left + r.width / 2)) / Math.max(360, r.width * 1.8);
        var dy = (e.clientY - (r.top + r.height / 2)) / Math.max(320, r.height * 1.6);
        self.tiltT[0] = clamp(dy, -1, 1) * MAXX; self.tiltT[1] = clamp(dx, -1, 1) * MAXY;
        self.kick();
      }, { passive: true });
      var home = function(){ self.tiltT[0] = 0; self.tiltT[1] = 0; self.kick(); };
      D.addEventListener('mouseout', function(e){ if (!e.relatedTarget) home(); });
      W.addEventListener('blur', home);
    }
    this.motion();
    if ('ResizeObserver' in W) new ResizeObserver(function(){ self.size(); self.kick(); }).observe(this.host);
    else W.addEventListener('resize', function(){ self.size(); self.kick(); });
    if ('IntersectionObserver' in W) {
      new IntersectionObserver(function(es){ self.visible = es[0].isIntersecting; if (self.visible) self.kick(); }).observe(this.host);
    }
    D.addEventListener('visibilitychange', function(){ if (!D.hidden) self.kick(); });
    var inp = D.getElementById('hsInput');
    if (inp && this.mode === 'hero') {
      var sync = function(){ self.fromSearch(inp.value); };
      inp.addEventListener('input', sync); inp.addEventListener('keyup', sync); inp.addEventListener('blur', function(){ W.setTimeout(sync, 0); });
    }
  };

  Calc3D.prototype.motion = function(){
    var self = this, DOE = W.DeviceOrientationEvent;
    if (RM || !DOE) return;
    if (!(W.matchMedia && W.matchMedia('(hover: none) and (pointer: coarse)').matches)) return;
    var base = null;
    function onTilt(e){
      if (e.beta === null || e.gamma === null || e.beta === undefined) return;
      var ang = (W.screen && W.screen.orientation && W.screen.orientation.angle) || W.orientation || 0;
      var b = e.beta, g = e.gamma, x, y;
      if (ang === 90) { x = -g; y = b; } else if (ang === -90 || ang === 270) { x = g; y = -b; }
      else if (ang === 180) { x = -b; y = -g; } else { x = b; y = g; }
      if (!base) base = [x, y];
      base[0] += (x - base[0]) * 0.004; base[1] += (y - base[1]) * 0.004;   /* re-centres over a few seconds */
      var k = Math.PI / 180 * 0.9;
      self.tiltT[0] = clamp((x - base[0]) * k, -MAXX, MAXX);
      self.tiltT[1] = clamp((y - base[1]) * k, -MAXY, MAXY);
      if (self.visible && !D.hidden) self.kick();
    }
    function go(){ if (self.tiltLive) return; self.tiltLive = true; W.addEventListener('deviceorientation', onTilt); }
    if (typeof DOE.requestPermission === 'function') {
      var ask = function(){
        self.cv.removeEventListener('click', ask);
        DOE.requestPermission().then(function(state){ if (state === 'granted') go(); }).catch(function(){});
      };
      this.cv.addEventListener('click', ask);
    } else go();
  };

  Calc3D.prototype.hit = function(e){
    if (!this.ready) return null;
    var r = this.cv.getBoundingClientRect();
    var nx = ((e.clientX - r.left) / r.width) * 2 - 1, ny = 1 - ((e.clientY - r.top) / r.height) * 2;
    var t = Math.tan(this.fov / 2), dir = [nx * t * this.asp, ny * t, -1], org = [0, 0, this.dist];
    var M = this.M.body;
    var o = [org[0] - M[12], org[1] - M[13], org[2] - M[14]];
    var lo = [M[0] * o[0] + M[1] * o[1] + M[2] * o[2], M[4] * o[0] + M[5] * o[1] + M[6] * o[2], M[8] * o[0] + M[9] * o[1] + M[10] * o[2]];
    var ld = [M[0] * dir[0] + M[1] * dir[1] + M[2] * dir[2], M[4] * dir[0] + M[5] * dir[1] + M[6] * dir[2], M[8] * dir[0] + M[9] * dir[1] + M[10] * dir[2]];
    if (Math.abs(ld[2]) < 1e-6) return null;
    var s = (KZ + KHZ - lo[2]) / ld[2];
    if (s < 0) return null;
    var px = lo[0] + ld[0] * s, py = lo[1] + ld[1] * s;
    for (var i = 0; i < this.keys.length; i++) {
      var k = this.keys[i];
      if (Math.abs(px - k.x) <= k.hx + 0.012 && Math.abs(py - k.y) <= k.hy + 0.012) return k;
    }
    return null;
  };

  /* screen position of a key centre, used by the site's tests */
  Calc3D.prototype.keyAt = function(label){
    if (!this.ready) return null;
    var k = null; this.keys.forEach(function(q){ if (q.label === label) k = q; });
    if (!k) return null;
    var M = this.M.body, p = xf(M, k.x, k.y, KZ + KHZ);
    var t = Math.tan(this.fov / 2), z = this.dist - p[2], r = this.cv.getBoundingClientRect();
    return [r.left + (p[0] / z / (t * this.asp) + 1) / 2 * r.width, r.top + (1 - (p[1] / z / t + 1) / 2) * r.height];
  };

  Calc3D.prototype.input = function(ch, fromKey){
    var e = this.expr, last = e.slice(-1);
    if (this.mode === 'error' || this.mirror !== null) { this.mode = this.mode === 'error' ? 'hero' : this.mode; this.mirror = null; }
    if (fromKey) this.bump(ch);
    if (ch === 'C') { this.expr = ''; this.ans = null; this.done = false; this.show('', '0'); return; }
    if (ch === '=') {
      var v = evaluate(e);
      if (v === null) return;
      this.ans = v; this.done = true;
      this.show(e + ' =', fmt(v)); this.pulse(); return;
    }
    if (/[0-9.]/.test(ch)) {
      if (this.done) { e = ''; this.done = false; }
      var numTail = (e.match(/[0-9.]*$/) || [''])[0];
      if (ch === '.' && numTail.indexOf('.') > -1) return;
      if (last === '%') return;
      if (e.length >= 16) return;
      e += (ch === '.' && numTail === '') ? '0.' : ch;
    } else if (ch === '%') {
      if (!/[0-9]$/.test(e)) return;
      e += '%';
    } else if (OPS.indexOf(ch) > -1) {
      if (this.done && this.ans !== null) { e = fmt(this.ans).replace(/,/g, ''); this.done = false; }
      if (e === '' && ch !== '\u2212') return;
      if (OPS.indexOf(last) > -1) e = e.slice(0, -1);
      if (e.length >= 16) return;
      e += ch;
    }
    this.expr = e;
    var live = evaluate(e);
    this.show(e, live === null ? '0' : fmt(live));
  };

  Calc3D.prototype.fromSearch = function(q){
    q = (q || '').trim();
    if (!q) {
      if (this.mirror !== null) { this.mirror = null; this.show(this.expr, this.expr ? fmt(evaluate(this.expr)) : '0'); }
      return;
    }
    this.touched = true; this.stopDemo();
    var main = '\u2013';
    try {
      var o = W.CALC_OMNI ? W.CALC_OMNI(q) : null;
      if (o && o.v) main = String(o.v);
      else {
        var ql = q.toLowerCase(), T = W.CALC_TOOLS || W.CALC_INDEX || [];
        for (var i = 0; i < T.length; i++) { if ((T[i].n + ' ' + T[i].d + ' ' + T[i].c).toLowerCase().indexOf(ql) > -1) { main = T[i].n; break; } }
      }
    } catch (e) { main = '\u2013'; }
    var changed = this.mirror !== q + '|' + main;
    this.mirror = q + '|' + main;
    var ch = q.slice(-1); ch = CHARMAP[ch] || ch;
    if (changed) { if (/[0-9.%+\u2212\u00d7\u00f7]/.test(ch)) this.bump(ch); this.show(q, main); if (main !== '\u2013') this.pulse(); }
  };

  Calc3D.prototype.show = function(top, main){ this.top = top; this.main = main; this.paintLcd(); this.kick(); };
  Calc3D.prototype.bump = function(ch){ if (!RM) { this.press[ch] = performance.now(); this.kick(); } };
  Calc3D.prototype.pulse = function(){ if (!RM) { this.glowT = performance.now(); this.kick(); } };

  /* idle demo: real sums the site answers every day, typed key by key */
  Calc3D.prototype.demo = function(){
    var self = this, list = ['250\u00d71.2', '60\u00d718%', '72\u00f76', '1200\u00f712'], n = 0;
    function run(){
      if (self.touched || !self.demoOn) return;
      if (!self.visible || D.hidden) { self.demoTimer = W.setTimeout(run, 1200); return; }
      var s = list[n++ % list.length].split(''), i = 0;
      self.input('C', true);
      function step(){
        if (self.touched || !self.demoOn) return;
        if (i < s.length) { self.input(s[i++], true); self.demoTimer = W.setTimeout(step, 230); }
        else { self.input('=', true); self.demoTimer = W.setTimeout(run, 2600); }
      }
      self.demoTimer = W.setTimeout(step, 500);
    }
    run();
  };
  Calc3D.prototype.stopDemo = function(){ this.demoOn = false; if (this.demoTimer) W.clearTimeout(this.demoTimer); };

  Calc3D.prototype.kick = function(){
    if (this.raf || !this.gl || !this.ready || this.dead) return;
    var self = this; this.raf = W.requestAnimationFrame(function(t){ self.raf = 0; self.frame(t); });
  };
  Calc3D.prototype.loop = function(){ this.kick(); };

  Calc3D.prototype.frame = function(now){
    if (!this.t0) this.t0 = now;
    if (this.last && this.frames.length < 45 && !RM) {
      this.frames.push(now - this.last);
      if (this.frames.length === 45) {
        var s = this.frames.slice().sort(function(a, b){ return a - b; });
        if (s[22] > 26) { this.low = true; this.size(); }
      }
    }
    this.last = now;
    this.draw(now);
    var busy = false, k;
    for (k in this.press) { if (now - this.press[k] < 220) busy = true; else delete this.press[k]; }
    if (this.glowT > 0 && now - this.glowT < 320) busy = true;
    if (Math.abs(this.tilt[0] - this.tiltT[0]) > 0.0005 || Math.abs(this.tilt[1] - this.tiltT[1]) > 0.0005) busy = true;
    var ambient = !RM && !this.low;
    var errBlink = this.mode === 'error' && !RM;
    if (this.visible && !D.hidden && (busy || ambient || errBlink)) this.kick();
  };

  Calc3D.prototype.draw = function(now){
    var gl = this.gl, M = this.M, u = this.u, t = (now - (this.t0 || now)) / 1000;
    var amb = !RM && !this.low;
    var dt = this.prevT ? Math.min(0.05, (now - this.prevT) / 1000) : 0.016; this.prevT = now;
    var ease = 1 - Math.exp(-dt / 0.11);
    this.tilt[0] += (this.tiltT[0] - this.tilt[0]) * ease; this.tilt[1] += (this.tiltT[1] - this.tilt[1]) * ease;
    var lift = amb ? 0.035 + 0.018 * Math.sin(t * 1.1) : 0.035;
    var sx = amb ? 0.018 * Math.sin(t * 0.55) : 0, sy = amb ? 0.026 * Math.sin(t * 0.42 + 1.3) : 0;
    gl.viewport(0, 0, this.cv.width, this.cv.height);
    gl.clearColor(this.bg[0], this.bg[1], this.bg[2], 1); gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    persp(M.vp, this.fov, this.asp, 0.1, 60);
    mul(M.vp, M.vp, trans(M.b, 0, 0, -this.dist));
    gl.uniformMatrix4fv(u.uVP, false, M.vp);
    gl.uniform3f(u.uEye, 0, 0, this.dist);
    gl.activeTexture(gl.TEXTURE0); gl.uniform1i(u.uTex, 0);
    /* shadow on the surface below: stays put while the calculator breathes above it */
    this.poseMatrix(M.base, 0, 0, 0);
    mul(M.part, M.base, trans(M.b, 0.05, -0.06, -0.12));
    gl.disable(gl.CULL_FACE); gl.enable(gl.BLEND); gl.depthMask(false);
    gl.uniform1i(u.uMode, 3); gl.uniform1f(u.uAlpha, 0.34 - lift * 2.2);
    this.drawMesh(this.g.shadow, M.part);
    gl.depthMask(true); gl.disable(gl.BLEND); gl.enable(gl.CULL_FACE);
    this.poseMatrix(M.body, this.tilt[0] + sx, this.tilt[1] + sy, lift);
    gl.bindTexture(gl.TEXTURE_2D, this.atlas);
    this.mat(MAT.body, 1, this.bodyCell, MAT.mark.ink);
    this.drawMesh(this.g.body, M.body);
    mul(M.part, M.body, trans(M.b, 0, 0.43, 0.07 + 0.004));
    this.mat(MAT.bezel, 0);
    this.drawMesh(this.g.bezel, M.part);
    /* soft contact shadow under each key, lighter while it is pressed */
    gl.enable(gl.BLEND); gl.depthMask(false); gl.uniform1i(u.uMode, 3);
    for (var j = 0; j < this.keys.length; j++) {
      var q = this.keys[j], qp = 0, qt = this.press[q.label];
      if (qt !== undefined && !RM) { var qd = now - qt; qp = qd < 70 ? qd / 70 : Math.max(0, 1 - (qd - 70) / 150); }
      mul(M.part, M.body, trans(M.b, q.x + 0.012, q.y - 0.018, 0.0712));
      mul(M.part, M.part, scl(M.a, q.hx * 1.5, q.hy * 1.6, 1));
      gl.uniform1f(u.uAlpha, 0.46 * (1 - 0.55 * qp));
      this.drawMesh(this.g.unit, M.part);
    }
    gl.depthMask(true); gl.disable(gl.BLEND);
    for (var i = 0; i < this.keys.length; i++) {
      var k = this.keys[i], p = 0, pt = this.press[k.label];
      if (pt !== undefined && !RM) { var d = now - pt; p = d < 70 ? d / 70 : Math.max(0, 1 - (d - 70) / 150); }
      mul(M.part, M.body, trans(M.b, k.x, k.y, KZ - 0.022 * p));
      this.mat(MAT[k.kind], 1, k.cell, MAT[k.kind].ink);
      this.drawMesh(this.g[k.g], M.part);
    }
    var glow = 1;
    if (this.glowT > 0 && !RM) { var gd = now - this.glowT; if (gd < 320) glow = 1 + 0.35 * (1 - gd / 320); }
    if (this.mode === 'error' && !RM) glow *= 0.78 + 0.22 * (0.5 + 0.5 * Math.cos(t * 3.4));
    gl.bindTexture(gl.TEXTURE_2D, this.lcdTex);
    mul(M.part, M.body, trans(M.b, 0, 0.43, 0.07 + 0.021));
    gl.uniform1i(u.uMode, 2); gl.uniform1f(u.uGlow, glow);
    this.drawMesh(this.g.lcd, M.part);
  };

  Calc3D.prototype.mat = function(m, mode, cell, ink){
    var gl = this.gl, u = this.u;
    gl.uniform3fv(u.uCol, m.c); gl.uniform1f(u.uRough, m.r); gl.uniform1i(u.uMode, mode);
    if (cell) gl.uniform4fv(u.uCell, cell);
    if (ink) gl.uniform3fv(u.uInk, ink);
  };

  Calc3D.prototype.drawMesh = function(m, model){
    var gl = this.gl, a = this.a;
    gl.uniformMatrix4fv(this.u.uM, false, model);
    gl.bindBuffer(gl.ARRAY_BUFFER, m.p); gl.enableVertexAttribArray(a.aP); gl.vertexAttribPointer(a.aP, 3, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, m.nb); gl.enableVertexAttribArray(a.aN); gl.vertexAttribPointer(a.aN, 3, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, m.t); gl.enableVertexAttribArray(a.aT); gl.vertexAttribPointer(a.aT, 2, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, m.i);
    gl.drawElements(gl.TRIANGLES, m.n, gl.UNSIGNED_SHORT, 0);
  };

  function start(){
    [].forEach.call(D.querySelectorAll('.calc3d'), function(host){
      if (host.c3) return;
      var c = new Calc3D(host);
      try { if (c.init()) host.c3 = c; } catch (e) { host.classList.add('no-webgl'); if (W.console) console.error('calculate.to calc3d', e); }
    });
  }
  /* The poster is already on screen. The 3D object starts on the first sign of a visitor (mouse, touch, scroll, key)
     or after a few quiet seconds, and not at all on Save-Data or very low-memory devices, which keep the poster. */
  function later(){
    var nav = W.navigator || {}, con = nav.connection, done = false;
    if ((con && con.saveData) || (nav.deviceMemory && nav.deviceMemory <= 2)) return;
    var evs = ['pointermove', 'pointerdown', 'touchstart', 'keydown', 'scroll', 'wheel'];
    function go(){
      if (done) return; done = true;
      evs.forEach(function(t){ W.removeEventListener(t, go, true); });
      start();
    }
    evs.forEach(function(t){ W.addEventListener(t, go, { capture: true, passive: true }); });
    if (W.requestIdleCallback) W.requestIdleCallback(function(){ W.setTimeout(go, 4000); }, { timeout: 1500 });
    else W.setTimeout(go, 5000);
  }
  if (D.readyState === 'complete') later(); else W.addEventListener('load', later);
})();
