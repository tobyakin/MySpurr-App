<template>
   <CenteredModalLarge :class="verifyStatus?.data?.value.status !== 'success'? 'opacity-100 z-[1]': 'opacity-0 z-[0]'" class="transitionItems">
        <div class="text-center px-10 py-10">
            <ShortLoader />
          <h4 class="text-[#01181B] font-Satoshi700 text-[28.537px] mt-[20px]">
            Your payment is processing 
          </h4>
          <p class="text-[#01181B] text-[18px] font-Satoshi400 mt-4">
            Now, talented creatives can discover and apply for your exciting opportunity. Stay tuned for applications and manage your job seamlessly from your dashboard.
          </p>
        </div>
      </CenteredModalLarge>
      <div v-if="verifyStatus">
        <CenteredModalLarge v-if="verifyStatus?.data?.value.status === 'success'" class="transitionItems">
          <div class="text-center px-10 py-10">
            <h4 class="text-[#01181B] font-Satoshi700 text-[28.537px] mt-[20px]">
              Congratulations! Your job has been successfully posted on MySpurr!
            </h4>
            <p class="text-[#01181B] text-[18px] font-Satoshi400 mt-4">
              Now, talented creatives can discover and apply for your exciting opportunity.
              Stay tuned for applications and manage your job seamlessly from your dashboard.
            </p>
            <div class="flex justify-center gap-4 mt-12">
              <button
                @click="back()"
                class="bg-[#43D0DF] font-Satoshi500 text-[14.153px] uppercase leading-[11.593px] rounded-full px-5 p-3 w-[45%] text-[#fff] btn-hover-1"
              >
                BACK</button
              ><button
                @click="goToJobList()"
                class="bg-[#43D0DF] font-Satoshi500 text-[14.153px] uppercase leading-[11.593px] rounded-full px-5 p-3 w-[45%] text-[#fff] btn-hover-1"
              >
                <span>JOB LISTING </span>
              </button>
            </div>
          </div>
        </CenteredModalLarge>
        <CenteredModalLarge v-else class="transitionItems">
          <div class="text-center px-10 py-10">
            <h4 class="text-[#01181B] font-Satoshi700 text-[28.537px] mt-[20px]">
              Payment Verification Failed
            </h4>
            <div class="flex justify-center gap-4 mt-12">
              <button
                @click="back()"
                class="bg-[#43D0DF] font-Satoshi500 text-[14.153px] uppercase leading-[11.593px] rounded-full px-5 p-3 w-[45%] text-[#fff] btn-hover-1"
              >
                BACK</button
              ><button
                @click="goToJobList()"
                class="bg-[#43D0DF] font-Satoshi500 text-[14.153px] uppercase leading-[11.593px] rounded-full px-5 p-3 w-[45%] text-[#fff] btn-hover-1"
              >
                <span>JOB LISTING </span>
              </button>
            </div>
          </div>
        </CenteredModalLarge>
      </div>
</template>

<script setup>
import CenteredModalLarge from "@/components/ui/CenteredModalLarge.vue";
import ShortLoader from "@/components/ui/Loader/ShortLoader.vue";
import { useJobsStore } from "@/stores/jobs";
import { onMounted, computed, ref } from "vue";
import { useUserProfile } from "@/stores/profile";
import { useRoute, useRouter } from "vue-router";
import { storeToRefs } from "pinia";

const jobsStore = useJobsStore();
const { verifyStatus } = storeToRefs(jobsStore);
const userProfile = useUserProfile();
const userDetails = computed(() => {
  return userProfile.user.data;
});
const route = useRoute()
const router = useRouter()
const verificationSuccesful = ref(false)

const back = () => {
  router.push({ name: "post-jobs"})
}
const goToJobList = () => {
  router.push({ name: "job-lists" });
};

onMounted(async ()=>{
  await userProfile.userProfile();
  await jobsStore.handlePaymentVerification(
    userDetails?.value?.id,
    route.query.reference
  )

  console.log(verifyStatus.value?.data?.value?.status)
})

</script>

<style lang="scss" scoped>

</style>