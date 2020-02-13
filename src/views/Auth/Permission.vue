<template>
  <div class="page_wrapper">

    <div class="main_body animated  fadeIn">

      <el-row class="head_area  panel_area">
        <el-col :span="24">
          <span class="title">权限配置</span>
          <span class="description">{{this.$store.getters.systemInfo.title}} 权限配置</span>
        </el-col>
      </el-row>


      <el-row class="panel_area">


        <el-col :span="24">
        </el-col>
      </el-row>


      <el-row :gutter="20" class="panel_area">
        <el-col :span="8">
          <h3>前端路由菜单</h3>
          <div v-if="tree">
            <el-tree :data="tree" :props="treeProps" @node-click="handleNodeClick"></el-tree>
            <div style="color: gray;font-size: 14px;margin-top: 15px">如果上方树形数据与前端路由表不匹配 请
              <el-button @click.native="updateRouteFromFrontEnd" plain size="mini" style="margin-left: 5px"
                         type="warning">同步前端路由到服务器
              </el-button>
            </div>
          </div>
        </el-col>
        <el-col :span="16" v-if="this.currentMenu.title">
          <h3><span class="currentMenu">{{this.currentMenu.title}}</span> 菜单下的 API 权限 </h3>
          <div class="api_permission">
            <ul>
              <li :key="index" v-for="(p,index)  of apiPermission">
                权限key:
                <el-input placeholder="请输入权限key" size="mini" v-model="p.key"></el-input>
                后端路由:
                <el-input placeholder="请输入后端路由" size="mini" v-model="p.route"></el-input>
                描述：
                <el-input placeholder="请输入描述" size="mini" v-model="p.description"></el-input>
                <el-button @click.native="deleteApiPermission(p.ap_id,index)" plain size="mini" type="danger">删除
                </el-button>
              </li>
            </ul>
            <el-button @click.native="saveApiPermission" size="mini" style="margin-top: 20px;margin-left: 15px"
                       type="primary"
                       v-show="this.apiPermission.length>0">保存
            </el-button>
            <el-button @click.native="addApiPermission" size="mini" style="margin-top: 20px" type="success">添加权限
            </el-button>
          </div>

        </el-col>

      </el-row>


    </div>


  </div>
</template>

<script>
    import pageMixin from "@/mixin/pageMixin";
    import tableMixin from "@/mixin/tableMixin";
    import TableToolsBox from "../../components/childComponents/TableToolsBox";
    import {
        deleteAPIPermissionByMenu,
        getAPIPermissionByMenu,
        getMenuPermission,
        setAPIPermissionByMenu,
        setMenuPermission
    } from "../../api/permission";

    export default {
        name: "Permission",
        components: {
            TableToolsBox,
        },
        mixins: [pageMixin],
        props: {},
        data() {
            return {
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


                // function changeRoutes(routes) {
                //     return routes.map(item => {
                //         item.label = item.meta.title;
                //         if (item.children) item.children = changeRoutes(item.children);
                //         return item;
                //     });
                // }


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
                        let vueRoutes = _.cloneDeep(this.$router.options.routes.find(item => item.name === 'Frame').children);
                        this.tree = recursion(vueRoutes);
                    }
                })


                // this.data = changeRoutes(vueRoutes);//改变路由  在路由配置中 加入label 以便tree 组件使用

            },
            handleNodeClick(data) {
                this.currentMenu = {
                    title: data.meta.title,
                    name: data.name,
                };
                getAPIPermissionByMenu(data.name).then(res => {
                    const {code, data, message} = res.data;
                    if (code === 10000) {
                        this.apiPermission = data;
                    }
                })
            },

            deleteApiPermission(id, index) {
                if (!id) {
                    this.apiPermission.splice(index, 1)
                    return;
                }
                ;
                deleteAPIPermissionByMenu(id).then(res => {
                    const {code, data, message} = res.data;
                    if (code === 10000) {
                        getAPIPermissionByMenu(this.currentMenu.name).then(r => {
                            const {code, data, message} = r.data;
                            if (code === 10000) {
                                this.ele_alert("删除成功", "success");
                                this.apiPermission = data;
                            }
                        });
                    }
                })

            },
            addApiPermission() {
                this.apiPermission.push({key: "", route: "", menu_key: this.currentMenu.name, description: ""});
            },
            saveApiPermission() {
                if (this.apiPermission.every(item => {
                    return item.key !== "";
                })) {
                    setAPIPermissionByMenu(this.apiPermission).then(res => {
                        const {code, data, message} = res.data;
                        if (code === 10000) {
                            getAPIPermissionByMenu(this.currentMenu.name).then(r => {
                                const {code, data, message} = r.data;
                                if (code === 10000) {
                                    this.ele_alert("保存成功", "success");
                                    this.apiPermission = data;
                                }
                            });
                        }

                    });
                } else {
                    this.ele_alert("Key不能为空！", "warning");
                }

            },
            updateRouteFromFrontEnd() {
                const arr = [];

                function getRouteName(routes) {
                    routes.forEach(item => {
                        arr.push({name: item.name, title: item.meta.title});
                        if (item.children) getRouteName(item.children);
                    })
                }

                getRouteName(this.$router.options.routes.find(item => item.name === 'Frame').children);

                setMenuPermission(arr).then(res => {
                    const {data, code, message} = res.data;
                    if (code === 10000) {
                        this.ele_notify("更新前端路由到服务器成功！","success");
                        this.getRoutes();
                    }
                });


            }

        },
        created() {
            this.getRoutes();
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

  .table-expand {
    font-size: 0;
  }

  .table-expand label {
    width: 90px;
    color: #99a9bf;
  }

  .table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 100%;
  }


  .el-input {
    width: 180px;
  }

  h3 {
    margin-bottom: 15px;
    margin-left: 5px;
    font-weight: normal;
  }

  .page_wrapper {

    .currentMenu{
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
