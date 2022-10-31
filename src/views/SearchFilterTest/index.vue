<template>
  <SearchFilter :model="formModel" :config="formConfig">
    <template #userNamePrefix>
      <user-outlined type="user" />
    </template>
    <template #userNameTips>
      <span style="color: gray">This is some tips</span>
    </template>
  </SearchFilter>
</template>

<script>
import SearchFilter from "@/components/SearchFilter/index.vue"
import { reactive, toRefs, ref } from "vue"
import { debounce } from "lodash-es"
import { UserOutlined } from '@ant-design/icons-vue'
export default {
  components: { SearchFilter, UserOutlined },
  setup() {
    const codeOptions = ref([])

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
            type: "text",
            allowClear: true,
          },
          events: {
            input(e) {
              console.log("handleInput", e.target.value)
              console.log(state.formModel)
            },
          },
          slots: {
            prefix: 'userNamePrefix',
            tips: 'userNameTips'
          },
        },
        {
          label: "用户编码",
          type: "select",
          prop: "code",
          attribute: {
            allowClear: true,
            showSearch: true,
            options: codeOptions,
          },
          events: {
            change(val) {
              console.log("handleSelect", val)
              console.log(state.formModel)
            },
            search: debounce((val) => {
              if (!val) return (codeOptions.value = [])
              codeOptions.value = [
                {
                  label: val,
                  value: val,
                },
              ]
              console.log(codeOptions.value)
            }, 300),
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
