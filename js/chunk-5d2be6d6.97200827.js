(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-5d2be6d6"],{"0e4b":function(a,t,e){"use strict";var c=e("24c2"),s=e.n(c);s.a},"24c2":function(a,t,e){},f96d:function(a,t,e){"use strict";e.r(t);var c=function(){var a=this,t=a.$createElement,e=a._self._c||t;return e("div",{staticClass:"academy-page mb-3"},[e("div",{staticClass:"container py-3"},[e("div",{staticClass:"row"},[e("h1",{staticClass:"mx-auto"},[a._v(a._s(a.academy.data.title))])]),e("hr"),e("div",{staticClass:"row"},[e("div",{staticClass:"col-md-8 offset-md-2"},[e("div",{staticClass:"academy-body",domProps:{innerHTML:a._s(a.academy.data.content)}})])])])])},s=[],n=e("b22f"),d={props:{products:Array,cart:Array,coupon:Object},data:function(){return{academyId:this.$route.params.id,academy:{id:"",data:{}}}},methods:{getData:function(){var a=this,t=this.$loading.show();n["a"].doc(this.academyId).get().then((function(e){t.hide(),a.academy.id=e.id,a.academy.data=e.data()}))},formatDate:function(a){var t=new Date(1e3*a),e="";return e+="".concat(t.getFullYear(),"/"),e+="".concat(t.getMonth(),"/"),e+="".concat(t.getDate()),e}},created:function(){this.getData()}},i=d,o=(e("0e4b"),e("2877")),r=Object(o["a"])(i,c,s,!1,null,"77519cae",null);t["default"]=r.exports}}]);
//# sourceMappingURL=chunk-5d2be6d6.97200827.js.map