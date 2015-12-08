	 (function(){
    var body = document.getElementsByTagName('body')[0];

    var switcherRU = document.getElementById('switcher-ru');
    var switcherEN = document.getElementById('switcher-en');
	 var expires = new Date();
    expires.setDate(expires.getDate() + 366);
    expires.toUTCString();


    var switchLang = function() {
      var lang = this.id
      lang = lang.replace('switcher-', '');
      body.className = lang;  
	 $$c.set('lang', lang, 'expires', 10);
      document.title = title[lang]; 
    }
    switcherRU.onclick = switchLang;
    switcherEN.onclick = switchLang;
  })();
