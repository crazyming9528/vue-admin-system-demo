<template>
  <div class="c-main page_wrapper">
    <div class="main_body animated  fadeIn">

      <el-row class="head_area  panel_area">
        <el-col :span="18">
          <span class="title">数据汇总</span>
          <span class="description">系统数据信息聚合中心 1分钟自动更新 <b
            v-show="this.updateTime">上次更新时间: {{updateTime |formatDate}}</b> </span>
        </el-col>
      </el-row>
      <transition name="slide-fade">
        <!--        <h3 v-if="realTimeData.allData.length">总数据实时统计</h3>-->
      </transition>
      <el-row class="dataVisualization  panelArea">
        <transition-group name="slide-fade">
          <el-col :key="item.key" :lg="6"
                  :md="12" :sm="12" :span="6" :xl="6" :xs="24"
                  class="dataVisualization_item dataVisualization_item3 wow fadeInLeft"
                  v-for="(item,index) of realTimeData.allData">
            <div class="card">
              <h3>{{item.text}}<br/> <b>
                <CountUp :decimals="item.decimals"
                         :endnum="item.value"
                         class="count_up"
                         duration="1"
                         prefix=""
                         separator=","
                         suffix=""
                ></CountUp>
              </b><span>({{item.util}})</span></h3>
              <div class="viewMore"></div>
            </div>
          </el-col>
        </transition-group>

      </el-row>

      <el-row class="chartArea  panel_area">

        <el-col :offset="2" :span="20" class="chart" style="
                height: 460px;">
          <transition name="slide-fade">
            <EchartComponent :option="loginEchartOption"
                             v-if="this.loginEchartOption"></EchartComponent>
          </transition>
        </el-col>


      </el-row>


    </div>
  </div>
</template>

<script>
    import pageMixin from "@/mixin/pageMixin";
    import CountUp from "@/components/childComponents/CountUp";
    import EchartComponent from "../../components/childComponents/echartComponent";
    import LoginOption from '@/echart/loginOption'

    export default {
        name: "home",
        mixins: [pageMixin],
        components: {CountUp, EchartComponent},
        data() {
            return {
                updateTime: "",
                loginEchartOption: null,
                realTimeData: {
                    allData: [],//总数据
                    todayData: [],//今日数据
                    roomData: [],//
                },
                autoRefresh: '',
            }
        },
        methods: {
            getLoginEchart() {
                return new Promise((resolve, reject) => {


                    //模拟的 异步 echart 数据
                    setTimeout(() => {
                        let option = this._.cloneDeep(LoginOption);
                        let hour = [0,1,2,3,4].map((item) => {
                            return item + ":00 - " + item + ":59";
                        });
                        option.legend.data =hour;
                        option.xAxis.data = hour;
                        option.series[0].data = [6962,4697,2832,1694,918];
                        option.series[0].name = "登录人数";
                        option.series[1].data = [10269,6917,4138,2414,1284];
                        option.series[1].name = "登录次数";
                        this.loginEchartOption = option;
                        resolve(true);
                    },800)

                })
            },
            getData(type) {


                return new Promise((resolve, reject) => {
                    this.globalMixin_request(`rts_index?type=${type}`).then(res => {
                        const {code, data, message} = res;
                        this.realTimeData[type] = data;
                        // // 计算小数点后位数
                        this.realTimeData[type] = this.realTimeData[type].map(item => {
                            //如果包含小数点  转为两位小数;
                            if (item.value.toString().indexOf('.') !== -1) {
                                item.value = Number(item.value).toFixed(2);
                                item.decimals = item.value.toString().split('.')[1].length;  // 就是item.decimals = 2;
                            } else {
                                item.decimals = 0
                            }

                            return item;
                        });


                        resolve(true);

                    })


                })

            },


            getRealTimeStatistics() {

                Promise.all([this.getData('allData'), this.getLoginEchart()]).then((res) => {
                    const isOk = res.every(item => item);
                    if (isOk) {
                        this.updateTime = new Date();
                    }
                })


            },


        },
        mounted() {


        },
        beforeDestroy() {
            clearInterval(this.autoRefresh);
        },
        created() {
            this.getRealTimeStatistics();
            this.autoRefresh = setInterval(() => {
                this.getRealTimeStatistics();
            }, 60000)
        }
    }
</script>

<style lang="scss" scoped>
  /*@import "../../assets/styles/base.css";*/
  @import "../../assets/styles/base.scss";

  .slide-fade-enter-active {
    transition: all 1s;
  }

  .slide-fade-leave-active {
    transition: all 1s;
  }

  .slide-fade-enter, .slide-fade-leave-to {
    transform: translateX(20px);
    opacity: 0;
  }


  .c-main {
    overflow: hidden;

    .dataVisualization {

      .dataVisualization_item {
        transition: all 1s;
        padding: 15px 15px;

        .card {
          position: relative;
          box-sizing: border-box;
          padding: 5px;
          background-color: $baseColor1;
          border-radius: 3px;
          cursor: pointer;

          h3 {
            font-weight: lighter;
            color: white;
            padding: 2px;

            b {
              font-weight: bold;
              padding: 0 10px;

              span {
                font-size: 28px;

              }
            }

            span {
              font-size: 12px;
              color: #e4e4e4;
            }
          }

          .viewMore {
            text-align: right;
            color: white;
            font-size: 12px;
          }

        }
      }

      .dataVisualization_item1 {
        .card {
          background-color: $baseColor1;
          transition: all 0.3s;
        }
      }

      .dataVisualization_item1:hover {
        .card {
          background-color: #003f6b;
        }
      }

      .dataVisualization_item2 {
        .card {
          background-color: #4270ae;
          transition: all 0.3s;
        }
      }

      .dataVisualization_item2:hover {
        .card {
          background-color: #31507e;
        }
      }

      .dataVisualization_item3 {
        .card {
          background-color: #21a3b0;
          transition: all 0.3s;
        }
      }

      .dataVisualization_item3:hover {
        .card {
          background-color: #1e7c88;
        }
      }

      .dataVisualization_item4 {
        .card {
          background-color: #7bbdbc;
          transition: all 0.3s;
        }
      }

      .dataVisualization_item4:hover {
        .card {
          background-color: #5c908f;
        }
      }

    }

    .chartArea {
      background-color: #2b3643;
      border-radius: 3px;
    }

    .tableArea {
      .table, .console {
        padding: 15px;
      }
    }

  }
</style>
