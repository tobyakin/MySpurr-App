<template>
  {{ event.slug }}
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
   import { useHead } from '@vueuse/head';
  import { computed } from "vue";

  const dashboardUrl = import.meta.env.VITE_LANDING_PAGE;
   const props = defineProps({
      event: {
        type: Object,
        required: true,
      },
    });

    
    const title = ref('MySpurr');
    const description = computed(() => props.event.title || 'Default description');
    const url = computed(() => `${dashboardUrl}events/` + props.event.slug);
    const imageUrl = computed(() => props.event.featured_graphics || 'Default Image URL');
    
    const encodedUrl = encodeURIComponent(url.value);
    const encodedMessage = encodeURIComponent(`${title.value} - ${description.value}`);

    useHead({
      title: title.value,
      meta: [
        { name: 'description', content: description.value },
        { property: 'og:title', content: title.value },
        { property: 'og:description', content: description.value },
        { property: 'og:image', content: imageUrl.value },
        { property: 'og:url', content: url.value },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: title.value },
        { name: 'twitter:description', content: description.value },
        { name: 'twitter:image', content: imageUrl.value }
      ]
    });
  </script>
  
  <style scoped>
  
  </style>