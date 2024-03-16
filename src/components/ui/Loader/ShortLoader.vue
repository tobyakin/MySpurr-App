<template>
  <div class="modal backdrop-blur animate__zoomIn animate__rubberBand animate__fadeOut">
    <div class="modal__body relative mx-auto m-0 md:px-5 py-8 px-4">
      <img class="w-[80px] h-[80px]" src="@/components/ui/Loader/myspurrLoader.gif" alt="" />
    </div>
  </div>
</template>
<script></script>
<style lang="scss" scoped>
.modal {
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: auto;

  &__body {
    position: relative;
    animation: slidedown 0.8s ease;
    overflow: auto;

    &::-webkit-scrollbar {
      display: none;
    }
  }
}
</style>
