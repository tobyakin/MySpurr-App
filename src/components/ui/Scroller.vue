<script setup lang="ts">
import ArrowRight from "@/components/icons/rightArrowN.vue";
import ArrowLeft from "@/components/icons/leftArrowN.vue";
type Direction = "vertical" | "horizontal";

withDefaults(
  defineProps<{
    direction?: Direction;
    element: HTMLDivElement | undefined;
    distance?: number;
  }>(),
  {
    direction: "horizontal",
    distance: 250,
  }
);

function scrollDiv(element: HTMLDivElement, distance: number, direction: Direction) {
  const currentPosition =
    direction == "horizontal" ? element.scrollLeft : element.scrollTop;
  const scrollTo = currentPosition - distance;
  if (direction == "horizontal") {
    element?.scrollTo({
      left: scrollTo,
      behavior: "smooth",
    });
  } else {
    element?.scrollTo({
      top: scrollTo,
      behavior: "smooth",
    });
  }
}
</script>

<template>
  <div
    :class="direction == 'horizontal' ? 'flex-row' : 'flex-col'"
    class="flex gap-2.5 w-fit"
  >
    <button
      @click="scrollDiv(element!, distance, direction)"
      class="rounded-full hover:bg-brand h-[37.61px] w-[37.61px] flex justify-center items-center font-semibold bg-[#43D0DF]"
    >
      <ArrowLeft />
    </button>
    <!--  {{ direction == "horizontal" ? "L" : "T" }} -->
    <!-- {{ direction == "horizontal" ? "R" : "B" }} -->
    <button
      @click="scrollDiv(element!, -distance, direction)"
      class="rounded-full hover:bg-brand h-[37.61px] w-[37.61px] flex justify-center items-center font-semibold bg-[#43D0DF]"
    >
      <ArrowRight />
    </button>
  </div>
</template>
