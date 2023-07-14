<template>
  <h1>liu-tree-node</h1>
  <div class="card">
    <button class="out-add-btn" @click="open">添加项</button>
    <div class="form" v-if="showForm">
      <label>{{ label }}：</label>
      <input type="text" v-model="form.name">
      <button @click="submit">确认</button>
    </div>
    <TreeNode :list="list" @del="del" @add="addItem"></TreeNode>
  </div>
</template>

<script setup>
import { reactive, ref, computed } from 'vue';
import TreeNode from './components/TreeNode.vue';

const showForm = ref(false)
const open = () => showForm.value = true
const close = () => showForm.value = false

let form = reactive({
  name: ""
})

const label = computed(() => {
  const name = currentData.value.name
  return name ? name + '的下级' : '一级项名称'
})

const currentData = ref({})
const submit = () => {
  console.log(currentData.value)
  if(!currentData.value.name) {
    list.push({...form})
  } else if(currentData.value?.children) {
    currentData.value.children.push({...form})
  } else {
    currentData.value.children = [{...form}]
  }
  form.name = ""
  close()
}

const del = (node, indexs) => {
  console.log(node, indexs)
  // 删除的是一级项
  if(indexs.length === 1) {
    return list.splice(indexs[0], 1)
  }
  // 删除子项
  const { data, index } = findTargetObj(indexs)
  data.children.splice(index, 1)
}
const addItem = (node) => {
  currentData.value = node
  console.log(node)
  open()
}

const findTargetObj = (indexs) => {
  // 目标层索引，即需要删除的项所在children的索引
  const targetIndex = indexs.slice(-1)[0]
  // 需要删除的项，所在的对象，找到该对象
  let parentObj = {}
  console.log(targetIndex)
  indexs.slice(0, -1).forEach((curentIndex, i) => {
    if(i == 0) {
      parentObj = list[curentIndex]
    } else {
      // 遍历层数，最下层children属性所在的对象，然后根据targetIndex进行删除
      parentObj = parentObj.children[curentIndex]
    }
  });
  return {
    data: parentObj,
    index: targetIndex
  }
}
const list = reactive([
  {
    name: "1",
    children: [
      {
        name: "1-1",
        children: [
          {
            name: "1-1-1",
            children: [
              {
                name: "1-1-1-1"
              },
              {
                name: "1-1-1-2"
              }
            ]
          }
        ]
      },
      {
        name: "1-2",
        children: [
          {
            name: "1-2-1"
          }
        ]
      }
    ]
  },
  {
    name: "2",
    children: [
      {
        name: "2-1",
        children: [
          {
            name: "2-1-1"
          }
        ]
      },
      {
        name: "2-2",
        children: [
          {
            name: "2-2-1"
          }
        ]
      }
    ]
  }
])
</script>

<style scoped>
h1 {
  text-align: center;
}
.card {
  padding: 10px;
  background-color: white;
  box-shadow: 0 0 10px rgba(0,0,0,.2);
  border-radius: 5px;
  width: 500px;
  margin: auto;
  text-align: right;
}
.out-add-btn {
  margin-bottom: 10px;
}
.form {
  margin: 10px;
}
</style>
