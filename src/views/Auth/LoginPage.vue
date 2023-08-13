<script setup>
// import { useStore } from "@/stores/user";
import { reactive } from "vue";
// import { useRouter } from "vue-router";
import layout from "@/components/layout/AuthLayout.vue";
import PasswordInput from "@/components/ui/PasswordInput.vue";

// const store = useStore();
// const router = useRouter();
// let loading = ref(false);

// const onFinish = async (values) => {
//     loading.value = true;

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

const formState = reactive({
  email: "",
  password: "",
});
</script>

<template>
  <layout class="bg-[#00474F]">
    <div class="justify-center w-full md:bg-white rounded-[11.315px] p-2 my-8 lg:p-8">
      <!-- form input  -->
      <div class="py-3">
        <h1
          class="md:text-[22.225px] font-EBGaramond400 text-brand my-6 text-center text-2xl"
        >
          Log in
        </h1>
        <button
          @click="signupWithGoogle"
          class="w-full flex justify-center gap-2 font-light font-Satoshi400 !p-3 border-[#E5E5E5] border-[0.687px] opacity-[0.8029] rounded-[3.698px]"
        >
          <img class="w-[7%]" src="@/assets/svg/googleIcon.svg" alt="" />
          <p class="text-[16px] font-Satoshi400">Signup with Google</p>
        </button>
        <div class="flex gap-2 my-5">
          <span class="border-b-[#00000033] my-3 w-full border-b-[1px]"></span>
          <p>OR</p>
          <span class="border-b-[#00000033] my-3 w-full border-b-[1px]"></span>
        </div>

        <div class="flex flex-col gap-4">
          <div>
            <input
              class="w-full font-light font-Satoshi400 text-[14px] !p-3 border-[#254035] border-[0.509px] opacity-[0.8029] rounded-[4.074px] text-sm"
              placeholder="Email Address*"
              type="email"
              v-model="formState.email"
            />
          </div>

          <div>
            <PasswordInput placeholder="Password*" v-model="formState.password" />
          </div>
        </div>
        <div class="mt-4 text-right">
          <p class="font-Satoshi400 text-[13.269px] text-[#007582]">
            <router-link class="" to="/"> Forgot Password?</router-link>
          </p>
        </div>
        <div class="mt-4">
          <button
            class="bg-[#43D0DF] font-Satoshi500 text-[14px] uppercase leading-[11.593px] rounded-full p-5 w-full"
          >
            LOG in
          </button>
        </div>
        <div class="mt-4 text-center">
          <p class="font-Satoshi400 text-[13.269px] text-[#007582]">
            Need to create an account?
            <router-link class="" to="/"> Sign Up </router-link>
          </p>
        </div>
      </div>
    </div>
  </layout>
</template>
