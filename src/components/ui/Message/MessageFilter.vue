<script setup>
import SearchIcon from "@/components/icons/searchBarIcon.vue";
import { ref } from "vue";
const emit = defineEmits(['all', 'read', 'unread', 'primary'])
const filteredSection = ref('all')

function filterAll(){
    emit('all')
    filteredSection.value = 'all'
}
function filterRead(){
    emit('read')
    filteredSection.value = 'read'
}
function filterUnread(){
    emit('unread')
    filteredSection.value = 'unread'
}
function filterPrimary(){
    emit('primary')
    filteredSection.value = 'primary'
}


</script>

 <template>
   <div class="my-[0.8rem] rounded-[1.50519rem] bg-searchBg border-[0.803px] border-[#EFEFEF] flex items-center justify-between px-4 py-[0.1rem]">
        <input type="text" placeholder="Search contacts" class="bg-searchBg font-Satoshi400 leading-[2rem] text-[0.8rem]">
        <SearchIcon />
    </div>
    <ul class="messageGroup flex items-center justify-between gap-[0.7rem] !mb-[0.5rem]">
        <li class="font-Satoshi500 leading-[2rem] capitalize text-[0.6rem]"
        :class="filteredSection === 'all'? 'active': 'reg'" @click="filterAll">all</li>
        <li class="flex items-center gap-[0.3rem]"
        :class="filteredSection === 'read'? 'active': 'reg'" @click="filterRead">
            <span class="w-[0.35119rem] h-[0.35119rem] rounded-[50%] block bg-[#949939]"></span>
            <p class="">read</p>
        </li>
        <li class="flex items-center gap-[0.3rem]"
        :class="filteredSection === 'unread'? 'active': 'reg'" @click="filterUnread">
            <span class="w-[0.35119rem] h-[0.35119rem] rounded-[50%] block bg-[#DA5252]"></span>
            <p>unread</p>
        </li>
        <li class="flex items-center gap-[0.3rem]"
        :class="filteredSection === 'primary'? 'active': 'reg'" @click="filterPrimary">
            <span class="w-[0.35119rem] h-[0.35119rem] rounded-[50%] block bg-[#007582]"></span>
            <p>primary</p>
        </li>
    </ul>
 </template>
 
 <style scoped>
 </style>