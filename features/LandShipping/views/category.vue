<template>
  <div>
    <v-dialog v-model="openCategory" width="800">
      <v-card class="pa-5">
        <v-dialog v-model="addCategory" width="600">
          <v-card class="pa-5">
            <h2 class="text-center mb-5">{{mycategories._id ? "تعديل الصنف": "إضافة صنف"}}</h2>
            <v-form v-model="validTwo" @submit.prevent="addcategory">
              <v-row>
                <v-col cols="12" sm="12">
                  <v-text-field
                    v-model="mycategories.name"
                    :rules="[allRules.required]"
                    hint="مطلوب 6 أحرف على الاقل"
                    dense
                    outlined
                    label="اسم الصنف"
                    type="text"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="12">
                  <v-text-field
                    v-model="mycategories.description"
                    :rules="[allRules.required]"
                    hint="مطلوب 6 أحرف على الاقل"
                    dense
                    outlined
                    label="وصف الصنف"
                    type="text"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="12">
                  <div
                    v-if="mycategories.img"
                    class="d-flex justify-content-center align-items-center flex-column"
                  >
                    <div class="mb-2">
                      <v-icon button @click="openuploadImg">mdi-camera</v-icon>
                    </div>
                    <div>
                      <img width="100px" height="100px" :src="mycategories.img" />
                    </div>
                  </div>
                  <v-text-field
                    v-else
                    @click="openuploadImg"
                    outlined
                    dense
                    placeholder="صورة الصنف"
                  ></v-text-field>
                  <input
                    class="d-none"
                    ref="uploadImg"
                    type="file"
                    :rules="[allRules.required]"
                    @change="uploadFile"
                    single
                  />
                </v-col>
              </v-row>
              <v-row justify="center" aling="center">
                <v-col cols="12" md="8" class="d-flex justify-center">
                  <v-btn
                    class="font-weight-bold"
                    type="submit"
                    color="primary"
                    :disabled="!validTwo"
                    :loading="loading"
                    >تسجيل الاضافة</v-btn
                  >
                </v-col>
              </v-row>
            </v-form>
          </v-card>
        </v-dialog>
        <div class="d-flex justify-content-right mt-10 mb-5">
          <v-btn class="success font-weight-bold" @click="openAddCategory">اضافة صنف</v-btn>
        </div>
        <template v-if="categoryData.length > 0">
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
            <v-data-table :headers="headersCategory" :items="categoryData" :search="search">
              <template v-slot:[`item.img`]="{ item }">
                <img width="100px" height="100px" :src="item.img" class="pa-2" />
              </template>
              <template v-slot:[`item.actions`]="{ item }">
                <v-icon class="ml-2" color="success" medium @click="editCategory(item)"
                  >mdi-pen</v-icon
                >
                <v-icon color="error" medium @click="opendeleteCategory(item)">mdi-delete</v-icon>
              </template>
            </v-data-table>
            <v-dialog v-model="openDeleteCategory" width="500">
              <v-card class="pa-5">
                <h2 class="text-center">هل انت متأكد من مسح الصنف</h2>
                <v-card-actions class="d-flex justify-content-center">
                  <v-btn
                    class="success font-weight-bold"
                    :loading="loading"
                    @click="sureDelCategory"
                    >تأكيد</v-btn
                  >
                  <v-btn class="error font-weight-bold" @click="openDeleteCategory = false"
                    >ألغاء</v-btn
                  >
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-card>
        </template>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      openCategory: false,
      addCategory: false,
      categoryData: [],
      mycategories: {},

      validTwo: false,
      deletedCategoryId: null,
      openDeleteCategory: false,
      headersCategory: [
        {
          text: "الاسم",
          align: "center",
          value: "name"
        },
        {
          text: "الوصف",
          align: "center",
          value: "description"
        },
        {
          text: "الصورة",
          align: "center",
          value: "img"
        },
        {
          text: "تعديل او حذف",
          align: "center",
          value: "actions"
        }
      ],
      categories: [],
      images: null,
      categoryId: null,
      resturantId: null,
      loading: false,
      search: "",
    };
  },
  methods: {
    async addcategory() {
      this.mycategories.resturantId = this.resturantId;
      console.log(this.mycategories.resturantId);
      console.log(this.mycategories);
      if (this.mycategories._id) {
        console.log(this.mycategories._id);
        try {
          const formData = new FormData();
          if (this.images) {
            formData.append("files", this.images[0]);
            formData.append("name", this.mycategories.name);
            formData.append("description", this.mycategories.description);
            formData.append("_id", this.mycategories._id);
          } else {
            formData.append("name", this.mycategories.name);
            formData.append("description", this.mycategories.description);
            formData.append("_id", this.mycategories._id);
          }
          this.loading = true;
          const res = await axios.post(
            "https://resturant-appv1.herokuapp.com/category-edit",
            formData
          );
          console.log(res);
          this.loading = false;
          this.addCategory = false;
          let itemEdit = res.data.category;
          console.log(itemEdit);

          let index = this.categoryData.findIndex(i => {
            return i._id === itemEdit._id;
          });
          console.log(index);
          this.categoryData.splice(index, 1, itemEdit);

          this.images = null;
          this.$dialog.notify.success("تم تعديل بيانات الصنف بنجاح", {
            position: "bottom-right",
            timeout: 3000
          });
        } catch (err) {
          console.log(err);
          this.loading = false;
          this.$dialog.notify.error("حدث خطأ اثناء تعديل الصنف", {
            position: "bottom-right",
            timeout: 3000
          });
        }
      } else {
        // this.addCategory = true;
        try {
          const formData = new FormData();
          formData.append("files", this.images[0]);
          formData.append("name", this.mycategories.name);
          formData.append("description", this.mycategories.description);
          formData.append("resturantId", this.mycategories.resturantId);
          console.log(this.mycategories);
          console.log(this.images);
          this.loading = true;
          const res = await axios.post(
            "https://resturant-appv1.herokuapp.com/add-category",
            formData
          );
          console.log(res);
          this.loading = false;
          this.addCategory = false;
          console.log(this.mycategories);
          this.categoryData.push(res.data.category);

          this.$dialog.notify.success("تم إضافة الصنف بنجاح", {
            position: "bottom-right",
            timeout: 3000
          });

          console.log(this.categoryData);
          console.log(res.data.category);
        } catch (err) {
          console.log(err);
          this.loading = false;
          this.$dialog.notify.error("حدث خطأ اثناء إضافة الصنف", {
            position: "bottom-right",
            timeout: 3000
          });
        }
      }
    },
    openuploadImg() {
      this.$refs.uploadImg.click();
    },
    uploadFile(e) {
      this.images = e.target.files;
    },
    openAddCategory() {
      this.addCategory = true;
      this.mycategories = {};
    },
    editCategory(item) {
      this.addCategory = true;
      this.mycategories = { ...item };
    },
    opendeleteCategory(item) {
      this.openDeleteCategory = true;
      this.deletedCategoryId = item._id;
    },

    async sureDelCategory() {
      try {
        this.loading = true;
        const res = await axios.delete(
          `https://resturant-appv1.herokuapp.com/user/${this.deletedCategoryId}`
        );
        console.log(res);
        this.loading = false;
        this.openDeleteCategory = false;
        this.categoryData = this.categoryData.filter(e => {
          console.log(e);
          return e._id !== this.deletedCategoryId;
        });
        this.$dialog.notify.success("تم مسح الصنف بنجاح", {
          position: "bottom-right",
          timeout: 3000
        });
      } catch (err) {
        console.log(err);
        this.loading = false;
        this.$dialog.notify.error("حدث خطأ اثناء مسح الصنف", {
          position: "bottom-right",
          timeout: 3000
        });
      }
    },
    async showcategory(item) {
      console.log(item);
      this.resturantId = item._id;
      this.openCategory = true;
      try {
        const res = await axios.get(
          `https://resturant-appv1.herokuapp.com/resturant/categories/${item._id}`
        );
        console.log(res);
        this.categoryData = res.data.categoryies;
        console.log(this.categoryData);
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
