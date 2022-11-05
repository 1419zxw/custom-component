<template>
  <div class="container">
    <div v-for="comp in config" :key="comp.prop" :style="{ marginLeft: DEFAULT_ITEM_MARGIN_LEFT }" class="container_item">
      <span
        class="container_item_label"
        :style="{ width: comp.labelWidth || DEFAULT_ITEM_LABEL_WIDTH }"
        >{{ `${comp.label}：` }}</span
      >
      <component
        :is="getComponent(comp.type)"
        v-model:value="model[comp.prop]"
        v-bind="comp.attribute"
        v-on="comp.events"
        :style="{ width: comp.compWidth || DEFAULT_ITEM_COMP_WIDTH }"
        class="container_item_comp"
      >
        <template
          v-for="slot in getSlots(comp.slots, comp.type)"
          #[slot.name]="scope"
        >
          <slot :name="slot.value" v-bind="scope"> </slot>
        </template>
      </component>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue"
import componentMap from "./components/componentMap"
import { DEFAULT_ITEM_LABEL_WIDTH, DEFAULT_ITEM_COMP_WIDTH, DEFAULT_ITEM_MARGIN_LEFT } from "./constant"

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

const getComponent = (type) => {
  return componentMap[type]
}

const getSlots = (slotsObj) => {
  if (!slotsObj) return []

  return Object.entries(slotsObj).map((item) => {
    return {
      name: item[0],
      value: item[1],
    }
  })
}
</script>

<style lang="less">
.container {
  display: flex;
  padding: 20px;
  &_item {
    display: flex;
    align-items: center;
    &_label {
      text-align: right;
    }
  }
}
</style>
