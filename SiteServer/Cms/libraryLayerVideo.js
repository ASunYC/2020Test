var $urlUploadVideo=apiUrl+"/pages/cms/libraryLayerVideo/actions/uploadVideo?siteId="+utils.getQueryInt("siteId"),$urlUploadImage=apiUrl+"/pages/cms/libraryLayerVideo/actions/uploadImage?siteId="+utils.getQueryInt("siteId"),data={pageLoad:!1,pageAlert:null,activeName:"first",form:{siteId:utils.getQueryInt("siteId"),type:"upload",videoUrl:"",isPoster:!1,isAutoPlay:!1,isWidth:!1,isHeight:!1,imageUrl:"",width:"100%",height:"300px",isLinkToOriginal:!0},player:null},methods={btnTabsClick:function(){"second"===this.activeName&&(this.player?(this.player.poster(this.form.isPoster?this.form.imageUrl:""),this.player.src([{src:this.form.videoUrl}])):this.player=videojs(this.$refs.videoPlayer,{poster:this.form.isPoster?this.form.imageUrl:"",sources:[{src:this.form.videoUrl}]}))},btnSubmitClick:function(){if(!this.form.videoUrl)return this.$message.error("请设置需要插入的视频文件！"),!1;var e=this.form.isPoster&&this.form.imageUrl?' imageUrl="'+this.form.imageUrl+'"':"",i=' isAutoPlay="'+this.form.isAutoPlay+'"',s=this.form.isWidth?' width="'+this.form.width+'"':"",r=this.form.isHeight?' height="'+this.form.height+'"':"";parent.insertHtml("<img "+e+i+s+r+' playUrl="'+this.form.videoUrl+'" class="siteserver-stl-player" style="width: 333px; height: 333px" src="../assets/ueditor/video-clip.png" /><br/>'),parent.layer.closeAll()},btnCancelClick:function(){parent.layer.closeAll()},uploadVideoBefore(e){return!!/(\.mp4|\.flv|\.f4v|\.webm|\.m4v|\.mov|\.3gp|\.3g2)$/i.exec(e.name)||(this.$message.error("文件只能是视频格式，请选择有效的文件上传!"),!1)},uploadImageBefore(e){return/(\.jpg|\.jpeg|\.bmp|\.gif|\.png|\.webp)$/i.exec(e.name)?!!(e.size/1024/1024<10)||(this.$message.error("上传图片大小不能超过 10MB!"),!1):(this.$message.error("文件只能是图片格式，请选择有效的文件上传!"),!1)},uploadProgress:function(){utils.loading(!0)},uploadVideoSuccess:function(e){this.form.videoUrl=e.url,this.form.type="url",utils.loading(!1)},uploadImageSuccess:function(e){this.form.imageUrl=e.url,utils.loading(!1)},uploadError:function(e){utils.loading(!1);var i=JSON.parse(e.message);this.$message.error(i.message)}};new Vue({el:"#main",data:data,methods:methods,created:function(){this.pageLoad=!0}});