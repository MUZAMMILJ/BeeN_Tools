/* BeeN Tools — shared helpers. Include in any page: <script src="../assets/shared.js"></script> */
window.BeeN = {
  // One Firebase project for all tools (same login works everywhere on this site)
  firebaseConfig: {apiKey:"AIzaSyCftYPEs4lnpum5R1zsqEo0J8eloVMYyuk",authDomain:"been-4ffed.firebaseapp.com",projectId:"been-4ffed",storageBucket:"been-4ffed.firebasestorage.app",messagingSenderId:"1054268044444",appId:"1:1054268044444:web:6de19aeec6ece17fdf2959"},
  // Site-wide settings. Change the domain/email/ads here (or run scripts/set-site.sh).
  site: {
    url: 'https://muzammilj.github.io/BeeN_Tools',
    name: 'BeeN Tools',
    ads: {
      enabled: false,                       // master switch: true = show AdSense ads (needs a real client id)
      client: 'ca-pub-0000000000000000',    // your AdSense publisher id
      slots: { home: '', calculator: '', converter: '' }   // optional ad unit ids; leave '' to use Auto ads only
    }
  },
  themeKey: 'beenTheme',
  setTheme(t, btn){
    document.documentElement.setAttribute('data-theme', t);
    if(btn) btn.textContent = t === 'dark' ? '☀️' : '🌙';
    try{ localStorage.setItem(this.themeKey, t); }catch(e){}
  },
  initTheme(btn){
    let t = null; try{ t = localStorage.getItem(this.themeKey); }catch(e){}
    this.setTheme(t || (matchMedia('(prefers-color-scheme:dark)').matches ? 'dark' : 'light'), btn);
  },
  toggleTheme(btn){
    this.setTheme(document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark', btn);
  }
};
