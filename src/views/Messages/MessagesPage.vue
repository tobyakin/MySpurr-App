<script setup>
import { ref, computed, onMounted } from "vue";
import DashboardLayout from "@/components/layout/dashboardLayout.vue";
import MessageUserActiveIcon from "@/components/icons/messageUserActiveIcon.vue";
import PushPinIcon from "@/components/icons/pushPinIcon.vue";
import MessagestarIcon from "@/components/icons/messagestarIcon.vue";
import MoreVertIcon from "@/components/icons/moreVertIcon.vue";
import AttachFile from "@/components/icons/attachFile.vue";
import GlobalInput from "@/components/ui/Form/Input/GlobalInput.vue";
import SendIcon from "@/components/icons/sendIcon.vue";
import SearchIcon from "@/components/icons/searchBarIcon.vue";
import { useSocketStore } from "@/stores/socket";
const store = useSocketStore();
import { useUserProfile } from "@/stores/profile";
let profile = useUserProfile();

let receiverId = "211950a8-c8bd-4f12-9b92-db142c85ddd4";
let message = ref("");
const userDetails = computed(() => {
  return profile.user.data;
});

// const connectSocket = async () => {
//   try {
//     await store.connectSocket(receiverId);
//   } catch (error) {
//     console.error(error);
//   }
// };

const sendMessage = async () => {
  let payload = {
    sender_id: userDetails.value.uniqueId,
    receiver_id: receiverId,
    message: message.value,
  };
  try {
    await store.sendSocketMessage(receiverId, payload);
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  return profile.userProfile();
});
onMounted(async () => {
  // await store.connectSocket(receiverId);
});
onMounted(async () => {
  await profile.userProfile();
});
</script>

<template>
  <DashboardLayout>
    <div
      class="container flex flex-col lg:gap-[59px] gap-[34px] p-0 lg:p-0 lg:py-10 py-6 mb-10"
    >
      <h4 class="text-[#244034] font-EBGaramond500 capitalize text-[27px]">messages</h4>
      <div class="flex flex-row gap-[34.16px] w-full min-h-[75vh] overflow-hidden">
        <div
          style="box-shadow: 0.86326px 0px 0px 0px #d3d6db"
          class="flex flex-col gap-[14.675px] bg-white border-[0.449px] w-[45%] h-[90vh] border-[#254035AB] px-[33.15px] py-[20.72px]"
        >
          <div>
            <div class="w-full p-0 relative border-[0.863px] border-[#254035AB]">
              <SearchIcon class="absolute left-3 top-4" />
              <GlobalInput
                inputClasses="bg-transparent flex w-full !py-[13.359px] !pl-[40.812px]  border-none"
                placeholder="Search messages"
                type="text"
              />
            </div>
          </div>
          <div class="pt-0 flex flex-col h-full overflow-y-auto hide-scrollbar">
            <div
              v-for="i in 40"
              :key="i"
              :class="i !== 40 ? 'border-b-[1px] border-b-[#2540354e]' : 'border-none'"
              class="flex flex-row w-full cursor-pointer gap-4 py-3"
            >
              <img
                class="w-[41.436px] h-[41.436px] rouned-full"
                src="@/assets/image/messageUser.png"
                alt=""
              />
              <div class="flex flex-col justify-between w-full gap-2">
                <h4
                  class="text-[14px] flex w-full items-center justify-between gap-2 font-Satoshi600 text-[#000000]"
                >
                  David Adelide
                  <span class="text-[#6C8285] text-[9.496px]">3:41pm</span>
                </h4>
                <p class="text-[12.086px] font-Satoshi400 text-[#515B6F] leading-[19px]">
                  You’re very welcome. If .....
                </p>
              </div>
            </div>
          </div>
        </div>
        <div
          class="flex flex-col bg-white h-[90vh] border-[0.449px] w-full border-[#254035AB]"
        >
          <div
            class="border-b-[0.449px] flex w-full justify-between border-b-[#254035AB] p-[10px] h-[70.521px] px-[35.15px]"
          >
            <div class="flex flex-row items-center gap-[30px]">
              <img
                class="w-[50.207px] h-[50.207px] rouned-full"
                src="@/assets/image/messageUser.png"
                alt=""
              />
              <div class="flex flex-col gap-[5.18px]">
                <h4
                  class="text-[#000000] flex gap-1 items-center font-Satoshi500 text-[12.086px]"
                >
                  David Adelide
                  <span class="text-[#DAE06F] flex items-center gap-[2px] text-[7.606px]"
                    ><MessageUserActiveIcon />Online</span
                  >
                </h4>
                <p class="font-Satoshi500 text-[8.633px] text-[#DA5252]">
                  Recruiter from SoftBox
                </p>
              </div>
            </div>
            <div class="flex gap-[9.457px] items-center">
              <button><PushPinIcon /></button>
              <button><MessagestarIcon /></button>
              <button><MoreVertIcon /></button>
            </div>
          </div>
          <div class="p-[28.15px] h-full hide-scrollbar overflow-y-auto">
            <div class="flex flex-col items-center gap-[10.36px]">
              <img
                class="w-[69.828px] h-[69.828px] rouned-full"
                src="@/assets/image/messageUser.png"
                alt=""
              />
              <div class="flex flex-col gap-[5.18px]">
                <h4
                  class="text-[#000000] flex gap-1 items-center font-Satoshi500 text-[13.812px]"
                >
                  David Adelide
                </h4>
                <p class="font-Satoshi500 text-[8.633px] text-[#DA5252]">
                  Recruiter from SoftBox
                </p>
              </div>
              <p class="text-[#000000B2] font-Satoshi400 text-[11.363px]">
                This is the beginning of your direct message with Jan Mayer
              </p>
              <div class="flex flex-row items-center w-full gap-4 mt-3">
                <hr class="border-[#254035AB] w-full border-[0.863px]" />
                <p class="text-[#000000B2] font-Satoshi400 text-[10.359px]">SATURDAY</p>
                <hr class="border-[#254035AB] w-full border-[0.863px]" />
              </div>
            </div>
            <div class="pt-4 flex flex-col gap-5">
              <div v-for="i in 10" :key="i" class="flex flex-row gap-4">
                <img
                  class="w-[46.939px] h-[46.939px] rouned-full"
                  src="@/assets/image/messageUser.png"
                  alt=""
                />
                <div class="flex flex-col gap-2">
                  <h4
                    class="text-[12.086px] flex items-center gap-2 font-Satoshi500 text-[#000000]"
                  >
                    David Adelide
                    <span class="text-[#6C8285] text-[9.496px]">3:41pm</span>
                  </h4>
                  <p
                    class="text-[12.086px] font-Satoshi400 text-[#000000] leading-[19px]"
                  >
                    You’re very welcome. If you’d like to register your interest complete
                    the form below. Thanks again. You’re very welcome. If you’d like to
                    register your interest complete the form below. Thanks again
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div
            class="border-[0.737px] m-[28.15px] flex flex-row gap-2 jusitify-between items-center border-[#254035AB] rounded-[5.897px] py-[9.78px] px-[14.91px]"
          >
            <button class="">
              <AttachFile />
            </button>
            <div class="w-full">
              <GlobalInput
                v-model="message"
                inputClasses="bg-transparent flex w-full border-none"
                placeholder=""
                type="text"
              />
            </div>
            <button
              @click="sendMessage"
              class="btn-brand !bg-[#43D0DF] border-none justify-end !py-[5.33px] !px-[26.68px] !rounded-[4.745px]"
            >
              <SendIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  </DashboardLayout>
</template>
