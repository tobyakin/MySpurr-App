import{o as r,a as u,m as l}from"./index-9b5eb7f3.js";const n=["value"],p={__name:"Input",props:{modelValue:String|Number},emits:["update:modelValue"],setup(o,{emit:s}){return(e,t)=>(r(),u("input",l(e.$attrs,{class:"block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none rounded",value:o.modelValue,onInput:t[0]||(t[0]=a=>e.$emit("update:modelValue",a.target.value))}),null,16,n))}};export{p as default};