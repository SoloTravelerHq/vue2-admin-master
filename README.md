### 一、项目特点

通过二次封装 elementUI 组件，实现高效开发后台管理系统页面。

给二次封装的表格、表单等组件传入 tools 变量自动生成对应的工具；传入 columns 变量自动生成表格字段。

```vue
<CommonTable
  :tools="tools"
  :columns="columns"
  :tableData="tableData"
  @sort-change="sortChange"
  @filter-search="filterSearch"
  @change="changeParam"
  @selectionChange="selectionChange"
>
</CommonTable>
```

```js
data () {
    return {
      tools: [
        {
          type: "button", btnType: "success", label: "刷新", icon: "el-icon-refresh", action: () => {
          }
        },
        {
          type: "button", btnType: "primary", label: "新增", icon: "el-icon-plus", action: () => {
          }
        },
        {
          type: "button", btnType: "warning", label: "修改", icon: "el-icon-edit", action: () => {
          }
        },
        {
          type: "button", btnType: "danger", label: "删除", icon: "el-icon-delete", action: () => {
          }
        },
        {
          type: "filter",
          label: "高级搜索",
          icon: "el-icon-search",
          options: [
            { field: "name", label: "名称", value: "", type: "input" },
            {
              field: "type",
              label: "类型",
              value: "",
              type: "select",
              options: [
                { label: "类型一", value: 0 },
                { label: "类型二", value: 1 }
              ]
            },
            { field: "dateRange", label: "申请日期", value: [], type: "daterange2" }
          ]
        },
        {
          type: "cascader",
          field: "area",
          label: "区域",
          value: [],
          options: [
            {
              label: "四川",
              value: 510000,
              children: [
                {
                  label: "成都市",
                  value: 510100,
                  children: [
                    { label: "锦江区", value: 510101 },
                    { label: "成华区", value: 510102 }
                  ]
                }
              ]
            },
            {
              label: "重庆",
              value: 520000,
              children: [
                {
                  label: "重庆市",
                  value: 520100,
                  children: [
                    { label: "万州区", value: 520101 },
                    { label: "涪陵区", value: 520102, disabled: true },
                    { label: "渝中区", value: 520103 }
                  ]
                }
              ]
            }
          ]
        }
      ],
      columns: [
        { type: "selection", fixed: "left" },
        { type: "index", fixed: "left" },
        { field: "name", label: "姓名", minWidth: 150, fixed: "left", action: this.detail },
        { field: "sex", label: "性别", minWidth: 120, setTextClass: this.setSexTextClass },
        { field: "yphone", label: "联系电话", minWidth: 180 },
        {
          type: "operate",
          width: 200,
          fixed: "right",
          btns: [
            {
              field: "status",
              options: [
                { value: true, label: "停用" },
                { value: false, label: "启用" }
              ],
              action: this.enable
            },
            {
              label: "审核",
              action: this.verify,
              disableBtn (row) {
                return !row.status;
              }
            }
          ]
        }
      ],
      tableData: {
        loading: false,
        data: [],
        total: 0
      }
    };
  },
```

#### 1、项目运行

```
//1、安装依赖
npm install
//2、运行
npm run serve//17及以上的node版本用npm run dev
//3、登录
账号：admin
密码：123456
```

#### 2、开发流程

1. 在 views 文件夹下新建一级导航界面文件，以 demo 为例；
2. 在 demo 文件夹下新建路由界面或二级导航界面文件；
3. 在 assets/menu 文件夹下新建 demo.js 文件用于路由注册；
4. 在 assets/menu 文件夹下的 index.js 文件中引入 demo.js 文件（此时界面上可以显示新建的导航）；
5. 在 mock 文件夹下新建模拟数据接口的文件，以 demo 为例；
6. 在 mock/mockApi.js 文件中引入新建的模拟数据接口文件；
7. 在 api 文件夹下新建请求接口文件，以 demo 为例；
8. 在路由界面中引入新建的请求接口文件获取数据，以 demo 为例子；

#### 3、项目打包

```
npm run build//17及以上的node版本用npm run build_t
```

### 二、目录结构

#### 1、api

定义接口请求，按照 views 中的文件结构建立对应接口文件结构，便于维护和管理。

- sysManage：系统管理相关接口
- demo：示例相关接口
- login：登录相关接口
- token：token 相关接口

#### 2、assets

用于存放静态资源

- image：静态图片
- menu：定义菜单导航
- style：全局样式

#### 3、components

非路由组件（全局组件）

- VerifyCode：登录验证
- CommonTable：表格组件
- CommonToolbar：工具栏组件
- CustomElement：工具元组件（下拉框、输入框......）
- eDialog：弹框组件
- Header：一级导航栏组件
- SecondMenu：二级导航栏组件
- Navigator：快捷标签导航组件
- SecondView：二级导航路由组件
- permisTree：角色权限分配组件
- vcharts：图表组件

#### 4、lib

js 库

- util：工具类函数
- common.js：公共函数库
- request.js：统一请求接口函数库
- validator.js：用于 elementui 的 form 组件的校验函数库

#### 5、mock

用于模拟数据和接口，文件结构对应着 views 中的文件结构

- demo：存放 demo 功能模块相关模拟数据和接口
- login：存放登录功能模块相关模拟数据及接口
- sysManage：存放系统管理功能模块模拟数据及接口
- mockApi.js：模拟接口统一注册文件。（容易产生冲突，需要统一维护）

#### 6、router 路由

#### 7、store 全局状态管理（vuex）

#### 8、views 路由组件

- demo：示例
- home：首页
- login：登录页
- sysManage：系统管理

#### 9、App.vue 页面根组件

#### 10、main.js 应用入口

#### 11、setting.js 应用配置

### 三、环境配置

1. 文件`.env`中存放默认的环境参数（代理的别名）
2. 文件`.development`中存放开发环境参数（代理的接口地址和应用名称），启动命令`npm run serve/dev`
3. 文件`.test`中存放测试环境参数（代理的接口地址和应用名称），启动命令`npm run test`
4. 文件`.production`中存放生产环境参数（代理的接口地址和应用名称），启动命令`npm run production`
5. 以上文件修改后，需要重启项目才能生效。
