<template>
  <div class="card">
    <!-- <Carousel
      :value="props.dataValue"
      :numVisible="1"
      :numScroll="1"
      :responsiveOptions="responsiveOptions"
      :indicatorsPosition="position"
    >
      <template #item="slotProps"
        ><div class="overflow-hidden p-2">
          <img
            :src="slotProps?.data?.featured_image"
            class="h-[221.52px] object-cover flex flex-col mx-2 bg-[#EFF6F3] w-full rounded-lg"
          />
        </div>
      </template>
    </Carousel> -->

    <Galleria
      :value="props.dataValue"
      :numVisible="3"
      containerStyle="max-width: 100%"
      :showIndicators="true"
      :changeItemOnIndicatorHover="true"
      :showIndicatorsOnItem="inside"
      :indicatorsPosition="position"
    >
      <template #item="slotProps"
        ><div class="overflow-hidden p-0 w-full object-contain">
          <img
            @click="$emit('toPage', slotProps?.item?.id)"
            role="button"
            :src="slotProps?.item?.featured_image"
            class="h-[221.52px] object-cover flex flex-col mx-0 bg-[#EFF6F3] w-full rounded-lg"
          />
        </div>
      </template>
      <template #thumbnail="slotProps">
        <img :src="slotProps.item.featured_image" />
      </template>
      <template #caption="slotProps"
        ><div class="max-h-[30px] overflow-hidden">
          <div class="text-md mb-2 font-bold">{{ slotProps.item.title }}</div>
          <p
            class="text-white truncate"
            v-html="slotProps.item.description.slice(0, 20) + `...`"
          ></p>
        </div>
      </template>
    </Galleria>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
const props = defineProps({
  dataValue: null,
});

const inside = ref(false);
const position = ref("top");
</script>
<style>
/* .p-carousel-indicator {
  @apply bg-brand;
} */
.p-highlight {
  @apply !bg-[#00474F];
}
.p-galleria-indicator {
  @apply !rounded-full h-3 w-3 border-[#00474F] border-2;
}
.p-galleria-indicators {
  @apply !bg-transparent;
}
.p-galleria-item {
  @apply w-full;
}
.p-galleria-indicators .p-reset {
  @apply !bg-transparent flex flex-row justify-end;
}
.p-galleria-indicator .p-link {
  @apply !rounded-full h-3 w-3;
}
.p-galleria-thumbnail-wrapper {
  @apply bg-[#00474F] rounded-b-lg;
}
.p-galleria-thumbnail-container {
  @apply bg-[#00474F] rounded-b-lg overflow-hidden;
}
.p-galleria-thumbnail-container button {
  @apply text-white;
}
.p-galleria-thumbnail-items,
.p-galleria-thumbnail-item {
  @apply !bg-transparent object-contain gap-2;
}

.p-galleria-thumbnail-item-content {
  @apply !bg-transparent object-contain;
}
.p-galleria-thumbnail-item-content img {
  @apply !rounded-lg h-[80px] w-full object-cover;
}
</style>
