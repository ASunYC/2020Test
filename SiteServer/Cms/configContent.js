var $api=new apiUtils.Api(apiUrl+"/pages/cms/configContent?siteId="+pageUtils.getQueryStringByName("siteId")),data={pageLoad:!1,pageAlert:null,pageType:null,siteInfo:null,config:null,isSaveImageInTextEditor:null,isAutoPageInTextEditor:null,autoPageWordNum:null,isContentTitleBreakLine:null,isContentSubTitleBreakLine:null,isAutoCheckKeywords:null,isCheckContentLevel:null,checkContentLevel:null,checkContentDefaultLevel:null},methods={getConfig:function(){var e=this;$api.get(null,function(t,n){!t&&n&&n.value&&(e.siteInfo=_.clone(n.value),e.config=_.clone(n.config),e.isSaveImageInTextEditor=n.config.isSaveImageInTextEditor,e.isAutoPageInTextEditor=n.config.isAutoPageInTextEditor,e.autoPageWordNum=n.config.autoPageWordNum,e.isContentTitleBreakLine=n.config.isContentTitleBreakLine,e.isContentSubTitleBreakLine=n.config.isContentSubTitleBreakLine,e.isAutoCheckKeywords=n.config.isAutoCheckKeywords,e.isCheckContentLevel=n.config.isCheckContentLevel,e.checkContentLevel=e.isCheckContentLevel?n.config.checkContentLevel:1,e.checkContentDefaultLevel=n.config.checkContentDefaultLevel,e.pageType="list",e.pageLoad=!0)})},submit:function(){var e=this;e.isCheckContentLevel=e.checkContentLevel>1,pageUtils.loading(!0),$api.post({isSaveImageInTextEditor:e.isSaveImageInTextEditor,isAutoPageInTextEditor:e.isAutoPageInTextEditor,autoPageWordNum:e.autoPageWordNum,isContentTitleBreakLine:e.isContentTitleBreakLine,isContentSubTitleBreakLine:e.isContentSubTitleBreakLine,isAutoCheckKeywords:e.isAutoCheckKeywords,isCheckContentLevel:e.isCheckContentLevel,checkContentLevel:e.checkContentLevel,checkContentDefaultLevel:e.checkContentDefaultLevel},function(t,n){pageUtils.loading(!1),t?e.pageAlert={type:"danger",html:t.message}:(e.pageAlert={type:"success",html:"内容设置保存成功！"},e.siteInfo=_.clone(n.value),e.config=_.clone(n.config),e.pageType="list")})},btnSubmitClick:function(){var e=this;this.$validator.validate().then(function(t){t&&e.submit()})},getCheckContentLevel:function(e){switch(e){case 1:return"一级";case 2:return"二级";case 3:return"三级";case 4:return"四级";case 5:return"五级";default:return"一级"}}};new Vue({el:"#main",data:data,methods:methods,created:function(){this.getConfig()}});