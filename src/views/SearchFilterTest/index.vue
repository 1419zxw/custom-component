<template>
  <SearchFilter :model="formModel" :config="formConfig"></SearchFilter>
</template>

<script>
import SearchFilter from "@/components/SearchFilter/index.vue"
import { reactive, toRefs } from "vue"
export default {
  components: { SearchFilter },
  setup() {
    const state = reactive({
      formModel: {
        name: "",
        code: undefined,
      },
      formConfig: [
        {
          label: "用户名",
          type: "input",
          prop: "name",
          attribute: {
            maxlength: 10,
            type: "number",
            allowClear: true,
          },
          events: {
            input(e) {
              console.log("handleInput", e.target.value)
              console.log(state.formModel)
            },
          },
        },
        {
          label: "用户编码",
          type: "select",
          prop: "code",
          attribute: {
            allowClear: true,
            options: [
              {
                label: "10010",
                value: 10010,
              },
            ],
          },
          events: {
            change(val) {
              console.log("handleSelect", val)
              console.log(state.formModel)
            },
          },
        },
      ],
    })

    return {
      ...toRefs(state),
    }
  },
}
</script>
