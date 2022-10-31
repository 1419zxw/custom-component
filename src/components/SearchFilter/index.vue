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
        <template
          v-for="slot in getSlotEntries(comp.slots, comp.type)"
          #[slot.name]="scope"
        >
          <slot :name="slot.value" v-bind="scope"> </slot>
        </template>
      </component>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
import componentMap from "./components/componentMap";

const props = defineProps({
  model: {
    type: Object,
    default: () => {},
  },
  config: {
    type: Array,
    default: () => [],
  },
});

const getComponent = (type) => {
  return componentMap[type];
};

const getSlotEntries = (slotsObj, compType) => {
  if (!slotsObj) return [];

  return Object.entries(slotsObj).map((item) => {
    return {
      name: item[0],
      value: item[1],
    };
  });
};
</script>

<style lang="less">
.container {
  display: flex;
  &_item {
    display: flex;
    width: 300px;
    &_label {
      width: 60px;
    }
    &_comp {
      flex: 1;
    }
  }
}
</style>
