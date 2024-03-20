<script setup>
defineProps({ title: String });
</script>
<template>
  <div class="p-0 lg:p-6 lg:py-20 py-4 mb-5">
    <p class="text-[#244034] text-[75.221px] mt-8 leading-[113%] font-EBGaramond500">
      {{ title }}
      yet to go live.
    </p>
    <p class="text-[#244034] text-[17.633px] mt-10 leading-[27.356px] font-Satoshi400">
      Thanks for stopping by anyways. We are still building your talent dashboard, and
      <br />
      we will be launching your talent wallet soon. <br />
    </p>

    <p class="text-[#244034] text-[17.633px] mt-10 leading-[27.356px] font-Satoshi400">
      Is there anything you’ll like to see, be sure to
      <a href="mailto: hello@myspurr.net" class="underline-offset-2 underline"
        >hello@myspurr.net</a
      >
    </p>
    <p class="text-[#244034] text-[17.633px] mt-10 leading-[27.356px] font-Satoshi400">
      Cheers
    </p>
  </div>
</template>
