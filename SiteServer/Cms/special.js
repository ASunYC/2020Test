var $api=new apiUtils.Api(apiUrl+"/pages/cms/special"),$siteId=parseInt(pageUtils.getQueryStringByName("siteId")),data={pageLoad:!1,pageAlert:null,items:null,siteUrl:null},methods={getList:function(){var t=this;$api.get({siteId:$siteId},function(e,i){!e&&i&&i.value&&(t.items=i.value,t.siteUrl=i.siteUrl,t.pageLoad=!0)})},delete:function(t){var e=this;pageUtils.loading(!0),$api.delete({siteId:$siteId,specialId:t},function(t,i){pageUtils.loading(!1),!t&&i&&i.value&&(e.items=i.value)})},submit:function(t){var e=this;pageUtils.loading(!0),$api.post(t,function(i,l){pageUtils.loading(!1),i?e.pageAlert={type:"danger",html:i.message}:(e.pageAlert={type:"success",html:-1===t.id?"专题添加成功！":"专题修改成功！"},e.item=null,e.items=l.value)})},btnEditClick:function(t){return utils.openLayer({title:"编辑专题",url:"specialAddLayer.cshtml?siteId="+$siteId+"&isEditOnly=true&specialId="+t.id,width:500,height:400}),!1},btnUploadClick:function(t){return utils.openLayer({title:"上传文件",url:"specialAddLayer.cshtml?siteId="+$siteId+"&isUploadOnly=true&specialId="+t.id,full:!0}),!1},btnDownloadClick:function(t){pageUtils.loading(!0),$api.postAt("actions/download",{siteId:$siteId,specialId:t.id},function(t,e){pageUtils.loading(!1),!t&&e&&e.value&&(window.location.href=e.value)})},btnAddClick:function(){return utils.openLayer({title:"新建专题",url:"specialAddLayer.cshtml?siteId="+$siteId,full:!0}),!1},btnDeleteClick:function(t){var e=this;pageUtils.alertDelete({title:"删除专题",text:"此操作将删除专题 "+t.title+"，确定吗？",callback:function(){e.delete(t.id)}})}};new Vue({el:"#main",data:data,methods:methods,created:function(){this.getList()}});