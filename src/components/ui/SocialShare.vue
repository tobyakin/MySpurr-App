<template>
    <div class="flex items-center gap-[0.7rem] msgMob:gap-[0.5rem]">
        <a :href="`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`" target="_blank">
        <facebookIcon class="hover:text-[#2F929C] transitionItem"/>
      </a>
       <a :href="`https://api.whatsapp.com/send?text=${encodedUrl}`" target="_blank">
        <whatsAppIcon class="hover:text-[#2F929C] transitionItem"/>
      </a>
      <a :href="`https://twitter.com/intent/tweet?text=${encodedMessage}&url=${encodedUrl}`" target="_blank">
        <twitterIcon class="hover:text-[#2F929C] transitionItem"/>
      </a>
      <a :href="`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`" target="_blank">
        <LinkedinIcon class="hover:text-[#2F929C] transitionItem"/>
      </a>
   </div>
  </template>
  
  <script setup>
   import facebookIcon from "@/components/icons/eventFacebookIcon.vue"
   import whatsAppIcon from "@/components/icons/whatsAppIcon.vue"
   import LinkedinIcon from "@/components/icons/eventLinkedinIcon.vue"
   import twitterIcon from "@/components/icons/eventTwitterIcon.vue";
   import { ref } from "vue";

    const title = ref('MySpurr');
    const description = ref('Career Coaching for Creatives: Your Path to Professional Excellence');
    const url = ref('https://www.myspurr.net/career-development/career-coaching-for-creatives-your-path-to-professional-excellence');
    // const imageUrl = ref('https://ik.imagekit.io/ldtt3hq8g2/blog/1720275662__9fCtRfyN.jpg');
    
    const encodedUrl = encodeURIComponent(url.value);
    const encodedMessage = encodeURIComponent(`${title.value} - ${description.value}`);
  </script>
  
  <style scoped>
  
  </style>