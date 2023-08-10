<script setup>
// import { useStore } from "@/stores/user";
import {  ref } from "vue";
// import { useRouter } from "vue-router";
import layout from "@/components/layout/AuthLayout.vue";
import TabSelector from "@/components/ui/TabSelector.vue";
// import dayjs from "dayjs";
const activetab = ref('1');

// const store = useStore();
// const router = useRouter();
// let loading = ref(false);

// const onFinish = async (values) => {
//     loading.value = true;

//     let dob = dayjs(formState.dob).format("YYYY-MM-DD")

//     try {
//         const res = await login(values.email, values.password, dob)
//         store.saveUser(res.data)
//         router.push({ name: "dashboard" });

//     } catch (error) {
//         console.log(error)
//     }

//     finally {
//         loading.value = false;
//     }
// };

// const togglrRemember = () => {
//     formState.remember = !formState.remember;
// };

// const formState = reactive({
//     email: "",
//     password: "",
//     remember: false,
//     dob: "",
// });
const signupTerms = [
    { content: "Get discovered by building your profile and portfolio" },
    { content: "Find new job opportunities in your field" },
    { content: "Grow by join a community of creative professionals" },
]
</script>

<template>
    <layout class="bg-[#E9FAFB] ">
                        <h1 class="md:text-[36px] font-EBGaramond500 text-2xl font-bold mb-1 md:mb-2">
    How will you use MySpurr?                    </h1>
                    <p class="text-[16px] font-Satoshi400 mb-6 md:mb-4">
    Please select an option below.                    </p>

        <div class=" justify-center w-full md:bg-white rounded-[11.315px] min-h-full p-8">
        <tab-selector v-model="activetab">
          <template #tab1>
            Creative talent content
          </template>
          <template #tab2>
            Business content
          </template>
        </tab-selector>
<div class="bg-[#E6F1F3] rounded-[4.181px] p-8 mt-10">
                        <p class="text-[11.692px] text-[#011B1F] font-Satoshi500 mb-6 md:mb-4">
       Signup as a creative talent to         
               </p>
<div v-for="item in signupTerms" :key="item">
    <div class="flex flex-col md:flex-row">
        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M10.4108 18.7397C15.0107 18.7397 18.7397 15.0107 18.7397 10.4108C18.7397 5.81097 15.0107 2.08203 10.4108 2.08203C5.81097 2.08203 2.08203 5.81097 2.08203 10.4108C2.08203 15.0107 5.81097 18.7397 10.4108 18.7397ZM14.4259 8.52762C14.6795 8.17887 14.6024 7.69052 14.2537 7.43688C13.9049 7.18324 13.4166 7.26035 13.1629 7.6091L9.536 12.5961L7.57939 10.6395C7.27446 10.3346 6.78007 10.3346 6.47514 10.6395C6.1702 10.9445 6.1702 11.4389 6.47514 11.7438L9.07789 14.3466C9.23936 14.508 9.46343 14.5907 9.69109 14.5729C9.91875 14.555 10.1272 14.4384 10.2615 14.2537L14.4259 8.52762Z" fill="#43D0DF"/>
    </svg>          
                  <p class="text-[8.41px] text-[#011B1F] font-Satoshi400 leading-[19.572px] mb-1">
         {{ item.content }}              </p>
    </div>
</div>
<div class="mt-4"><button class="bg-[#43D0DF] font-Satoshi500 text-[8.115px] uppercase leading-[11.593px] rounded-full p-3 w-full">NEXT</button></div>

    </div>
        </div> 
    </layout>
</template>