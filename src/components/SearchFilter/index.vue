<template>
  <div class="container">
    <div class="container_item" v-for="comp in config" :key="comp.prop">
      <span class="container_item_label">{{ comp.label }}</span>
      <component
        :is="getComponent(comp.type)"
        v-model:value="model[comp.prop]"
        v-bind="comp.attribute"
        v-on="comp.events"
        class="container_item_comp"
      >
        <template v-for="slot in slotsMap[comp.prop]" v-slot:[slot]="scope">
          <slot :name="slot" v-bind="scope"> </slot>
        </template>
      </component>
    </div>
  </div>
</template>

<script setup>
import { defineProps, ref, useSlots } from "vue"
import componentMap from "./components/componentMap"

const props = defineProps({
  model: {
    type: Object,
    default: () => {},
  },
  config: {
    type: Array,
    default: () => [],
  },
})

const $slots = useSlots()

const getComponent = (type) => {
  return componentMap[type]
}

// 插槽映射表
let slotsMap = ref({})
const generateSlotsMap = () => {
  // 遍历组件配置项
  props.config.forEach((comp) => {
    // 如果组件有传slots
    if (comp.slots && comp.slots.length) {
      // 遍历slots
      slotsMap.value[comp.prop] = comp.slots.reduce((slotNameArr, slotName) => {
        // $slots中没有此slot 报错不存在
        if (!$slots[slotName]) {
          console.error(`[SearchFilter] 插槽 "${slotName}" 不存在`)
        } else {
          // 添加slot
          slotNameArr.push(slotName)
        }

        return slotNameArr
      }, [])
    }
  })
}
generateSlotsMap()
console.log(slotsMap.value)
</script>

<style lang="less">
.container {
  display: flex;
  &_item {
    display: flex;
    width: 200px;
    &_label {
      width: 60px;
    }
    &_comp {
      flex: 1;
    }
  }
}
</style>
