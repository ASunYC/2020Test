var $url="/pages/cms/libraryText",data={siteId:utils.getQueryInt("siteId"),pageLoad:!1,pageType:"card",drawer:!1,isGroupForm:!1,groupForm:{siteId:utils.getQueryInt("siteId"),name:""},groups:null,count:null,items:null,urlList:null,renameId:0,renameTitle:"",deleteId:0,selectedGroupId:0,form:{siteId:utils.getQueryInt("siteId"),keyword:"",groupId:0,page:1,perPage:24}},methods={apiList:function(t){var i=this;this.form.page=t,$api.post($url+"/list",this.form).then(function(t){var e=t.data;i.groups=e.groups,i.count=e.count,i.items=e.items,i.urlList=_.map(i.items,function(t){return t.imageUrl})}).catch(function(t){utils.notifyError(i,t)}).then(function(){i.pageLoad=!0,utils.loading(!1)})},apiCreateGroup:function(){var t=this;utils.loading(!0),$api.post($url+"/groups",this.groupForm).then(function(i){var e=i.data;t.groups.push(e)}).catch(function(i){t.$notify.error({title:"错误",message:i.message})}).then(function(){t.isGroupForm=!1,utils.loading(!1)})},apiRenameGroup:function(){var t=this;utils.loading(!0),$api.put($url+"/groups/"+this.form.groupId,this.groupForm).then(function(i){var e=i.data;_.find(t.groups,function(i){return i.id===t.form.groupId}).groupName=e.groupName}).catch(function(i){t.$notify.error({title:"错误",message:i.message})}).then(function(){t.isGroupForm=!1,utils.loading(!1)})},apiDeleteGroup:function(){var t=this;utils.loading(!0),$api.delete($url+"/groups/"+this.form.groupId).then(function(i){i.data;_.remove(t.groups,function(i){return i.id===t.form.groupId})}).catch(function(i){t.$notify.error({title:"错误",message:i.message})}).then(function(){t.isGroupForm=!1,t.form.groupId=0,utils.loading(!1)})},apiDelete:function(t){var i=this;utils.loading(!0),$api.delete($url+"/"+t.id).then(function(e){e.data;i.items.splice(i.items.indexOf(t),1)}).catch(function(t){utils.notifyError(i,t)}).then(function(){utils.loading(!1)})},getLinkUrl:function(t){return"library"+t+".cshtml?siteId="+this.siteId},getGroupName:function(){var t=this;return this.form.groupId>0?_.find(this.groups,function(i){return i.id===t.form.groupId}).groupName:""},getUploadUrl:function(){return apiUrl+$url+"?siteId="+this.siteId+"&groupId="+this.form.groupId},btnCreateClick:function(){top.utils.openLayer({title:"创建图文",url:"cms/"+this.getLinkUrl("Editor"),full:!0,max:!0})},btnUpdateClick:function(t){top.utils.openLayer({title:"修改图文",url:"cms/"+this.getLinkUrl("Editor")+"&textId="+t.id,full:!0,max:!0})},btnSelectGroupClick:function(t){this.selectedGroupId=this.selectedGroupId===t?0:t},btnSelectGroupSubmit:function(t){t.groupId=this.selectedGroupId,t.isSelectGroups=!1;var i=this;$api.put($url+"/"+t.id,t).then(function(t){t.data;i.$message.success("转移分组成功"),i.selectedGroupId!==i.form.groupId&&0!==i.form.groupId&&i.btnSearchClick()}).catch(function(t){utils.notifyError(i,t)})},rename:function(t){if(0!==this.renameId){if(!this.renameTitle)return this.$message.error("名称不能为空"),!1;if(this.renameId=0,t.title===this.renameTitle)return!1;t.title=this.renameTitle;var i=this;return $api.put($url+"/"+t.id,t).then(function(t){t.data;i.$message.success("编辑名称成功")}).catch(function(t){utils.notifyError(i,t)}),!1}},btnGroupClick:function(t){var i=this;this.form.groupId=t,this.form.page=1,utils.loading(!0),$api.post($url+"/list",this.form).then(function(t){var e=t.data;i.groups=e.groups,i.count=e.count,i.items=e.items,i.urlList=_.map(i.items,function(t){return t.imageUrl})}).catch(function(t){i.$notify.error({title:"错误",message:t.message})}).then(function(){i.pageLoad=!0,utils.loading(!1)})},btnDropdownClick:function(t){this.pageType=t},btnCreateGroupClick:function(){this.groupForm.name="",this.isGroupForm=!0},btnRenameGroupClick:function(){var t=this,i=_.find(this.groups,function(i){return i.id===t.form.groupId});this.groupForm.name=i.groupName,this.isGroupForm=!0},btnDeleteGroupClick:function(){var t=this;utils.alertDelete({title:"删除分组",text:"仅删除分组，不删除图片，组内图片将自动归入未分组",callback:function(){t.apiDeleteGroup()}})},btnDeleteClick:function(t){var i=this;utils.alertDelete({title:"删除素材",text:"确定删除此素材吗？",callback:function(){i.apiDelete(t)}})},btnGroupSubmitClick:function(){var t=this;this.$refs.groupForm.validate(function(i){if(!i)return!1;t.form.groupId>0?t.apiRenameGroup():t.apiCreateGroup()})},btnSearchClick(){utils.loading(!0),this.apiList(1)},btnPageClick:function(t){utils.loading(!0),this.apiList(t)},uploadBefore(t){return!!/(\.doc|\.docx|\.wps)$/i.exec(t.name)||(this.$message.error("文件只能是 Word 格式，请选择有效的文件上传!"),!1)},uploadProgress:function(){utils.loading(!0)},uploadSuccess:function(t){this.items.splice(0,0,t),this.count++,utils.loading(!1)},uploadError:function(t){utils.loading(!1);var i=JSON.parse(t.message);this.$message.error(i.message)}};new Vue({el:"#main",data:data,methods:methods,created:function(){this.apiList(1)}});