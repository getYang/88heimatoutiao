import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './styles/index.less'
import axios from 'axios'
import JSONbig from 'json-bigint'
import moment from 'moment'

// 加载 nprogress 中的指定的样式文件
// 注意：加载第三方包中的具体文件不需要写具体路径，直接写包名即可
// 总结就是："包名/具体文件路径"
import 'nprogress/nprogress.css'

// 设置 axios的常态地址
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'

// axios 默认是这样的
// 在内部使用 JSON.parse 把后端返回的数据字符串转换为对象给开发者使用
// axios.defaults.transformResponse = [function (data, headers) {
//   return JSON.parse(data)
// }]

// axios 默认会把后端返回的数据使用 JSON.parse 转为对象给我们使用
// 同时它也提供了让我们自定义转换的功能
// axios 在收到响应数据之后会经过这里
axios.defaults.transformResponse = [function (data, headers) {
  // Do whatever you want to transform the data

  // axios 默认使用 JSON.parse(data)
  // 我们这里手动配置使用 JSONbig.parse(data)
  // 任何接口都会返回数据
  // 所有请求返回的数据都要 JSONbig.parse(data) 转一下
  // 删除操作，后端返回的是空数据
  // 空数据一经转换就报错了
  // 说白了，当没有响应体的时候，JSONbig.parse(data) 执行就报错了

  // 把导致出错的代码放到 try 里面，把出错之后的处理放到 catch 里面
  // try-catch 是 JavaScript 的原生语法，就像 if-else 一样，专门用于捕获异常
  try {
    return JSONbig.parse(data)
  } catch (err) {
    console.log(err)
    // 一旦 try 里面的代码执行引发异常，那么就进入 catch 执行
    return {}
  }

  // console.log(data)
  // return JSONbig.parse(data)
}]

// axios 请求拦截器
axios.interceptors.request.use(function (config) {
  // 在请求拦截器函数中的 config 是本次请求相关的配置对象
  // config 就是最后要发给后端的那个配置对象
  // 我们可以在拦截器中对 config 进行统一配置定制
  // console.log('请求拦截器', config)

  // 获取本地存储中的 token
  const token = window.localStorage.getItem('user-token')

  // 统一添加 token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  // return config 是通行的规则
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

// axios 响应拦截器
axios.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  // console.log('响应拦截器')
  return response
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error)
})

// 将axios共享给所有的实例使用
Vue.prototype.$axios = axios

// 注册整个的所有的elementUI组件
// Vue.use 调用了elementUI里面的一个方法 install => 调用时 传入了 Vue对象
// 在引入 Element 时，可以传入一个全局配置对象。
// 该对象目前支持 size 与 zIndex 字段。
// size 用于改变组件的默认尺寸，
// zIndex 设置弹框的初始 z-index（默认值：2000）
Vue.use(Element, {
  // 项目中所有拥有 size 属性的组件的默认尺寸均为 'small'
  size: 'small'
})

// 全局过滤器：任何组件模板都可以直接访问
// 参数1：过滤器名称
// 参数2：函数
// 调用方式：在模板中 {{ 数据 | 过滤器 }}
// | 管道符前面的数据就会作为参数传递给过滤器函数
// 过滤器函数的第1个参数始终是
// value、format 是形参，它就是我随便起的一个名字
// Vue 在1.x 的时候有很多内置的过滤器
// Vue 升级版本 2 的时候移除了所有的内置过滤器
// 但是保留了过滤器的功能
// 用户还可以继续自定义添加过滤器来使用
// 强调：处理一些简单的文本格式化
Vue.filter('dateFormat', (value, format = 'YYYY-MM-DD') => {
  return moment(value).format(format)
})

// function add(x = 20, y = 10) {
//   // 10 10
// }

// add(10)
// add(10, 20) // 10, 20
// add() // 20, 10
// add(, 50) // 20, 50

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
