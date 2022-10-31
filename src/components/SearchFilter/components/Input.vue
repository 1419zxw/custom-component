<template>
  <div class="content">
    <a-input>
      <!-- antd插槽 -->
      <template v-for="slot in antdSlots" #[slot]>
        <slot :name="slot"></slot>
      </template>
    </a-input>

    <!-- 自定义插槽 -->
    <div v-if="customSlots.includes('tips')">
      <slot name="tips"></slot>
    </div>

    <!-- other custom slots...... -->
  </div>
</template>

<script setup>
import { useSlots } from "vue";
import { getSlots } from "./hooks";

const $slots = useSlots();
const { antdSlots, customSlots } = getSlots($slots, "input");

console.log("antdSlots", antdSlots);
console.log("customSlots", customSlots);
</script>
