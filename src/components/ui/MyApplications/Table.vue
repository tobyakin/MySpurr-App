<template>
  <div class="">
    <div
      class="border-[#254035AB] border-[1.137px] flex flex-col gap-[20px] rounded-[11.367px] p-[21px]"
    >
      <div
        class="w-full font-light font-Satoshi400 p-4 py-1.5 border-[#F0F0F0] border-[1px] opacity-[0.8029] !bg-[#31795A00] rounded-[7px] text-[12.68px]"
      >
        <GlobalInput
          inputClasses="bg-transparent border-none placeholder:text-[#00000080] !px-0 !py-[4px]"
          type="text"
          placeholder="Search Invoice"
        />
      </div>
      <table class="table-auto w-full">
        <thead class="text-[#97A6A8] text-[15px] font-Satoshi400">
          <tr>
            <th class="py-4 pl-4 lg:flex hidden">
              <input
                class="mr-2 outline-none cursor-pointer"
                type="checkbox"
                name=""
                id=""
              />
            </th>
            <th
              class="text-left p-4 pr-0 px-0 capitalize"
              v-for="(column, index) in columns"
              :key="column"
            >
              {{ column }}
            </th>
          </tr>
        </thead>
        <tbody v-if="rows.length">
          <tr
            v-for="(item, index) in rows"
            :key="item"
            :class="index === rows.length - 1 ? '' : 'border-b'"
            class="text-[14px]"
          >
            <td class="py-4 lg:block hidden pl-4">
              <input
                class="mr-2 outline-none cursor-pointer"
                type="checkbox"
                name=""
                id=""
              />
            </td>
            <td>
              <router-link
                to="/"
                class="text-[15px] font-Satoshi700 overflow-hidden flex text-[#01181B]"
                >{{ item.invoice_number }}</router-link
              >
            </td>
            <td
              class="text-left capitalize overflow-hidden text-[#01181B] text-[15px] font-Satoshi500"
            >
              {{ item.client_name }}
            </td>
            <td
              class="text-left capitalize lg:block hidden overflow-hidden text-[#01181B] text-[15px] font-Satoshi400"
            >
              {{ item.invoice_date }}
            </td>
            <td
              class="text-left capitalize overflow-hidden text-[#01181B] text-[15px] font-Satoshi400"
            >
              {{ item.amount }}
            </td>
            <td class="">
              <span
                :class="{
                  'bg-[#E5EA9A]': item.status == 'draft',
                  'bg-[#D2F34C]': item.status == 'sent',
                  'bg-[#96C6CC]': item.status == 'paid',
                }"
                class="bg-[#D2F34C] p-3 capitalize py-1 rounded-full"
                >{{ item.status }}</span
              >
            </td>
          </tr>
        </tbody>
        <tbody v-if="!rows.length">
          <tr class="border-b text-[14px]">
            <td :colspan="columns.length + 1" class="text-center p-4 capitalize">
              {{ message }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-if="rows" class="flex lg:flex-row flex-col items-center justify-between mt-4">
      <div
        class="flex justify-between gap-2 items-center text-[#00000080] text-[14px] font-Satoshi400"
      >
        <p>Showing</p>
        <select class="bg-[#F3F4F6] px-[8px] py-[4px] outline-none" name="" id="">
          <option value="">10</option>
          <option value="">10</option>
        </select>
        <p>Entries</p>
      </div>
      <div class="flex items-center">
        <button @click="prev" class="border-none py-1 px-2">
          <InvoicePaginationArrowLeft />
        </button>
        <div>
          <span
            v-for="(i, index) in 5"
            :key="i"
            :class="index == 2 ? 'bg-[#E5E7EB] ' : ''"
            class="place-self-center py-[8px] px-[10px] text-[#6B7280] text-[12px] cursor-pointer"
            >{{ index + 1 }}</span
          >
        </div>
        <button @click="next" class="border-none py-1 px-2">
          <InvoicePaginationArrowRight />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import InvoicePaginationArrowLeft from "@/components/icons/InvoicePaginationArrowLeft.vue";
import InvoicePaginationArrowRight from "@/components/icons/InvoicePaginationArrowRight.vue";
import GlobalInput from "@/components/ui/Form/Input/GlobalInput.vue";

const router = useRouter();
const showUser = ref({});
const showUserToggle = ref(false);

const items = ref([
  {
    name: "view",
    context: "View Document",
  },
]);

const emit = defineEmits(["previous", "next"]);
const props = defineProps({
  columns: {
    type: Array,
    required: true,
  },
  rows: {
    type: Array,
    required: true,
  },
  message: {
    type: String,
  },
  links: {
    type: Object,
  },
  meta: {
    type: Object,
  },
});

const prev = () => {
  emit("previous", props.meta.current_page - 1);
};

const next = () => {
  emit("next", props.meta.current_page + 1);
};

const closeDropdown = () => {
  showDocumentToggle.value = false;
};

const clickedItem = (link) => {
  if (link.context == "View Document") {
    router.push({
      name: "ManageDocument",
      params: {
        id: showUser.value.slug,
      },
    });
  }
};

const toogleUser = (user) => {
  if (showUser.value.id == user.id) {
    return (showUserToggle.value = !showUserToggle.value);
  }

  showUser.value = user;
  showUserToggle.value = true;
};
</script>
