var $url="/pages/settings/siteTemplateOnline",data={pageLoad:!1,pageAlert:null,page:parseInt(utils.getQueryString("page")||1),word:utils.getQueryString("word"),tag:utils.getQueryString("tag"),price:utils.getQueryString("price"),order:utils.getQueryString("order"),siteAddPermission:!1,templateInfoList:null,count:null,pages:null,allTagNames:[]},methods={getDisplayUrl:function(t){return"https://www.siteserver.cn/templates/template.html?id="+t},getTemplateUrl:function(t){return"https://www.siteserver.cn/templates/"+t},getPreviewUrl:function(t){return"https://demo.siteserver.cn/"+t},getPageUrl:function(t){return t<1||t>this.pages||t==this.page?"javascript:;":this.getUrl(t,this.word,this.tag,this.price,this.order)},getTagUrl:function(t){return this.getUrl(this.page,this.word,t,this.price,this.order)},getPriceUrl:function(t){return this.getUrl(this.page,this.word,this.tag,t,this.order)},getOrderUrl:function(t){return this.getUrl(this.page,this.word,this.tag,this.price,t)},getUrl:function(t,e,r,i,a){var n="?page="+t;return e&&(n+="&word="+e),r&&(n+="&tag="+r),i&&(n+="&price="+i),a&&(n+="&order="+a),n},priceChanged:function(){this.load()},orderChanged:function(){this.load()},apiGetConfig:function(){var t=this;$api.get($url).then(function(e){var r=e.data;t.siteAddPermission=r.siteAddPermission}).catch(function(e){t.pageAlert=utils.getPageAlert(e)}).then(function(){t.pageLoad=!0})},load:function(){var t=this;$apiCloud.get("templates",{params:{page:this.page,word:this.word,tag:this.tag,price:this.price,order:this.order}}).then(function(e){var r=e.data;t.templateInfoList=r.value,t.count=r.count,t.pages=r.pages,t.allTagNames=r.allTagNames}).catch(function(e){t.pageAlert=utils.getPageAlert(e)}).then(function(){t.apiGetConfig()})}},$vue=new Vue({el:"#main",data:data,methods:methods,created:function(){this.load()}});