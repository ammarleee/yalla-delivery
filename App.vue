<template>
<v-app>
  <div id="app">
      <div class=" rounded-lg  grey">
        <component :is="layout" 
         class=" rounded-lg white" >
          <router-view />
        </component>
      </div>
    </div>
</v-app>

</template>
<script>
const default_layout = "default";



export default {
  mounted(){

  },
  
  computed: {
    layout() {
      return (this.$route.meta.layout || default_layout) + "-layout";
    }
  },
  methods:{
    
  },
 
}
</script>
<style lang="scss">
a { text-decoration: none !important; }


</style>

