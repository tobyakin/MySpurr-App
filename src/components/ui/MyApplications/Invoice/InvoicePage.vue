<script setup>
import { ref } from "vue";
import Table from "../Table.vue";
import AddInvoice from "@/components/ui/MyApplications/Invoice/AddInvoice.vue";
import PreviewInvoice from "@/components/ui/MyApplications/Invoice/PreviewInvoice.vue";
const message = ref("Loading");

const columns = ref([
  "Invoice Number",
  "Client’s Name",
  "Invoice Date",
  "Amount",
  "Status",
]);
const rows = ref([
  {
    id: 1,
    invoice_number: "BB-AB-OO72",
    client_name: "Abraham Jackson",
    invoice_date: "25/12/2023",
    amount: 71000,
    status: "paid",
  },
  {
    id: 2,
    invoice_number: "BB-AB-OO72",
    client_name: "Abraham Jackson",
    invoice_date: "25/12/2023",
    amount: 71000,
    status: "sent",
  },
  {
    id: 3,
    invoice_number: "BB-AB-OO72",
    client_name: "Abraham Jackson",
    invoice_date: "25/12/2023",
    amount: 71000,
    status: "sent",
  },
  {
    id: 4,
    invoice_number: "BB-AB-OO72",
    client_name: "Abraham Jackson",
    invoice_date: "25/12/2023",
    amount: 71000,
    status: "sent",
  },
  {
    id: 5,
    invoice_number: "BB-AB-OO72",
    client_name: "Abraham Jackson",
    invoice_date: "25/12/2023",
    amount: 71000,
    status: "sent",
  },
]);
const prev = async () => {
  message.value = "Loading";
  //   await store.getAllCustomers(page, "verification");
  message.value = "No data found";
};

const next = async () => {
  message.value = "Loading";
  //   await store.getAllCustomers(page, "verification");
  message.value = "No data found";
};
const step = ref([true, false, false]);

const changeScreen = (from, to, type = null) => {
  step.value[from] = false;
  step.value[to] = true;
};
</script>
<template>
  <div>
    <PreviewInvoice v-if="step[2]" />

    <AddInvoice @Preview="changeScreen(1, 2)" v-if="step[1]" />
    <div v-if="step[0]">
      <div v-if="rows.length">
        <div class="flex justify-between items-center flex-row">
          <h3
            class="text-[28.087px] !font-EBGaramond500 text-[#244034] leading-[35.39px]"
          >
            Invoices
          </h3>
          <button
            @click="changeScreen(0, 1)"
            class="btn-brand !border-none !py-3 !px-5 !text-[#FFFFFF] bg-[#2f919c9e] text-center !bg-[#2F929C]"
          >
            Add New Invoice
          </button>
        </div>
        <div class="my-[39.19px] flex lg:flex-row flex-col-reverse gap-[24px]">
          <Table :columns="columns" :rows="rows" @previous="prev" @next="next" />
          <div class="flex flex-col gap-[24px] w-full lg:w-[36%]">
            <div
              class="border-[#254035AB] bg-white border-[1.137px] flex flex-col gap-[20px] rounded-[11.367px] p-[21px]"
            >
              <div class="flex justify-between items-center border-b pb-2">
                <h4
                  class="flex items-center text-[#97A6A8] text-[13px] font-Satoshi400 gap-[11px]"
                >
                  Draft
                  <span
                    class="p-2 py-1 bg-[#96C6CC] text-[#01181B] rounded-full text-[12px]"
                    >3</span
                  >
                </h4>
                <button class="text-[#297F88] text-[13px]">View</button>
              </div>
              <h4 class="text-[#01181B] text-[15px] font-Satoshi400">₦ 102,290.50</h4>
            </div>
            <div
              class="border-[#254035AB] bg-white border-[1.137px] flex flex-col gap-[20px] rounded-[11.367px] p-[21px]"
            >
              <div class="flex justify-between items-center border-b pb-2">
                <h4
                  class="flex items-center text-[#97A6A8] text-[13px] font-Satoshi400 gap-[11px]"
                >
                  Awaiting Payment
                  <span
                    class="p-2 py-1 bg-[#96C6CC] text-[#01181B] rounded-full text-[12px]"
                    >3</span
                  >
                </h4>
                <button class="text-[#297F88] text-[13px]">View</button>
              </div>
              <h4 class="text-[#01181B] text-[15px] font-Satoshi400">₦ 102,290.50</h4>
            </div>
          </div>
        </div>
      </div>
      <div
        v-else
        class="border-[#254035AB] bg-white rounded-[11.367px] text-center py-[80px] p-4 flex flex-col gap-4 border-[1.137px]"
      >
        <h3 class="text-[#2F929C] text-[13.552px] font-Satoshi500">No Invoice yet</h3>
        <p class="text-[#000000] text-[16.311px] font-Satoshi500">
          Invoices you’ve created will be shown here!
        </p>
        <div class="flex justify-center mt-[30px]">
          <button
            @click="changeScreen(0, 1)"
            class="btn-brand !bg-brand !border-none text-center flex items-start !py-3 !text-white"
          >
            <span class="">Create New Invoice</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
