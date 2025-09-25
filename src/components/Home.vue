<template>
  <div class="flex justify-center mt-6 gap-2">
    <n-button @click="showModal4 = !showModal4"> 弹窗嵌套 </n-button>
    <n-button @click="onShowOuterModal"> 拖拽指令示例 </n-button>
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

  <!-- 外层 n-modal，开启拖拽 -->
  <n-modal v-model:show="showOuterModal" :mask-closable="false" draggable title="外层可拖拽弹层" :show-mask="false" preset="card" :style="{ width: '600px' }">
    <div class="flex flex-col gap-2">
      <!-- 内部触发元素 -->
      <div class="bg-amber-300 p-2" @click="toggleInnerModal">点击 显示可拖拽子弹层</div>

      <!-- 第二个可拖拽弹层 #a -->
      <div v-if="showInnerModal" v-draggable="draggableOptions" id="a" class="inner-modal" @click.stop>
        <div class="inner-header">
          可拖拽子弹层 #a
          <n-button size="small" type="text" @click="showInnerModal = false"> 关闭 </n-button>
        </div>
        <div class="inner-content">这个弹层可以独立拖拽，不影响外层弹层</div>
      </div>
    </div>
  </n-modal>
</template>

<script setup lang="ts">
import { ref, useTemplateRef } from 'vue';
import { useRouter } from 'vue-router';
import { vDraggable } from './draggableDirective';

const router = useRouter();

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

// 外层modal控制
const showOuterModal = ref(false);

// 内层弹层控制
const showInnerModal = ref(false);
const isClickHold = ref(false);

// 拖拽配置选项
const draggableOptions = ref({
  handle: '.inner-header', // 只有点击头部才能拖拽
  zIndex: 1001, // 拖拽时的层级
  draggingClass: 'dragging', // 拖拽时的CSS类名
  onStart: (event: MouseEvent, element: HTMLElement) => {
    console.log('拖拽开始', { x: event.clientX, y: event.clientY });
  },
  onMove: (event: MouseEvent, element: HTMLElement, position: { x: number; y: number }) => {
    // 可以在这里添加拖拽过程中的逻辑
  },
  onEnd: (event: MouseEvent, element: HTMLElement, position: { x: number; y: number }) => {
    console.log('拖拽结束', position);
  },
});

function onShowOuterModal() {
  showOuterModal.value = true;
}

// 切换内层弹层显示状态
const toggleInnerModal = () => {
  showInnerModal.value = !showInnerModal.value;
  isClickHold.value = showInnerModal.value;
};
</script>

<style scoped>
.inner-modal {
  position: absolute;
  width: 300px;
  background-color: white;
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  padding: 8px;
  left: 50px;
  top: 100px;
  z-index: 1001; /* 确保在父级modal之上 */
}

.inner-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  border-bottom: 1px solid #e5e7eb;
  cursor: move; /* 提示可拖拽 */
}

.inner-content {
  padding: 16px;
}

/* 拖拽中的样式 */
.dragging {
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
}
</style>
