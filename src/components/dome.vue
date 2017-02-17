/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2017-01-29 12:09:43
 * @version $Id$
 */


<template>
  
</template>

<script>
import {MENU,breadNavDt} from "vuex"
export default {
  data() {
        return {
            menu: MENU.data,
            poi: breadNavDt.data
        }
    },
    methods: {
        
    },
    components: {
   
    },
    mounted(){
        console.log(MENU.data.list)
        console.log(breadNavDt.data.list)
    }
}
</script>

<style scoped lang ="scss">



</style>
