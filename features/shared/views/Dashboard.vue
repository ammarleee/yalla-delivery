<template>
  <div class="container rounded-lg pa-3 ">
    <div >
      <div >
        <h2 class="text-center font-weight-bold black--text">الصفحة الرئيسية</h2>
        <div class="mt-10">

        <v-row  justify='center'>
          <v-col cols="12" sm='5' class=" ma-2 mb-3 rounded-lg primary ">
            <v-row  align='center'>
            <v-col cols="7" class=" text-center" >
              <h4 class='pink--text font-weight-bold'>رصيد المستودع</h4>
              <p class='white--text caption '>رصيد  كل المستودع</p>
            </v-col>
            <v-col cols="3" class='mr-16 pt-0'>
              <div >
                <p class="rounded-lg   white pink--text pa-1 text-center">500</p>
              </div>
            </v-col>
            </v-row>
          </v-col>

           <v-col cols="12" sm='5' class=" ma-2 mb-3 rounded-lg success ">
            <v-row  align='center'>
            <v-col cols="7" class=" text-center" >
              <h4 class='white--text font-weight-bold'>شحنات سلمت</h4>
              <p class='white--text caption '>شحنات سلمت</p>
            </v-col>
            <v-col cols="3" class='mr-16 pt-0'>
              <div >
                <p class="rounded-lg   white success--text pa-1 text-center">500</p>
              </div>
            </v-col>
            </v-row>
          </v-col>

           <v-col cols="12" sm='5' class=" ma-2 mb-3 rounded-lg warning">
            <v-row  align='center'>
            <v-col cols="7" class=" text-center" >
              <h4 class='white--text font-weight-bold'>الشحنات تحت التحصيل</h4>
              <p class='white--text caption '>الشحنات تحت التحصيل</p>
            </v-col>
            <v-col cols="3" class='mr-16 pt-0'>
              <div >
                <p class="rounded-lg   white warning--text pa-1 text-center">500</p>
              </div>
            </v-col>
            </v-row>
          </v-col>

           <v-col cols="12" sm='5' class=" ma-2 mb-3 rounded-lg primary">
            <v-row  align='center'>
            <v-col cols="7" class=" text-center" >
              <h4 class='pink--text font-weight-bold'> الشحنات لم تسلم</h4>
              <p class='white--text caption '> الشحنات لم تسلم</p>
            </v-col>
            <v-col cols="3" class='mr-16 pt-0'>
              <div >
                <p class="rounded-lg   white pink--text pa-1 text-center">500</p>
              </div>
            </v-col>
            </v-row>
          </v-col>
          
        </v-row>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
export default {
name:'Dashboard'
}
</script>

<style>

</style>