<template>
    <div class="domApp">
        <h2>
            <span>xxxxxxx开发部</span> 
            <router-link to="/express" tag="span" class="circleLoading keyframe">express</router-link> 
        </h2>
        <h2>代码撸起来</h2>
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
