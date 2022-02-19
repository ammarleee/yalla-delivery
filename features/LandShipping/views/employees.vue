<template>
  <div>
    <div class="d-flex justify-content-right mt-10 mb-5">
      <v-btn class="success font-weight-bold" @click="openAddEmployee">اضافة موظف</v-btn>
    </div>
    <v-dialog v-model="addEmployee" width="600">
      <v-card class="pa-5">
        <h2 class="text-center mb-5">{{user._id ? "تعديل بيانات الموظف": "إضافة موظف"}}</h2>
        <v-form v-model="valid" @submit.prevent="addNewEmployee">
          <v-row>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="user.username"
                :rules="[allRules.required]"
                dense
                outlined
                label="اسم الموظف"
                type="text"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="user.phone"
                :rules="[allRules.required]"
                dense
                outlined
                label="رقم الهاتف"
                type="number"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row> </v-row>
          <v-row>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="user.email"
                :rules="[allRules.required]"
                dense
                outlined
                label="البريد الإلكتروني"
                type="email"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-autocomplete
                rounded
                solo
                dense
                :items="selectRole"
                item-text="nameRole"
                item-value="nameRole"
                v-model="user.role"
                placeholder="الرتبة"
              >
              </v-autocomplete>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="user.address"
                :rules="[allRules.required]"
                dense
                outlined
                label="العنوان"
                type="text"
              ></v-text-field>
            </v-col>

            <v-col cols="12" sm="6"
                v-if="!user._id"
            >
              <v-text-field
                v-model="user.password"
                :rules="[allRules.required]"
                dense
                outlined
                label="كلمة السر"
                type="password"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row justify="center" aling="center">
            <v-col cols="12" md="8" class="d-flex justify-center">
              <v-btn
                type="submit"
                class="font-weight-bold"
                color="success"
                :disabled="!valid"
                :loading="loading"
                >تسجيل الموظف</v-btn
              >
            </v-col>
          </v-row>
        </v-form>
      </v-card>
    </v-dialog>
    <v-dialog v-model="openAddImg" width="500">
      <v-card class="pa-5">
        <v-card-actions class="d-flex justify-content-center">
          <v-btn
            color="success"
            class="changeImg font-weight-bold"
            @click="addImg"
            :loading="loadingImg"
            >تأكيد تغيير الصورة</v-btn
          >
          <v-btn class="error" @click="openAddImg = false">ألغاء</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <template>
      <v-card>
        <v-card-title>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
        <v-data-table :headers="headersEmployee" :items="employee" :search="search">
          <template v-slot:[`item.img`]="{ item }">
            <img
              width="100px"
              height="100px"
              v-if="item.img"
              :src="item.img"
              class="pa-2 rounded-circle"
            />
            <v-icon v-else medium x-large>mdi-account-circle</v-icon>
          </template>

          <template v-slot:[`item.actions`]="{ item }">
            <v-icon color="success" medium @click="editEmployee(item)">mdi-pen</v-icon>
            <v-icon color="error" medium class="mr-2" @click="opendelEmployee(item)">mdi-delete</v-icon>
          </template>
          <template v-slot:[`item.action`]="{ item }">
            <v-icon medium color="success" @click="ref(item)">mdi-camera</v-icon>
            <input
              class="d-none"
              ref="uploadImg"
              type="file"
              :rules="[allRules.required]"
              @change="uploadFile"
              single
            />
          </template>
        </v-data-table>
        <v-dialog v-model="openDeleteEmployee" width="500">
          <v-card class="pa-5">
            <h2 class="text-center">هل انت متأكد من مسح هذا الموظف</h2>
            <v-card-actions class="d-flex justify-content-center">
              <v-btn
                class="success font-weight-bold"
                type="submit"
                @click="sureDelEmployee"
                :loading="loading"
                >تأكيد</v-btn
              >
              <v-btn class="error font-weight-bold" @click="openDeleteEmployee = false"
                >ألغاد</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-card>
    </template>
  </div>
</template>

