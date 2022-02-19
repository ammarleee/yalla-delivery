<template>
  <v-container>
    <!-- text fields -->
    <v-card class="mx-auto" max-width="500">
      <v-toolbar class="mt-1 indigo darken-4 mb-5" cards dark flat>
        <v-card-title class=" mx-auto    text-capitalize ">
          <p class=" text-h5">تسجيل الدخول</p>
        </v-card-title>
      </v-toolbar>
      <v-form v-model="valid" @submit.prevent="submit" class="pa-3 mt-5">
        <v-row align="center" justify="center" style="height:200px">
          <v-col cols="12" md="8">
            <v-text-field
              outlined
              color="#1A237E"
              v-model="user.username"
              :rules="[allRules.required]"
              label="اسم المستخدم"
              required
              type="text"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="8">
            <v-text-field
              outlined
              color="#1A237E"
              v-model="user.password"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[allRules.required]"
              :type="show1 ? 'text' : 'password'"
              name="input-10-1"
              label="كلمة المرور"
              hint="مطلوب 6 أحرف على الاقل"
              counter
              @click:append="show1 = !show1"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row justify="center" aling="center">
          <v-col cols="12" md="8" class="d-flex justify-center">
            <v-btn block type="submit" color="primary" :disabled="!valid" :loading="loading"
              >تسجيل الدخول</v-btn
            >
          </v-col>
        </v-row>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  name: "Login",
  data: () => ({
    valid: false,
    show1: false,
    loading: false,
    // password: "123456",
    // email: "admin@al-ahmari.com.sa"
    user: {}
  }),
  methods: {
    clear() {
      this.email = "";
      this.password = "";
    },

    async submit() {
      console.log(this.user);
      this.loading = true;
      try {
        const res = await axios.post("https://resturant-appv1.herokuapp.com/Employee/login", this.user);
        console.log(res);
        this.loading = false;
        this.$store.dispatch("currentuser", res.data)
      this.$router.push({ path: "/shipping/branchPolisa" });
        
      } catch (err) {
        console.log(err);
        this.loading = false;
      }
    }
  }
};
</script>

<style></style>
