/* Author:
    Max Degterev @suprMax
 
    Zepto fast buttons without nasty ghostclicks.
    Supports event delegation and handlers removal.
    Highly inspired by http://code.google.com/mobile/articles/fast_buttons.html
 
    Usage:
 
    bind:
    $('#someid').onpress(function(event){});
    $('#someid').offpress(function(event){});
 
    delegation:
    $('#someid').onpress('.childNode', function(event){});
    $('#someid').offpress('.childNode', function(event){});
 
    Word of advice:
    Never ever try to attach this event handlers to: document, html, body.
    All sorts of weirdness going to happen. Use onclick instead.
*/
(function(e){e.os.touch=!(typeof window.ontouchstart==="undefined");var t=1e3;var n=function(e){var t,n;if(typeof e[0]==="function"){t=e[0]}else{n=e[0];t=e[1]}return[n,t]};if(e.os.touch){var r=[],i=[],s=[],o=e(document);var u=function(){r.splice(0,2)};var a=function(e){for(var t=0,n=r.length;t<n;t+=2){if(Math.abs(e.pageX-r[t])<25&&Math.abs(e.pageY-r[t+1])<25){e.stopPropagation();e.preventDefault()}}};o.on("click",a);e.fn.onpress=function(){if(!arguments.length||!this.length||!this[0].nodeType||this[0].nodeType!==1&&this[0].nodeType!==11){return}var e=[],a=this;var f=n(arguments);var l=function(t){t.stopPropagation();var n=t.touches?t.touches[0]:t;e[0]=n.pageX;e[1]=n.pageY;o.on("touchmove.onpress",c);f[0]?a.on("touchend.onpress",f[0],h):a.on("touchend.onpress",h)};var c=function(t){if(Math.abs(t.touches[0].pageX-e[0])>10||Math.abs(t.touches[0].pageY-e[1])>10){p()}};var h=function(n){p();f[1].call(this,n);if(n.type==="touchend"){r.push(e[0],e[1]);window.setTimeout(u,t)}};var p=function(){o.off("touchmove.onpress",c);f[0]?a.off("touchend.onpress",f[0],h):a.off("touchend.onpress",h)};i.push(f[1]);s.push(l);if(f[0]){this.on("touchstart.onpress",f[0],l);this.on("press.onpress",f[0],f[1])}else{this.on("touchstart.onpress",l);this.on("press.onpress",f[1])}};e.fn.offpress=function(){var e=n(arguments),t;if(e[1]){t=i.indexOf(e[1]);if(t<0){return}if(e[0]){this.off("touchstart.onpress",e[0],s[t]);this.off("press.onpress",e[0],e[1])}else{this.off("touchstart.onpress",s[t]);this.off("press.onpress",e[1])}i.splice(t,1);s.splice(t,1)}else{if(e[0]){this.off("touchstart.onpress",e[0]);this.off("press.onpress",e[0])}else{this.off("touchstart.onpress");this.off("press.onpress")}}}}else{e.fn.onpress=function(){var e=n(arguments);if(e[0]){this.on("click.onpress",e[0],e[1]);this.on("press.onpress",e[0],e[1])}else{this.on("click.onpress",e[1]);this.on("press.onpress",e[1])}};e.fn.offpress=function(){var e=n(arguments);e[0]?this.off(".onpress",e[0],e[1]):this.off(".onpress",e[1])}}})(window.Zepto||window.jQuery)