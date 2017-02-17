<template>
    <div id="app" class="domApp">
        <h2 v-if="showFlag" @click="switchStatus">nodeJs</h2>  
        <p class="text" v-if="showFlag">Node.js是一个Javascript运行环境(runtime)。实际上它是对Google V8引擎进行了封装。V8引 擎执行Javascript的速度非常快，性能非常好。Node.js对一些特殊用例进行了优化，提供了替代的API，使得V8在非浏览器环境下运行得更好。</p> 
        <h2 v-if="!showFlag">express</h2>
        <p class="text" v-if="!showFlag">express是高度包容、快速而极简的 NodeJs Web 框架.</p> 
        <router-link :to="{ path: '/index'}" tag="div" class="circleLoading">返回首页</router-link>
        <el-button :class="{'el-button--primary':showFlag}" @click="switchStatus">切换</el-button>
    </div>
</template>

<script>

export default {
    data() {
        return {
            showFlag:true,
            testt:"primary"
        }
    },
    methods:{
        switchStatus:function(){
            this.showFlag = !this.showFlag
        }
    },
    created(){
        this.testt = !this.showFlag ? "primary"  : " ";
    },
    mounted(){

    }
}
</script>

<style scoped lang="scss">
    .domApp{
        h2:nth-child(1){
            margin-top: 20px;
            font-size: 26px;
            text-align: left;
            max-width: 80%;
            span{
                cursor: pointer;
                margin-top: 80px;
            }
        }
        p{
            margin-top: 10px;
        }
        .text{
            line-height: 30px;
        }
        h2{
            text-align: left;
        }
    }
    .circleLoading{
        font-size: 20;
        cursor: pointer;
        margin-right: 30px;
        margin-top: 30px;
    }
</style>
