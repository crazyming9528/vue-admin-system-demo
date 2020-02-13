<template>
  <div class="page_wrapper">

    <div class="main_body animated  fadeIn">
      <el-row class="head_area  panel_area">
        <el-col :span="24">
          <span class="title">角色修改</span>
          <span class="description">{{this.$store.getters.systemInfo.title}} 角色修改</span>
          <el-button @click.native="getRoutes" plain size="mini" type="success">获取</el-button>
        </el-col>
      </el-row>


      <el-row class="panel_area">

        <el-col :span="24">
          <h3 class="part_title">角色基础信息修改</h3>
        </el-col>
        <el-col :span="24">
          <el-form :model="form" label-width="80px" ref="form">
            <label for="name">角色名称:</label>
            <el-input id="name" v-model="form.roleName" :disabled="rid==1"></el-input>
            <label for="description" style="margin-left: 15px">角色描述:</label>
            <el-input id="description" style="width: 500px" v-model="form.description"></el-input>

          </el-form>

        </el-col>
      </el-row>


      <el-row v-if="rid !=1" :gutter="20" class="panel_area">
        <el-col :span="24">
          <h3 class="part_title">角色权限修改</h3>
        </el-col>
        <el-col :span="8">
          <h3>菜单级别的权限</h3>
          <div v-if="tree">
            <el-tree :data="tree" :default-checked-keys="menuPermission" :props="treeProps"
                     @check-change="handleMenuCheckChange"
                     @node-click="handleNodeClick"
                     node-key="name" show-checkbox></el-tree>
          </div>
        </el-col>
        <el-col :span="16" v-if="this.currentMenu.title">
          <h3><span class="currentMenu">{{this.currentMenu.title}}</span> 菜单下的 具体权限 </h3>
          <div class="api_permission">
            <el-checkbox :key="index" @change="handleApiCheckChange(currentMenu.name,p.key,arguments)"
                         v-for="(p,index)  of apiPermission" v-model="p.checked">{{p.name}}
            </el-checkbox>
          </div>

        </el-col>
        <el-col :span="16" v-else>
          <el-alert
            title="点击左侧菜单节点后可分配具体权限"
            type="info">
          </el-alert>
        </el-col>

      </el-row>

      <el-row v-else  :gutter="20" class="panel_area">
        <el-col :span="24">
        <h3 class="part_title">角色权限修改</h3>
        </el-col>
        <el-col :span="24" >
          <el-alert
            title="无法修改超级管理员的权限,超级管理员拥有全部权限！"
            type="info">
          </el-alert>
        </el-col>
      </el-row>


      <el-row class="panel_area form_footer_button">
        <el-col :span="24">
          <el-button @click="saveData" type="primary">保存</el-button>
          <el-button @click="globalMixin_goBack">返回</el-button>
        </el-col>
      </el-row>


    </div>


  </div>
</template>

