var $api=new apiUtils.Api(apiUrl+"/pages/cms/contentsLayerOptions"),data={siteId:parseInt(pageUtils.getQueryStringByName("siteId")),channelId:parseInt(pageUtils.getQueryStringByName("channelId")),pageLoad:!1,pageType:"setColumns",pageAlert:null,attributes:null,attributeNames:[],isAllContents:!1,isSelfOnly:!1},methods={loadConfig:function(){var t=this;$api.get({siteId:t.siteId,channelId:t.channelId},function(e,a){if(!e&&a&&a.value){t.attributes=a.value,t.isAllContents=a.isAllContents,t.isSelfOnly=a.isSelfOnly,t.attributeNames=[];for(var i=0;i<t.attributes.length;i++){var n=t.attributes[i];n.selected&&t.attributeNames.push(n.value)}t.pageLoad=!0}})},btnSubmitClick:function(){pageUtils.loading(!0),$api.post({siteId:this.siteId,channelId:this.channelId,attributeNames:this.attributeNames.join(","),isAllContents:this.isAllContents,isSelfOnly:this.isSelfOnly},function(t,e){!t&&e&&e.value&&parent.location.reload(!0)})}};new Vue({el:"#main",data:data,methods:methods,created:function(){this.loadConfig()}});