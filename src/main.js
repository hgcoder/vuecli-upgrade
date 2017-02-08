/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2017-01-23 09:15:27
 * @version $Id$
 */
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import VueRouter from 'vue-router'

import routes from './router.js'
import __ut from "./js/utils/comUtils.js"
import {breadNavDt} from 'vuex'
import 'element-ui/lib/theme-default/index.css'
import './style/reset.css'

//组件注册
Vue.use(VueRouter)
Vue.use(ElementUI)

//实例化配置路由
const router = new VueRouter({
	routes
})
/**
 * 返回当前目录
 * @param  {[type]} path [description]
 * @return {[type]}      [description]
 */
const searMap = function (path){
    var obj = {
        name:null,
        list:[]
    }
    var diyMenu = [
	    {   
	        mTit:"一级菜单1",
	        listTit:[
	            {name:"home",url:"/index","isChoosed":1},
	            {name:"express",url:"/express","isChoosed":1}, 
	        ],
	        nIndex:1,
	        showSecMenuFlag:1,
	        mTitIcon:'el-icon-information'
	    },
	    {
            mTit:"一级菜单2",
            listTit:[
                {name:"nodejs",url:"/nodejs","isChoosed":1}
            ],
            showSecMenuFlag:0,
            mTitIcon:'el-icon-star-off',
            "isChoosed":1
        }
	]
    for (var i = 0; i < diyMenu.length; i++) {
        for (var l = 0; l < diyMenu[i].listTit.length; l++) {
            if(path == diyMenu[i].listTit[l].url || path.indexOf(diyMenu[i].listTit[l].url)>-1){
                obj.name = diyMenu[i].listTit[l].name;
                obj.list = [diyMenu[i].mTit,diyMenu[i].listTit[l].name];
                break;
            }
        }
    }

    return obj;
}

/**
 * 导航钩子，跳转完成后执行
 * @param  {[type]} route [description]
 * @return {[type]}       [description]
 */
router.afterEach(route => {
 	var ruleObj = searMap(route.path);
    breadNavDt.data.name = ruleObj.name;
    breadNavDt.data.list =[];
    breadNavDt.data.list = ruleObj.list;
})
// 启动单页根挂载点，启动路由
new Vue({
  el: '#app',   
  router,
  render: h => h(App)
})
