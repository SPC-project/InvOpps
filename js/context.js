!function(t,e,n){function r(e){var r=t[e];return t[e]=n,r}function o(t,e){return r("yandex_"+(e?e+"_":"")+t)}function a(t,e,n){for(var r=0;r<e.length;r++)t[e[r]]=o(e[r],n)}var c=t.Ya=t.Ya||{};if(c.loaderVer=1003,c.codeVer=1001,!c.Context){c.Context={_callbacks:[],_asyncIdCounter:0,_asyncModeOn:!1},c.Direct={insertInto:function(t,e,n,r){c.Context._asyncModeOn||(c.Context._asyncModeOn=!0),c.Context.AdvManager?c.Context.AdvManager.renderDirect(t,e,n,r):c.Context._callbacks.push(function(){c.Context.AdvManager.renderDirect(t,e,n,r)})}}}for(var i=["yandex_context_callbacks","yandexContextAsyncCallbacks"],l=0;l<i.length;l++){var _=r(i[l]);if(_){c.Context._asyncModeOn||(c.Context._asyncModeOn=!0);for(var s=0;s<_.length;s++)c.Context._callbacks.push(_[s])}}if(t.yandexContextSyncCallbacks)for(var _=r("yandexContextSyncCallbacks"),l=0;l<_.length;l++)c.Context._callbacks.push(_[l]);var d=["ad_format","site_bg_color","font_size","font_family","stat_id","no_sitelinks","search_text","search_page_number","lang"],x=["type","border_type","bg_color","border_radius","border_color","header_bg_color","title_color","text_color","url_color","hover_color","sitelinks_color","links_underline","limit","place","favicon","title_font_size","grab","c11n","geo_lat","geo_long","width","height"];if(t.yandex_ad_format){var f={};a(f,d),a(f,x,f.ad_format);var y=f.place;y&&e.getElementById(y)||(y="Ya_sync_"+c.Context._asyncIdCounter++,e.write('<div id="'+y+'"></div>'));var C=o("partner_id");c.Context._callbacks.push(function(){c.Context.AdvManager.renderDirect(C,y,f)})}var v="http:"===t.location.protocol?"http:":"https:",u="an.yandex.ru/resource/context_static_r"+c.codeVer+".js";if(e.getElementById(u)&&c.Context._init)return void c.Context._init();var g=v+"//"+u;if(c.Context._asyncModeOn){var p=e.createElement("script"),h=e.getElementsByTagName("script")[0];p.id=u,p.src=g,h.parentNode.insertBefore(p,h)}else e.write('<script type="text/javascript" src="'+g+'" id="'+u+'"></script>')}(this,this.document);