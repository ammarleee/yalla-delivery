<template>
    <v-container >
      <!-- text fields -->
      <v-card class="mx-auto" max-width="500">
        <v-toolbar class="mt-1 " color='primary' cards dark flat>
            <v-card-title class="title mx-auto   text-capitalize ">
              <h3 class="text-h5 text-xs-cation" >تسجيل حساب جديد</h3>
            </v-card-title>
          </v-toolbar>
  <v-form ref="form" class="pa-3 mt-5 mb-10 pb-10" v-model="valid" @submit.prevent="signup">
        <v-row align="center" justify="center">
          <v-col cols="12" md="11">
            <v-text-field
              filled color="primary"
              
              v-model="user.firstName"
              :counter="10"
              :rules="[allRules.NameRequired , allRules.nameLength]"
              label="الاسم الاول"
              required
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="11">
            <v-text-field
              filled color="primary"   
              v-model="user.lastName"
              :counter="10"
              :rules="[allRules.NameRequired , allRules.nameLength]"
              label="أسم العائلة"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="11">
            <v-text-field filled color="primary"    v-model="user.email" :rules="[allRules.required , allRules.validEmail]" label="البريد الالكترونى" required></v-text-field>
          </v-col>
          <v-col cols="12" md="11">
            <v-text-field
              filled color="primary"   
              label="الرقم السري"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show1 ? 'text' : 'password'"
              @click:append="show1 = !show1"
              :rules="[allRules.password, allRules.length(8)]"
              v-model="user.password"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="11">
            <v-text-field
              filled color="primary"   
              label="تأكيد الرقم السري"
              :rules="[allRules.password, allRules.length(8),allRules.confirmPassword]"
              :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show2 ? 'text' : 'password'"
              @click:append="show2 = !show2"
              v-model="user.confirmPassword"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="11" class="pb-0">
            <v-text-field
              filled color="primary"   
              v-model="user.mobNumber"
              :rules="[ allRules.length(11)]"
              type="number"
              label="رقم التليفون"
              required
            ></v-text-field>
          </v-col>
        
        </v-row>
        <v-row align="center" justify="center" >
          <v-col cols="12" md="11" class="pt-0">
            <v-card-actions>
              <v-btn
                :disabled="!valid"
                :loading="loading"
                color="success d-block"
                block
                type="submit"
              >signup</v-btn>

            </v-card-actions>
            
           
          </v-col>
          
        </v-row>
              <div class="text-center">

             <span class="caption text-capitalize text-center grey--text text--darken-1">
                لديك حساب ؟
                <router-link tag="a" to="/login">تسجيل</router-link>
              </span>
              </div>

  </v-form>
      </v-card>
    </v-container>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {
      user: {
        firstName: null,
        lastName: null,
        email: null,
        password: null, 
        confirmPassword: null, 
        mobNumber: null, 
        country: null, 
      },
      valid: true,
      loading: false,
      show1: false,

      show2: false,
      name: "",
      email: "",
   
    };
  },

  computed: {},
  methods: {
    signup() {
      this.loading = true;
      this.$store
        .dispatch("signup", this.user)
        .then(() => {
          this.loading = false;
          this.$router.push("/dashboard");
        })
        .catch(() => {
          this.loading = false;
          this.$dialog.notify.error("خطأ اثناء عملية التسجيل ", {
            position: "top-right",
            timeout: 3000,
          });
        });
    },
    validate() {
      this.$refs.form.validate();
    },
    reset() {
      this.$refs.form.reset();
    },
  },
};
</script>

<style lang="scss" scoped>
</style>