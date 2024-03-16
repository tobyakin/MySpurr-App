<script setup>
import DashboardLayout from "@/components/layout/dashboardLayout.vue";
import Tab from "@/components/ui/MyApplications/Tab.vue";
import InvitesView from "@/components/ui/MyApplications/InvitesView.vue";
import Applications from "@/components/ui/MyApplications/Applications/Applications.vue";
import JobOffers from "@/components/ui/MyApplications/JobOffers.vue";
import MyJobs from "@/components/ui/MyApplications/MyJobs/MyJobs.vue";
import Invoices from "@/components/ui/MyApplications/Invoice/InvoicePage.vue";
import ComingSoon from "@/components/ui/ComingSoon/ComingSoon.vue";
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
        <template #view1>
          <ComingSoon title="Job invites" />
          <InvitesView class="hidden" />
        </template>
        <template #view2><Applications /></template>
        <template #view3><JobOffers /></template>
        <template #view4>
          <ComingSoon title="My jobs" />
          <MyJobs class="hidden" />
        </template>
        <template #view5>
          <ComingSoon title="Invoices" />
          <Invoices class="hidden" />
        </template>
      </Tab>
    </div>
  </DashboardLayout>
</template>
