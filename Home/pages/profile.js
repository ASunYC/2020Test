var data={pageUser:null,pageConfig:null,pageAlert:null,avatarUrl:null,uploadUrl:null,files:[],editAvatar:!1,cropper:!1,styles:[]},methods={load:function(e,t,a){this.pageUser=e,this.pageConfig=t,this.avatarUrl=this.pageUser.avatarUrl||this.pageConfig.homeDefaultAvatarUrl||"../assets/images/default_avatar.png",this.uploadUrl=utils.getApiUrl("/v1/users/"+this.pageUser.id+"/avatar?userToken="+utils.getToken()),this.styles=a;for(var i=0;i<this.styles.length;i++){var s=this.styles[i];s.value=this.pageUser[_.camelCase(s.attributeName)]}},editSave:function(){this.pageAlert=null,this.editAvatar=!1;for(var e=this.files[0],t=atob(this.cropper.getCroppedCanvas().toDataURL(e.type).split(",")[1]),a=new Uint8Array(t.length),i=0;i<t.length;i++)a[i]=t.charCodeAt(i);var s=new File([a],e.name,{type:e.type});this.$refs.upload.update(e.id,{file:s,type:s.type,size:s.size,active:!0})},inputFile:function(e,t,a){e&&!t&&this.$nextTick(function(){this.editAvatar=!0}),!e&&t&&(this.editAvatar=!1),e&&t&&e.xhr&&e.success!==t.success&&(this.pageUser=e.response.value,this.avatarUrl=this.pageUser.avatarUrl)},inputFilter:function(e,t,a){if(e&&!t&&!/\.(gif|jpg|jpeg|png|webp)$/i.test(e.name))return a();if(e&&(!t||e.file!==t.file)){e.url="";var i=window.URL||window.webkitURL;i&&i.createObjectURL&&(e.url=i.createObjectURL(e.file))}},submit:function(){for(var e=this,t={},a=0;a<this.styles.length;a++){var i=this.styles[a];t[i.attributeName]=i.value}parent.utils.loading(!0),new utils.Api("/v1/users/"+this.pageUser.id).put(t,function(t,a){parent.utils.loading(!1),t?e.pageAlert={type:"danger",html:t.message}:(e.pageUser=a.value,e.pageAlert={type:"success",html:"个人资料修改成功"},utils.scrollToTop())})},btnSubmitClick:function(e){e.preventDefault(),this.pageAlert=null;var t=this;this.$validator.validate().then(function(e){e&&t.submit()})}};new Vue({el:"#main",data:data,components:{FileUpload:VueUploadComponent},watch:{editAvatar:function(e){e?this.$nextTick(function(){if(this.$refs.editImage){var e=new Cropper(this.$refs.editImage,{aspectRatio:1,viewMode:1});this.cropper=e}}):this.cropper&&(this.cropper.destroy(),this.cropper=!1)}},methods:methods,created:function(){var e=this;utils.getConfig("profile",function(t){t.value?e.load(t.value,t.config,t.styles):utils.redirectLogin()})}});