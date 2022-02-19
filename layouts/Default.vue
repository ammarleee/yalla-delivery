<script>

import Header from '@/features/shared/components/Navigations/Header.vue'
import Footer from '@/features/shared/components/Navigations/Footer.vue'
export default {
  components: {
   Header,Footer
  }
};
</script>

<template>
  <div >
  <Header/>

     <v-main>

    <v-container fluid>

     <slot/>
    </v-container>
  </v-main>

<Footer/>
  </div>
</template>
<style  lang="scss" >


</style>