<script>
import axios from "axios";
import employeesApi from "../services/employeesApi"
export default {
  data() {
    return {
      // dialog: false,
      search: "",
      user: {},
      loading: false,
      loadingImg: false,
      valid: false,
      addEmployee: false,
      employee: [],
      userId: null,
      openDeleteEmployee: false,
      openAddImg: false,
      images: null,
      openimage: false,
      headersEmployee: [
        {
          text: "الاسم",
          align: "center",
          value: "username"
        },
        {
          text: "البريد الالكتروني",
          align: "center",
          filterable: false,
          value: "email"
        },
        {
          text: "العنوان",
          align: "center",
          value: "address"
        },

        {
          text: "رقم الهاتف",
          align: "center",
          value: "phone"
        },
        {
          text: "الصورة",
          align: "center",
          value: "img"
        },
        {
          text: "تعديل او إضافة صورة",
          align: "center",
          value: "action"
        },
        {
          text: "تعديل او حذف",
          align: "center",
          value: "actions"
        }
      ],
      selectRole: [{ nameRole: "user" }, { nameRole: "master" }, { nameRole: "guide" }]
    };
  },
  methods: {
    ref(item) {
      this.user = { ...item };
      this.$refs.uploadImg.click();
    },
    uploadFile(e) {
      this.images = e.target.files;
      if (this.images.length > 0) {
        this.openAddImg = true;
      }
    },
    async addImg() {
      try {
        console.log(this.images);
        console.log(this.images[0]);
        const formData = new FormData();
        formData.append("files", this.images[0]);
        formData.append("_id", this.user._id);
        this.loadingImg = true;
        const res = await axios.put("https://resturant-appv1.herokuapp.com/employee-img", formData);
        console.log(res);
        this.loadingImg = false;
        this.openAddImg = false;

        let itemImg = res.data.user;

        let indexx = this.employee.findIndex(i => {
          return i._id === itemImg._id;
        });
        console.log(indexx);
        this.employee.splice(indexx, 1, itemImg);
        this.$dialog.notify.success("تم اضافة صورة للموظف بنجاح", {
          position: "bottom-right",
          timeout: 3000
        });
      } catch (err) {
        console.log(err);
        this.loadingImg = false;
        this.$dialog.notify.error("يوجد خطأ اثناء اضافة صورة للموظف", {
          position: "bottom-right",
          timeout: 3000
        });
      }
    },
    async addNewEmployee() {
      console.log(this.user);
      if (this.user._id) {
        console.log(this.user._id);
        try {
          this.loading = true;
          const res = await axios.put("https://resturant-appv1.herokuapp.com/employee", this.user);
          console.log(res);
          this.loading = false;
          this.addEmployee = false;

          let itemEdit = res.data.user;

          let index = this.employee.findIndex(i => {
            return i._id === itemEdit._id;
          });
          console.log(index);
          this.employee.splice(index, 1, itemEdit);

          this.$dialog.notify.success("تم تعديل معلومات الموظف بنجاح", {
            position: "bottom-right",
            timeout: 3000
          });
        } catch (err) {
          console.log(err);
          this.loading = false;
          this.$dialog.notify.error("يوجد خطأ اثناء تعديل معلومات الموظف", {
            position: "bottom-right",
            timeout: 3000
          });
        }
      } else {
        try {
          this.loading = true;
          const res = await employeesApi.CreateEmployees(this.user);
          console.log(res);
          this.loading = false;
          this.addEmployee = false;
          this.employee.push(res.data.newemployee);
          this.$dialog.notify.success("تم اضافة الموظف بنجاح", {
            position: "bottom-right",
            timeout: 3000
          });
          console.log(res.data.newemployee);
        } catch (err) {
          console.log(err);
          this.loading = false;
          this.$dialog.notify.error("يوجد خطأ اثناء اضافة الموظف", {
            position: "bottom-right",
            timeout: 3000
          });
        }
      }
    },

    openAddEmployee() {
      this.addEmployee = true;
      this.user = {};
    },
    editEmployee(item) {
      this.addEmployee = true;
      this.user = { ...item };
      console.log(this.user);
    },
    opendelEmployee(item) {
      this.userId = item._id;
      this.openDeleteEmployee = true;
    },
    async sureDelEmployee() {
      try {
        this.loading = true;
        console.log(this.userId);
        let res = await axios.delete(
          `https://resturant-appv1.herokuapp.com/employee/${this.userId}`
        );
        console.log(res);
        this.loading = false;
        this.openDeleteEmployee = false;
        this.employee = this.employee.filter(e => {
          return e._id !== this.userId;
        });
        this.$dialog.notify.success("تم مسح الموظف بنجاح", {
          position: "bottom-right",
          timeout: 3000
        });
        console.log(this.employee);
      } catch (err) {
        console.log(err);
        this.loading = false;
        this.$dialog.notify.error("حدث خطأ اثناء مسح الموظف", {
          position: "bottom-right",
          timeout: 3000
        });
      }
    }
  },
  async mounted() {
    try {
      const res = await axios.get("https://resturant-appv1.herokuapp.com/employee");
      console.log(res);
      console.log(res.data.Employees);
      this.employee = res.data.Employees;
    } catch (err) {
      console.log(err);
    }
  }
};
</script>

<style lang="scss" scoped>
.changeImg {
  cursor: pointer;
}
</style>
