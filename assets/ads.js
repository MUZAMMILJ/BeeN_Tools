/* BeeN Tools — AdSense loader with a simple consent banner.
   Does nothing until BeeN.site.ads.enabled = true AND a real ca-pub id is set (see assets/shared.js).
   Never include this file on pages that must stay ad-free (login-only tools, info/legal pages). */
(function(){
  var A=(window.BeeN&&BeeN.site&&BeeN.site.ads)||{};
  if(!A.enabled||!/^ca-pub-\d{10,}$/.test(A.client)) return;
  var KEY='beenAdConsent';
  var css='.ad-slot{display:block;margin:28px auto;max-width:1120px;padding:0 24px;text-align:center;min-height:100px}'+
    '.ad-slot small{display:block;font:600 11px system-ui,sans-serif;letter-spacing:.1em;text-transform:uppercase;color:#8a8f9c;margin-bottom:6px}'+
    '#adBanner{position:fixed;left:16px;right:16px;bottom:16px;z-index:9999;max-width:560px;margin:0 auto;background:#fff;color:#1f2430;border:1px solid #e8e4da;border-radius:16px;box-shadow:0 14px 40px rgba(0,0,0,.2);padding:16px 18px;font:14px/1.5 system-ui,sans-serif}'+
    '[data-theme="dark"] #adBanner{background:#1d2029;color:#eef0f5;border-color:#2c303c}'+
    '#adBanner p{margin:0 0 12px}#adBanner a{color:inherit;font-weight:700}'+
    '#adBanner button{font:700 14px system-ui,sans-serif;padding:9px 16px;border-radius:10px;border:1px solid #e8e4da;background:transparent;color:inherit;cursor:pointer;margin-right:8px}'+
    '#adBanner button.y{background:#f5a623;border-color:#f5a623;color:#3a2600}';
  var st=document.createElement('style'); st.textContent=css; document.head.appendChild(st);

  function root(){ return (document.querySelector('script[src*="assets/ads.js"]').getAttribute('src')||'').replace(/assets\/ads\.js.*$/,''); }
  function fill(){
    var slots=document.querySelectorAll('.ad-slot[data-slot]');
    for(var i=0;i<slots.length;i++){
      var el=slots[i], id=A.slots&&A.slots[el.getAttribute('data-slot')];
      if(!id||el.getAttribute('data-done')) continue;       // no unit id: rely on Auto ads
      el.setAttribute('data-done','1');
      el.innerHTML='<small>Advertisement</small><ins class="adsbygoogle" style="display:block" data-ad-client="'+A.client+'" data-ad-slot="'+id+'" data-ad-format="auto" data-full-width-responsive="true"></ins>';
      try{ (window.adsbygoogle=window.adsbygoogle||[]).push({}); }catch(e){}
    }
  }
  function load(personal){
    if(window.__beenAds){ fill(); return; } window.__beenAds=1;
    window.adsbygoogle=window.adsbygoogle||[];
    if(!personal) window.adsbygoogle.requestNonPersonalizedAds=1;
    var s=document.createElement('script'); s.async=true; s.crossOrigin='anonymous';
    s.src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client='+A.client;
    document.head.appendChild(s); fill();
  }
  function choose(v){ try{localStorage.setItem(KEY,v)}catch(e){} var b=document.getElementById('adBanner'); if(b) b.remove(); load(v==='all'); }
  function banner(){
    if(document.getElementById('adBanner')) return;
    var b=document.createElement('div'); b.id='adBanner'; b.setAttribute('role','dialog'); b.setAttribute('aria-label','Ad preferences');
    b.innerHTML='<p>We show ads to keep these tools free. Allow personalised ads, or see only non-personalised ones. Details in our <a href="'+root()+'privacy/">Privacy Policy</a>.</p><button class="y" type="button">Personalised ads</button><button type="button">Non-personalised only</button>';
    var bt=b.querySelectorAll('button'); bt[0].onclick=function(){choose('all')}; bt[1].onclick=function(){choose('basic')};
    document.body.appendChild(b);
  }
  window.BeeN.adChoices=function(){ try{localStorage.removeItem(KEY)}catch(e){} banner(); };
  function start(){
    var c=null; try{c=localStorage.getItem(KEY)}catch(e){}
    if(c) load(c==='all'); else banner();
    var l=document.querySelectorAll('[data-ad-choices]'); for(var i=0;i<l.length;i++){ l[i].hidden=false; l[i].onclick=function(e){e.preventDefault();BeeN.adChoices()}; }
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',start); else start();
})();
