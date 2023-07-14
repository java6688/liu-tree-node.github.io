<template>
  <div class="tree">
    <div class="tree-item" v-for="(node, i) in list" :key="node.name">
        <div class="box">
          <div class="left">
            <span class="icon" v-if="node.children" @click="showChildren[i] = !showChildren[i]">{{ showChildren[i] ? "收起" : "展开" }}</span>
            <span class="label">{{ node.name }}</span>
          </div>
          <div class="handler">
            <button @click="delItem(node, props.indexs, i)">删除</button>
            <button @click="addItem(node)">添加下级</button>
          </div>
        </div>
        <transition name="fade">
          <TreeNode v-if="node.children && showChildren[i]" :indexs="[...indexs, i]" :list="node.children" @del="delItem" @add="addItem"/>
        </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: "TreeNode",
}
</script>

<script setup>
import { reactive } from 'vue'
const props = defineProps({
  list: Array,
  indexs: {
    type: Array,
    default: () => ([])
  }
})

const emit = defineEmits(['del', 'add'])

const showChildren = reactive([])
props.list.forEach((_, i) => {
  showChildren[i] = true
})

const addItem = (record) => {
  emit('add', record)
}
const delItem = (record, indexs, i) => {
  // 递归组件出发del事件没有i参数
  emit('del', record, i >=0 ? [...indexs, i] : indexs)
}
</script>

<style scoped>
.tree {
  box-sizing: border-box;
  width: 100%;

}
.tree-item {
  /* background: deeppink; */
  /* margin-left: 10px; */
  width: 100%;
  padding-left: 20px;
  box-sizing: border-box;
}
.box {
  display: flex;
  justify-content: space-between;
  background-color: rgb(72, 74, 94);
  color: white;
  margin-bottom: 10px;
  padding: 5px 10px;
}
.icon {
  cursor: pointer;
  color: deeppink;
  margin-right: 10px;
}

.fade-enter-active,
.fade-leave-active {
  transition:  0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
  /* height: 0; */
  /* overflow: hidden; */
}
</style>
