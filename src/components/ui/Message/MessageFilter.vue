<script setup>
import SearchIcon from "@/components/icons/searchBarIcon.vue";

</script>

 <template>
   <div class="my-[0.8rem] rounded-[1.50519rem] bg-searchBg border-[0.803px] border-[#EFEFEF] flex items-center justify-between px-4 py-[0.8rem]">
        <input type="text" placeholder="Search contacts" class="bg-searchBg font-Satoshi400 leading-[2rem] text-[0.8rem]">
        <SearchIcon />
    </div>
    <ul class="messageGroup flex items-center justify-between gap-[0.7rem] mt-[1.5rem] !mb-0">
        <li class="font-Satoshi500 leading-[2rem] capitalize text-[0.6rem] active">all</li>
        <li class="flex items-center gap-[0.3rem]">
            <span class="w-[0.35119rem] h-[0.35119rem] rounded-[50%] block bg-[#949939]"></span>
            <p class="">read</p>
        </li>
        <li class="flex items-center gap-[0.3rem]">
            <span class="w-[0.35119rem] h-[0.35119rem] rounded-[50%] block bg-[#DA5252]"></span>
            <p>unread</p>
        </li>
        <li class="flex items-center gap-[0.3rem]">
            <span class="w-[0.35119rem] h-[0.35119rem] rounded-[50%] block bg-[#007582]"></span>
            <p>primary</p>
        </li>
    </ul>
 </template>
 
 <style scoped>
 
 </style>