(function(n,o,t,e){class i{constructor(t){this.update(t);if(this.cfg.auto)this.start()}update(t){if(!t)return false;if(t.time)t.time*=1e3;this.cfg=Object.assign({},{int:0,time:1e3,force:true,fn:false,auto:false,loop:false,pass:false},this.cfg,t)}start(t){this.update(t);if(this.cfg.int&&!this.cfg.force)return false;this.stop();this.cfg.int=setTimeout(()=>{if(this.cfg.fn)this.cfg.pass?this.cfg.fn(this.cfg.pass):this.cfg.fn();if(this.cfg.loop)this.start()},this.cfg.time)}stop(){this.cfg.int=clearTimeout(this.cfg.int)}}class s{constructor(t){this.settings=n.extend({el:false,now:0,speed:2},t);this.init()}init(){let t=this.settings;if(!t.el)return console.error("Set","Element not defined");t.set=t.el.data("set").split(",");if(!t.set||t.set.length==0)return console.error("Set","No images in set");t.el.append(`<div class="tray"><img src="${t.set[0]}"><div></div></div>`);t.img=t.el.children(".tray").children("img");t.div=t.el.children(".tray").children("div");t.clock=new i(t.speed,this.tick,t);this.settings=t}tick(e){const i="on",s=e.div.hasClass(i)?"img":"div";if(++e.now==e.set.length)e.now=0;n([e.set[e.now]]).preload(t=>{t=t.imgs[0].src;if(s=="img"){e.img.attr("src",t);e.div.removeClass(i)}else{e.div.css("background","url("+t+")").addClass(i)}})}start(){if(this.settings.clock)this.settings.clock.start()}stop(){if(this.settings.clock)this.settings.clock.stop()}}class r{constructor(t){this.cfg=Object.assign({},{el:false,on:false,loop:true,auto:true},t);if(!this.cfg.el)return console.error("Vid","Element not defined");this.cfg.vid=this.cfg.el.data("vid");this.cfg.tmb=this.cfg.el.data("tmb");if(!this.cfg.vid)return console.error("Vid","No video set");if(!this.cfg.tmb)return console.error("Vid","No poster set");this.cfg.el.append(`<div class="tray"><img src="${this.cfg.tmb}"></div>`);if(!this.cfg.el.hasClass("lazy"))this.ini()}ini(){this.cfg.el.children(".tray").append(`<video loop autoplay><source src="${this.cfg.vid}" type="video/mp4"></video>`);this.cfg.vid=this.cfg.el.children(".tray").children("video")[0];this.cfg.on=true}start(){if(!this.cfg.on)this.ini();if(this.cfg.vid.play)this.cfg.vid.play()}stop(){if(this.cfg.vid.pause)this.cfg.vid.pause()}}n.fn.alive=function(){return this.length>0};n.fn.isWindow=function(){let t=Object.prototype.toString.call(this[0]),e=["[object DOMWindow]","[object Window]","[object global]"];return _.indexOf(e,t)>-1?true:false};n.fn.inView=function(){let t=n(this),e=n(o),i=t.offset().top,s=i+t.outerHeight(),r=e.scrollTop(),a=r+e.height();return s>r&&i<a};n.fn.center=function(t){let e={};if(t)e.top=(this.parent().height()-this.height())/2;e.left=(this.parent().width()-this.width())/2;this.css(e);return this};n.fn.rise=function(t,e){if(!t)return false;e=e||5;let i=this;while(!i.is(t)&&e-- >0){i=i.parent()}return e!=0?i:false};n.fn.dig=function(t,e){let i=false,s=t.substr(1);switch(t.substr(0,1)){case".":i="class";break;case"#":i="id";break}if(!n(this).alive()||!i)return false;if(!this.children(t).alive()||e)this.append("<div "+i+'="'+s+'"></div>');return this.children(t+":last")};n.fn.loaded=function(i){this.imagesLoaded({background:true}).always(t=>{let e=t.elements;t={imgs:t.images,broken:t.hasAnyBroken};t.imgs=t.imgs.map(t=>{return{src:t.img.src,w:t.img.width,h:t.img.height}});if(i)i(t);n(e).attr("data-loaded","true");n(o).trigger("resize")})};n.fn.preload=function(e){if(typeof this!="object")return console.error("Preload images not in an array");if(!this||this.length==0)return console.error("No images to preload");let i='<div id="preload" style="visibility:hidden;position:fixed;width:0;height:0;top:0;left:0;"></div>';n("body").append(i);i=n("#preload");let s="";this.each((t,e)=>{s+='<img src="'+e+'" style="position:relative;width:auto;height:auto;">'});i.append(s).loaded(t=>{i.remove();if(e)e(t)})};let a=[],h=[];n("[data-vid]").each((t,e)=>{h.push(new r({el:n(e)}))});n(o).on("resize scroll orientationchange",function(){});n("body").loaded();function l(a,n,o){var h;return function t(){var e=this;var i=arguments;var s=function(){h=null;if(!o)a.apply(e,i)};var r=o&&!h;clearTimeout(h);h=setTimeout(s,n);if(r)a.apply(e,i)}}let c=n("figure.pip");c.each((t,e)=>{e=n(e);e.mousemove(t=>{let e=n(t.currentTarget),i,s,r,a;i=Math.round(t.offsetX/e[0].offsetWidth*100);s=Math.round(t.offsetY/e[0].offsetHeight*100);e.css("background-position",i+"% "+s+"%")})});class f{constructor(t,e,i){this.last=parseFloat(i);this.live=!(!t||!i||isNaN(i));if(!this.live)return;this.canvas=t;this.context=t.getContext("2d");this.dir=e;this.context.imageSmoothingEnabled=true;this.context.imageSmoothingQuality="high";this.img=new Image;this.img.onload=()=>{let t=this.cover({w:this.img.width,h:this.img.height});this.context.drawImage(this.img,t.x,t.y,t.w,t.h)};this.render();this.preload()}render(t={}){if(!this.live)return;t=Object.assign({img:this.img,frame:this.frame||0,cb:true},t);if(!t.img)return;if(!isNaN(t.percent))t.frame=Math.floor(t.percent*(this.last+1));if(t.frame>this.last)t.frame=this.last;this.img.src=`${this.dir}/vid${this.zeroPad(t.frame,3)}.jpg`;this.frame=t.frame;if(t.cb)return t.frame}preload(){for(let t=0;t<this.last+1;t++){this.render({img:new Image,frame:t,cb:false})}}resize(t,e){this.w=t;this.h=e;this.canvas.width=t;this.canvas.height=e;this.render()}zeroPad(t,e){var i=e-t.toString().length+1;return Array(+(i>0&&i)).join("0")+t}limit(t){t=t.toFixed(2);t=Math.max(0,t);t=Math.min(1,t);return t}cover(t){let e=this.w;let i=this.w/t.w*t.h;if(i<this.h){i=this.h;e=this.h/t.h*t.w}t.x=0;t.y=0;return{w:e,h:i,x:(this.w-e)/2,y:(this.h-i)/2}}}let d=n('#product [data-type="product-scroll"]'),g=n("#buybar");d.each((t,e)=>{e=n(e);e.data("scroll",new f(e.find("canvas").get(0),e.data("dir"),parseFloat(e.data("last"))))});const u=t=>{t=t.toFixed(2);t=Math.max(0,t);t=Math.min(1,t);return t},m=t=>{let e=n(o).scrollTop(),i=n("main .right").height()-n(o).height();return u(e/i)};n(o).on("scroll",function(t){d.each((t,e)=>{e=n(e);let i=m(e),s=e.data("scroll").render({percent:i});i=i==1;i?g.addClass("passed"):g.removeClass("passed");let r=n("#announce");if(r&&i)r.addClass("remove")})});n(o).trigger("scroll");n(o).on("orientationchange resize",function(t){d.each((t,e)=>{e=n(e);e.data("scroll").resize(e.width(),e.height())});n(o).trigger("scroll")});n(o).trigger("resize");let p=n("#announce");p.find("i").click(()=>p.addClass("remove"));let v=n("nav"),w=v.find(".pages"),y=v.find(".hover"),b=v.find(".submenu");w.mouseenter(()=>y.addClass("active"));v.mouseleave(()=>y.removeClass("active"));let k=n("#buybar .add"),x=setTimeout(()=>{k.addClass("flash");x=setTimeout(()=>{k.removeClass("flash")},2e3)},3e3);k.mouseenter(()=>{clearTimeout(x)});let C=n(".carousel");C.each((t,e)=>{n(e).slick({infinite:true,fade:true,autoplay:true,autoplaySpeed:3500,speed:1200,pauseOnFocus:false,pauseOnHover:false,pauseOnDotsHover:false,arrows:false})})})(jQuery,window,document);