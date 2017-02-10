/**
 * 
 * @authors huxiao (you@example.org)
 * @date    2017-01-27 16:33:33
 * @version $Id$
 */

/**
 * 公用菜单数据
 * [MENU description]
 * @type {Object}
 */ 
            
exports.MENU = {
    data:{
        name:"",
        list: [
            {   
                mTit:"一级菜单1",
                "isChoosed":1,
                listTit:[
                    {name:"home",url:"/index","isChoosed":1,nIndex:"1-1"},
                    {name:"express",url:"/express","isChoosed":1,nIndex:"1-2"}, 
                ],
                nIndex:1,
                showSecMenuFlag:1,
                mTitIcon:'el-icon-information'
            },
            {
                nIndex:1,
                mTit:"一级菜单2",
                listTit:[
                    {name:"nodejs",url:"/nodejs","isChoosed":1,nIndex:"2-1"}
                ],
                showSecMenuFlag:0,
                mTitIcon:'el-icon-star-off',
                "isChoosed":1
            }
        ]
    },
    clear : function() {
        this.data = {
            name:"",
            list: []
        };
    }
}

/**
 * 面包屑 nav 公用数据
 * [breadNavDt description]
 * @type {Object}
 */    
exports.breadNavDt = {
    data:{
        name:"",
        list: []
    },
    clear:function() {
        this.data = {
            name:"",
            list: []
        };
    }
}