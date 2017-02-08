<template>
    
    <div id="app" class="comWrap">
        
        <div class="comHeader">
            <el-menu theme="dark" default-active="1" class="el-menu-demo" mode="horizontal" @select="">
                <el-menu-item index="1" class="logoBox">
                    Suning
                </el-menu-item>
                
                <el-menu-item index="2" class="fr"><a href="" target="_blank">订单管理</a></el-menu-item>
                <el-menu-item index="3" class="fr"><a href="" target="_blank">权限管理</a></el-menu-item>
                <el-submenu index="4" class="fr">
                    <template slot="title">我的工作台</template>
                    <el-menu-item index="4-1">菜单1</el-menu-item>
                    <el-menu-item index="4-2">选项2</el-menu-item>
                    <el-menu-item index="4-3">选项3</el-menu-item>
                </el-submenu>

            </el-menu>
        </div>
        
        <div class="comBody">
            <div class="comSlide">
                <div class="navBox">
                    <el-menu default-active="1-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
                        <template v-for="(cList,index1) in menu.list">
                            <el-submenu index="">
                                <template slot="title"><i :class="cList.mTitIcon"></i>{{cList.mTit}}</template>
                                <el-menu-item-group>
                                    <el-menu-item v-for="(item,index2) in cList.listTit" index="1">
                                        <router-link :to="{ path: item.url}">{{item.name}}</router-link>
                                    </el-menu-item>
                                </el-menu-item-group>
                            </el-submenu>
                        </template>
                    </el-menu>
                </div>
            </div>
            <bread-nav></bread-nav>
            <div class="comCot">
                <!-- 模块挂载点 -->
                <router-view></router-view>
            </div>
        </div>
        <div class="comFoot"></div>
    </div>
</template>

<script>
import {MENU} from "vuex"
import breadNav from "plu/breadcrumb.vue"
export default {
    components: {
        // breadNav
    },
    data(){
        return {
            menu: MENU.data,
        
        }
    },
    methods: {
        handleOpen(key, keyPath) {
            
        },
        handleClose(key, keyPath) {
            
        }
    },
    mounted(){
        console.log(4)
    }
}
</script>

<style lang ="scss">
/*layout*/
.domApp{
    padding-top:10px;
    h2:nth-child(1){
        margin-top: 10px;
        font-size: 26px;
        text-align: left;
        max-width: 80%;
        span{
            margin-top: 40px;
            cursor: pointer;
        }
    }
    h2{
        margin-top: 20px;
        text-align: left;
    }
}
@-webkit-keyframes diyHander {
    0% {
        -webkit-transform: rotate(0deg); 
    }

    100% {
        -webkit-transform: rotate(360deg); 
    } 
}
@keyframes diyHander {
    0% {
        -webkit-transform: rotate(0deg); 
    }
    100% {
        -webkit-transform: rotate(360deg); 
    } 
}
.domApp .circleLoading {
    -webkit-animation:diyHander 5s infinite ease-in-out;
    text-align: center;
    overflow: hidden;
    float: right;
}
body{
    overflow-y:hidden;
}
.comHeader{
    background-color: #324157;
    h1{
        border-bottom:1px solid #2c893a;
        height: 30px;
        line-height: 30px;
        padding: 10px 20px;
        font-size: 26px;
        text-align: left;
    }
    .navBox{

    }
}
.comBody{
    overflow: hidden;
    height: 100%;
}
.el-menu-item-group a{
    display: block;
}
.comSlide{
    background-color: #eef1f6;
    float: left;
    width: 20%;
    height: 100%;
    overflow-y: auto;
}
.comWrap{
    height: 100%;
}

/*diy style*/
.logoBox{
    font-size: 20px !important;
}
.comCot{
    float: right;
    width: 78%;
}

</style>
