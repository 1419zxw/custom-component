<template>
  <SearchFilter
    v-model:model="formModel"
    :config="formConfig"
    :baseModel="baseModel"
  >
    <template #userNamePrefix>
      <user-outlined />
    </template>
    <template #userNameTips>
      <span style="color: gray">This is some tips</span>
    </template>
    <template #userTelPrefix>
      <phone-outlined />
    </template>
    <template #userEmailPrefix>
      <mail-outlined />
    </template>
    <template #userAddressPrefix>
      <bank-outlined />
    </template>
  </SearchFilter>
</template>

<script>
import SearchFilter from "@/components/SearchFilter/index.vue";
import { reactive, toRefs, ref } from "vue";
import { debounce, cloneDeep } from "lodash-es";
import {
  UserOutlined,
  PhoneOutlined,
  MailOutlined,
  BankOutlined,
} from "@ant-design/icons-vue";
export default {
  components: {
    SearchFilter,
    UserOutlined,
    PhoneOutlined,
    MailOutlined,
    BankOutlined,
  },
  setup() {
    // 基础表单
    const baseModel = {
      name: "",
      code: undefined,
      tel: "",
      email: "",
      address: "",
    };
    // 用户编码options
    const codeOptions = ref([]);

    const state = reactive({
      formModel: cloneDeep(baseModel),
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
              // console.log("handleInput", e.target.value);
            },
          },
          slots: {
            prefix: "userNamePrefix",
            tips: "userNameTips",
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
              // console.log("handleSelect", val);
            },
            search: debounce((val) => {
              if (!val) return (codeOptions.value = []);
              codeOptions.value = [
                {
                  label: val,
                  value: val,
                },
              ];
            }, 300),
          },
        },
        {
          label: "用户电话",
          type: "input",
          prop: "tel",
          attribute: {
            maxlength: 11,
            type: "number",
            allowClear: true,
          },
          events: {
            input(e) {
              // console.log("handleInput", e.target.value);
            },
          },
          slots: {
            prefix: "userTelPrefix",
          },
        },
        {
          label: "用户邮箱",
          type: "input",
          prop: "email",
          attribute: {
            allowClear: true,
          },
          events: {
            input(e) {
              // console.log("handleInput", e.target.value);
            },
          },
          slots: {
            prefix: "userEmailPrefix",
          },
        },
        // {
        //   label: "用户地址",
        //   type: "input",
        //   prop: "address",
        //   attribute: {
        //     maxlength: 30,
        //     type: "text",
        //     allowClear: true,
        //   },
        //   events: {
        //     input(e) {
        //       console.log("handleInput", e.target.value);
        //       console.log(state.formModel);
        //     },
        //   },
        //   slots: {
        //     prefix: "userAddressPrefix",
        //   },
        // },
      ],
    });

    const methods = {
      handleReset() {
        state.formModel = cloneDeep(baseModel);
      },
    };

    return {
      ...toRefs(state),
      ...methods,
      baseModel,
    };
  },
};
</script>
