<script setup>
import circleFileIcon from "@/components/icons/circleFileIcon.vue";
import MessageInputField from "@/components/ui/Message/MessageInputField.vue";

</script>

<template>
    <div class="h-full">

        <article class="w-full">
            <div class="senderDetails pt-[2.16rem] pb-[1.6rem] px-[1.66rem] flexBasic !items-end h-[10%]">
                <div class="flexBasic gap-[0.85rem]">
                    <div class="w-[2.36rem] h-[2.36rem] rounded-full overflow-hidden">
                        <img src="@/assets/image/userImg.png" alt="" class="w-full h-full object-cover">
                    </div>
                    <div>
                        <h3 class="font-Satoshi500 text-[#244034] leading-[1.204rem] text-[1.01rem]">Tobi Akinyele</h3>
                        <p class="text-[#00000066] font-Satoshi400 leading-[1.204rem] text-[0.85rem]">Graphics Designer</p>
                    </div>
                </div>
                <div class="timeStamp">
                    <h3 class="font-Satoshi400 text-right leading-[1.204rem] text-[#24403499] text-[0.65rem]">4:45AM</h3>
                </div>   
            </div>
            <hr class="border-[#EEEEEE] border-1">
        </article>
        <div class=" flex flex-col h-[100%] overflow-y-auto">
            <MessageInputField class="mt-[1.66rem] flex-1" notShow="true" showSubject="true"/>
            <div class="px-[1.66rem] basis-[30%]">
                <div class="flexBasic">
                <h3 class="font-Satoshi500 leading-[normal] text-[#000] text-[0.75rem]">2 Attachment</h3>
                <button class="text-[#349459] font-Satoshi500 text-[0.702rem]">Download All</button>
                </div>
                <div class="mt-4 flex gap-[1.1rem] flex-wrap">
                    <article class="flex items-center p-[0.7rem] border rounded-[0.5rem] w-fit border-[#F0F5F3] gap-[0.6rem] justify-center">
                        <circleFileIcon />
                        <div>
                            <h3 class="font-Satosi400 text-[#244034] leading-[1.003rem] text-[0.75rem]">Project-details.pdf</h3>
                            <p class="text-[#24403480] font-Satoshi400 text-[0.65rem] leading-[1.003rem]">2.3mb</p>
                        </div>
                    </article>
                </div>
            </div>
        </div>
    </div>
</template>


<style scoped>

</style>