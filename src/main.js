import { createApp } from "vue"
import "./style.css"
import "ant-design-vue/dist/antd.css"
import App from "./App.vue"
import globallInstall from "@/globalInstall/index.js"
import router from "./router/index.js"

const app = createApp(App)
globallInstall(app)
app.use(router)
app.mount("#app")