<script>
    import pageMixin from "@/mixin/pageMixin";
    import TableToolsBox from "../../components/childComponents/TableToolsBox";
    import {getRoleInfoById, modifyRole} from "../../api/role";
    import {getAPIPermissionByMenu, getMenuPermission} from "../../api/permission";
    export default {
        name: "RoleModify",
        components: {
            TableToolsBox,
        },
        mixins: [pageMixin],
        props: {},
        data() {
            return {
                rid: this.$route.query.rid,
                vueRoutes: null,
                form: {
                    roleName: "",
                    description: "",
                },
                // treeCheckBoxIsOk: false,
                permissionUpdate: {
                    menu: [],
                    api: [],
                },
                allPermission: [],
                menuPermission: [],
                currentMenu: {
                    title: "",
                    name: ""
                },
                treeProps: {
                    label: function (data, node) {
                        return data.meta.title;
                    },
                    children: "children"
                },
                tree: null,
                apiPermission: []
            }
        },
        watch: {},
        computed: {},
        methods: {
            getRoutes() {
                getMenuPermission().then(res => {
                    const {data, code, message} = res.data;
                    if (code === 10000) {
                        const arr = data.map(res => {
                            return res.menu_key;
                        });
                        const recursion = function (routes) {
                            return routes.filter(item => {
                                if (item.children) item.children = recursion(item.children);
                                return arr.includes(item.name);
                            })
                        };
                        this.vueRoutes = _.cloneDeep(this.$router.options.routes.find(item => item.name === 'Frame').children);
                        this.tree = recursion(this.vueRoutes);
                    }
                })


                // this.data = changeRoutes(vueRoutes);//改变路由  在路由配置中 加入label 以便tree 组件使用

            },

            getRoleInfoFn() {
                if (!this.rid) return;
                getRoleInfoById(this.rid).then(res => {
                    const {data, code, message} = res.data;
                    if (code === 10000) {
                        this.form.roleName = data.role_name;
                        this.form.description = data.description;
                        this.allPermission = data.permission;
                        this.menuPermission = data.permission.map(item => {
                            return item.menu_key;
                        });
                        // setTimeout(() => {
                        //     this.treeCheckBoxIsOk = true;//防止 复选框 的改变事件自动触发
                        // }, 1000)
                    }
                })
            },

            handleMenuCheckChange(data, checked, indeterminate) {

                console.log(arguments);
                const item = this.permissionUpdate.menu.find(item => item.name === data.name);
                if (item) {
                    item.status = checked;
                } else {
                    this.permissionUpdate.menu.push({name: data.name, status: checked});
                }

            },
            handleApiCheckChange(menu, key, status) {
                status = status[0];
                console.log(menu, key, status);
                const item = this.permissionUpdate.api.find(item => item.key === key && item.menu_key === menu);
                if (item) {
                    item.status = status;
                } else {
                    this.permissionUpdate.api.push({key: key, menu_key: menu, status});
                }

            },
            handleNodeClick(data) {
                this.currentMenu = {
                    title: data.meta.title,
                    name: data.name,
                };
                const key = data.name;
                getAPIPermissionByMenu(key).then(res => {
                    const {code, data, message} = res.data;
                    if (code === 10000) {
                        this.apiPermission = data.map((item) => {
                            return {
                                key: item.key,
                                name: item.description,
                                checked: false,
                            }
                        });

                        const menu = this.allPermission.find((item) => {
                            return item.menu_key === key;
                        });

                        console.log(menu, key);
                        if (menu && "api" in menu) {
                            this.apiPermission.forEach((item) => {

                                console.log(item);
                                if (menu.api.find(p => p.key === item.key)) {
                                    item.checked = true;
                                }
                            })

                        }

                    }
                })

            },

            saveData() {

                modifyRole(this.rid, {
                    base: this.form,
                    permission: this.permissionUpdate
                }).then(res => {
                    const {data, code, message} = res.data;
                    if (code === 10000) {
                        this.ele_alert(message, "success", () => {
                            this.globalMixin_goBack();
                        });
                    }
                })

            }

        },
        created() {
            this.getRoutes();
            this.getRoleInfoFn();
        },
        mounted() {
        },
    }
</script>

<style lang='scss' scoped>
  @import "../../assets/styles/base.scss";


  .item_img {
    img {
      max-width: 100%;
    }
  }


  .el-input {
    width: 300px;
  }

  h3 {
    margin-bottom: 15px;
    margin-left: 5px;
    font-weight: normal;
  }

  .page_wrapper {

    .currentMenu {
      color: $baseColor3;
    }

    .api_permission {
      display: flex;
      /*flex-direction: row-reverse;*/
      justify-content: center;

      flex-wrap: wrap;

      ul {
        width: 100%;

        li {
          text-align: center;
          color: gray;
          font-size: 14px;

          &:not(:last-child) {
            margin-bottom: 15px;

          }
        }

      }

    }


  }
</style>
