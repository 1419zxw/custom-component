<template>
  <div class="content">
    <a-select style="width: 100%" v-bind="$attrs">
      <!-- antd插槽 -->
      <template v-for="slot in antdSlots" #[slot]>
        <slot :name="slot"></slot>
      </template>
    </a-select>

    <!-- 自定义插槽 -->
    <div v-if="customSlots.includes('tips')">
      <slot name="tips"></slot>
    </div>

    <!-- other custom slots...... -->
  </div>
</template>

<script>
  export default {
    inheritAttrs: false
  }
</script>

<script setup>
import { useSlots } from "vue";
import { getSlots } from "./hooks";

const $slots = useSlots();
const { antdSlots, customSlots } = getSlots($slots, "input");
</script>
