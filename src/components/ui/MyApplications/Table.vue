<template>
  <div class="w-full">
    <div
      class="border-[#254035AB] border-[1.137px] flex flex-col gap-[20px] rounded-[11.367px] pt-[21px]"
    >
      <div class="relative z-10 px-[21px]">
        <div
          class="w-full font-light flex items-center justify-between font-Satoshi400 p-4 py-1.5 border-[#F0F0F0] border-[1px] opacity-[0.8029] !bg-[#31795A00] rounded-[7px] text-[12.68px]"
        >
          <GlobalInput
            inputClasses="bg-transparent border-none placeholder:text-[#00000080] !px-0 !py-[4px]"
            type="text"
            placeholder="Search Invoice"
          />
          <button
            @click="showMobileFilter"
            class="border-l flex items-center gap-[6px] pl-[11px]"
          >
            <span
              ><svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
              >
                <g clip-path="url(#clip0_4157_27263)">
                  <path
                    d="M8.16686 14C8.04064 14 7.91783 13.9591 7.81686 13.8833L5.48353 12.1333C5.41108 12.079 5.35228 12.0085 5.31178 11.9275C5.27128 11.8465 5.25019 11.7572 5.25019 11.6667V8.38833L1.15753 3.78408C0.866862 3.45618 0.67708 3.05131 0.610989 2.61814C0.544897 2.18496 0.60531 1.74192 0.784964 1.34226C0.964618 0.942594 1.25587 0.603318 1.62371 0.365205C1.99156 0.127092 2.42034 0.000276744 2.85853 0L11.1419 0C11.58 0.000513946 12.0087 0.12754 12.3764 0.365812C12.7441 0.604085 13.0351 0.943467 13.2146 1.34317C13.3941 1.74288 13.4543 2.18591 13.388 2.61902C13.3218 3.05213 13.1319 3.45689 12.8411 3.78467L8.75019 8.38833V13.4167C8.75019 13.5714 8.68874 13.7197 8.57934 13.8291C8.46994 13.9385 8.32157 14 8.16686 14ZM6.41686 11.375L7.58353 12.25V8.16667C7.58364 8.02384 7.63616 7.88602 7.73111 7.77933L11.9708 3.00942C12.1121 2.84963 12.2044 2.65244 12.2364 2.44151C12.2685 2.23059 12.239 2.01489 12.1515 1.82032C12.064 1.62576 11.9221 1.46058 11.743 1.34463C11.564 1.22869 11.3552 1.16689 11.1419 1.16667H2.85853C2.64529 1.16699 2.43667 1.22882 2.25769 1.34474C2.07872 1.46066 1.93698 1.62575 1.84948 1.8202C1.76198 2.01466 1.73243 2.23023 1.76438 2.44106C1.79633 2.65189 1.88842 2.84903 2.02961 3.00883L6.26986 7.77933C6.3646 7.88611 6.4169 8.02392 6.41686 8.16667V11.375Z"
                    fill="black"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_4157_27263">
                    <rect width="14" height="14" fill="white" />
                  </clipPath>
                </defs></svg></span
            ><span class="text-[#000000] text-[16px] font-Satoshi400">Filters</span
            ><DropDownArrow :class="showFilter ? 'rotate-100' : 'rotate-180'" />
          </button>
        </div>
        <div
          v-if="showFilter"
          class="drop_down_section animate__zoomIn animate__rubberBand animate__fadeOut origin-top top-[55px] z-10 left-0 gap-[40px] flex flex-col justify-between lg:w-[98%] w-full lg:ml-[5px] rounded-[7px] p-[20px] border-[1px] absolute border-[#F0F0F0] py-4"
        >
          <div class="gap-[10px] flex lg:flex-row flex-col justify-between w-[100%]">
            <div class="flex flex-col justify-between gap-[24px]">
              <h4 class="text-[#01272C] font-Satoshi500 text-[14px]">Filter by Status</h4>
              <div class="flex lg:flex-row flex-col lg:items-center gap-[16px] pb-[2%]">
                <div class="flex items-center gap-[10px]">
                  <input
                    class="outline-none cursor-pointer"
                    type="checkbox"
                    name=""
                    id=""
                  />
                  <label class="text-[#01272C] font-Satoshi500 text-[14px]">Draft</label>
                </div>
                <div class="flex items-center gap-[10px]">
                  <input
                    class="outline-none cursor-pointer"
                    type="checkbox"
                    name=""
                    id=""
                  />
                  <label class="text-[#01272C] font-Satoshi500 text-[14px]">Sent</label>
                </div>
                <div class="flex items-center gap-[10px]">
                  <input
                    class="outline-none cursor-pointer"
                    type="checkbox"
                    name=""
                    id=""
                  />
                  <label class="text-[#01272C] font-Satoshi500 text-[14px]">Paid</label>
                </div>
                <div class="flex items-center gap-[10px]">
                  <input
                    class="outline-none cursor-pointer"
                    type="checkbox"
                    name=""
                    id=""
                  />
                  <label class="text-[#01272C] font-Satoshi500 text-[14px]"
                    >Cancelled</label
                  >
                </div>
              </div>
            </div>
            <div class="flex lg:flex-row flex-col z-50 gap-[8px]">
              <div class="flex flex-col gap-[24px]">
                <h4 class="text-[#01272C] font-Satoshi500 text-[14px]">Date From</h4>
                <div
                  class="flex flex-row items-center gap-[16px] py-1.5 px-1 opacity-[0.8029] !bg-[#31795A00] rounded-[5.897px] text-[12.68px] border-[#254035AB] border-[0.737px]"
                >
                  <input type="date" name="" id="" class="outline-none font-Satoshi400" />
                </div>
              </div>
              <div class="flex flex-col gap-[24px]">
                <h4 class="text-[#01272C] font-Satoshi500 text-[14px]">Date From</h4>
                <div
                  class="flex w-auto items-center py-1.5 px-1 rounded-[5.897px] text-[12.68px] border-[#254035AB] border-[0.737px]"
                >
                  <input type="date" name="" id="" class="outline-none font-Satoshi400" />
                </div>
              </div>
            </div>
          </div>
          <div>
            <div class="flex justify-end gap-[10px]">
              <button
                class="btn-brand !bg-[#FFFFFF1A] !border-[#0000004D] !border-[1px] text-center flex items-start !px-[22px] !py-[5px] !text-[#0000004D]"
              >
                <span class="">Close</span>
              </button>
              <button
                class="btn-brand !bg-[#2F929C1A] !border-[#007582] !border-[1px] text-center flex items-start !px-[22px] !py-[5px] !text-[#007582]"
              >
                <span class="">Apply Filter</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <!-- <div>
        <table>
          <thead>
            <tr>
              <th>
                <input type="checkbox" v-model="selectAll" @change="selectAllItems" />
              </th>
              <th>ID</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="item in items"
              :key="item.id"
              :class="{ active: isSelected(item.id) }"
            >
              <td>
                <input type="checkbox" v-model="selectedItems" :value="item.id" />
              </td>
              <td>{{ item.id }}</td>
              <td>{{ item.name }}</td>
            </tr>
          </tbody>
        </table>
      </div> -->

      <table
        :class="showFilter ? 'opacity-5' : ''"
        class="table-auto w-full rounded-b-[7px]"
      >
        <thead class="text-[#97A6A8] text-[15px] font-Satoshi400 !px-[21px]">
          <tr>
            <th class="py-4 pl-[21px] lg:flex hidden">
              <!-- checkbox to check all -->
              <input
                class="mr-2 outline-none cursor-pointer"
                type="checkbox"
                name=""
                id=""
                v-model="selectAll"
                @change="selectAllItems"
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
            :class="{
              'border-b': index !== rows.length - 1,
              'bg-[#0075821A]': isSelected(item.id),
            }"
            class="text-[14px]"
          >
            <td class="py-4 lg:block hidden !pl-[21px]">
              <!-- checkbox to check individual -->

              <input
                class="mr-2 outline-none cursor-pointer"
                type="checkbox"
                name=""
                v-model="selectedItems"
                :value="item.id"
              />
            </td>
            <td class="py-4">
              <router-link
                to="/"
                class="text-[15px] font-Satoshi700 overflow-hidden flex text-[#01181B]"
                >{{ item.invoice_number }}</router-link
              >
            </td>
            <td
              class="text-left py-4 capitalize overflow-hidden text-[#01181B] text-[15px] font-Satoshi500"
            >
              {{ item.client_name }}
            </td>
            <td
              class="text-left capitalize lg:block hidden overflow-hidden text-[#01181B] text-[15px] font-Satoshi400"
            >
              {{ item.invoice_date }}
            </td>
            <td
              class="text-left py-4 capitalize overflow-hidden text-[#01181B] text-[15px] font-Satoshi400"
            >
              {{ item.amount }}
            </td>
            <td class="py-4">
              <span
                :class="{
                  'bg-[#96C6CC]': item.status === 'paid',
                  'bg-[#E5EA9A]': item.status === 'draft',
                  'bg-[#D2F34C]': item.status === 'sent',
                }"
                class="p-3 capitalize py-1 rounded-full"
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
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import InvoicePaginationArrowLeft from "@/components/icons/InvoicePaginationArrowLeft.vue";
import InvoicePaginationArrowRight from "@/components/icons/InvoicePaginationArrowRight.vue";
import GlobalInput from "@/components/ui/Form/Input/GlobalInput.vue";
import DropDownArrow from "@/components/icons/DropDownArrow.vue";
import FliterIcon from "@/components/icons/FliterIcon.vue";
FliterIcon;
const router = useRouter();
const showUser = ref({});
const showUserToggle = ref(false);
const showFilter = ref(false);
// const items = ref([
//   {
//     name: "view",
//     context: "View Document",
//   },
// ]);

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
const showMobileFilter = () => {
  showFilter.value = !showFilter.value;
};

const selectedItems = ref([]);
const selectAll = ref(false);

const selectAllItems = () => {
  if (selectAll.value) {
    selectedItems.value = props.rows.map((item) => item.id);
  } else {
    selectedItems.value = [];
  }
};
const isSelected = (itemId) => {
  return selectedItems.value.includes(itemId);
};
</script>
<style>
.drop_down_section {
  /* position: absolute; */
  /* transform-origin: center top; */
  /* z-index: 2003; */
  box-shadow: unset !important;
  /* width: 100% !important; */
  /* border-radius: 35px !important; */
  /* padding: 12px; */
  background: #ffffff;
  max-height: 100vh;
  overflow: auto;
}
.drop_down {
  border-radius: 0px 0px 11.37px 11.37px;
  background: linear-gradient(
    0deg,
    rgba(0, 71, 79, 0.1) 1.58%,
    rgba(0, 71, 79, 0) 98.41%
  );
  backdrop-filter: blur(2px);
}
</style>
