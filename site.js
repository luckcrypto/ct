/* calculate.to site.js
   Shared chrome for every page. One catalog drives the Explore menu, the mobile drawer,
   search and the command palette, so each page ships only its own calculator and explanation.
   Loaded once at the end of each page, exactly where the first shared engine used to run,
   so every engine keeps its original execution order. */
window.CALC_TOOLS=[
{"u":"fed-rate-calculator.html","n":"Fed rate change","d":"Cut or hike, four ripples","c":"Money & the Fed"},
{"u":"m2-money-supply-calculator.html","n":"M2 money supply","d":"Growth, doubling, dilution","c":"Money & the Fed"},
{"u":"gold-vs-usd-calculator.html","n":"Gold vs USD","d":"The dollar since 1971","c":"Money & the Fed"},
{"u":"inflation-calculator.html","n":"Inflation","d":"Dollar value, 1913–2025","c":"Money & the Fed"},
{"u":"gold-m2-ratio-calculator.html","n":"Gold / M2 ratio","d":"Is gold cheap vs money?","c":"Money & the Fed"},
{"u":"dow-to-gold-calculator.html","n":"Dow-to-Gold","d":"Stocks priced in gold","c":"Money & the Fed"},
{"u":"sp500-dca-calculator.html","n":"S&P 500 since inception","d":"Real returns 1928–2025","c":"Investing"},
{"u":"sp1-vs-sp500-calculator.html","n":"S&P 1 vs S&P 500","d":"Throne vs kingdom","c":"Investing"},
{"u":"cagr-calculator.html","n":"CAGR","d":"Compound annual growth","c":"Investing"},
{"u":"drip-calculator.html","n":"Dividend reinvestment","d":"DRIP compounding","c":"Investing"},
{"u":"retirement-calculator.html","n":"Retirement / FIRE","d":"Nest egg & the 4% rule","c":"Investing"},
{"u":"roi-calculator.html","n":"ROI","d":"Return on investment","c":"Investing"},
{"u":"rule-of-72-calculator.html","n":"Rule of 72","d":"Doubling time shortcut","c":"Investing"},
{"u":"mortgage-calculator.html","n":"Mortgage","d":"Full monthly payment","c":"Loans & debt"},
{"u":"loan-calculator.html","n":"Loan payment","d":"Monthly cost & interest","c":"Loans & debt"},
{"u":"car-loan-calculator.html","n":"Car loan","d":"With down & trade-in","c":"Loans & debt"},
{"u":"debt-payoff-calculator.html","n":"Debt payoff","d":"Snowball vs avalanche","c":"Loans & debt"},
{"u":"simple-interest-calculator.html","n":"Simple interest","d":"I = P·r·t","c":"Loans & debt"},
{"u":"apr-apy-calculator.html","n":"APR ↔ APY","d":"Compounding conversions","c":"Loans & debt"},
{"u":"percentage-calculator.html","n":"Percentage","d":"Of, change, add & subtract","c":"Everyday money"},
{"u":"tip-calculator.html","n":"Tip & split","d":"Tip and divide the bill","c":"Everyday money"},
{"u":"vat-calculator.html","n":"VAT / sales tax","d":"Add or remove tax","c":"Everyday money"},
{"u":"discount-calculator.html","n":"Discount","d":"Sale price & savings","c":"Everyday money"},
{"u":"margin-markup-calculator.html","n":"Margin & markup","d":"Price, cost, profit","c":"Everyday money"},
{"u":"salary-to-hourly-calculator.html","n":"Salary ↔ hourly","d":"Pay, converted both ways","c":"Everyday money"},
{"u":"savings-goal-calculator.html","n":"Savings goal","d":"Time or monthly needed","c":"Everyday money"},
{"u":"currency-converter.html","n":"Currency","d":"21 major currencies","c":"Everyday money"},
{"u":"compound-interest-calculator.html","n":"Compound interest","d":"Growth over time","c":"Everyday money"},
{"u":"bmi-calculator.html","n":"BMI","d":"With healthy range","c":"Health & body"},
{"u":"calorie-calculator.html","n":"Calorie needs","d":"Mifflin–St Jeor","c":"Health & body"},
{"u":"tdee-calculator.html","n":"TDEE","d":"Total daily energy","c":"Health & body"},
{"u":"bmr-calculator.html","n":"BMR","d":"Calories at rest","c":"Health & body"},
{"u":"body-fat-calculator.html","n":"Body fat %","d":"US Navy method","c":"Health & body"},
{"u":"ideal-weight-calculator.html","n":"Ideal weight","d":"Four classic formulas","c":"Health & body"},
{"u":"macro-calculator.html","n":"Macros","d":"Protein, carbs, fat split","c":"Health & body"},
{"u":"water-intake-calculator.html","n":"Water intake","d":"Daily hydration","c":"Health & body"},
{"u":"pace-calculator.html","n":"Running pace","d":"Pace, time, distance","c":"Fitness & sleep"},
{"u":"one-rep-max-calculator.html","n":"One-rep max","d":"Epley & Brzycki","c":"Fitness & sleep"},
{"u":"heart-rate-zone-calculator.html","n":"Heart-rate zones","d":"Training zones","c":"Fitness & sleep"},
{"u":"sleep-calculator.html","n":"Sleep cycles","d":"When to sleep or wake","c":"Fitness & sleep"},
{"u":"age-calculator.html","n":"Age","d":"Years, months, days","c":"Dates & time"},
{"u":"date-difference-calculator.html","n":"Date difference","d":"Days & working days","c":"Dates & time"},
{"u":"day-of-week-calculator.html","n":"Day of the week","d":"What day was any date","c":"Dates & time"},
{"u":"days-from-today-calculator.html","n":"Days from today","d":"Add days & business days","c":"Dates & time"},
{"u":"time-calculator.html","n":"Time & hours","d":"Durations & work hours","c":"Dates & time"},
{"u":"time-zone-converter.html","n":"Time zones","d":"Difference between cities","c":"Dates & time"},
{"u":"fraction-calculator.html","n":"Fraction","d":"Four ops, simplified","c":"Math & numbers"},
{"u":"scientific-calculator.html","n":"Scientific","d":"Full keypad","c":"Math & numbers"},
{"u":"average-calculator.html","n":"Average","d":"Mean, median, std dev","c":"Math & numbers"},
{"u":"ratio-calculator.html","n":"Ratio","d":"Solve & simplify a:b","c":"Math & numbers"},
{"u":"gcf-lcm-calculator.html","n":"GCF & LCM","d":"Factors & multiples","c":"Math & numbers"},
{"u":"binary-hex-converter.html","n":"Binary / hex","d":"Dec, bin, hex, octal","c":"Math & numbers"},
{"u":"advanced-calculator.html","n":"Advanced","d":"Variables, solve, plot","c":"Math & numbers"},
{"u":"derivative-calculator.html","n":"Derivative","d":"Slope at a point","c":"Math & numbers"},
{"u":"integral-calculator.html","n":"Integral","d":"Area under a curve","c":"Math & numbers"},
{"u":"ai-compute-calculator.html","n":"AI compute","d":"FLOPs, GPU-hours, cost","c":"Math & numbers"},
{"u":"quantum-calculator.html","n":"Quantum","d":"Qubits & overhead","c":"Math & numbers"},
{"u":"gpa-calculator.html","n":"GPA","d":"Weighted 4.0 scale","c":"School"},
{"u":"final-grade-calculator.html","n":"Final grade","d":"What you need on the final","c":"School"},
{"u":"temperature-converter.html","n":"Temperature","d":"°C, °F and kelvin","c":"Converters"},
{"u":"length-converter.html","n":"Length","d":"mm to miles","c":"Converters"},
{"u":"weight-converter.html","n":"Weight","d":"Grams to tons & stone","c":"Converters"},
{"u":"cups-to-grams-converter.html","n":"Cups to grams","d":"Real ingredient densities","c":"Converters"},
{"u":"recipe-converter.html","n":"Recipe scaler","d":"Resize any recipe","c":"Kitchen"},
{"u":"pan-conversion-calculator.html","n":"Pan conversion","d":"Swap baking pans","c":"Kitchen"},
{"u":"coffee-ratio-calculator.html","n":"Coffee ratio","d":"Water, beans, strength","c":"Kitchen"},
{"u":"square-footage-calculator.html","n":"Square footage","d":"Area & cost per sq ft","c":"Home & garden"},
{"u":"concrete-calculator.html","n":"Concrete","d":"Volume & bags","c":"Home & garden"},
{"u":"paint-calculator.html","n":"Paint","d":"Coverage & cans","c":"Home & garden"},
{"u":"flooring-calculator.html","n":"Flooring","d":"Boxes with waste","c":"Home & garden"},
{"u":"mulch-calculator.html","n":"Mulch","d":"Cubic yards & bags","c":"Home & garden"},
{"u":"fuel-cost-calculator.html","n":"Fuel cost","d":"Trip cost & split","c":"Cars & travel"},
{"u":"mpg-calculator.html","n":"MPG","d":"And L/100km","c":"Cars & travel"},
{"u":"ev-charging-cost-calculator.html","n":"EV charging","d":"Cost per charge & mile","c":"Cars & travel"},
{"u":"due-date-calculator.html","n":"Due date","d":"Naegele's rule","c":"Family"},
{"u":"ovulation-calculator.html","n":"Ovulation","d":"Fertile window","c":"Family"},
{"u":"random-number-generator.html","n":"Random number","d":"True random, any range","c":"Random & fun"},
{"u":"dice-roller.html","n":"Dice roller","d":"d4 to d100, many dice","c":"Random & fun"},
{"u":"coin-flip.html","n":"Coin flip","d":"Heads or tails, fairly","c":"Random & fun"},
{"u":"random-picker.html","n":"Random picker","d":"Pick winners from a list","c":"Random & fun"},
{"u":"password-generator.html","n":"Password","d":"Strong, generated locally","c":"Random & fun"},
{"u":"calories-burned-calculator.html","n":"Calories burned","d":"Any workout, any weight","c":"Fitness & sleep"},
{"u":"standard-deviation-calculator.html","n":"Standard deviation","d":"Spread around the mean","c":"Math & numbers"},
{"u":"quadratic-formula-calculator.html","n":"Quadratic formula","d":"Roots and discriminant","c":"Math & numbers"},
{"u":"roman-numeral-converter.html","n":"Roman numerals","d":"Numbers to Roman, back","c":"Math & numbers"},
{"u":"test-score-calculator.html","n":"Test score","d":"Marks to a grade","c":"School"},
{"u":"weighted-grade-calculator.html","n":"Weighted grade","d":"Weighted course average","c":"School"},
{"u":"speed-converter.html","n":"Speed","d":"mph, km/h, m/s, knots","c":"Converters"},
{"u":"area-converter.html","n":"Area","d":"Sq ft, acres, hectares","c":"Converters"},
{"u":"volume-converter.html","n":"Volume","d":"Liters, gallons, cups","c":"Converters"},
{"u":"business-days-calculator.html","n":"Business days","d":"Weekdays between dates","c":"Dates & time"},
{"u":"unit-price-calculator.html","n":"Unit price","d":"Cost per unit, compared","c":"Everyday money"},
{"u":"gold-silver-ratio-calculator.html","n":"Gold-silver ratio","d":"Gold priced in silver","c":"Money & the Fed"},
{"u":"real-interest-rate-calculator.html","n":"Real interest rate","d":"Rate minus inflation","c":"Money & the Fed"},
{"u":"waist-to-height-ratio-calculator.html","n":"Waist-to-height","d":"Waist over height","c":"Health & body"},
{"u":"tile-calculator.html","n":"Tile","d":"Tiles plus waste","c":"Home & garden"},
{"u":"oven-temperature-calculator.html","n":"Oven temp","d":"C, F, gas mark, fan","c":"Kitchen"},
{"u":"mileage-reimbursement-calculator.html","n":"Mileage","d":"Miles times the rate","c":"Cars & travel"},
{"u":"amortization-calculator.html","n":"Amortization","d":"Payment, interest, balance","c":"Loans & debt"},
{"u":"dollar-cost-averaging-calculator.html","n":"Dollar-cost averaging","d":"Invest monthly, compound","c":"Investing"},
{"u":"pregnancy-week-calculator.html","n":"Pregnancy week","d":"Weeks along, due date","c":"Family"}
];
window.CALC_CATS=[["Health & body","health-body"],["Fitness & sleep","fitness-sleep"],["Dates & time","dates-time"],["Math & numbers","math-numbers"],["Everyday money","everyday-money"],["Loans & debt","loans-debt"],["Investing","investing"],["School","school"],["Converters","converters"],["Kitchen","kitchen"],["Home & garden","home-garden"],["Cars & travel","cars-travel"],["Family","family"],["Random & fun","random-fun"],["Money & the Fed","money-the-fed"]];

