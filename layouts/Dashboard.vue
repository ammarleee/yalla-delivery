<template>
  <div>
    <Header @menuBtn="menuBtnClicked" isDashboard="true"></Header>
    <v-navigation-drawer app right :mini-variant.sync="drawer" mobile-breakpoint="100">
      <!-- <template v-slot:prepend>
        <v-img src="../assets/thumbnail_663f51850657_1x.webp"></v-img>
      </template> -->

      <v-list-group
        no-action
        v-for="item in menu"
        :key="item.title"
        dark
        active-class="primary white--text"
      >
        <template v-slot:activator>
          <v-list-item-icon>
            <v-icon color="error" large>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </template>
        <v-list-item
          active-class="info white--text"
          v-for="child in item.child"
          :key="child.title"
          :to="child.href"
        >
          <v-icon v-text="child.icon"></v-icon>
          <v-list-item-title v-text="child.title"></v-list-item-title>
        </v-list-item>
      </v-list-group>

      <div>
        <v-list-item-content class=" mb-3">
          <v-list-item to="/shipping/balance" class="justify-content-between">
            <v-icon color="error" large>mdi-cash-multiple</v-icon>
            <p class="m-0 pr-6">الرصيد</p>
          </v-list-item>
        </v-list-item-content>
      </div>
         <div>
        <v-list-item-content class="p-0">
          <v-list-item to="/shipping/report" class="justify-content-between">
            <v-icon color="error" large>mdi-script-text</v-icon>
            <p class="m-0 pr-6">تقارير</p>
          </v-list-item>
        </v-list-item-content>
      </div>
      <template v-slot:append>
        <div class="pa-2">
          <v-btn block @click="logOut" outlined plain class="red--text">
            <v-icon left>mdi-logout</v-icon>
            تسجيل الخروج</v-btn
          >
        </div>
      </template>
    </v-navigation-drawer>

    <v-main>
      <v-container fluid class="pa-3 grey lighten-3">
        <v-breadcrumbs >
          <template v-slot:divider>
            <v-icon>mdi-arrow-left</v-icon>
          </template>
          <template v-slot:item="{ item }">
            <v-breadcrumbs-item :to="item.href" class="text-capitalize">{{
              item.name
            }}</v-breadcrumbs-item>
            <router-link :to="item.href"></router-link>
          </template>
        </v-breadcrumbs>
        <div class="rounded-lg pa-3 white" style="min-height:690px">
          <slot />
        </div>
      </v-container>
    </v-main>

    <!-- <Footer/> -->
  </div>
</template>

<script>
import Header from "@/features/shared/components/Navigations/Header.vue";
// import Footer from '@/features/shared/components/Navigations/Footer.vue'

export default {
  components: {
    Header
    // Footer
  },
  data() {
    return {
      drawer: false,

      menu: [
        {
          title: "إنشاء حساب",
          icon: "mdi-truck-delivery",
          child: [
            // {
            //   href: "/shipping/shipment",
            //   title: "حساب إنشاء كابتن",
            //   icon: "fa fa-scroll"
            // },
            {
              href: "/shipping/Drivers",
              title: "إنشاء كابتن",
              icon: "mdi-moped"
            },
            {
              href: "/shipping/resturant",
              title: " إنشاء حساب مطعم",
              icon: "fa fa-utensils"
            },
            {
              href: "/shipping/employees",
              title: " إنشاء حساب موظف",
              icon: "fa fa-user"
            },
            {
              href: "/shipping/jobApplicants",
              title: "المتقدمين علي وظائف",
              icon: "fas fa-users-cog"
            }
          ]
        },
        
       
      ]
    };
  },
  methods: {
    getInials() {
      if (!this.user) return "";
      var user = this.user;
      return user.firstName.charAt(0) + user.lastName.charAt(0);
    },
    logOut() {
      console.log("user log out");
      this.$store.dispatch("logOut").then(() => {
        console.log("user log out 2 ");

        this.$router.push("/login");
      });
    },
    menuBtnClicked(event) {
      this.drawer = !this.drawer;
      console.log("drawer", this.drawer);
    }
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
  }
};
</script>

<style lang="scss" scoped></style>
