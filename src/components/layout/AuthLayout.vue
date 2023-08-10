<template>
    <div class="">
        <AuthHeader />
        <div class="grid grid-cols-1 md:grid-cols-2  gap-20 auth_container">
            <div class="sticky md:flex items-center hidden h-screen ">
                <div class="relative md:block ">
                    <div class="">
                        <img src="@/assets/image/Auth/AuthImage.png" alt="Auth">
                    </div>
                </div>
            </div>
            <div class="flex min-h-screen md:h-auto justify-center items-center py-16">
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