/* ---- search accepts British spellings: what is typed is mapped to the catalog's American words ---- */
window.CALC_US=(function(){var M={"maths":"math","amortisation":"amortization","amortises":"amortizes","amortise":"amortize","amortising":"amortizing","annualised":"annualized","annualise":"annualize","memorise":"memorize","memorising":"memorizing","memorised":"memorized","personalised":"personalized","minimises":"minimizes","minimise":"minimize","normalises":"normalizes","normalised":"normalized","normalise":"normalize","factorisations":"factorizations","factorisation":"factorization","optimises":"optimizes","optimise":"optimize","standardise":"standardize","organisation":"organization","utilisation":"utilization","metres":"meters","metre":"meter","millimetres":"millimeters","centimetres":"centimeters","kilometres":"kilometers","kilometre":"kilometer","millimetre":"millimeter","centimetre":"centimeter","litres":"liters","litre":"liter","millilitres":"milliliters","millilitre":"milliliter","centre":"center","centres":"centers","centred":"centered","colour":"color","colours":"colors","favour":"favor","favours":"favors","behaviour":"behavior","programme":"program"};return function(q){return String(q).replace(/[a-z]+/g,function(w){return M.hasOwnProperty(w)?M[w]:w;});};})();

/* ---- menu builder: Explore panel (4 columns, 4/4/4/3) and drawer accordions ---- */
(function(){
  'use strict';
  var T=window.CALC_TOOLS,C=window.CALC_CATS,by={};
  function esc(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');}
  T.forEach(function(t){(by[t.c]=by[t.c]||[]).push(t);});
  var hd=document.getElementById('mn'),cur=hd?(hd.getAttribute('data-current')||''):'';
  var here=cur?cur+'.html':'';
  function mark(u){return u===here?' aria-current="page"':'';}
  var inner=document.querySelector('.mn-panel-inner');
  if(inner&&!inner.querySelector('.mn-link')){
    var out='',cols=[[0,4],[4,8],[8,12],[12,15]];
    cols.forEach(function(r){
      out+='\n     <div>';
      for(var i=r[0];i<r[1]&&i<C.length;i++){
        var c=C[i][0];
        out+='\n      <div class="mn-col-h'+(i===r[0]?'':' mt')+'">'+esc(c)+'</div>';
        (by[c]||[]).forEach(function(t){
          out+='\n      <a class="mn-link" href="'+esc(t.u)+'"'+mark(t.u)+'><span class="lbl">'+esc(t.n)+'</span><span class="arr" aria-hidden="true">&rarr;</span></a>';
        });
      }
      out+='\n     </div>';
    });
    inner.innerHTML=out+'\n    ';
  }
  var ds=document.querySelector('.mn-drawer-scroll');
  if(ds&&!ds.querySelector('.mn-acc')){
    var acc=C.map(function(cc,i){
      var c=cc[0],n=i+1;
      var s='<div class="mn-acc"><button class="mn-acc-top" type="button" id="mh'+n+'" aria-controls="mp'+n+'" aria-expanded="false">'+esc(c)+'<span class="caret"></span></button>\n     <div class="mn-acc-body" id="mp'+n+'" role="region" aria-labelledby="mh'+n+'"><div class="mn-acc-in"><div>';
      (by[c]||[]).forEach(function(t){s+='\n        <a class="mn-mlink" href="'+esc(t.u)+'"'+mark(t.u)+'>'+esc(t.n)+'</a>';});
      return s+'\n     </div></div></div></div>';
    });
    ds.insertAdjacentHTML('afterbegin','\n    '+acc.join('\n    ')+'\n    ');
  }
})();

/* ---- engine: faq accordion ---- */
if(document.body&&document.body.getAttribute('data-kind')==='tool'){
try{
/* FAQ accordion, single-open, keyboard-navigable */
(function(){
  var heads=[].slice.call(document.querySelectorAll('#faq .acc-head'));
  heads.forEach(function(btn){
    btn.addEventListener('click',function(){
      var item=btn.closest('.acc-item'),isOpen=item.classList.contains('open');
      document.querySelectorAll('#faq .acc-item.open').forEach(function(o){o.classList.remove('open');o.querySelector('.acc-head').setAttribute('aria-expanded','false');});
      if(!isOpen){item.classList.add('open');btn.setAttribute('aria-expanded','true');}
    });
    btn.addEventListener('keydown',function(e){
      var i=heads.indexOf(btn),d=e.key==='ArrowDown'?1:e.key==='ArrowUp'?-1:0;if(!d)return;
      e.preventDefault();heads[(i+d+heads.length)%heads.length].focus();
    });
  });
})();
}catch(e){if(window.console)console.error('calculate.to faq accordion',e);}
}

/* ---- engine: omnibox ---- */
try{
/* calculate.to omnibox engine, parses maths, percentages and unit conversions.
   NO eval(): a tokeniser + shunting-yard + RPN evaluator, so a hostile string
   can never become executable code. Returns null when the input isn't maths. */
window.CALC_OMNI = (function () {
  'use strict';

  /* ---- units: name -> [dimension, factor to base] ---- */
  var U = {
    mm:['len',.001], cm:['len',.01], m:['len',1], km:['len',1000],
    in:['len',.0254], inch:['len',.0254], inches:['len',.0254],
    ft:['len',.3048], foot:['len',.3048], feet:['len',.3048],
    yd:['len',.9144], yard:['len',.9144], yards:['len',.9144],
    mi:['len',1609.344], mile:['len',1609.344], miles:['len',1609.344],

    mg:['mass',1e-6], g:['mass',.001], gram:['mass',.001], grams:['mass',.001],
    kg:['mass',1], kilo:['mass',1], kilos:['mass',1], t:['mass',1000], tonne:['mass',1000],
    oz:['mass',.0283495], ounce:['mass',.0283495], ounces:['mass',.0283495],
    lb:['mass',.453592], lbs:['mass',.453592], pound:['mass',.453592], pounds:['mass',.453592],
    st:['mass',6.35029], stone:['mass',6.35029],

    ml:['vol',.001], l:['vol',1], litre:['vol',1], litres:['vol',1], liter:['vol',1], liters:['vol',1],
    tsp:['vol',.00492892], tbsp:['vol',.0147868], cup:['vol',.236588], cups:['vol',.236588],
    pint:['vol',.473176], pints:['vol',.473176], quart:['vol',.946353], gal:['vol',3.78541], gallon:['vol',3.78541],

    ms:['time',.001], s:['time',1], sec:['time',1], secs:['time',1], second:['time',1], seconds:['time',1],
    min:['time',60], mins:['time',60], minute:['time',60], minutes:['time',60],
    h:['time',3600], hr:['time',3600], hrs:['time',3600], hour:['time',3600], hours:['time',3600],
    day:['time',86400], days:['time',86400], week:['time',604800], weeks:['time',604800],
    month:['time',2629800], year:['time',31557600], years:['time',31557600],

    kb:['data',1e3], mb:['data',1e6], gb:['data',1e9], tb:['data',1e12],
    kib:['data',1024], mib:['data',1048576], gib:['data',1073741824],

    kmh:['speed',1], kph:['speed',1], mph:['speed',1.609344],

    sqm:['area',1], sqft:['area',.092903], acre:['area',4046.86], hectare:['area',10000]
  };
  var TEMP = { c:1, celsius:1, f:1, fahrenheit:1, k:1, kelvin:1 };

  /* which tool to offer alongside the answer */
  var TOOL = {
    len:['length-converter.html','Length converter'],
    mass:['weight-converter.html','Weight converter'],
    vol:['cups-to-grams-converter.html','Volume & weight'],
    time:['time-calculator.html','Time calculator'],
    data:['binary-hex-converter.html','Number bases'],
    speed:['mpg-calculator.html','Fuel & speed'],
    area:['square-footage-calculator.html','Square footage'],
    temp:['temperature-converter.html','Temperature converter'],
    pct:['percentage-calculator.html','Percentage calculator'],
    math:['scientific-calculator.html','Scientific calculator']
  };

  var FN = {
    sqrt: Math.sqrt, abs: Math.abs, round: Math.round, floor: Math.floor, ceil: Math.ceil,
    sin: Math.sin, cos: Math.cos, tan: Math.tan, log: function (x) { return Math.log(x) / Math.LN10; },
    ln: Math.log, exp: Math.exp
  };
  var PREC = { '+':1, '-':1, '*':2, '/':2, '%':2, '^':3 };

  function tokenize(s) {
    var t = [], i = 0;
    s = s.replace(/,(?=\d{3}\b)/g, '').replace(/[×✕]/g, '*').replace(/[÷]/g, '/').replace(/−/g, '-');
    while (i < s.length) {
      var c = s[i];
      if (c === ' ') { i++; continue; }
      if (/[0-9.]/.test(c)) {
        var n = '';
        while (i < s.length && /[0-9.]/.test(s[i])) n += s[i++];
        if (!/^\d*\.?\d+$/.test(n)) return null;
        t.push({ t: 'n', v: parseFloat(n) });
        continue;
      }
      if (/[a-zA-Z]/.test(c)) {
        var w = '';
        while (i < s.length && /[a-zA-Z]/.test(s[i])) w += s[i++];
        w = w.toLowerCase();
        if (w === 'pi') { t.push({ t: 'n', v: Math.PI }); continue; }
        if (w === 'e') { t.push({ t: 'n', v: Math.E }); continue; }
        if (FN[w]) { t.push({ t: 'f', v: w }); continue; }
        return null;                       // unknown word -> not maths
      }
      if ('+-*/^%'.indexOf(c) > -1) { t.push({ t: 'o', v: c }); i++; continue; }
      if (c === '(' || c === ')') { t.push({ t: c }); i++; continue; }
      return null;
    }
    return t.length ? t : null;
  }

  function toRPN(tok) {
    var out = [], ops = [];
    for (var i = 0; i < tok.length; i++) {
      var k = tok[i];
      if (k.t === 'n') out.push(k);
      else if (k.t === 'f') ops.push(k);
      else if (k.t === 'o') {
        // unary minus
        if (k.v === '-' && (i === 0 || tok[i - 1].t === 'o' || tok[i - 1].t === '(')) {
          out.push({ t: 'n', v: 0 });
        }
        while (ops.length) {
          var top = ops[ops.length - 1];
          if (top.t === 'f' || (top.t === 'o' && (PREC[top.v] > PREC[k.v] ||
              (PREC[top.v] === PREC[k.v] && k.v !== '^')))) out.push(ops.pop());
          else break;
        }
        ops.push(k);
      } else if (k.t === '(') ops.push(k);
      else if (k.t === ')') {
        while (ops.length && ops[ops.length - 1].t !== '(') out.push(ops.pop());
        if (!ops.length) return null;
        ops.pop();
        if (ops.length && ops[ops.length - 1].t === 'f') out.push(ops.pop());
      }
    }
    while (ops.length) { var o = ops.pop(); if (o.t === '(') return null; out.push(o); }
    return out;
  }

  function evalRPN(rpn) {
    var st = [];
    for (var i = 0; i < rpn.length; i++) {
      var k = rpn[i];
      if (k.t === 'n') st.push(k.v);
      else if (k.t === 'f') { if (!st.length) return null; st.push(FN[k.v](st.pop())); }
      else {
        if (st.length < 2) return null;
        var b = st.pop(), a = st.pop();
        st.push(k.v === '+' ? a + b : k.v === '-' ? a - b : k.v === '*' ? a * b :
                k.v === '/' ? a / b : k.v === '%' ? a % b : Math.pow(a, b));
      }
    }
    return st.length === 1 && isFinite(st[0]) ? st[0] : null;
  }

  function arith(s) { var t = tokenize(s); if (!t) return null; var r = toRPN(t); return r ? evalRPN(r) : null; }

  function fmt(n) {
    if (!isFinite(n)) return null;
    var a = Math.abs(n);
    if (a !== 0 && (a < 1e-4 || a >= 1e12)) return n.toExponential(6).replace(/e([+-])/, 'e$1');
    var d = a >= 100 ? 2 : a >= 1 ? 4 : 6;
    var v = parseFloat(n.toFixed(d));
    return v.toLocaleString('en-US', { maximumFractionDigits: d });
  }

  function toC(v, u) { return u[0] === 'f' ? (v - 32) * 5 / 9 : u[0] === 'k' ? v - 273.15 : v; }
  function fromC(v, u) { return u[0] === 'f' ? v * 9 / 5 + 32 : u[0] === 'k' ? v + 273.15 : v; }

  return function omni(q) {
    if (!q) return null;
    var s = String(q).trim().toLowerCase().replace(/\s+/g, ' ');
    if (!s || s.length > 120) return null;
    if (!/[0-9]/.test(s)) return null;                       // needs at least one number
    var m;

    /* percentages */
    if ((m = s.match(/^([\d.,]+)\s*% of ([\d.,+\-*/^() ]+)$/))) {
      var p = arith(m[1]), b = arith(m[2]);
      if (p === null || b === null) return null;
      return { v: fmt(p / 100 * b), label: m[1] + '% of ' + m[2], tool: TOOL.pct };
    }
    if ((m = s.match(/^([\d.,]+)\s*% off ([\d.,+\-*/^() ]+)$/))) {
      var p2 = arith(m[1]), b2 = arith(m[2]);
      if (p2 === null || b2 === null) return null;
      return { v: fmt(b2 * (1 - p2 / 100)), label: m[1] + '% off ' + m[2], sub: 'you save ' + fmt(b2 * p2 / 100),
               tool: ['discount-calculator.html', 'Discount calculator'] };
    }
    if ((m = s.match(/^([\d.,]+)\s*% (?:on|added to|plus) ([\d.,+\-*/^() ]+)$/))) {
      var p3 = arith(m[1]), b3 = arith(m[2]);
      if (p3 === null || b3 === null) return null;
      return { v: fmt(b3 * (1 + p3 / 100)), label: m[1] + '% added to ' + m[2], tool: TOOL.pct };
    }
    if ((m = s.match(/^what (?:is |percent )?([\d.,]+) (?:is )?(?:of|out of) ([\d.,]+)$/)) ||
        (m = s.match(/^([\d.,]+) (?:of|out of) ([\d.,]+) as (?:a )?%$/))) {
      var a4 = arith(m[1]), b4 = arith(m[2]);
      if (a4 === null || b4 === null || !b4) return null;
      return { v: fmt(a4 / b4 * 100) + '%', label: m[1] + ' out of ' + m[2], tool: TOOL.pct };
    }

    /* unit conversion:  <number> <unit> in|to <unit> */
    if ((m = s.match(/^([\d.,+\-*/^() ]+?)\s*([a-z]+)\s*(?:in|to|into|as)\s*([a-z]+)$/))) {
      var val = arith(m[1]), from = m[2], to = m[3];
      if (val === null) return null;
      if (TEMP[from] && TEMP[to]) {
        var out = fromC(toC(val, from), to);
        return { v: fmt(out) + '\u00b0' + to[0].toUpperCase(), label: m[1] + '\u00b0' + from[0].toUpperCase() + ' in ' + to,
                 tool: TOOL.temp };
      }
      if (U[from] && U[to] && U[from][0] === U[to][0]) {
        var res = val * U[from][1] / U[to][1];
        return { v: fmt(res) + ' ' + to, label: m[1] + ' ' + from + ' in ' + to, tool: TOOL[U[from][0]] };
      }
      return null;
    }

    /* plain arithmetic, only if it actually looks like an expression */
    if (/^[\d.,\s+\-*/^()%a-z]+$/.test(s) && /[+\-*/^%]|sqrt|sin|cos|tan|log|ln|abs|round|floor|ceil/.test(s)) {
      var r = arith(s);
      if (r === null) return null;
      return { v: fmt(r), label: q.trim(), tool: TOOL.math };
    }
    return null;
  };
})();
}catch(e){if(window.console)console.error('calculate.to omnibox',e);}

/* ---- engine: mega nav ---- */
try{
/* ===== mega nav: hover+click panel, burger drawer, accordions, search ===== */
(function(){'use strict';
 var mn=document.getElementById('mn'); if(!mn) return;
 var groups=[].slice.call(mn.querySelectorAll('.mn-group'));
 var desktop=window.matchMedia('(min-width:961px)'),hoverTimer=null;
 function sync(){var o=desktop.matches&&groups.some(function(g){return g.classList.contains('is-open');});
   document.documentElement.classList.toggle('mn-blur',o);}
 function open(g){groups.forEach(function(o){if(o!==g)shut(o);});g.classList.add('is-open');
   var t=g.querySelector('.mn-top');if(t)t.setAttribute('aria-expanded','true');sync();}
 function shut(g){g._hov=false;g.classList.remove('is-open');
   var t=g.querySelector('.mn-top');if(t)t.setAttribute('aria-expanded','false');sync();}
 function closeAll(){groups.forEach(shut);}
 groups.forEach(function(g){
  var top=g.querySelector('.mn-top'); if(!top)return;
  top.addEventListener('click',function(e){e.stopPropagation();if(g.classList.contains('is-open')&&g._hov){g._hov=false;return;}g.classList.contains('is-open')?shut(g):open(g);});
  g.addEventListener('mouseenter',function(){if(!desktop.matches)return;clearTimeout(hoverTimer);if(!g.classList.contains('is-open'))g._hov=true;open(g);});
  g.addEventListener('mouseleave',function(){if(!desktop.matches)return;hoverTimer=setTimeout(function(){shut(g);},150);});
 });
 var scrim=mn.querySelector('.mn-scrim'); if(scrim)scrim.addEventListener('click',closeAll);
 document.addEventListener('click',function(e){if(!mn.contains(e.target))closeAll();});
 window.addEventListener('scroll',function(){mn.classList.toggle('is-scrolled',(window.scrollY||0)>12);},{passive:true});


 var burger=document.getElementById('mnBurger');
 function openDrawer(){mn.classList.add('is-drawer');if(burger)burger.setAttribute('aria-expanded','true');document.body.style.overflow='hidden';}
 function closeDrawer(){mn.classList.remove('is-drawer');if(burger)burger.setAttribute('aria-expanded','false');document.body.style.overflow='';}
 if(burger)burger.addEventListener('click',function(){mn.classList.contains('is-drawer')?closeDrawer():openDrawer();});
 if(desktop.addEventListener)desktop.addEventListener('change',function(e){e.matches?closeDrawer():closeAll();});
 mn.querySelectorAll('.mn-mlink,.mn-acc-direct').forEach(function(a){a.addEventListener('click',closeDrawer);});


 var accs=[].slice.call(mn.querySelectorAll('.mn-acc'));
 accs.forEach(function(a){var t=a.querySelector('.mn-acc-top'); if(!t)return;
  t.addEventListener('click',function(){var was=a.classList.contains('is-open');
   accs.forEach(function(o){o.classList.remove('is-open');var x=o.querySelector('.mn-acc-top');if(x)x.setAttribute('aria-expanded','false');});
   if(!was){a.classList.add('is-open');t.setAttribute('aria-expanded','true');}});});


 function esc(s){return String(s).replace(/[&<>"']/g,function(c){
   return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});}
 var IDX=window.CALC_TOOLS;
 window.CALC_INDEX=IDX;
 var wrap=document.getElementById('mns'),input=document.getElementById('mnsInput'),
     res=document.getElementById('mnsRes'),btn=document.getElementById('mnSearchBtn'),sel=0,shown=[];
 function draw(q){
  q=CALC_US((q||'').trim().toLowerCase());
  shown = !q ? IDX.slice(0,8) : IDX.filter(function(t){
    return (t.n+' '+t.d+' '+t.c).toLowerCase().indexOf(q)>-1;
  }).slice(0,40);
  sel=0;
  var head='';
  if(window.CALC_OMNI){
    var o=null; try{o=window.CALC_OMNI(q);}catch(e){o=null;}
    if(o){head='<div class="mns-omni"><div class="mns-oq">'+esc(o.label)+'</div>'+
      '<div class="mns-ov">'+esc(o.v)+'</div>'+
      (o.sub?'<div class="mns-osub">'+esc(o.sub)+'</div>':'')+
      (o.tool?'<a class="mns-ot" href="'+o.tool[0]+'">'+esc(o.tool[1])+' →</a>':'')+'</div>';}
  }
  if(!shown.length){res.innerHTML=head+(head?'':'<div class="mns-none">No calculator matches that.</div>');return;}
  res.innerHTML=head+shown.map(function(t,i){
    return '<a class="mns-r'+(i===0?' on':'')+'" href="'+t.u+'"><span class="mns-rn">'+t.n+'</span><span class="mns-rc">'+t.c+'</span></a>';
  }).join('');
 }
 function mark(){var rows=res.querySelectorAll('.mns-r');
  for(var i=0;i<rows.length;i++)rows[i].classList.toggle('on',i===sel);
  if(rows[sel])rows[sel].scrollIntoView({block:'nearest'});}
 function openS(){document.documentElement.classList.add('mns-open');document.body.style.overflow='hidden';
  input.value='';draw('');try{input.focus({preventScroll:true});}catch(_e){input.focus();}setTimeout(function(){if(document.activeElement!==input)input.focus();},40);closeAll();closeDrawer();}
 function closeS(){document.documentElement.classList.remove('mns-open');document.body.style.overflow='';}
 if(btn)btn.addEventListener('click',openS);
 if(wrap)wrap.addEventListener('click',function(e){if(e.target===wrap)closeS();});
 if(input){
  input.addEventListener('input',function(){draw(input.value);});
  input.addEventListener('keydown',function(e){
   var rows=res.querySelectorAll('.mns-r');
   if(e.key==='ArrowDown'){e.preventDefault();sel=Math.min(sel+1,rows.length-1);mark();}
   else if(e.key==='ArrowUp'){e.preventDefault();sel=Math.max(sel-1,0);mark();}
   else if(e.key==='Enter'&&rows[sel]){e.preventDefault();window.location.href=rows[sel].getAttribute('href');}
  });
 }
 /* typing animation in the search field: inspires, never blocks.
    stops on any interaction, disabled under prefers-reduced-motion. */
 (function(){
  var sq=document.getElementById('mnSq'); if(!sq)return;
  var reduce=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var PICKS=['mortgage payment','tip and split','compound interest','BMI','percentage off',
             'days between dates','fuel cost','macros','one-rep max','VAT','sleep cycles','training FLOPs','qubits to simulate','gold vs USD'];
  var IDLE='Search 100+ calculators…';
  if(reduce){sq.textContent=IDLE;return;}
  var i=Math.floor(Math.random()*PICKS.length),j=0,del=false,stopped=false,timer=null;
  function paint(t){sq.innerHTML='Search <b>'+t+'</b><span class="mn-car"></span>';}
  function tick(){
    if(stopped)return;
    var w=PICKS[i%PICKS.length];
    j=del?j-1:j+1;
    paint(w.slice(0,j));
    var wait=del?38:78;
    if(!del&&j===w.length){del=true;wait=1500;}
    else if(del&&j===0){del=false;i++;wait=380;}
    timer=setTimeout(tick,wait);
  }
  function stop(){stopped=true;if(timer)clearTimeout(timer);sq.textContent=IDLE;}
  if(btn){btn.addEventListener('mouseenter',stop,{once:true});btn.addEventListener('click',stop,{once:true});}
  document.addEventListener('keydown',function(e){if(e.key==='/')stop();});
  document.addEventListener('visibilitychange',function(){
    if(document.hidden){if(timer)clearTimeout(timer);}
    else if(!stopped){timer=setTimeout(tick,400);}
  });
  timer=setTimeout(tick,900);
 })();

 document.addEventListener('keydown',function(e){
  if(e.key==='Escape'){closeAll();closeDrawer();closeS();}
  if(e.key==='/'&&!/^(INPUT|TEXTAREA|SELECT)$/.test((e.target.tagName||''))&&!e.target.isContentEditable){
    e.preventDefault();openS();}
 });
})();
}catch(e){if(window.console)console.error('calculate.to mega nav',e);}

/* ---- engine: share ---- */
if(document.body&&document.body.getAttribute('data-kind')==='tool'){
try{
/* calculate.to shareable state, every calculation gets a URL.
   Serialises the tool's inputs into query params via replaceState (no history
   spam), restores them on load, and adds a "Copy link" control under the
   result. Values only ever touch element .value, never innerHTML, so a
   crafted link cannot inject markup. Tool pages only; the index featured
   card is random per load, so restoring state there would lie.
   RESERVED params (embed) pass through untouched so embed mode survives
   typing; the copy-link always yields the full-page URL without them. */
window.CALC_LINK = (function () {
  'use strict';

  var RESERVED = { embed: 1 };

  function serialise(map) {
    var parts = [], k;
    for (k in map) if (Object.prototype.hasOwnProperty.call(map, k)) {
      parts.push(encodeURIComponent(k) + '=' + encodeURIComponent(map[k]));
    }
    return parts.join('&');
  }

  function parse(qs) {
    var map = {}, i, j, p;
    if (!qs) return map;
    qs = String(qs).replace(/^\?/, '');
    var parts = qs.split('&');
    for (i = 0; i < parts.length; i++) {
      p = parts[i];
      if (!p) continue;
      j = p.indexOf('=');
      if (j < 1) continue;
      try {
        var key = decodeURIComponent(p.slice(0, j));
        var val = decodeURIComponent(p.slice(j + 1));
        if (key.length <= 40 && val.length <= 600) map[key] = val;
      } catch (e) { /* malformed pair, skip */ }
    }
    return map;
  }

  function boot() {
    if (!document.querySelector('.tool-hero')) return;   // tool pages only
    var root = document.querySelector('main') || document.body;

    function fields() {
      return root.querySelectorAll('input[id],select[id],textarea[id]');
    }

    function collect() {
      var out = {}, els = fields(), i, e, n = 0;
      for (i = 0; i < els.length; i++) {
        e = els[i];
        if (e.type === 'checkbox' || e.type === 'radio') {
          if (e.checked) { out[e.id] = '1'; n++; }
          continue;
        }
        var v = e.value;
        if (v === '' || v == null) continue;
        if (e.tagName === 'TEXTAREA' && v.length > 500) continue;
        if (String(v).length > 600) continue;
        out[e.id] = String(v); n++;
        if (n >= 24) break;
      }
      return out;
    }

    function reserved() {
      var m = parse(location.search), o = {}, k;
      for (k in m) if (RESERVED[k]) o[k] = m[k];
      return o;
    }

    function apply(map) {
      var k, e;
      for (k in map) if (Object.prototype.hasOwnProperty.call(map, k)) {
        if (RESERVED[k]) continue;
        e = document.getElementById(k);
        if (!e || !root.contains(e)) continue;
        var tag = e.tagName;
        if (tag !== 'INPUT' && tag !== 'SELECT' && tag !== 'TEXTAREA') continue;
        if (e.type === 'checkbox' || e.type === 'radio') { e.checked = map[k] === '1'; }
        else { e.value = map[k]; }                        // .value only, inert
        try {
          e.dispatchEvent(new Event('input', { bubbles: true }));
          e.dispatchEvent(new Event('change', { bubbles: true }));
        } catch (err) { }
      }
    }

    var timer = null;
    function write() {
      var st = collect(), r = reserved(), k;
      for (k in r) st[k] = r[k];
      var qs = serialise(st);
      try { history.replaceState(null, '', location.pathname + (qs ? '?' + qs : '')); } catch (e) { }
    }
    function queueWrite() {
      if (timer) clearTimeout(timer);
      timer = setTimeout(write, 400);
    }

    if (location.search.length > 1) apply(parse(location.search));
    root.addEventListener('input', queueWrite, true);
    root.addEventListener('change', queueWrite, true);

    var host = document.querySelector('.readout') || document.querySelector('.adv-res');
    if (host && !document.getElementById('calcShare')) {
      var row = document.createElement('div');
      row.className = 'share-row';
      var btn = document.createElement('button');
      btn.type = 'button'; btn.id = 'calcShare'; btn.className = 'share-link';
      btn.textContent = 'Copy link to this calculation';
      var ok = document.createElement('span');
      ok.className = 'share-ok'; ok.id = 'calcShareOk'; ok.textContent = 'Link copied';
      row.appendChild(btn); row.appendChild(ok);
      host.parentNode.insertBefore(row, host.nextSibling);

      btn.addEventListener('click', function () {
        write();
        var qs = serialise(collect());                    // full page, no reserved
        var url = location.origin + location.pathname + (qs ? '?' + qs : '');
        function done() {
          ok.classList.add('on');
          setTimeout(function () { ok.classList.remove('on'); }, 1600);
        }
        function fallback() {
          var t = document.createElement('textarea');
          t.value = url; t.setAttribute('readonly', '');
          t.style.position = 'absolute'; t.style.left = '-9999px';
          document.body.appendChild(t); t.select();
          try { document.execCommand('copy'); done(); } catch (e) { }
          document.body.removeChild(t);
        }
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(url).then(done, function () { fallback(); });
        } else fallback();
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else boot();

  return { serialise: serialise, parse: parse };
})();
}catch(e){if(window.console)console.error('calculate.to share',e);}
}

/* ---- engine: embed ---- */
if(document.body&&document.body.getAttribute('data-kind')==='tool'){
try{
/* calculate.to embed mode, chrome-less rendering for iframes.
   Activates only on ?embed=1: tags the calculator's section, hides all other
   chrome via CSS, and appends a live "Powered by calculate.to" attribution
   link that carries the current calculation state back to the full page. */
(function () {
  'use strict';
  var L = window.CALC_LINK;
  if (!L) return;
  if (L.parse(location.search).embed !== '1') return;
  var calc = document.getElementById('calc');
  if (!calc) return;
  var sec = calc.closest ? calc.closest('section') : null;
  if (sec) sec.className += ' emb-keep';
  document.documentElement.className += ' embed';

  var bar = document.createElement('div'); bar.className = 'emb-bar';
  var t = document.createElement('span'); t.className = 'emb-t';
  t.textContent = (document.title.split(': ')[0] || 'Calculator');
  var a = document.createElement('a'); a.className = 'emb-link';
  a.target = '_blank'; a.rel = 'noopener';
  a.textContent = 'Powered by calculate.to';
  function upd() {
    var m = L.parse(location.search); delete m.embed;
    var qs = L.serialise(m);
    a.href = location.origin + location.pathname + (qs ? '?' + qs : '');
  }
  upd();
  document.addEventListener('input', function () { setTimeout(upd, 450); }, true);
  bar.appendChild(t); bar.appendChild(a);
  calc.appendChild(bar);
})();
}catch(e){if(window.console)console.error('calculate.to embed',e);}
}

/* ---- engine: palette ---- */
try{
/* calculate.to command palette, press Cmd+K or Ctrl+K anywhere.
   One field that does both jobs: type maths ("15% of 80", "3 miles in km")
   and the omnibox answers inline; type a tool name and the index filters.
   Built lazily on first open, keyboard-first, zero dependencies. */
(function () {
  'use strict';
  var built = false, back, box, input, ansEl, listEl, hits = [], sel = -1;

  function tools() {
    if (window.CALC_INDEX && window.CALC_INDEX.length) return window.CALC_INDEX;
    var out = [], ls = document.querySelectorAll('a.mn-link'), i;
    for (i = 0; i < ls.length; i++) {
      var lb = ls[i].querySelector('.lbl');
      out.push({ u: ls[i].getAttribute('href'), n: lb ? lb.textContent : ls[i].textContent, d: '', c: '' });
    }
    return out;
  }

  function score(q, t) {
    var n = t.n.toLowerCase(), s = 0;
    if (n === q) return 100;
    if (n.indexOf(q) === 0) s = 60;
    else if (n.indexOf(' ' + q) > -1) s = 40;
    else if (n.indexOf(q) > -1) s = 24;
    if ((t.d || '').toLowerCase().indexOf(q) > -1) s += 10;
    if ((t.c || '').toLowerCase().indexOf(q) > -1) s += 4;
    if ((t.u || '').indexOf(q.replace(/\s+/g, '-')) > -1) s += 8;
    return s;
  }

  function esc(s) { return String(s); } /* rendered via textContent only */

  function render() {
    var q = CALC_US(input.value.trim().toLowerCase());

    var ans = null;
    if (q && window.CALC_OMNI) { try { ans = CALC_OMNI(input.value.trim()); } catch (e) { ans = null; } }
    ansEl.innerHTML = '';
    if (ans && ans.v != null) {
      var k = document.createElement('div'); k.className = 'k'; k.textContent = ans.label || 'answer';
      var v = document.createElement('div'); v.className = 'v'; v.textContent = ans.v;
      ansEl.appendChild(k); ansEl.appendChild(v);
      ansEl.style.display = 'block';
    } else ansEl.style.display = 'none';

    var all = tools(), scored = [], i;
    if (!q) {
      hits = all.slice(0, 8);
    } else {
      for (i = 0; i < all.length; i++) {
        var s = score(q, all[i]);
        if (s > 0) scored.push([s, all[i]]);
      }
      scored.sort(function (a, b) { return b[0] - a[0]; });
      hits = scored.slice(0, 8).map(function (x) { return x[1]; });
    }
    sel = hits.length ? 0 : -1;
    listEl.innerHTML = '';
    for (i = 0; i < hits.length; i++) {
      var it = document.createElement('div');
      it.className = 'pal-it' + (i === sel ? ' on' : '');
      it.setAttribute('data-i', i);
      var ic = document.createElement('span'); ic.className = 'pal-ic'; ic.textContent = '\u2192';
      var n = document.createElement('span'); n.className = 'pal-n'; n.textContent = esc(hits[i].n);
      var d = document.createElement('span'); d.className = 'pal-d'; d.textContent = esc(hits[i].d || '');
      it.appendChild(ic); it.appendChild(n); it.appendChild(d);
      it.addEventListener('mouseenter', hover); it.addEventListener('click', go);
      listEl.appendChild(it);
    }
  }

  function hover(e) { mark(parseInt(e.currentTarget.getAttribute('data-i'), 10)); }
  function mark(i) {
    sel = i;
    var kids = listEl.children, j;
    for (j = 0; j < kids.length; j++) kids[j].className = 'pal-it' + (j === sel ? ' on' : '');
    if (kids[sel]) kids[sel].scrollIntoView({ block: 'nearest' });
  }
  function go() { if (sel > -1 && hits[sel]) location.href = hits[sel].u; }

  function build() {
    built = true;
    back = document.createElement('div'); back.className = 'pal-back';
    box = document.createElement('div'); box.className = 'pal';
    box.setAttribute('role', 'dialog'); box.setAttribute('aria-modal', 'true');
    box.setAttribute('aria-label', 'Command palette');
    input = document.createElement('input');
    input.className = 'pal-in'; input.type = 'text';
    input.setAttribute('placeholder', 'Search 100+ tools, or just type maths\u2026');
    input.setAttribute('autocomplete', 'off'); input.setAttribute('aria-label', 'Search tools or type a calculation'); input.setAttribute('spellcheck', 'false');
    ansEl = document.createElement('div'); ansEl.className = 'pal-ans';
    listEl = document.createElement('div'); listEl.className = 'pal-list';
    var hint = document.createElement('div'); hint.className = 'pal-hint';
    hint.textContent = '\u2191\u2193 to choose \u00b7 Enter to open \u00b7 Esc to close \u00b7 try "20% off 65" or "quantum"';
    box.appendChild(input); box.appendChild(ansEl); box.appendChild(listEl); box.appendChild(hint);
    back.appendChild(box);
    document.body.appendChild(back);
    back.addEventListener('mousedown', function (e) { if (e.target === back) close(); });
    input.addEventListener('input', render);
    input.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowDown') { e.preventDefault(); if (hits.length) mark((sel + 1) % hits.length); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); if (hits.length) mark((sel - 1 + hits.length) % hits.length); }
      else if (e.key === 'Enter') { e.preventDefault(); go(); }
    });
  }

  function open() {
    if (!built) build();
    back.classList.add('on');
    document.documentElement.className += ' pal-open';
    input.value = ''; render(); input.focus();
  }
  function close() {
    back.classList.remove('on');
    document.documentElement.className =
      document.documentElement.className.replace(/\s*pal-open/, '');
  }
  function isOpen() { return back && back.classList.contains('on'); }

  document.addEventListener('keydown', function (e) {
    if ((e.metaKey || e.ctrlKey) && (e.key === 'k' || e.key === 'K')) {
      e.preventDefault(); isOpen() ? close() : open();
    } else if (e.key === 'Escape' && isOpen()) close();
  });

  window.CALC_PAL = { open: open, close: close, score: score };
})();
}catch(e){if(window.console)console.error('calculate.to palette',e);}

/* ---- engine: pwa ---- */
try{
/* calculate.to pwa, offline + installable */
if('serviceWorker' in navigator){addEventListener('load',function(){navigator.serviceWorker.register('/sw.js').catch(function(){});});}
}catch(e){if(window.console)console.error('calculate.to pwa',e);}

/* ---- finish layer: header tuck, scroll entrances, result pulse (all off under reduced motion) ---- */
(function(){
  'use strict';
  var d=document,de=d.documentElement,w=window;
  var rm=!!(w.matchMedia&&w.matchMedia('(prefers-reduced-motion: reduce)').matches);
  function ready(fn){if(d.readyState==='loading')d.addEventListener('DOMContentLoaded',fn);else fn();}
  ready(function(){
    if(de.classList.contains('embed')||rm)return;
    var mn=d.getElementById('mn');
    if(mn){
      var last=w.pageYOffset||0,tick=false;
      var busy=function(){return de.classList.contains('mns-open')||de.classList.contains('pal-open')||de.classList.contains('mn-blur')||mn.classList.contains('is-drawer')||!!mn.querySelector('.mn-group.is-open')||mn.contains(d.activeElement);};
      var limit=function(){return w.innerWidth<=820?Math.max(60,(de.scrollHeight-w.innerHeight)*0.07):120;};
      var step=function(){
        tick=false;
        var y=w.pageYOffset||0,dy=y-last;
        if(busy()||y<limit()){mn.classList.remove('is-tucked');last=y;return;}
        if(dy>6){mn.classList.add('is-tucked');last=y;}
        else if(dy<-6){mn.classList.remove('is-tucked');last=y;}
      };
      w.addEventListener('scroll',function(){if(!tick){tick=true;w.requestAnimationFrame(step);}},{passive:true});
      mn.addEventListener('focusin',function(){mn.classList.remove('is-tucked');});
    }
    if('IntersectionObserver' in w){
      var vh=w.innerHeight||800;
      var io=new IntersectionObserver(function(es){
        es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('rv-in');io.unobserve(e.target);}});
      },{rootMargin:'0px 0px -6% 0px',threshold:0.06});
      [].forEach.call(d.querySelectorAll('main>section>.wrap,footer>.wrap'),function(el){
        if(el.getBoundingClientRect().top>vh*0.92){el.classList.add('rv');io.observe(el);}
      });
    }
    if('MutationObserver' in w){
      [].forEach.call(d.querySelectorAll('.readout'),function(ro){
        var r=ro.querySelector('.result');
        if(!r)return;
        new MutationObserver(function(){ro.classList.remove('rp');void ro.offsetWidth;ro.classList.add('rp');})
          .observe(r,{childList:true,characterData:true,subtree:true});
      });
    }
  });
})();

/* ---- segmented controls: aria-pressed follows the visible "on" state, whichever script sets it ---- */
(function(){
  'use strict';
  function sync(b){ b.setAttribute('aria-pressed', b.classList.contains('on') ? 'true' : 'false'); }
  function go(){
    var bs = [].filter.call(document.querySelectorAll('.seg button, .calc-tabs[role="group"] button'), function(b){ return !b.hasAttribute('role'); });
    if (!bs.length) return;
    bs.forEach(sync);
    if (!('MutationObserver' in window)) return;
    var mo = new MutationObserver(function(ms){ ms.forEach(function(x){ sync(x.target); }); });
    bs.forEach(function(b){ mo.observe(b, { attributes: true, attributeFilter: ['class'] }); });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', go); else go();
})();
