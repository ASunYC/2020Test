new Vue({el:"#main",data:{pageUser:null,pageConfig:null,pageMenus:null,defaultPageUrl:null,pageUrl:null,elTopnav:null,elFrmMain:null,avatarUrl:null},methods:{load:function(e,n,a,t){var i=this;this.pageUser=e,this.pageConfig=n,this.pageMenus=a,this.defaultPageUrl=t,this.avatarUrl=this.pageUser.avatarUrl||this.pageConfig.homeDefaultAvatarUrl||"assets/images/default_avatar.png",this.pageUrl=this.getPageUrl(),window.onresize=this.resize,setTimeout(function(){i.ready(),i.resize()},100)},ready:function(){var e=this;this.elTopnav=$("#topnav"),this.elFrmMain=$("#frmMain"),$(".navbar-toggle").on("click",function(){$(this).toggleClass("open"),$("#navigation").slideToggle(400)}),$(".navigation-menu>li").slice(-2).addClass("last-elements"),$('.navigation-menu li.has-submenu a[href="#"]').on("click",function(e){$(window).width()<992&&(e.preventDefault(),$(this).parent("li").toggleClass("open").find(".submenu:first").toggleClass("open"))}),$(window).on("hashchange",function(){e.pageUrl=e.getPageUrl()})},resize:function(){var e=this.elTopnav.height();this.elFrmMain.css({top:e+"px",minHeight:$(window).height()-e+"px",display:"block"}).iFrameResize({log:!1})},getPageUrl:function(){return location.hash&&location.hash.length>1?location.hash.substr(1,location.hash.length-1):this.defaultPageUrl||"pages/dashboard.html"}},created:function(){var e=this;utils.getConfig("index",function(n){n.value?e.load(n.value,n.config,n.menus,n.defaultPageUrl):location.href="pages/login.html?returnUrl="+encodeURIComponent(location.href)},!0)}});var getContentWindow=function(){return document.getElementById("frmMain").contentWindow};