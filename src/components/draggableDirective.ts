// 拖动指令配置接口
interface DraggableOptions {
  // 拖拽手柄选择器，只有点击该元素才能拖拽
  handle?: string;
  // 拖拽开始回调
  onStart?: (event: MouseEvent, element: HTMLElement) => void;
  // 拖拽中回调
  onMove?: (event: MouseEvent, element: HTMLElement, position: { x: number; y: number }) => void;
  // 拖拽结束回调
  onEnd?: (event: MouseEvent, element: HTMLElement, position: { x: number; y: number }) => void;
  // 是否禁用拖拽
  disabled?: boolean;
  // 拖拽时的z-index
  zIndex?: number;
  // 拖拽时的CSS类名
  draggingClass?: string;
}

// 扩展HTMLElement接口，添加自定义属性
declare global {
  interface HTMLElement {
    _dragOptions?: DraggableOptions;
    _dragCleanup?: () => void;
  }
}

// 默认配置
const defaultOptions: DraggableOptions = {
  handle: undefined,
  disabled: false,
  zIndex: 1001,
  draggingClass: 'dragging',
};

export const vDraggable = {
  mounted(el: HTMLElement, binding: any) {
    const options: DraggableOptions = { ...defaultOptions, ...binding.value };

    let isDragging = false;
    let initialX = 0;
    let initialY = 0;
    let currentX = 0;
    let currentY = 0;
    let startX = 0;
    let startY = 0;

    // TODO:计算边界限制
    const constrainPosition = (x: number, y: number) => {
      return { x, y };
    };

    // 鼠标按下事件
    const mouseDownHandler = (e: MouseEvent) => {
      // 检查是否禁用
      if (options.disabled) return;

      // 检查拖拽手柄
      if (options.handle) {
        const handleElement = el.querySelector(options.handle);
        if (!handleElement || !handleElement.contains(e.target as Node)) {
          return;
        }
      }

      // 将当前元素置于顶层
      el.style.zIndex = String(options.zIndex);

      // 获取元素当前位置
      const style = window.getComputedStyle(el);
      const matrix = new DOMMatrixReadOnly(style.transform);
      currentX = matrix.e;
      currentY = matrix.f;

      initialX = e.clientX - currentX;
      initialY = e.clientY - currentY;
      startX = currentX;
      startY = currentY;
      isDragging = true;

      // 添加拖拽状态样式
      if (options.draggingClass) {
        el.classList.add(options.draggingClass);
      }

      // 触发开始回调
      if (options.onStart) {
        options.onStart(e, el);
      }

      // 阻止事件冒泡
      e.stopPropagation();
    };

    // 鼠标移动事件
    const mouseMoveHandler = (e: MouseEvent) => {
      if (!isDragging) return;

      e.preventDefault();
      e.stopPropagation();

      currentX = e.clientX - initialX;
      currentY = e.clientY - initialY;

      // TODO:应用边界限制
      const constrainedPosition = constrainPosition(currentX, currentY);
      currentX = constrainedPosition.x;
      currentY = constrainedPosition.y;

      // 使用transform移动元素
      el.style.transform = `translate(${currentX}px, ${currentY}px)`;

      // 触发移动回调
      if (options.onMove) {
        options.onMove(e, el, { x: currentX, y: currentY });
      }
    };

    // 鼠标释放事件
    const mouseUpHandler = (e: MouseEvent) => {
      if (!isDragging) return;

      isDragging = false;

      // 移除拖拽状态样式
      if (options.draggingClass) {
        el.classList.remove(options.draggingClass);
      }

      // 触发结束回调
      if (options.onEnd) {
        options.onEnd(e, el, { x: currentX, y: currentY });
      }

      e.stopPropagation();
    };

    // 添加事件监听
    el.addEventListener('mousedown', mouseDownHandler);
    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);

    // 存储配置和清理函数
    el._dragOptions = options;
    el._dragCleanup = () => {
      el.removeEventListener('mousedown', mouseDownHandler);
      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    };
  },

  // 更新指令配置
  updated(el: HTMLElement, binding: any) {
    const newOptions: DraggableOptions = { ...defaultOptions, ...binding.value };
    el._dragOptions = newOptions;
  },

  // 组件卸载时清理事件监听
  unmounted(el: HTMLElement) {
    if (el._dragCleanup) {
      el._dragCleanup();
    }
  },
};
