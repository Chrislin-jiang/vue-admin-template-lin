import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           i             f set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [{
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/hoisting-safety-evaluation',
    children: [{
      path: 'hoisting-safety-evaluation',
      name: 'HoistingSafetyEvaluation',
      component: () => import('@/views/hoisting-safety-evaluation/index'),
      meta: {
        title: '首页',
        // icon: 'dashboard',
        icon: 'el-icon-s-home'
      }
    }]
  },

  {
    path: '/data-management',
    component: Layout,
    redirect: '/data-management/personnel-information',
    name: 'DataManagement',
    meta: {
      title: '数据管理模块',
      icon: 'el-icon-help'
    },
    children: [{
        path: 'personnel-information',
        name: 'PersonnelInformation',
        component: () => import('@/views/personnel-information/index'),
        meta: {
          title: '人员信息',
          icon: 'el-icon-data-analysis'
        }
      },
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/table/index'),
        meta: {
          title: '人员信息-Table',
          icon: 'el-icon-data-analysis'
        }
      },
      {
        path: 'facility-information',
        name: 'FacilityInformation',
        component: () => import('@/views/facility-information/index'),
        meta: {
          title: '设备信息',
          icon: 'el-icon-data-board'
        }
      },
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/tree/index'),
        meta: {
          title: 'Tree',
          icon: 'tree'
        }
      }
    ]
  },

  {
    path: '/evaluation-index',
    component: Layout,
    children: [{
      path: 'index',
      name: 'EvaluationIndex',
      component: () => import('@/views/evaluation-index/index'),
      meta: {
        title: '评价指标体系',
        icon: 'el-icon-s-operation'
      }
    }]
  },

  {
    path: '/evaluation-method',
    component: Layout,
    children: [{
      path: 'index',
      name: 'EvaluationMethod',
      component: () => import('@/views/evaluation-method/index'),
      meta: {
        title: '评价方法',
        icon: 'el-icon-edit-outline'
      }
    }]
  },

  {
    path: '/evaluation-result',
    component: Layout,
    children: [{
      path: 'index',
      name: 'EvaluationResult',
      component: () => import('@/views/evaluation-result/index'),
      meta: {
        title: '评价结果',
        icon: 'el-icon-document'
      }
    }]
  },

  // AuxiliaryInformation auxiliary-information StandardBase  standard-base  AccidentType  accident-type  AuxiliaryCase  auxiliary-case
  {
    path: '/auxiliary-information',
    component: Layout,
    redirect: '/auxiliary-information/standard-base',
    name: 'AuxiliaryInformation',
    meta: {
      title: '辅助信息模块',
      icon: 'el-icon-news'
    },
    children: [{
        path: 'auxiliary-standard-base',
        name: 'AuxiliaryStandardBase',
        component: () => import('@/views/auxiliary-standard-base/index'),
        meta: {
          title: '标准库',
          icon: 'el-icon-data-line'
        }
      },
      {
        path: 'auxiliary-accident-type',
        name: 'AuxiliaryAccidentType',
        component: () => import('@/views/auxiliary-accident-type/index'),
        meta: {
          title: '事故类型',
          icon: 'el-icon-notebook-1'
        }
      },
      {
        path: 'auxiliary-fault-tree-analysis',
        name: 'AuxiliaryFaultTreeAnalysis',
        component: () => import('@/views/auxiliary-fault-tree-analysis/index'),
        meta: {
          title: '事故树分析',
          icon: 'tree'
        }
      },
      {
        path: 'auxiliary-case',
        name: 'AuxiliaryCase',
        component: () => import('@/views/auxiliary-case/index'),
        meta: {
          title: '案例',
          icon: 'el-icon-reading'
        }
      }
    ]
  },

  {
    path: '/error-log',
    component: Layout,
    children: [{
      path: 'log',
      component: () => import('@/views/error-log/index'),
      name: 'ErrorLog',
      meta: {
        title: 'Error Log',
        icon: 'bug'
      }
    }]
  },

  {
    path: '/form',
    component: Layout,
    children: [{
      path: 'index',
      name: 'Form',
      component: () => import('@/views/form/index'),
      meta: {
        title: 'Form',
        icon: 'form'
      }
    }]
  },

  // 404 page must be placed at the end !!!
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
