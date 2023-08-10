<script setup>
// import { useStore } from "@/stores/user";
// import { reactive, ref } from "vue";
// import { useRouter } from "vue-router";
import layout from "@/components/layout/AuthLayout.vue";
// import dayjs from "dayjs";

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

</script>

<template>
    <layout class="bg-[#E9FAFB] ">
                        <h1 class="md:text-[36px] font-EBGaramond500 text-2xl font-bold mb-1 md:mb-2">
    How will you use MySpurr?                    </h1>
                    <p class="text-[16px] font-Satoshi400 mb-6 md:mb-4">
    Please select an option below.                    </p>

        <div class="flex justify-center w-full md:bg-white rounded-[11.315px] min-h-full">ll
            
           <!--  <a-card class="rounded-2xl border-0 w-full md:border-b md:shadow-2xl md:-translate-x-5 md:-translate-y-5">
                <div class="flex justify-between mb-8">
                    <a :href="landingUrl">
                        <img src="@/assets/img/logo.svg" alt="Logo" /></a>
                    <div>
                        <a :href="landingUrl" class="flex items-center gap-2 text-brand">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
                            </svg>
                            Back to home
                        </a>
                    </div>
                </div>
                <h1 class="md:text-3xl font-Satoshi900 text-2xl font-bold mb-1 md:mb-2">
                    Log in
                </h1>
                <p class="text-sm font-Satoshi400 mb-6 md:mb-4">
                    Welcome, enter your login details to continue
                </p>
                <a-form :model="formState" class="" layout="vertical" name="basic" autocomplete="off" @finish="onFinish">
                    <div class="flex-wrap md:flex-nowrap">
                        <div class="relative mb-6">
                            <label
                                class="text-center text-brand hidden font-Satoshi400 font-normal md:font-bold md:text-black absolute z-10 top-[-9px] left-[5%] bg-white">
                                Email Address</label>
                            <a-form-item class="w-full text-xs text-brand font-Satoshi400" name="email" :rules="[
                                {
                                    required: true,
                                    message: 'Please input your email address!',
                                },
                            ]">
                                <a-input class="w-full font-light !p-3 rounded text-sm"
                                    placeholder="Enter your email address" v-model:value="formState.email" />
                            </a-form-item>
                        </div>

                        <div class="relative">
                            <label
                                class="text-center hidden font-Satoshi400 px-1 text-brand font-normal md:font-bold md:text-black absolute z-10 top-[-8px] left-[5%] bg-white">
                                Password
                            </label>
                            <a-form-item class="w-full font-Satoshi400 mb-4" name="password" :rules="[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                            ]">
                                <a-input-password class="w-full font-light py-3 rounded text-sm"
                                    placeholder="Enter your password" v-model:value="formState.password" />
                            </a-form-item>
                        </div>

                        <div class="my-6">
                            <a-form-item :rules="[
                                {
                                    required: true,
                                    message: 'Select your date of birth!',
                                },
                            ]">
                                <a-date-picker class="font-Satoshi400 !h-0" placeholder="Select date of birth"
                                    v-model:value="formState.dob" />
                            </a-form-item>
                        </div>

                        <div class="flex justify-between my-6">
                            <div @click="togglrRemember" class="flex gap-2 items-center">
                                <p :class="formState.remember && 'bg-brand  border-brand'"
                                    class="w-5 h-5 flex justify-center items-center rounded-full border">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        stroke-width="1.5" stroke="currentColor" class="w-3 h-3 text-white">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                    </svg>
                                </p>
                                <p class="font-Satoshi400">Remember Me</p>
                            </div>
                            <router-link :to="{ name: 'ResetPassword' }"
                                class="text-brand hover:text-brand font-Satoshi400 md:text-sm">
                                Forgot password?
                            </router-link>
                        </div>

                        <a-form-item>
                            <button
                                class="flex gap-1 items-center justify-center h-10 md:h-12 w-full font-bold rounded-lg bg-primary-light text-white mb-6"
                                type="submit" block ty>
                                Log in
                                <img v-if="loading" class="animate-spin" src="../../assets/img/spinner.svg" />
                            </button>
                        </a-form-item>
                    </div>

                    <p class="text-center text-sm">
                        You don't have an account?
                        <router-link :to="{ name: 'registration' }" class="text-primary-light font-bold">Sign
                            up</router-link>
                    </p>
                </a-form>
            </a-card>-->
        </div> 
    </layout>
</template>