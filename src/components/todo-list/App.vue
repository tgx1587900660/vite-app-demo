<template>
  App根组件
  <TodoList :list="todolist"></TodoList>
</template>

<script>
import TodoList from './TodoList.vue'
export default {
  name: 'MyApp',
  components: { TodoList },
  data() {
    return {
      todolist: [
        { id: 1, task: '周一早晨9点开会', done: false },
        { id: 2, task: '周一晚上8点聚餐', done: false },
        { id: 3, task: '准备周三上午的演讲稿', done: true }
      ]
    }
  },
  methods: {}
}
</script>

<style lang="less" scoped>
</style>
