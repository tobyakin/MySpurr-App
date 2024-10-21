<template>
   <CenteredModalLarge>
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
</template>

<script setup>
import CenteredModalLarge from "@/components/ui/CenteredModalLarge.vue";
import ShortLoader from "@/components/ui/Loader/ShortLoader.vue";

</script>

<style lang="scss" scoped>

</style>