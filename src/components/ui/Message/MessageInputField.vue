<script setup>
import DropDownArror from "@/components/icons/DropDownArrow.vue"
import DeleteIcon from "@/components/icons/DeleteIcon.vue";
import ReplyIcon from "@/components/icons/ReplyIcon.vue";
import emojiIcon from "@/components/icons/emojiIcon.vue";
import AttachImage from "@/components/icons/AttachImage.vue";
import cancelIcon from "@/components/icons/cancelIcon.vue"
import AttachFile from "@/components/icons/attachFile.vue";
const props = defineProps(['notShow', 'showSubject'])


</script>

<template>
    <article class="replyBox w-full px-[1.66rem] pb-[1.66rem] h-[100%]">
        <div class="border border-[#0000001a] rounded-[0.50175rem] h-full flex flex-col">
            <div class="h-fit">
            <div class="header flex items-center justify-between px-4 py-[0.5rem]">
                <div class="flexBasic gap-[0.8rem]">
                <div class="flexBasic gap-[0.6rem]">
                    <ReplyIcon class="!opacity-1" :class="{hidden: notShow}"/>
                    <DropDownArror class="cursor-pointer" :class="{hidden: notShow}"/>
                    <h3 class="font-Satoshi400 text-[#244034] text-[0.702rem]">To:</h3>
                </div>
                <div class="flexBasic bg-[#F0F5F3] rounded-[0.75rem] gap-4 px-[0.55rem] py-[0.7rem]">
                    <h3 class="text-[#244034b3] font-Satoshi500 leading-[1.104rem] text-[0.702rem]">payoneer@inquiry.com</h3>
                    <cancelIcon />
                </div>
                </div>
                <div class="flexBasic gap-[0.8rem]">
                <h3 class="font-Satoshi500 text-[0.75rem] leading-[1.51rem] text-[#244034cc]">Cc</h3>
                <h3 class="font-Satoshi500 text-[0.75rem] leading-[1.51rem] text-[#244034cc]">Bcc</h3>
                </div>
            </div>
            <hr class="border-[#EEEEEE] border-1">
            <div :class="{ hidden: !showSubject }">
                <div class="px-4 py-[0.5rem] flex items-center gap-4">
                    <h3 class="text-[#244034] font-Satoshi400 text-[0.702rem] capitalize">subject:</h3>
                    <input type="text" class="basis-full">
                </div>
                <hr class="border-[#EEEEEE] border-1">
            </div>
            </div>
            <div class="px-4 h-full my-[0.5rem]">
            <textarea name="" id="" class="w-full h-full p-[0.5rem] font-Satoshi400 text-[0.75rem] leading-[1.505rem] text-[#000000bf] focus:outline-0" placeholder="Write a message"></textarea>
            </div>
            <div class="p-4 !pt-0 flexBasic h-fit">
            <div class="flexBasic gap-4">
                <AttachFile />
                <emojiIcon />
                <AttachImage />
            </div>
            <div class="flexBasic gap-4">
                <DeleteIcon class="cursor-pointer"/>
                <button class="bg-[#3F634D] rounded-[10.38575rem] px-[1.3rem] py-[0.3rem] font-Satoshi500 text-[#fff] text-[0.803rem] leading-[1.7rem]">Reply</button>
            </div>
            </div>
        </div>
        </article>
</template>

<style lang="scss" scoped>

</style>