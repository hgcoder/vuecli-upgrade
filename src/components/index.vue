<template>
    <div class="domApp">
        <h2>
            <span>苏宁-大数据中心-前端开发部</span> 
            <router-link to="/express" tag="span" class="circleLoading keyframe">express</router-link> 
        </h2>
        <h2>2017-01-19</h2>
        <div class="domlist" v-html="comData"></div>
        <iframe src="" frameborder="0" v-html="comData"></iframe>
    </div>
    
</template>

<script>

export default {
    data(){
        return {
            comData:null
        }
    },
    components: {
        
    },
    mounted(){
        var _this = this;
        __ut.setRequest({
            url:"/domList/sever1",
            type:"GET",
            data:{
                a:1
            },
            success:function(data){
                _this.comData = data;
            },
            error:function(){
                _this.$message('404')
            }
        })
    }
}
</script>

<style lang="scss">
    #wrapper {
        margin-top: 40px;
        display: block !important;
        > * {
            display: block !important;
        }
        #u{
            display: none !important;
        }
    }
</style>
