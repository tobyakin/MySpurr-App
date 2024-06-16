<script setup>
import MoreVertIcon from "@/components/icons/moreVertIcon.vue";
import DropDownArror from "@/components/icons/DropDownArrow.vue"

</script>

<template>
    <section class="w-[22rem] rounded-[1.003rem] bg-[#fff] shadow-[3xl] py-4">
        <div class="px-[1.44rem] mb-[0.7rem] flexBasic">
            <div class="flexBasic gap-[0.88rem]">
                <div class="userImg w-[1.875rem] h-[1.875rem] rounded-[1.875rem] overflow-hidden">
                    <img src="@/assets/image/userImg.png" alt="" class="w-full h-full">
                </div>
                <h3 class="text-[#000] font-Satoshi500 leading-[1.51rem]text-[0.903rem]">Messaging</h3>
            </div>
            <div class="flexBasic gap-4">
                <MoreVertIcon />
                <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
                <path d="M3.43501 12.0374L4.6968 8.88292C4.89798 8.37995 5.19923 7.9231 5.58228 7.54005L12.5015 0.621319C13.3299 -0.207108 14.673 -0.207106 15.5015 0.621321C16.3299 1.44975 16.3299 2.79289 15.5015 3.62132L8.58228 10.5401C8.19923 10.9231 7.74238 11.2243 7.23941 11.4255L4.08495 12.6873C3.67679 12.8506 3.27175 12.4455 3.43501 12.0374Z" fill="#6C8285"/>
                    <path d="M1.50195 3.87061C1.50195 3.18025 2.0616 2.62061 2.75195 2.62061H8.00195C8.41617 2.62061 8.75195 2.28482 8.75195 1.87061C8.75195 1.45639 8.41617 1.12061 8.00195 1.12061H2.75195C1.23317 1.12061 0.00195312 2.35182 0.00195312 3.87061V13.3706C0.00195312 14.8894 1.23317 16.1206 2.75195 16.1206H12.252C13.7707 16.1206 15.002 14.8894 15.002 13.3706V8.12061C15.002 7.70639 14.6662 7.37061 14.252 7.37061C13.8377 7.37061 13.502 7.70639 13.502 8.12061V13.3706C13.502 14.061 12.9423 14.6206 12.252 14.6206H2.75195C2.0616 14.6206 1.50195 14.061 1.50195 13.3706V3.87061Z" fill="#6C8285"/>
                </svg>
                <DropDownArror class="!text-[#6C8285]"/>
            </div>
        </div>
    </section>
</template>

<style scoped>

</style>