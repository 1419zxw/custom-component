<template>
  <div class="container" ref="containerRef">
    <div class="searchFilter">
      <div
        v-for="comp in config.slice(0, fastNum + 1)"
        :key="comp.prop"
        :style="{ marginLeft: ITEM_MARGIN_LEFT }"
        class="searchFilter_item"
      >
        <span
          class="searchFilter_item_label"
          :style="{ width: comp.labelWidth || DEFAULT_ITEM_LABEL_WIDTH }"
          >{{ `${comp.label}：` }}</span
        >
        <component
          :is="methods.getComponent(comp.type)"
          v-model:value="insideModel[comp.prop]"
          v-bind="comp.attribute"
          v-on="comp.events"
          :style="{ width: comp.compWidth || DEFAULT_ITEM_COMP_WIDTH }"
          class="searchFilter_item_comp"
        >
          <template
            v-for="slot in methods.getSlots(comp.slots, comp.type)"
            #[slot.name]="scope"
          >
            <slot :name="slot.value" v-bind="scope"> </slot>
          </template>
        </component>
      </div>
    </div>

    <div class="btnGroup">
      <a-button @click="methods.handleReset">重置</a-button>
      <a-button type="primary" @click="methods.handleSearch">查询</a-button>
      <a-button v-if="props.showHighSearch" type="primary">高级查询</a-button>
    </div>
  </div>
</template>

<script setup>
import { cloneDeep, throttle } from "lodash-es";
import { defineProps, defineEmits, ref, watch, onMounted } from "vue";
import componentMap from "./components/componentMap";
import {
  CONTAINER_PADDING,
  DEFAULT_ITEM_LABEL_WIDTH,
  DEFAULT_ITEM_COMP_WIDTH,
  ITEM_MARGIN_LEFT,
  BUTTON_GROUP_WIDTH_1,
  BUTTON_GROUP_WIDTH_2,
} from "./constant";

const BUTTON_GROUP_WIDTH = props.showHighSearch
  ? BUTTON_GROUP_WIDTH_1
  : BUTTON_GROUP_WIDTH_2;

const props = defineProps({
  model: {
    type: Object,
    default: () => {},
  },
  config: {
    type: Array,
    default: () => [],
  },
  baseModel: {
    type: Object,
    default: () => {},
  },
  showHighSearch: {
    type: Boolean,
    default: true,
  },
});
const emit = defineEmits(["update:model", "reset"]);

const containerRef = ref();
const fastNum = ref(0);
const calcFastNum = () => {
  fastNum.value = 0;

  // searchFilter宽度
  let searchFilterWidth =
    containerRef.value.offsetWidth -
    widthFomatToNumber(BUTTON_GROUP_WIDTH) -
    widthFomatToNumber(CONTAINER_PADDING) * 2;

  // 当前累计宽度
  let totalWidth = 0;

  // 遍历数组
  for (let i = 0; i < props.config.length; i++) {
    // item宽度
    let itemWidth =
      widthFomatToNumber(props.config[i].compWidth || DEFAULT_ITEM_COMP_WIDTH) +
      widthFomatToNumber(
        props.config[i].labelWidth || DEFAULT_ITEM_LABEL_WIDTH
      );

    // 累加宽度
    totalWidth += itemWidth;

    // 累加的宽度超出最大宽度时 退出
    if (totalWidth > searchFilterWidth) {
      break;
    } else {
      fastNum.value = i;
    }
  }
};
const widthFomatToNumber = (width) => {
  // 处理自定义宽度时 百分比的情况
  if (width && width.includes("%")) {
    width = boxWidth * Number("0." + width.substring(0, width.indexOf("%")));
  }
  // 处理自定义宽度时 px的情况
  if (width && width.includes("px")) {
    width = Number(width.substring(0, width.indexOf("px")));
  }
  return width;
};

// 内部表单 用于双向绑定value
let insideModel = ref(cloneDeep(props.model));
watch(
  () => props.model,
  () => {
    insideModel.value = cloneDeep(props.model);
  },
  {
    deep: true,
  }
);

const methods = {
  // 查询
  handleSearch() {
    emit("update:model", cloneDeep(insideModel.value));
  },
  // 重置
  handleReset() {
    if (props.baseModel && Object.keys(props.baseModel).length) {
      emit("update:model", cloneDeep(props.baseModel));
    }
    emit("reset");
  },
  getComponent(type) {
    return componentMap[type];
  },
  getSlots(slotsObj) {
    if (!slotsObj) return [];

    return Object.entries(slotsObj).map((item) => {
      return {
        name: item[0],
        value: item[1],
      };
    });
  },
};

onMounted(() => {
  calcFastNum();
  window.onresize = throttle(calcFastNum, 300);
});
</script>

<style lang="less">
.container {
  display: flex;
  align-items: center;
  padding: v-bind(CONTAINER_PADDING);
  .searchFilter {
    flex: 1;
    display: flex;
    &_item {
      display: flex;
      align-items: center;
      &_label {
        text-align: right;
      }
    }
  }
  .btnGroup {
    display: flex;
    justify-content: space-evenly;
    width: v-bind(BUTTON_GROUP_WIDTH);
  }
}
</style>
