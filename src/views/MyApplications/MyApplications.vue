<script setup>
import DashboardLayout from "@/components/layout/dashboardLayout.vue";
import Tab from "@/components/ui/MyApplications/Tab.vue";
import InvitesView from "@/components/ui/MyApplications/InvitesView.vue";
import Applications from "@/components/ui/MyApplications/Applications/Applications.vue";
import JobOffers from "@/components/ui/MyApplications/JobOffers.vue";
import MyJobs from "@/components/ui/MyApplications/MyJobs/MyJobs.vue";
import Invoices from "@/components/ui/MyApplications/Invoice/InvoicePage.vue";
</script>
<template>
  <DashboardLayout
    ><div class="container mb-20">
      <Tab>
        <template #tab1> Invites </template>
        <template #tab2> Applications </template>
        <template #tab3> Job Offers </template>
        <template #tab4> My Jobs </template>
        <template #tab5> Invoices </template>
        <template #tab6> Help </template>
        <template #view1><InvitesView /></template>
        <template #view2><Applications /></template>
        <template #view3><JobOffers /></template>
        <template #view4><MyJobs /></template>
        <template #view5><Invoices /></template>
        <template #view6></template>
      </Tab>
    </div>
  </DashboardLayout>
</template>
