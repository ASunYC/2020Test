var $api=new apiUtils.Api(apiUrl+"/pages/shared/tableStyle"),data={tableName:pageUtils.getQueryStringByName("tableName"),attributeName:pageUtils.getQueryStringByName("attributeName"),relatedIdentities:pageUtils.getQueryStringByName("relatedIdentities"),pageLoad:!1,pageAlert:null,styleInfo:null,inputTypes:null,isRapid:null,rapidValues:null},methods={getStyle:function(){var e=this;$api.get({tableName:this.tableName,attributeName:this.attributeName,relatedIdentities:this.relatedIdentities},function(t,a){e.pageLoad=!0,!t&&a&&(e.styleInfo=a.value,e.inputTypes=a.inputTypes,e.isRapid=a.isRapid,e.rapidValues=a.rapidValues)})},btnSubmitClick:function(){var e=this;this.$validator.validate().then(function(t){t&&(pageUtils.loading(!0),$api.post({tableName:e.tableName,attributeName:e.attributeName,relatedIdentities:e.relatedIdentities,styleInfo:e.styleInfo},function(t,a){pageUtils.loading(!1),!t&&a?(parent.reloadPage(),pageUtils.closeLayer()):e.pageAlert={type:"danger",html:t.message}}))})},btnStyleItemRemoveClick:function(e){this.styleInfo.styleItems.splice(e,1),0===this.styleInfo.styleItems.length&&this.btnStyleItemAddClick()},btnStyleItemAddClick:function(){this.styleInfo.styleItems.push({itemTitle:"",itemValue:"",isSelected:!1})},btnRadioClick:function(e){for(var t=0;t<this.styleInfo.styleItems.length;t++){this.styleInfo.styleItems[t].isSelected=!1}this.styleInfo.styleItems[e].isSelected=!0}};new Vue({el:"#main",data:data,methods:methods,created:function(){this.getStyle()}});