var $url="/pages/cms/libraryLayerImage",$urlUpload=apiUrl+"/pages/cms/libraryLayerImage/actions/upload?siteId="+utils.getQueryInt("siteId"),data={pageLoad:!1,pageAlert:null,uploadList:[],dialogImageUrl:"",dialogVisible:!1,fileUrls:[]},methods={btnSubmitClick:function(){if(0===this.fileUrls.length)return this.$message.error("请选择需要插入的图片文件！"),!1;for(var e=0;e<this.fileUrls.length;e++){var r=this.fileUrls[e];parent.insertHtml('<img src="'+r+'" border="0" /><br/>')}parent.layer.closeAll()},btnCancelClick:function(){parent.layer.closeAll()},uploadBefore(e){return/(\.jpg|\.jpeg|\.bmp|\.gif|\.png|\.webp)$/i.exec(e.name)?!!(e.size/1024/1024<10)||(this.$message.error("上传图片大小不能超过 10MB!"),!1):(this.$message.error("文件只能是图片格式，请选择有效的文件上传!"),!1)},uploadProgress:function(){utils.loading(!0)},uploadSuccess:function(e){this.fileUrls.push(e.url),utils.loading(!1)},uploadError:function(e){utils.loading(!1);var r=JSON.parse(e.message);this.$message.error(r.message)},uploadRemove(e){e.response&&this.fileUrls.splice(this.fileUrls.indexOf(e.response.url),1)},uploadPictureCardPreview(e){this.dialogImageUrl=e.url,this.dialogVisible=!0}};new Vue({el:"#main",data:data,methods:methods,created:function(){this.pageLoad=!0}});