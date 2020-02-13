import Frame from '@/views/frame'
import Layout from "@/views/_Layout/Layout";



export const dynamicRoutes = {
  path: '/',
  name: 'Frame',
  component: Frame,
  // redirect: '/Login',
  children: [
    {path: '/', redirect: 'Home'},
    {
      path: '/Home',
      name: 'Home',
      component: () => import('../views/Home/Home'),
      meta: {
        title: '首页'
      }
    },
    {
      path: '/User',
      name: 'User',
      // redirect: 'User/UserList',
      component: Layout,
      meta: {
        title: '用户管理'
      },
      children: [
        {
          path: 'UserList',
          name: 'UserList',
          component: () => import('../views/User/UserList'),
          meta: {
            title: '用户列表'
          }
        },
        {
          path: 'UserInfo',
          name: 'UserInfo',
          component: () => import('@/views/User/UserInfo'),
          hidden: true,
          meta: {
            title: '用户信息'
          }
        },
        {
          path: 'LiveRate',
          name: 'LiveRate',
          component: () => import('@/views/User/LiveRate'),
          hidden: false,
          meta: {
            title: '用户留存'
          }
        },
      ]
    },
    {
      path: '/Statement',
      name: 'Statement',
      redirect: 'Statement/WechatRedPackage',
      component: Layout,
      meta: {
        title: '流水报表'
      },
      children: [
        {
          path: 'DailyStatisticalWrap',
          name: 'DailyStatisticalWrap',
          component: () => import('@/views/Statement/DailyStatisticalWrap'),
          meta: {
            title: '每日汇总'
          }
        },
        {
          path: 'ChargeStatistics',
          name: 'ChargeStatistics',
          component: () => import('@/views/Statement/ChargeStatistics'),
          meta: {
            title: '充值统计'
          }
        },


      ]

    },
    {
      path: '/Channel',
      name: 'Channel',
      redirect: 'Channel/ChannelManage',
      component: Layout,
      meta: {
        title: '渠道管理'
      },
      children: [
        {
          path: 'ChannelManage',
          name: 'ChannelManage',
          component: () => import('@/views/Channel/ChannelManage'),
          meta: {
            title: '渠道设置'
          }
        },


      ]
    },
    {
      path: '/WechatModule',
      name: 'WechatModule',
      redirect: 'WechatModule/WechatJump',
      component: Layout,
      meta: {
        title: '微信'
      },
      children: [
        {
          path: 'WechatJump',
          name: 'WechatJump',
          component: () => import('@/views/Wechat/WechatJump'),
          meta: {
            title: '微信H5跳出'
          }
        },


      ]
    }, {
      path: '/Auth',
      name: 'Auth',
      redirect: 'Auth/OperatorList',
      component: Layout,
      meta: {
        title: '后台用户'
      },
      children: [
        {
          path: 'OperatorList',
          name: 'OperatorList',
          component: () => import('@/views/Auth/OperatorList'),
          meta: {
            title: '操作员列表'
          }
        },
        {
          path: 'Role',
          name: 'Role',
          component: () => import('@/views/Auth/Role'),
          meta: {
            title: '角色列表'
          }
        },
        {
          path: 'RoleModify',
          name: 'RoleModify',
          component: () => import('@/views/Auth/RoleModify'),
          hidden: true,
          meta: {
            title: '角色修改'
          }
        },
        {
          path: 'Permission',
          name: 'Permission',
          component: () => import('@/views/Auth/Permission'),
          meta: {
            title: '权限管理'
          }
        },


      ]
    }
  ]
}
