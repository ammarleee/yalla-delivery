<template>
  <div>
    <v-dialog v-model="openProduct" width="1000">
      <v-card class="pa-5">
        <v-dialog v-model="addProduct" width="800">
          <v-card class="pa-5">
            <h2 class="text-center mb-5">{{ myProducts._id ? "تعديل الاكلة" : "إضافة اكلة" }}</h2>
            <v-form v-model="validthree" @submit.prevent="addNewproduct">
              <v-row>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="myProducts.name"
                    :rules="[allRules.required]"
                    hint="مطلوب 6 أحرف على الاقل"
                    dense
                    outlined
                    label="اسم الاكلة"
                    type="text"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="myProducts.description"
                    :rules="[allRules.required]"
                    hint="مطلوب 6 أحرف على الاقل"
                    dense
                    outlined
                    label="وصف الاكلة"
                    type="text"
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="myProducts.price"
                    :rules="[allRules.required]"
                    hint="مطلوب 6 أحرف على الاقل"
                    dense
                    outlined
                    label="السعر"
                    type="number"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="myProducts.quantity"
                    :rules="[allRules.required]"
                    hint="مطلوب 6 أحرف على الاقل"
                    dense
                    outlined
                    label="العدد"
                    type="number"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="6">
                  <v-autocomplete
                    rounded
                    solo
                    dense
                    :items="categoryData"
                    item-text="name"
                    item-value="_id"
                    v-model="myProducts.category"
                    placeholder="اختار نوع الصنف"
                  >
                  </v-autocomplete>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-autocomplete
                    rounded
                    solo
                    dense
                    :items="selectSize"
                    item-text="sizeName"
                    item-value="value"
                    v-model="myProducts.size"
                    placeholder="الحجم"
                  >
                  </v-autocomplete>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="12">
                  <div v-if="myProducts.img" class="d-flex justify-content-around">
                    <div v-for="(itemImg, index) in myProducts.img" :key="index">
                      <div class="mb-2 d-flex align-items-center justify-content-center">
                        <v-icon button @click="openuploadImg">mdi-camera</v-icon>
                      </div>
                      <div @mouseenter="addclass(index)" class="img-container position-relative">
                        <v-icon
                          class="imgProductAction position-absolute"
                          :id="'delete' + index"
                          @click="openDelProductImg(itemImg, myProducts)"
                          >mdi-close</v-icon
                        >
                        <img class="productImg" width="100px" height="100px" :src="itemImg" />
                      </div>
                    </div>
                  </div>
                  <v-text-field
                    v-else
                    @click="openuploadImg"
                    outlined
                    dense
                    placeholder="صورة المنتج"
                  ></v-text-field>
                  <input
                    class="d-none"
                    ref="uploadImg"
                    type="file"
                    :rules="[allRules.required]"
                    @change="uploadFile"
                    multiple
                  />
                </v-col>
              </v-row>
              <v-row justify="center" aling="center">
                <v-col cols="12" md="8" class="d-flex justify-center pt-0">
                  <v-btn
                    class="font-weight-bold success"
                    type="submit"
                    :disabled="!validthree"
                    :loading="loading"
                    >تسجيل الاضافة</v-btn
                  >
                </v-col>
              </v-row>
            </v-form>
          </v-card>
        </v-dialog>
        <v-dialog v-model="openDeleteProductImg" width="500">
          <v-card class="pa-5">
            <h2 class="text-center">هل أنت متأكد من مسح صورة الاكلة</h2>
            <v-card-actions class="d-flex justify-content-center">
              <v-btn class="success font-weight-bold" :loading="loading" @click="delProductImg"
                >متأكد</v-btn
              >
              <v-btn class="error font-weight-bold" @click="openDeleteProductImg = false"
                >ألغاء</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>
        <div class="d-flex justify-content-right mt-10 mb-5">
          <v-btn class="success font-weight-bold" @click="openAddProduct">إضافة اكلة</v-btn>
        </div>
        <template v-if="productData.length > 0">
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
            <v-data-table :headers="headersProduct" :items="productData" :search="search">
              <template v-slot:[`item.img`]="{ item }">
                <img width="100px" height="100px" :src="item.img[0]" class="pa-2" />
              </template>
              <template v-slot:[`item.actions`]="{ item }">
                <v-icon class="ml-2" color="success" medium @click="editProduct(item)"
                  >mdi-pen</v-icon
                >
                <v-icon color="error" medium @click="opendelProduct(item)">mdi-delete</v-icon>
              </template>
            </v-data-table>
            <v-dialog v-model="openDeleteProduct" width="500">
              <v-card class="pa-5">
                <h2 class="text-center">هل أنت متأكد من مسح الاكلة</h2>
                <v-card-actions class="d-flex justify-content-center">
                  <v-btn class="success font-weight-bold" :loading="loading" @click="sureDelProduct"
                    >تأكيد</v-btn
                  >
                  <v-btn class="error font-weight-bold" @click="openDeleteProduct = false"
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
      openProduct: false,
      addProduct: false,
      productData: [],
      myProducts: {},
      openDeleteProduct: false,
      search: "",
      categoryData: [],
      validthree: false,
      deletedProductId: null,
      resturantId: null,
      loading: false,
      headersProduct: [
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
          text: "السعر",
          align: "center",
          value: "price"
        },
        {
          text: "العدد",
          align: "center",
          value: "quantity"
        },
        {
          text: "الحجم",
          align: "center",
          value: "size"
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
      products: [],
      images: null,
      imagesProduct: [],
      selectSize: [
        { sizeName: "larg", value: 1 },
        { sizeName: "medium", value: 2 },
        { sizeName: "small", value: 3 }
      ],
      ProductImg: {},
      openDeleteProductImg: false
    };
  },
  methods: {
    addclass(index) {
      console.log(index);
      let elemnt = document.querySelectorAll(".imgProductAction");
      elemnt.forEach(i => {
        i.classList.remove("addHover");
      });
      let element = document.getElementById(`delete${index}`);
      console.log(element);

      element.classList.add("addHover");
    },
    openuploadImg() {
      this.$refs.uploadImg.click();
    },
    uploadFile(e) {
      this.images = e.target.files;
    },
    async showproducts(item) {
      console.log(item);
      this.resturantId = item._id;
      console.log(this.categoryId);
      this.openProduct = true;
      try {
        const res = await axios.get(
          `https://resturant-appv1.herokuapp.com/resturant/products/${item._id}`
        );

        console.log(res);
        this.productData = res.data.products;
        console.log(this.productData);

        const ress = await axios.get(
          `https://resturant-appv1.herokuapp.com/resturant/categories/${item._id}`
        );
        console.log(ress);
        this.categoryData = ress.data.categoryies;
        console.log(this.categoryData);
      } catch (error) {
        console.log(error);
      }
    },
    async addNewproduct() {
      console.log(this.myProducts);
      this.myProducts.resturantId = this.resturantId;
      console.log(this.myProducts);
      if (this.myProducts._id) {
        console.log(this.myProducts._id);
        try {
          const formData = new FormData();
          if (this.images) {
            for (const i of Object.keys(this.images)) {
              formData.append("files", this.images[i]);
              formData.append("imgName", this.images[i].name);
            }
            formData.append("name", this.myProducts.name);
            formData.append("price", this.myProducts.price);
            formData.append("category", this.myProducts.category);
            formData.append("quantity", this.myProducts.quantity);
            formData.append("size", this.myProducts.size);
            formData.append("resturantId", this.myProducts.resturantId);
            formData.append("description", this.myProducts.description);
            formData.append("_id", this.myProducts._id);
          } else {
            // const formData = new FormData();
            formData.append("name", this.myProducts.name);
            formData.append("price", this.myProducts.price);
            formData.append("category", this.myProducts.category);
            formData.append("quantity", this.myProducts.quantity);
            formData.append("size", this.myProducts.size);
            formData.append("resturantId", this.myProducts.resturantId);
            formData.append("description", this.myProducts.description);
            formData.append("_id", this.myProducts._id);
          }
          this.loading = true;
          const res = await axios.put(
            `https://resturant-appv1.herokuapp.com/file/edit/${this.myProducts._id}`,
            formData
          );
          this.loading = false;
          this.addProduct = false;
          console.log(res);
          let itemEdit = res.data.post;
          console.log(itemEdit);

          let index = this.productData.findIndex(i => {
            return i._id === itemEdit._id;
          });
          console.log(index);
          this.productData.splice(index, 1, itemEdit);
          this.images = null;

          this.$dialog.notify.success("تم تعديل الاكلة بنجاح", {
            position: "bottom-right",
            timeout: 3000
          });
        } catch (err) {
          this.loading = false;
          console.log(err);
          this.$dialog.notify.error("حدث خطأ اثناء تعديل الاكلة", {
            position: "bottom-right",
            timeout: 3000
          });
        }
      } else {
        this.loading = true;
        this.addProduct = true;
        try {
          const formData = new FormData();
          for (const i of Object.keys(this.images)) {
            formData.append("files", this.images[i]);
          }
          formData.append("name", this.myProducts.name);
          formData.append("price", this.myProducts.price);
          formData.append("category", this.myProducts.category);
          formData.append("quantity", this.myProducts.quantity);
          formData.append("size", this.myProducts.size);
          formData.append("resturantId", this.myProducts.resturantId);
          formData.append("description", this.myProducts.description);
          formData.append("_id", this.myProducts._id);

          this.loading = true;
          const res = await axios.post(
            "https://resturant-appv1.herokuapp.com/file-upload",
            formData
          );

          this.productData.push(res.data.products);
          this.loading = false;
          this.addProduct = false;

          this.$dialog.notify.success("تم إضافة الاكلة بنجاح", {
            position: "bottom-right",
            timeout: 3000
          });
        } catch (err) {
          console.log(err);
          this.loading = false;
          this.$dialog.notify.error("حدث خطأ اثناء إضافة الاكلة", {
            position: "bottom-right",
            timeout: 3000
          });
        }
      }
    },
    openDelProductImg(src, product) {
      console.log(product._id);
      console.log(src);
      this.ProductImg.src = src;
      this.ProductImg.id = product._id;
      this.openDeleteProductImg = true;
    },
    async delProductImg() {
      try {
        this.loading = true;
        let imgSrc = this.ProductImg.src;
        console.log(imgSrc);
        const res = await axios.delete(
          `https://resturant-appv1.herokuapp.com/img/delete/${this.ProductImg.id}`,
          imgSrc
        );
        console.log(res);
        this.loading = false;
      } catch (err) {
        this.loading = false;

        console.log(err);
      }
      this.loading = true;
      let index = this.myProducts.img.findIndex(e => {
        return e === this.ProductImg;
      });
      console.log(index);
      this.myProducts.img.splice(index, 1);
      this.loading = false;
      this.openDeleteProductImg = false;
    },
    openAddProduct() {
      this.addProduct = true;
      this.myProducts = {};
    },
    editProduct(item) {
      this.addProduct = true;
      this.myProducts = { ...item };
      console.log(this.myProducts);
    },
    opendelProduct(item) {
      console.log("sss");
      this.openDeleteProduct = true;
      this.deletedProductId = item._id;
    },
    async sureDelProduct() {
      try {
        this.loading = true;
        const res = await axios.delete(
          `https://resturant-appv1.herokuapp.com/${this.deletedProductId}`
        );
        console.log(res);
        this.loading = false;
        this.openDeleteProduct = false;
        this.productData = this.productData.filter(e => {
          return e._id !== this.deletedProductId;
        });
        this.$dialog.notify.success("تم مسح الاكلة بنجاح", {
          position: "bottom-right",
          timeout: 3000
        });
      } catch (err) {
        console.log(err);
        this.loading = false;
        this.$dialog.notify.error("حدث خطأ اثناء مسح الاكلة", {
          position: "bottom-right",
          timeout: 3000
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.imgProductAction {
  visibility: hidden;
  background-color: black;
  border-radius: 50%;
  height: 1.5rem;
  width: 1.5rem;
  color: white;
  font-size: 0.8rem;
}

.addHover {
  visibility: visible;
}
</style>
