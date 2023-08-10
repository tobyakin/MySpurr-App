<template>
    <div class="2xl:h-full h-screen">
        <AuthHeader />
        <div class="grid grid-cols-1 md:grid-cols-2 mt-20 gap-40 auth_container">
            <div class="sticky md:flex items-center hidden  ">
                <div class="relative md:block ">
                    <div class="">
                        <img class="w-[90%]" src="@/assets/image/Auth/AuthImage.png" alt="Auth">
                    </div>
                </div>
            </div>
            <div class="flex  justify-center items-center py-16">
                <div class="w-[100%]">
                    <slot></slot>
                </div>
            </div>

        </div>
    </div>
</template>

<script setup>
import AuthHeader from '@/components/Header/AuthHeader.vue'

</script>
