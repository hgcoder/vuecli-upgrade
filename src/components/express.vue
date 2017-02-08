<template>
    <div id="app" class="domApp">
        <h2>express</h2>  
        <div class="text">高度包容、快速而极简的 
            <router-link to="/nodejs" tag="div" class="circleLoading">NodeJs</router-link>
            Web 框架.</p>  
    </div>
</template>

<script>

export default {
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
        .text{
            margin-top: 10px;
        }
        h2{
            text-align: left;
        }
    }
    .text .circleLoading{
        cursor: pointer;
        float: none;
        display: inline-block;
    }
</style>
