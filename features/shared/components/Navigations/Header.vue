<template>
  <div id="nav">
    <v-app-bar i class=" white--text" color="primary" dark app dense>
      <v-app-bar-nav-icon
        v-if="isDashboard"
        class="white--text "
        @click="$emit('menuBtn')"
      ></v-app-bar-nav-icon>

      <v-toolbar-title style="cursor:pointer">يلا دليفيري</v-toolbar-title>

      <v-spacer></v-spacer>
           <v-btn icon to="/shipping/profile" v-if="cuurentuser">
        <img v-if="cuurentuser.img" :src="cuurentuser.img" width="30" height="30" class="rounded-circle " />
        <p v-else class="ml-5">{{cuurentuser.username}}</p>
      </v-btn>
      <!-- <div v-if="user">
        <v-badge
        color="warning"
        class="mr-3 ml-5"
        overlap
        dot
        bordered
        :content="notificationsLength.length"
      >
        <v-menu
          style="overflow: scroll !important; max-height: 500px !important;"
          bottom
          min-width="300px"
          rounded
          transition="slide-y-transition"
          offset-y
        >
          <template v-slot:activator="{ on }">
            <v-btn icon text fab small class="mt-1 ml-5 warning--text" v-on="on">
              <v-icon warning>mdi-bell-ring</v-icon>
            </v-btn>
          </template>
          menu for notifications
          <v-card max-height="500" style="overflow-y: scroll">
            <v-list-item-content class="justify-right">
              <div class="mx-auto text-right">
                <v-btn depressed rounded text class="text-h6"> الاشعارات</v-btn>
                <v-divider class="my-3"></v-divider>
                <div v-if="checkNotifications">
                  <div v-for="(item, index) in notifications" :key="index">
                    <v-list three-line class="theListDiv pt-0 pb-0">
                      <v-list-item
                        :class="{ red: item.seen }"
                        class="text-right text-capitalize lighten-3 mb-1"
                        :key="index"
                        nudge-left
                        two-line
                        @click="navegateTo(item)"
                      >
                        <v-list-item-avatar hidden>
                          <v-icon large color="grey">mdi-facebook</v-icon>
                        </v-list-item-avatar>

                        <v-list-item-content class="pt-0">
                          <v-list-item-title class="font-weight-bold">{{
                            item.title
                          }}</v-list-item-title>
                          <v-list-item-subtitle class="text-body-1"
                            >هنا البيانات</v-list-item-subtitle
                          >
                          <v-list-item-subtitle>{{
                            item.date | moment("LLL")
                          }}</v-list-item-subtitle>

                          
                        </v-list-item-content>
                      </v-list-item>
                    </v-list>
                  </div>
                </div>
                <div v-else>
                  <p class="text-center text-caption  text-capitalize pink--text">
                    لا يوجد لديك اى اشعارات
                  </p>
                </div>
              </div>
            </v-list-item-content>
          </v-card>
        </v-menu>
        </v-badge>
        <v-menu
          v-if="user"
          bottom
          min-width="200px"
          rounded
          transition="slide-y-transition"
          offset-y
        >
          <template v-slot:activator="{ on }">
            <v-avatar color="primary" size="32" v-on="on" style="cursor:pointer">
              <span class="white--text headline">{{ getInials().toUpperCase() }}</span>
            </v-avatar>
          </template>
          <v-card>
            <v-list-item-content class="justify-center">
              <div class="mx-auto text-center">
                <router-link to="/profile">
                  <v-avatar>
                    <v-img v-if="user.img" :src="user.img"></v-img>
                    <v-icon v-else>mdi-account</v-icon>
                  </v-avatar>
                </router-link>
                <h3>{{ user.firstName }}</h3>
                <p class="caption mt-1">{{ user.email }}</p>
                <v-divider class="my-3"></v-divider>

                <v-btn depressed block text rounded @click="logOut">
                  <v-icon>mdi-logout</v-icon>تسجيل خروج
                </v-btn>
              </div>
            </v-list-item-content>
          </v-card>
        </v-menu>
      </div> -->

    </v-app-bar>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "Header",
  props: ["isDashboard"],
  mounted() {},
  computed: {
    cuurentuser() {
      return this.$store.getters.cuurentUser;
    },
    notificationsLength() {
      return this.$store.getters.notifications.filter(notification => {
        return notification.seen === false;
      });
    },
    notifications() {
      return this.$store.getters.notifications;
    },
    checkNotifications() {
      return this.notifications && this.notifications.length > 0;
    }
  },
  data: () => {
    return {};
  },
  methods: {
    logOut() {
      console.log("user log out");
      this.$store.dispatch("logOut").then(() => {
        this.$router.push("/login");
        window.location.href = "/login";
      });
    },
    navegateTo(item) {
      console.log("nagvate to ");
    },
    // getInials() {
    //   if (!this.user) return "";
    //   var user = this.user;
    //   return user.firstName.charAt(0) + user.lastName.charAt(0);
    // }
  }
};
</script>

<style lang="scss"></style>
