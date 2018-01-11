var $=jQuery,App={common:{init:function(){this.header.init({menuButton:"a.navigation-button",mobileMenu:"nav#main-menu-mobile",withOverlay:!0,searchButon:"a.search-button",searchInput:"#search-container"}),this.overlay.init({wrapper:"#wrapper",cssClass:"-overlay",delay:170}),this.search.init({channels:"a.search-channels",trigger:"button#search-default",input:"input#search-input"})},fixAnchorsOffset:{conf:{linksContainer:"body",topOffset:0},init:function(a){$.extend(this.conf,a),this.cacheDom(),this.bindEvents()},cacheDom:function(){this.$links=$(this.conf.linksContainer).find("a")},bindEvents:function(){this.$links.on("click",$.proxy(this.detectAnchors,this))},unbindEvents:function(){this.$links.unbind("click")},detectAnchors:function(a){a.target.hash&&(a.preventDefault(),$("html, body").animate({scrollTop:$(a.target.hash).offset().top-this.conf.topOffset}))}},video:{conf:{autoplay:!1,withOverlay:!1,isPlaying:!1,inSlider:!0},init:function(a){$.extend(this.conf,a),$.getScript("https://www.youtube.com/iframe_api",function(a,b,c){App.common.video.conf.player=null,App.common.video.cacheDom(),setTimeout(function(){App.common.video.loadVideo()},1e3)}),this.cacheDom(),this.bindEvents()},cacheDom:function(){this.$playButton=$(this.conf.playButton),this.conf.inSlider&&(this.$prevArrow=$("#prev-slider"),this.$nextArrow=$("#next-slider"))},bindEvents:function(){this.$playButton.on("click",this.showVideo.bind(this)),this.conf.inSlider&&(this.$prevArrow.on("click",this.pauseVideo.bind(this)),this.$nextArrow.on("click",this.pauseVideo.bind(this)))},showVideo:function(a){a.preventDefault(),App.common.slider.conf.slider.goToNextSlide(),this.conf.withOverlay&&App.common.overlay.show("-overlay-full",!0),this.conf.isPlaying=!0,this.conf.player.playVideo()},loadVideo:function(){this.conf.player=new YT.Player("video-intro",{playerVars:{autoplay:0,rel:0},videoId:"JEpY_ETJ_jE"})},hideVideo:function(){App.common.overlay.hide()},pauseVideo:function(){this.conf.player.pauseVideo()}},videoChinese:{conf:{autoplay:!1,withOverlay:!1,isPlaying:!1,inSlider:!0},init:function(a){$.extend(this.conf,a),this.cacheDom(),this.bindEvents(),App.common.videoChinese.loadVideo()},cacheDom:function(){this.$playButton=$(this.conf.playButton),this.conf.inSlider&&(this.$prevArrow=$("#prev-slider"),this.$nextArrow=$("#next-slider"))},bindEvents:function(){this.$playButton.on("click",this.showVideo.bind(this)),this.conf.inSlider&&(this.$prevArrow.on("click",this.pauseVideo.bind(this)),this.$nextArrow.on("click",this.pauseVideo.bind(this)))},showVideo:function(a){a.preventDefault(),App.common.slider.conf.slider.goToNextSlide(),this.conf.withOverlay&&App.common.overlay.show("-overlay-full",!0)},loadVideo:function(){$("#video-intro-chinese").html('<embed src="//static.video.qq.com/TPout.swf?vid=h0187k110i1&auto=0&rel=0" allowFullScreen="true" quality="high" width="640" height="360" align="middle" allowScriptAccess="always" type="application/x-shockwave-flash" style = "box-shadow: 0px 0px 15px #111;"></embed>')},hideVideo:function(){App.common.overlay.hide()},pauseVideo:function(){}},slider:{conf:{},init:function(a){$.extend(this.conf,a),this.load(),$(window).resize(this.resize.bind(this))},load:function(){this.conf.slider=$(this.conf.el).bxSlider({mode:"horizontal",useCSS:!0,infiniteLoop:!1,hideControlOnEnd:!0,easing:"easeOutElastic",nextSelector:"#next-slider",prevSelector:"#prev-slider",nextText:"&#xf105;",prevText:"&#xf104;",speed:2e3})},unload:function(){},resize:function(a){$(window).width()<600}},search:{conf:{},init:function(a){$.extend(this.conf,a),this.cacheDom(),this.bindEvents()},cacheDom:function(){this.$channels=$(this.conf.channels),this.$trigger=$(this.conf.trigger),this.$input=$(this.conf.input)},bindEvents:function(){this.$channels.on("click",$.proxy(this.switchSearch,this)),this.$trigger.on("click",$.proxy(this.doSearch,this)),this.$input.on("keyup",$.proxy(function(a){this.isReturn(a)},this))},unbindEvents:function(){this.$sections.unbind("click")},isReturn:function(a){13===a.which&&$("#search-default").click()},switchSearch:function(a){var b=document.getElementById("search-default"),c=a.currentTarget,d=c.getAttribute("data-search");b.setAttribute("data-search",d),b.textContent=c.textContent},doSearch:function(a){var b=encodeURIComponent($(this.conf.input).val()),c=a.currentTarget.getAttribute("data-search");switch(window.console.log(c),c){case"search-default":case"search-drupal":window.location.href="/search/site/"+b;break;case"search-docs":window.location.href="/doc/search.html?q="+b+"&check_keywords=yes&area=default"}},focus:function(){this.$input.focus()}},sidebar:{conf:{isSecondaryMenuVisible:!1},init:function(a){$.extend(this.conf,a),this.cacheDom(),this.bindEvents(),this.startSidebar()},cacheDom:function(){this.$secondaryMenuButton=$(this.conf.secondaryMenuButton),this.$secondaryMenuWrapper=$(this.conf.secondaryMenuWrapper)},bindEvents:function(){this.$secondaryMenuButton.on("click",this.toggleSecondaryMenu.bind(this)),$(window).resize(this.updateOffset.bind(this))},unbindEvents:function(){this.$secondaryMenuButton.unbind("click")},toggleSecondaryMenu:function(){this.conf.isSecondaryMenuVisible?this.hideSecondaryMenu():this.showSecondaryMenu()},updateOffset:function(){$(this.conf.sidebarWrapper).data("bs.affix").options.offset.bottom=$("[class*=region-sidebar] >div").height()+$("footer").height()+85},showSecondaryMenu:function(){this.$secondaryMenuWrapper.addClass("-expanded-submenu"),this.conf.isSecondaryMenuVisible=!0},hideSecondaryMenu:function(){this.$secondaryMenuWrapper.removeClass("-expanded-submenu"),this.conf.isSecondaryMenuVisible=!1},startSidebar:function(){$(this.conf.sidebarWrapper).affix({offset:{top:0,bottom:$("[class*=region-sidebar] > div").height()+$("footer").height()+85}})},updateTrapLinks:function(){this.$trapLinks.each(function(a){})}},trapLinks:{conf:{scrollSpy:!0,checkpoints:[]},init:function(a){$.extend(this.conf,a),this.cacheDom(),this.bindEvents(),this.conf.scrollSpy&&this.getCheckpoints()},cacheDom:function(){this.$trapLinks=$(this.conf.link)},bindEvents:function(){this.$trapLinks.on("click",this.scrollTo),$(window).scroll(this.spyPosition.bind(this))},unbindEvents:function(){this.$trapLinks.unbind("click")},scrollTo:function(a){a.preventDefault();var b=$(this).data("hash");$(this).closest("ul.menu").find("a.active").removeClass("active"),$(this).addClass("active"),$("html, body").animate({scrollTop:$("#"+b).offset().top-90},500)},getCheckpoints:function(){this.checkpoints=[],$.each(this.$trapLinks,$.proxy(function(a,b){this.checkpoints[a]=$("#"+b.getAttribute("data-hash")).offset().top-180},this))},spyPosition:function(){var a=$(window).scrollTop(),b=App.common.inRange(a,this.checkpoints);b!==!1&&(this.$trapLinks.removeClass("active"),$(this.$trapLinks[b]).addClass("active"))}},header:{conf:{isMobileMenuVisible:!1},init:function(a){$.extend(this.conf,a),this.cacheDom(),this.bindEvents()},cacheDom:function(){this.$buttonMenu=$(this.conf.menuButton),this.$mobileMenu=$(this.conf.mobileMenu),this.$searchButton=$(this.conf.searchButon),this.$searchInput=$(this.conf.searchInput)},bindEvents:function(){this.$buttonMenu.on("click",this.toggleMenu.bind(this)),this.$searchButton.on("click",this.toggleSearch.bind(this))},unbindEvents:function(){this.$buttonMenu.unbind("click")},toggleMenu:function(){this.conf.isMobileMenuVisible?this.hideMenu():this.showMenu()},showMenu:function(){this.$mobileMenu.slideDown(this.conf.mobileMenuDelay),this.conf.isMobileMenuVisible=!0,$(document).find("body").addClass("-expanded-header -expanded-mobile-menu"),this.conf.withOverlay&&App.common.overlay.show("-overlay")},hideMenu:function(){this.$mobileMenu.slideUp(this.conf.mobileMenuDelay),this.conf.isMobileMenuVisible=!1,$(document).find("body").removeClass("-expanded-mobile-menu"),this.conf.isSearchInputVisible||($(document).find("body").removeClass("-expanded-header"),this.conf.withOverlay&&App.common.overlay.hide())},toggleSearch:function(){this.conf.isSearchInputVisible?this.hideSearch():this.showSearch()},showSearch:function(){this.$searchInput.slideDown("fast"),this.$searchInput.css({overflow:"visible"}),this.conf.isSearchInputVisible=!0,$(document).find("body").addClass("-expanded-header -expanded-search-box"),this.conf.withOverlay&&App.common.overlay.show("-overlay"),App.common.search.focus()},hideSearch:function(){this.$searchInput.slideUp(),this.conf.isSearchInputVisible=!1,$(document).find("body").removeClass("-expanded-search-box"),this.conf.isMobileMenuVisible||($(document).find("body").removeClass("-expanded-header"),this.conf.withOverlay&&App.common.overlay.hide())},logoAnimated:{conf:{},init:function(a){$.extend(this.conf,a),this.bindEvents()},bindEvents:function(){$("body, html").scroll(this.onScroll.bind(this)),$(window).scroll(this.onScroll.bind(this))},unbindEvents:function(){$("body, html").unbind("scroll"),$(window).unbind("scroll")},onScroll:function(a){this.$header=$("header"),this.$header.hasClass("scrolled")||this.$header.addClass("scrolled"),0===$(a.currentTarget).scrollTop()&&this.$header.removeClass("scrolled")}},toggleState:{selectorsArray:[],conf:{},init:function(a){$.extend(this.conf,a),this.cacheDom(),this.bindEvents()},cacheDom:function(){this.$header=$("header"),$.each(this.conf.onScroll,$.proxy(function(a,b){this.selectorsArray.push(a)},this)),this.$checkpointElements=$(this.selectorsArray.join())},bindEvents:function(){$(window).scroll(this.onScroll.bind(this))},unbindEvents:function(){$(window).unbind("scroll")},getCheckpoints:function(){var a=[];return $.each(this.$checkpointElements,$.proxy(function(b,c){a.push($(c).offset().top-91)},this)),a},onScroll:function(){var a,b,c=$(window).scrollTop(),d=App.common.inRange(c,this.getCheckpoints()),e=this.selectorsArray[d];d!==!1?(a=this.conf.onScroll[e].removeClass,b=this.conf.onScroll[e].addClass,this.$header.addClass(b).removeClass(a)):this.$header.removeClass()}}},overlay:{conf:{isVisible:!1,cssClass:"-overlay",lockScroll:!1,elementOnTop:void 0},init:function(a){$.extend(this.conf,a),this.cacheDom(),this.conf.isVisible&&this.show()},cacheDom:function(){this.$wrapper=$(this.conf.wrapper)},bindEvents:function(){$(document).on("keyup",$.proxy(function(a){this.escKey(a)},this)),$("html").on("click",$.proxy(function(a){this.clickOutbounds(a)},this))},unbindEvents:function(){$(document).unbind("keyup")},clickOutbounds:function(a){"wrapper"===a.target.id&&a.target.className===this.conf.cssClass&&this.hide()},escKey:function(a){27===a.keyCode&&this.conf.isVisible&&this.hide()},toggle:function(){this.conf.isVisible?this.hide():this.show()},show:function(a,b,c){this.conf.cssClass="undefined"==typeof a?this.conf.cssClass:a,this.conf.lockScroll="undefined"==typeof b?this.conf.lockScroll:b,this.$wrapper.addClass(this.conf.cssClass),this.conf.isVisible=!0,this.conf.lockScroll&&$("body").addClass("-lock-scroll"),this.bindEvents()},hide:function(a){this.conf.cssClass="undefined"==typeof a?this.conf.cssClass:a,this.$wrapper.removeClass(this.conf.cssClass),this.conf.isVisible=!1,(App.common.header.conf.isMobileMenuVisible||App.common.header.conf.isSearchInputVisible)&&(App.common.header.hideMenu(),App.common.header.hideSearch()),App.common.video.conf.isPlaying&&App.common.video.hideVideo(),this.conf.lockScroll&&($("body").removeClass("-lock-scroll"),this.conf.lockScroll=!1),this.unbindEvents()}},inRange:function(a,b){var c=null;return b.forEach(function(b,d){a>=b&&(c=d)}),null!=c&&c},fadeinOnScroll:{conf:{},init:function(a){$.extend(this.conf,a),this.cacheDom(),this.fadeIn(),this.bindEvents()},cacheDom:function(){this.$elements=$(this.conf.elements)},bindEvents:function(){$(window).scroll(this.fadeIn.bind(this))},fadeIn:function(){var a=document.elementFromPoint(0,.66*$(window).height()),b=this.$elements.map(function(a){return this.id}).get();$.inArray(a.id,b)!==-1&&$("#"+a.id).find(".container").addClass(this.conf.fadeinClass)}},scrollArrow:{conf:{},init:function(a){$.extend(this.conf,a),this.bindEvents()},bindEvents:function(){$(window).scroll(this.fadeOut.bind(this)),$(this.conf.arrowElement).click(this.scrollDown.bind(this))},fadeOut:function(){var a=$(window).scrollTop();a=2*a;var b=$(window).height(),c=a/b;c=1-c,$(this.conf.arrowElement).css("opacity",c)},scrollDown:function(a){var b=$(this.conf.arrowElement);return $("html,body").animate({scrollTop:b.offset().top},1e3),!1}}},front:{init:function(){App.common.header.logoAnimated.init(),App.common.fadeinOnScroll.init({elements:"div.region-homepage > div.block",fadeinClass:"-fade-in"}),App.common.scrollArrow.init({arrowElement:".arrow-wrap"}),App.common.video.init({playButton:"#play-intro-video"}),App.common.videoChinese.init({playButton:"#play-intro-video-chinese"}),App.common.slider.init({el:"#homepage-slider"})}},about:{init:function(){App.common.sidebar.init({sidebarWrapper:"div.sticky-container",secondaryMenuButton:"span#secondary-menu-button",secondaryMenuWrapper:"div.container-sidebar"}),App.common.trapLinks.init({link:"a.trap-link",scrollSpy:!0})}},documentation:{init:function(){App.common.sidebar.init({sidebarWrapper:"div.sticky-container",secondaryMenuButton:"span#secondary-menu-button",secondaryMenuWrapper:"div.container-sidebar"}),App.common.fixAnchorsOffset.init({linksContainer:".docs-menu",topOffset:$("header").height()+15});var a=$(".sphinx-search").height()+$(".docs-menu").height()+$(".container-sidebar").height(),b=$(".rst-content").height();b<a&&$(".rst-content").css("min-height",a+1)}},downloads:{init:function(){}},blogs:{init:function(){App.common.sidebar.init({sidebarWrapper:"div.sticky-container",secondaryMenuButton:"span#secondary-menu-button",secondaryMenuWrapper:"div.container-sidebar"})}},search:{init:function(){}}},UTIL={exec:function(a){var b=App;""!==a&&b[a]&&"object"==typeof b[a]&&b[a].init()},init:function(a){var b=$(document).find("body").attr("class").split(" "),c=!1,d=null;$.each(a,function(a,e){return Array.isArray(e)?($.each(e,function(e,f){return $.inArray(f,b)!==-1&&(c=!0,d=a),!c}),!c):$.inArray(e,b)!==-1?(d=a,!1):void 0}),UTIL.exec("common"),UTIL.exec(d)}};jQuery(function(){UTIL.init({front:["front"],about:"page-about",downloads:"page-downloads",documentation:"page-documentation",blogs:"node-type-blog"})});