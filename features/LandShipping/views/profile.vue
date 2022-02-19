<template>
  <div>
    <v-card class="pa-6">
      <div
        v-if="cuurentuser.img"
        class="d-flex justify-content-center profileImg position-relative mb-5"
      >
        <v-menu bottom left offset-x>
          <template v-slot:activator="{ on, attrs }">
            <img
              class="rounded-circle"
              width="100"
              height="100"
              :src="cuurentuser.img"
              v-bind="attrs"
              v-on="on"
            />
            <v-icon class="position-absolute" v-bind="attrs" v-on="on">mdi-camera</v-icon>
          </template>

          <v-list>
            <v-list-item>
              <v-list-item-title>
                <div>
                  <v-icon>mdi-image-multiple</v-icon>
                  <v-btn text class="font-weight-bold mx-auto" @click="openProfileImg = true"
                    >عرض صورة الملف الشخصي</v-btn
                  >
                </div>
              </v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>
                <div>
                  <v-icon>mdi-account-circle</v-icon>
                  <v-btn text @click="ref" class="mr-1 font-weight-bold "
                    >تغيير صورة الملف الشخصي</v-btn
                  >
                  <input
                    class="d-none"
                    ref="uploadImg"
                    type="file"
                    :rules="[allRules.required]"
                    @change="uploadFile"
                    single
                  />
                </div>
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
      <v-icon button v-else @click="ref">mdi-camera</v-icon>
      <input
        class="d-none"
        ref="uploadImg"
        type="file"
        :rules="[allRules.required]"
        @change="uploadFile"
        single
      />
      <v-dialog v-model="openProfileImg" width="500">
        <div v-if="cuurentuser.img" class="d-flex justify-content-center">
          <img :src="cuurentuser.img" width="100%" height="100%" />
        </div>
      </v-dialog>

      <v-dialog v-model="openAddImg" width="300">
        <v-card class="pa-5">
          <v-card-actions class="d-flex justify-content-center">
            <v-btn
              class="success font-weight-bold changeImg"
              @click.prevent="addImg(cuurentuser)"
              :loading="loading"
              >تأكيد تغيير الصورة</v-btn
            >
            <v-btn class="error font-weight-bold" @click="openAddImg = false">ألغاء</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <div>
        <v-row>
          <v-col cols="12" sm="12" class="d-flex">
            <span class="font-weight-bold">الاسم:</span>
            <p class="mr-3">{{ cuurentuser.username }}</p>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="12" class="d-flex">
            <span class="font-weight-bold">البريد الإلكتروني:</span>
            <p class="mr-3">{{ cuurentuser.email }}</p>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="12" class="d-flex">
            <span class="font-weight-bold"> الرتبة:</span>
            <p class="mr-3">{{ cuurentuser.role }}</p>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" sm="12" class="d-flex">
            <span class="font-weight-bold">رقم الهاتف:</span>
            <p class="mr-3">{{ cuurentuser.phone }}</p>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" sm="12" class="d-flex">
            <span class="font-weight-bold">العنوان:</span>
            <p class="mr-3">{{ cuurentuser.address }}</p>
          </v-col>
        </v-row>
      </div>
      <div class="d-flex justify-content-center mb-3">
        <v-btn class="success font-weight-bold" @click="openChangeInfo()"
          >تعديل المعلومات الشخصية</v-btn
        >
      </div>
      <div class="d-flex align-items-center justify-content-center changePassword">
        <p class="m-0 font-bold">هل تريد تغيير كلمة السر</p>
        <v-btn class="info--text font-weight-bold" text @click="openChangePass">أضغط هنا</v-btn>
      </div>
    </v-card>
    <v-dialog width="500" v-model="changePass">
      <v-card class="pa-5">
        <h2 class="text-center mb-5">تغيير كلمة السر</h2>
        <v-form v-model="valid">
          <v-row>
            <v-col cols="12" sm="8" class="pb-0">
              <v-text-field
                v-model="changePassword.password"
                :rules="[allRules.required]"
                hint="مطلوب 6 أحرف على الاقل"
                dense
                outlined
                label="كلمة السر القديمة"
                type="password"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="8" class="pt-0">
              <v-text-field
                v-model="changePassword.newPassword"
                :rules="[allRules.required]"
                hint="مطلوب 6 أحرف على الاقل"
                dense
                outlined
                label="كلمة السر الجديدة"
                type="password"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row justify="center" aling="center">
            <v-col cols="12" md="8" class="d-flex justify-center pb-4">
              <v-btn
                class="success font-weight-bold"
                @click="saveChangePass(changePassword)"
                :loading="loading"
                :disabled="!valid"
                >تأكيد تعيير كلمة السر</v-btn
              >
              <v-btn class="error mr-3 font-weight-bold" @click="changePass = false">ألغاء</v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-card>
    </v-dialog>
    <v-dialog width="600" v-model="dilogInfo">
      <v-card class="pa-5">
        <h2 class="text-center mb-5">تعديل المعلومات الشخصية</h2>
        <v-row>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="cuurentuser.username"
              :rules="[allRules.required]"
              hint="مطلوب 6 أحرف على الاقل"
              dense
              outlined
              label="الاسم"
              type="text"
            ></v-text-field>
          </v-col>
           <v-col cols="12" sm="6">
            <v-text-field
              v-model="cuurentuser.email"
              :rules="[allRules.required]"
              hint="مطلوب 6 أحرف على الاقل"
              dense
              outlined
              label="البريد الا‘لكتروني"
              type="email"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="cuurentuser.phone"
              :rules="[allRules.required]"
              hint="مطلوب 6 أحرف على الاقل"
              dense
              outlined
              label="الهاتف"
              type="number"
            ></v-text-field>
          </v-col>
           <v-col cols="12" sm="6">
            <v-text-field
              v-model="cuurentuser.address"
              :rules="[allRules.required]"
              hint="مطلوب 6 أحرف على الاقل"
              dense
              outlined
              label="العنوان"
              type="text"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row justify="center" aling="center">
          <v-col cols="12" md="8" class="d-flex justify-center pb-4">
            <v-btn class="info font-weight-bold" @click="saveChange(cuurentuser)" :loading="loading"
              >تأكيد تعديل المعلومات</v-btn
            >
            <v-btn class="error mr-3 font-weight-bold" @click="dilogInfo = false">ألغاء</v-btn>
          </v-col>
        </v-row>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import axios from "axios";
