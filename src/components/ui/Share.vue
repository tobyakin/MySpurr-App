<template>
     <div class="flex items-center gap-[0.7rem] msgMob:gap-[0.5rem]">
        <facebookIcon class="hover:text-[#2F929C] transitionItem"/>
        <whatsAppIcon class="hover:text-[#2F929C] transitionItem"/>
        <twitterIcon class="hover:text-[#2F929C] transitionItem"/>
        <LinkedinIcon class="hover:text-[#2F929C] transitionItem"/>
    </div>
</template>

<script setup>
    import facebookIcon from "@/components/icons/eventFacebookIcon.vue"
    import whatsAppIcon from "@/components/icons/whatsAppIcon.vue"
    import LinkedinIcon from "@/components/icons/eventLinkedinIcon.vue"
    import twitterIcon from "@/components/icons/eventTwitterIcon.vue";
</script>

<style scoped>

</style>