// 导入自己需要的组件
import {
  Select,
  Option,
  OptionGroup,
  Input,
  Tree,
  Dialog,
  Row,
  Col,
  Form,
  FormItem,
  Breadcrumb,
  BreadcrumbItem,
  Cascader,
  CascaderPanel,
  Button,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Table,
  Menu,
  Submenu,
  Tag,
  Scrollbar,
  MenuItem,
  TableColumn,
  Pagination,
  DatePicker,
  Loading,
  Message,
  Radio,
  RadioGroup,
  RadioButton,
  MessageBox,
  Tabs,
  TabPane,
} from 'element-ui';
const element = {
  install: function (Vue) {
    Vue.prototype.$ELEMENT = { size: 'mini' };
    Vue.use(Tabs);
    Vue.use(TabPane);
    Vue.use(Select);
    Vue.use(Option);
    Vue.use(OptionGroup);
    Vue.use(Input);
    Vue.use(Tree);
    Vue.use(Dialog);
    Vue.use(Row);
    Vue.use(Col);
    Vue.use(Form);
    Vue.use(FormItem);
    Vue.use(Breadcrumb);
    Vue.use(BreadcrumbItem);
    Vue.use(Cascader);
    Vue.use(CascaderPanel);
    Vue.use(Button);
    Vue.use(Dropdown);
    Vue.use(DropdownMenu);
    Vue.use(DropdownItem);
    Vue.use(Table);
    Vue.use(Menu);
    Vue.use(Submenu);
    Vue.use(Tag);
    Vue.use(Tree);
    Vue.use(Scrollbar);
    Vue.use(MenuItem);
    Vue.use(TableColumn);
    Vue.use(Pagination);
    Vue.use(Loading.directive);
    Vue.use(DatePicker);
    Vue.use(Radio);
    Vue.use(RadioGroup);
    Vue.use(RadioButton);
    Vue.prototype.$confirm = MessageBox.confirm;
    Vue.prototype.$message = Message;
  }
};
export default element;
