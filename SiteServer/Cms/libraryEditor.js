var $url="/pages/cms/libraryEditor",$urlUpload=apiUrl+"/pages/cms/libraryEditor/actions/upload?siteId="+utils.getQueryInt("siteId");function insertHtml(t){t&&new FroalaEditor("textarea#content").html.insert(t)}var data={siteId:utils.getQueryInt("siteId"),textId:utils.getQueryInt("textId"),mainHeight:"",pageLoad:!1,pageAlert:null,isSettings:!0,activeNames:["0","1"],title:null,content:null,imageUrl:null,summary:null,editor:null},methods={getConfig:function(){var t=this;if(0===t.textId)return t.pageLoad=!0,void t.loadEditor();window.onresize=t.winResize,window.onresize(),$api.get($url+"/"+t.textId,{params:{siteId:t.siteId}}).then(function(e){var i=e.data;t.loadEditor(i)}).catch(function(e){utils.notifyError(t,e)}).then(function(){t.pageLoad=!0})},loadEditor:function(t){t&&(this.title=t.title,this.content=t.content,this.imageUrl=t.imageUrl,this.summary=t.summary);var e=this;setTimeout(function(){e.editor=new FroalaEditor("textarea#content",{language:"zh_cn",heightMin:390,toolbarButtons:[["bold","italic","underline","strikeThrough","subscript","superscript"],["fontFamily","fontSize","textColor","backgroundColor"],["inlineClass","inlineStyle","clearFormatting"]]})},100)},winResize:function(){this.mainHeight=$(window).height()-85+"px"},btnLayerClick:function(t){this.pageAlert=null,utils.openLayer({title:t.title,url:"libraryLayer"+t.name+".cshtml?siteId="+this.siteId,full:t.full,width:t.width?t.width:700,height:t.height?t.height:500})},btnCancelClick:function(){utils.closeLayer()},btnSaveClick:function(){this.content=this.editor.html.get(!0);var t=this;this.title?this.content?(utils.loading(!0),0===this.textId?$api.post($url,{title:this.title,content:this.content,imageUrl:this.imageUrl,summary:this.summary}).then(function(t){t.data;var e=parent.document.getElementById("frmMain"),i=e.contentWindow||e.contentDocument;i.document&&(i=i.document),i.location.reload(),utils.closeLayer()}).catch(function(e){utils.notifyError(t,e)}).then(function(){utils.loading(!1)}):$api.put($url+"/"+this.textId,{title:this.title,content:this.content,imageUrl:this.imageUrl,summary:this.summary}).then(function(t){t.data;var e=parent.document.getElementById("frmMain"),i=e.contentWindow||e.contentDocument;i.document&&(i=i.document),i.location.reload(),utils.closeLayer()}).catch(function(e){utils.notifyError(t,e)}).then(function(){utils.loading(!1)})):this.$message.error("正文不能为空!"):this.$message.error("标题不能为空!")},uploadBefore(t){return/(\.jpg|\.jpeg|\.bmp|\.gif|\.svg|\.png|\.webp)$/i.exec(t.name)?!!(t.size/1024/1024<10)||(this.$message.error("上传图片大小不能超过 10MB!"),!1):(this.$message.error("文件只能是图片格式，请选择有效的文件上传!"),!1)},uploadProgress:function(){utils.loading(!0)},uploadSuccess(t,e){this.imageUrl=t.value,utils.loading(!1)},uploadError:function(t){utils.loading(!1);var e=JSON.parse(t.message);this.$message.error(e.message)}};new Vue({el:"#main",data:data,methods:methods,created:function(){this.getConfig()}});