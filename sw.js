/* calculate.to service worker: the whole site, offline, versioned by content. */
'use strict';
var VERSION='calc-75a469076d';
var ASSETS=["/", "/404.html", "/about.html", "/advanced-calculator.html", "/age-calculator.html", "/ai-compute-calculator.html", "/amortization-calculator.html", "/apr-apy-calculator.html", "/area-converter.html", "/average-calculator.html", "/binary-hex-converter.html", "/bmi-calculator.html", "/bmr-calculator.html", "/body-fat-calculator.html", "/business-days-calculator.html", "/cagr-calculator.html", "/calorie-calculator.html", "/calories-burned-calculator.html", "/car-loan-calculator.html", "/coffee-ratio-calculator.html", "/coin-flip.html", "/compound-interest-calculator.html", "/concrete-calculator.html", "/cups-to-grams-converter.html", "/currency-converter.html", "/date-difference-calculator.html", "/day-of-week-calculator.html", "/days-from-today-calculator.html", "/debt-payoff-calculator.html", "/derivative-calculator.html", "/dice-roller.html", "/discount-calculator.html", "/dollar-cost-averaging-calculator.html", "/dow-to-gold-calculator.html", "/drip-calculator.html", "/due-date-calculator.html", "/embed.html", "/ev-charging-cost-calculator.html", "/fed-rate-calculator.html", "/final-grade-calculator.html", "/flooring-calculator.html", "/fraction-calculator.html", "/fuel-cost-calculator.html", "/gcf-lcm-calculator.html", "/gold-m2-ratio-calculator.html", "/gold-silver-ratio-calculator.html", "/gold-vs-usd-calculator.html", "/gpa-calculator.html", "/heart-rate-zone-calculator.html", "/ideal-weight-calculator.html", "/index.html", "/inflation-calculator.html", "/integral-calculator.html", "/length-converter.html", "/loan-calculator.html", "/m2-money-supply-calculator.html", "/macro-calculator.html", "/margin-markup-calculator.html", "/mileage-reimbursement-calculator.html", "/mortgage-calculator.html", "/mpg-calculator.html", "/mulch-calculator.html", "/one-rep-max-calculator.html", "/oven-temperature-calculator.html", "/ovulation-calculator.html", "/pace-calculator.html", "/paint-calculator.html", "/pan-conversion-calculator.html", "/password-generator.html", "/percentage-calculator.html", "/pregnancy-week-calculator.html", "/privacy.html", "/quadratic-formula-calculator.html", "/quantum-calculator.html", "/random-number-generator.html", "/random-picker.html", "/ratio-calculator.html", "/real-interest-rate-calculator.html", "/recipe-converter.html", "/retirement-calculator.html", "/roi-calculator.html", "/roman-numeral-converter.html", "/rule-of-72-calculator.html", "/salary-to-hourly-calculator.html", "/savings-goal-calculator.html", "/scientific-calculator.html", "/simple-interest-calculator.html", "/sleep-calculator.html", "/sp1-vs-sp500-calculator.html", "/sp500-dca-calculator.html", "/speed-converter.html", "/square-footage-calculator.html", "/standard-deviation-calculator.html", "/support.html", "/tdee-calculator.html", "/temperature-converter.html", "/test-score-calculator.html", "/tile-calculator.html", "/time-calculator.html", "/time-zone-converter.html", "/tip-calculator.html", "/unit-price-calculator.html", "/vat-calculator.html", "/volume-converter.html", "/waist-to-height-ratio-calculator.html", "/water-intake-calculator.html", "/weight-converter.html", "/weighted-grade-calculator.html", "/sitemap.xml", "/robots.txt", "/CNAME", "/.nojekyll", "/assets/img/og/og.png", "/assets/img/favicon.svg", "/assets/img/favicon-96.png", "/assets/img/apple-touch-icon.png", "/manifest.webmanifest", "/assets/img/icon-192.png", "/assets/img/icon-512.png", "/assets/img/prod-osalo.jpg", "/assets/img/prod-helix.jpg", "/assets/img/prod-casio.jpg", "/assets/img/prod-roatee.jpg", "/site.js", "/calc3d.js"];
self.addEventListener('install',function(e){
  e.waitUntil(caches.open(VERSION).then(function(c){return c.addAll(ASSETS);})
    .then(function(){return self.skipWaiting();}));
});
self.addEventListener('activate',function(e){
  e.waitUntil(caches.keys().then(function(ks){
    return Promise.all(ks.map(function(k){if(k!==VERSION)return caches.delete(k);}));
  }).then(function(){return self.clients.claim();}));
});
self.addEventListener('fetch',function(e){
  var req=e.request;
  if(req.method!=='GET')return;
  var u=new URL(req.url);
  if(u.origin!==self.location.origin)return;
  e.respondWith(
    caches.match(req,{ignoreSearch:true}).then(function(hit){
      if(hit)return hit;
      return fetch(req).catch(function(){
        if(req.mode==='navigate')return caches.match('/index.html');
      });
    })
  );
});
