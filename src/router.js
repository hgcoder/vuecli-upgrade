/**
 * 
 * @authors huxiao (you@example.org)
 * @date    2017-01-23 19:10:15
 * @version $Id$
 */

// 路由懒加载配置
const index = resolve => require(['./components/index.vue'], resolve)
const express = resolve => require(['./components/express.vue'], resolve)
const nodejs = resolve => require(['./components/nodejs.vue'], resolve)

// 路由配置
const router = [
	{	
		path: '/index', 
		component: index	
	},
	{
		path: '/express', 
		component: express
		
	},
	{
		path: '/nodejs', 
		component: nodejs
		
	},
	{
      	path:'*',redirect:'/index'
  	}
]

export default router;