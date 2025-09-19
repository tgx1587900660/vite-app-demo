<template>
  <div class="flex justify-center mt-6">
    <n-button @click="showModal4 = !showModal4"> 弹窗嵌套 </n-button>
  </div>

  <n-modal class="xxxxxxxxxxx" :on-after-leave="onAfterLeave" ref="modalRef" v-model:show="showModal4" arrow-wrapper-class title="嵌套弹窗拖拽" :show-mask="false" preset="card" draggable :style="{ width: '400px' }" @close="onClose">
    <div class="flex justify-end">
      <div class="w-6 h-6 bg-[deepskyblue]" @click="onShowPopover"></div>
      <n-popover class="my-self-selector" :show="showPopover" :show-arrow="false" placement="right" :x="x" :y="y" trigger="manual">
        <span>showPopover: {{ showPopover }}</span>
        <div class="large-text">
          <img class="w-[300px] object-cover" src="https://picsum.photos/id/237/200" alt="图片" />
        </div>
      </n-popover>
    </div>
  </n-modal>
</template>

<script setup lang="ts">
import { ref, useTemplateRef } from 'vue';

const showPopover = ref(false);
const showModal4 = ref(false);
const modalRef = useTemplateRef('modalRef');
const x = ref(0);
const y = ref(0);

function onClose() {
  showPopover.value = false;
  showModal4.value = false;
}

function onAfterLeave() {
  showPopover.value = false;
}

function onShowPopover() {
  getModalPosition();
  showPopover.value = !showPopover.value;
}

function getModalPosition() {
  console.log('modalRef.value :>> ', modalRef.value);
  const modalEl = document.querySelector('.xxxxxxxxxxx') as HTMLElement;
  const rect = modalEl?.getBoundingClientRect();
  x.value = rect?.x + rect?.width;
  y.value = rect?.y + 170;
  console.log('x.value :>> ', x.value);
  console.log('y.value :>> ', y.value);
}
</script>
