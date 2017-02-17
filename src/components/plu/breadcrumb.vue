

<template>
    <div class="breadCrumbBox">
        <h2><span>{{comData.name}}</span></h2>
        <el-breadcrumb separator="-">
            <el-breadcrumb-item v-for="cList in comData.list">{{cList}}</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>

<script>
import {breadNavDt} from "vuex"
export default {
    data() {
        return {
            comData: breadNavDt.data
        }
    },
    methods: {
        
    },
    components: {
   
    },
    mounted(){
        console.log("面包屑组件runing")
    }
}
</script>

<style scoped lang ="scss">
    .breadCrumbBox{
        height: 32px;
        line-height: 32px;
        border-bottom: 2px solid #eee;
        font-size: 14px;
        padding: 0 10px;
        float: right;
        width: 77.6%;
        h2{
            float: left;
            border-bottom: 2px solid #2c893a;
            span{
                box-sizing: border-box;
            
                color: #2c893a;
            }
        }
        .el-breadcrumb{
            height: 100%;
            line-height: 31px;
            float: right;
            
        }
    }

</style>
