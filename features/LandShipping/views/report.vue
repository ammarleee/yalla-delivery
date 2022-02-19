<template>
  <div>
    <div class="d-flex justify-content-around mt-16">
      <v-card width="200" class="pt-4 pb-3 pl-3 pr-3 text-right">
        <h2>عدد المطاعم</h2>
        <p>{{ resturants }}</p>
      </v-card>
      <v-card width="200" class="pt-4 pb-3 pl-3 pr-3 text-right">
        <h2>عدد الكابتن</h2>
        <p>{{ drivers }}</p>
      </v-card>
      <v-card width="200" class="pt-4 pb-3 pl-3 pr-3 text-right">
        <h2>عدد الطلبات</h2>
        <p>{{orders}}</p>
      </v-card>
      <v-card width="200" class="pt-4 pb-3 pl-3 pr-3 text-right">
        <h2>إجمالي الارباح</h2>
        <p>10000</p>
      </v-card>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      resturants: null,
      drivers: null,
      orders: null
    };
  },
  async mounted() {
    try {
      let url = "https://resturant-appv1.herokuapp.com/";
      const { data: allResurant } = await axios.get(`${url}resturants`);
      const { data: allDrivers } = await axios.get(`${url}driver`);
      const { data: allOrders } = await axios.get(`${url}orders-all`);
      this.resturants = allResurant.resturants.length;
      this.drivers = allDrivers.drivers.length;
      this.orders = allOrders.orders.length;
    } catch (err) {
      console.log(err);
    }
  }
};
</script>

<style lang="scss" scoped></style>
