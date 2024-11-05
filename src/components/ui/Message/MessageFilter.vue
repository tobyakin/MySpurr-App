<script setup>
import SearchIcon from "@/components/icons/searchBarIcon.vue";
import { onMounted, ref } from "vue";
const props = defineProps(['filter'])
const emit = defineEmits(['primary', 'read', 'others', 'sent'])
const filteredSection = ref('')

onMounted(()=>{
    if(props.filter){
        filteredSection.value = props.filter
    } else {
        filteredSection.value = 'primary'
    }
})

function filterPrimary(){
    emit('primary')
    filteredSection.value = 'primary'
}
function filterOthers(){
    emit('others')
    filteredSection.value = 'others'
    console.log(filteredSection.value)
}
function filterSent(){
    emit('sent')
    filteredSection.value = 'sent'
    console.log(filteredSection.value)
}


</script>

 <template>
   <div class="my-[0.8rem] rounded-[1.50519rem] bg-searchBg border-[0.803px] border-[#EFEFEF] flex items-center justify-between px-4 py-[0.1rem]">
        <input type="text" placeholder="Search contacts" class="bg-searchBg font-Satoshi400 leading-[2rem] text-[0.8rem]">
        <SearchIcon />
    </div>
    <ul class="messageGroup flex items-center justify-between gap-[0.7rem] !mb-[0.5rem]">
        <li class=" transitionItem"
        :class="filteredSection === 'primary'? 'active': 'reg'" @click="filterPrimary">
            <p>primary</p>
        </li>
        <li class="flex items-center gap-[0.3rem] transitionItem"
        :class="filteredSection === 'others'? 'active': 'reg'" @click="filterOthers">
            <span class="w-[0.35119rem] h-[0.35119rem] rounded-[50%] block bg-[#DA5252]"></span>
            <p>others</p>
        </li>
        <li class="flex items-center gap-[0.3rem] transitionItem"
        :class="filteredSection === 'sent'? 'active': 'reg'" @click="filterSent">
            <span class="w-[0.35119rem] h-[0.35119rem] rounded-[50%] block bg-[#007582]"></span>
            <p>sent</p>
        </li>
    </ul>
 </template>
 
 <style scoped>
 </style>