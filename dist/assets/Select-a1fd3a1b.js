import{o as a,c as o,f as n,t as r,F as u,h as i,m as d}from"./index-bf3d716c.js";const m=["value"],c={disabled:"",value:""},p=["value"],h={__name:"Select",props:{modelValue:String|Number,items:Array,placeholder:String},emits:["update:modelValue"],setup(t,{emit:f}){return(l,s)=>(a(),o("select",d(l.$attrs,{class:"form__input block w-full p-2 px-1 text-sm font-Satoshi400 text-gray-800 transition duration-500 focus:outline-none rounded",value:t.modelValue,onInput:s[0]||(s[0]=e=>l.$emit("update:modelValue",e.target.value))}),[n("option",c,"Select "+r(t.placeholder),1),(a(!0),o(u,null,i(t.items,e=>(a(),o("option",{key:e.id,value:e.id},r(e),9,p))),128))],16,m))}};export{h as default};
