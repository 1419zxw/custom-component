<template>
  <SearchFilter :model="formModel" :config="formConfig">
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
import { debounce } from "lodash-es";
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
    const codeOptions = ref([]);

    const state = reactive({
      formModel: {
        name: "",
        code: undefined,
        tel: "",
        email: "",
        address: "",
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
              console.log("handleInput", e.target.value);
              console.log(state.formModel);
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
              console.log("handleSelect", val);
              console.log(state.formModel);
            },
            search: debounce((val) => {
              if (!val) return (codeOptions.value = []);
              codeOptions.value = [
                {
                  label: val,
                  value: val,
                },
              ];
              console.log(codeOptions.value);
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
              console.log("handleInput", e.target.value);
              console.log(state.formModel);
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
              console.log("handleInput", e.target.value);
              console.log(state.formModel);
            },
          },
          slots: {
            prefix: "userEmailPrefix",
          },
        },
        {
          label: "用户地址",
          type: "input",
          prop: "address",
          attribute: {
            maxlength: 30,
            type: "text",
            allowClear: true,
          },
          events: {
            input(e) {
              console.log("handleInput", e.target.value);
              console.log(state.formModel);
            },
          },
          slots: {
            prefix: "userAddressPrefix",
          },
        },
      ],
    });

    return {
      ...toRefs(state),
    };
  },
};
</script>
