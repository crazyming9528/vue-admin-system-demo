import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);


const store = new Vuex.Store({
  state: {

    //基础信息
    systemInfo: {
      title: "内容管理与数据分析系统", // 网站标题
      logo: "", // 网站标志
      slogan: "", // 网站口号
      keyword: "", // 网站关键词
      remark: "", // 网站描述
      login: 0, // 是否允许登录   0 false  1 true
      open: 0, // 是否开启网站  0 false  1 true
      register: 0, // 是否允许注册  0 false  1 true
    },
    operatorInfo: {
      operator_id: '',
      operator_name: '',
      token: '',
      status: "",
      role: ''
    },
    menu: [],
    requestCompleted: false,
    breadcrumb: [],
    showTop: true,//显示顶部
    showNav: true,//显示左侧导航
    showBreadcrumb: true,//显示面包屑导航
    isHome2: false,//是否在home2 可视化面板

  },
  getters: {
    systemInfo: (state) => {
      return state.systemInfo;
    },
    getBreadList: (state) => {
      return state.breadcrumb;
    },

    getRequestCompleted: (state) => {
      return state.requestCompleted;
    },
    getShowTop: (state) => {
      return state.showTop;
    },
    getShowNav: (state) => {
      return state.showNav;
    },
    getShowBreadcrumb: (state) => {
      return state.showBreadcrumb;
    },

    getOperatorInfo: (state) => {
      return state.operatorInfo;
    },
    getIsHome2: (state) => {
      return state.isHome2;
    },

    getMenu: (state) => {
      return state.menu;
    },

  },
  mutations: {

    setRequestCompleted(state, mark) {
      state.requestCompleted = mark;
    },
    setShowTop: (state, mark) => {
      state.showTop = mark;
    },
    setShowNav: (state, mark) => {
      state.showNav = mark;
    },
    setShowBreadcrumb: (state, mark) => {
      state.showBreadcrumb = mark;
    },

    setOperatorInfo: (state, data) => {
      state.operatorInfo.operator_id = data.user_id;
      state.operatorInfo.operator_name = data.username;
      state.operatorInfo.token = data.token;
      state.operatorInfo.status = data.status;
    },
    setOperatorRole: (state, data) => {
      state.operatorInfo.role = data;

    },

    setSystem(state, info) {
      let sy = state.systemInfo;
      for (let item in sy) {
        if (sy.hasOwnProperty(item)) {
          sy[item] = info[item];
        }
      }


    },
    refreshBreadList(state, arr) {
      state.breadcrumb = arr;
    },
    setIsHome2(state, mark) {
      state.isHome2 = mark;
    },

    setMenu(state, allMenu) {

      const recursion = function (menu) {
        return menu.filter(item => {
          if (item.children) item.children = recursion(item.children);
          console.log(state.operatorInfo,33333333);
          return state.operatorInfo.role.permission.find((p) => {
            return p.menu_key === item.name
          });
        })
      };

      state.menu = recursion(allMenu);

    },

  }
});
export default store;