// import ApiService from '../services/LinesService.js'
// import BranchesService from '/src/features/Settings/services/BranchesService.js'
export default {
  data() {
    return {
      valid: false,
      loading: false,
      dilogInfo: false,
      user: {},
      changePass: false,
      changePassword: {},
      images: null,
      openAddImg: false,
      openSelecteImg: false,
      openProfileImg: false
    };
  },
  computed: {
    cuurentuser() {
      return this.$store.getters.cuurentUser;
    }
  },
  methods: {
    async addImg(cuurentuser) {
      try {
        this.loading = true;
        const formData = new FormData();
        formData.append("files", this.images[0]);
        formData.append("_id", cuurentuser._id);
        const res = await axios.put("https://resturant-appv1.herokuapp.com/employee-img", formData);
        console.log(res);
        this.$store.dispatch("changeUserInfo", res.data);
        cuurentuser.img = res.data.user.img;

        this.openAddImg = false;
        this.openSelecteImg = false;
      } catch (err) {
        console.log(err);
      }
      this.loading = false;
    },
    ref() {
      this.$refs.uploadImg.click();
      // this.openSelecteImg = false;
    },
    uploadFile(e) {
      this.images = e.target.files;
      if (this.images.length > 0) {
        this.openAddImg = true;
      }
    },
    openChangeInfo() {
      this.dilogInfo = true;
    },
    async saveChange(user) {
      this.loading = true;
      try {
        const res = await axios.put("https://resturant-appv1.herokuapp.com/employee", user);
        console.log(res);
        this.$store.dispatch("changeUserInfo", res.data);

        this.loading = false;
      } catch (err) {
        console.log(err);
        this.loading = false;
      }
      this.loading = false;
      this.dilogInfo = false;
    },
    openChangePass() {
      this.changePass = true;
      this.changePassword = {};
    },
    async saveChangePass(newpass) {
      this.loading = true;
      newpass._id = this.cuurentuser._id;
      console.log(newpass);
      try {
        const res = await axios.put(
          "https://resturant-appv1.herokuapp.com/Employee/change-password",
          newpass
        );
        console.log(res);
      } catch (error) {
        console.log(error);
      }
      this.loading = false;
      this.changePass = false;
    }
  }
};
</script>
<style lang="scss" scoped>
.changePassword {
  font-weight: 700;
  button {
    font-weight: 700;
  }
}
.profileImg {
  cursor: pointer;
  img {
  }
  .v-icon {
    bottom: 0;
    margin-right: 50px;
    color: black;
  }
}
.openProfileImg {
  .v-icon {
    top: 1rem;
    right: 1rem;
    cursor: pointer;
    color: black;
  }
}
</style>
