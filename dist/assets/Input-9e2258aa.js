import{o as a,c as u,m as l}from"./index-af916bc1.js";const n=["value"],p={__name:"Input",props:{modelValue:String|Number},emits:["update:modelValue"],setup(o,{emit:s}){return(e,t)=>(a(),u("input",l(e.$attrs,{class:"block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none rounded",value:o.modelValue,onInput:t[0]||(t[0]=r=>e.$emit("update:modelValue",r.target.value))}),null,16,n))}};export{p as default};