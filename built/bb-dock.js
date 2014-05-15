//     bb-dock
//     (c) simonfan
//     bb-dock is licensed under the MIT terms.

define("__bb-dock/base",["require","exports","module","dock","backbone"],function(e,t,i){var o=e("dock"),n=e("backbone"),a=i.exports=o.extend({afterAttach:function(e,t){this.listenTo(e,"all",this.trigger),t&&t.silent||this.trigger("attach",e,t)},afterDetach:function(e,t){this.stopListening(e,"all"),t&&t.silent||this.trigger("detach",e,t)}});a.assignProto(n.Events)}),define("bb-dock",["require","exports","module","backbone","./__bb-dock/base"],function(e,t){var i=e("backbone"),o=e("./__bb-dock/base"),n=t.model=o.extend({initialize:function(e){o.prototype.initialize.call(this,e),this.initializeModelDock(e)},initializeModelDock:function(){this.model||this.attach(new i.Model)},attachmentAttribute:"model"});n.defineProxies(["get","set","escape","has","unset","clear","toJSON","sync","fetch","save","destroy","keys","values","pairs","invert","pick","omit","validate","isValid","url","parse","clone","isNew","hasChanged","changedAttributes","previous","previousAttributes"]),n.defineProxies(["id","idAttribute","cid","attributes","changed","defaults","validationError","urlRoot"]);var a=t.collection=o.extend({initialize:function(e){o.prototype.initialize.call(this,e),this.initializeCollectionDock(e)},initializeCollectionDock:function(){this.collection||this.attach(new i.Collection)},attachmentAttribute:"collection"});a.defineProxies(["toJSON","sync","add","remove","reset","set","get","at","push","pop","unshift","shift","slice","sort","pluck","where","findWhere","parse","clone","fetch","create","forEach","each","map","collect","reduce","foldl","inject","reduceRight","foldr","find","detect","filter","select","reject","every","all","some","any","include","contains","invoke","max","min","toArray","size","first","head","take","initial","rest","tail","drop","last","without","difference","indexOf","shuffle","lastIndexOf","isEmpty","chain","sample","partition"])});