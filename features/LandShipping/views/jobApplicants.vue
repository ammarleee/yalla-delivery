<template>
  <div>
    <v-dialog v-model="openSingleReq" width="500">
      <v-card class="pa-5">
        <h2 class="text-center mb-3">الإطلاع علي المتقدم للوظيفة</h2>
        <v-row>
          <v-col cols="12" sm="12" class="d-flex">
            <span>الاسم:</span>
            <p class="mr-3">{{ singleRequest.username }}</p>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="12" class="d-flex">
            <span>العمر:</span>
            <p class="mr-3">{{ singleRequest.age }}</p>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="12" class="d-flex">
            <span>نوع الموتوسيكل:</span>
            <p class="mr-3">{{ singleRequest.motoType }}</p>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" sm="12" class="d-flex">
            <span>رقم الهاتف:</span>
            <p class="mr-3">{{ singleRequest.phone }}</p>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" sm="12" class="d-flex">
            <span>العنوان:</span>
            <p class="mr-3">{{ singleRequest.address }}</p>
          </v-col>
        </v-row>
        <v-row justify="center" aling="center">
          <v-col cols="12" md="8" class="d-flex justify-center">
            <v-btn color="success" class="font-weight-bold" :loading="loading" @click="accepted">
              تأكيد قبوله</v-btn
            >
            <v-btn @click="openSingleReq = false" class="error mr-3 font-weight-bold">ألغاء</v-btn>
          </v-col>
        </v-row>
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
        <v-data-table :headers="headersRequest" :items="request" :search="search">
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon color="info" class="ml-2" medium @click="openSingleRequest(item)"
              >mdi-eye</v-icon
            >
            <v-icon color="error" medium @click="opendelRequest(item)">mdi-delete</v-icon>
          </template>

          <template v-slot:[`item.accept`]="{ item }">
            <v-btn color="success" @click="accepted(item)">قبول</v-btn>
          </template>
          <template v-slot:[`item.refused`]="{ item }">
            <v-btn color="error" @click="refused(item)">رفض</v-btn>
          </template>
        </v-data-table>
        <v-dialog v-model="openDeleteRequest" width="500">
          <v-card class="pa-5">
            <h2 class="text-center">هل انت متاكد من رفض هذا المتقدم</h2>
            <v-card-actions class="d-flex justify-content-center">
              <v-btn class="success font-weight-bold" @click="sureDelRequest" :loading="loading"
                >تأكيد</v-btn
              >
              <v-btn class="error font-weight-bold" @click="openDeleteRequest = false">ألغاء</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="statusChange" width="500">
          <v-card class="pa-5">
            <h2 class="text-center">
              {{
                requestStatus.status === "accepted"
                  ? "هل انت متأكد من قبوله"
                  : "هل انت متأكد من رفضه"
              }}
            </h2>
            <v-card-actions class="d-flex justify-content-center">
              <v-btn class="success font-weight-bold" @click="confirmStatus" :loading="loading"
                >تأكيد</v-btn
              >
              <v-btn class="error font-weight-bold" @click="statusChange = false">ألغاء</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-card>
    </template>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      search: "",
      loading: false,
      request: [],
      openDelReq: false,
      openSingleReq: false,
      singleRequest: {},
      requestId: null,
      openDeleteRequest: false,
      statusChange: false,
      requestStatus: {},
      headersRequest: [
        {
          text: "الاسم",
          align: "center",
          value: "username"
        },

        {
          text: "العمر",
          align: "center",
          value: "age"
        },
        {
          text: "العنوان",
          align: "center",
          value: "address"
        },
        {
          text: "نوع الموتوسيكل",
          align: "center",
          value: "motoType"
        },
        {
          text: "رقم الهاتف",
          align: "center",
          value: "phone"
        },
        {
          text: "الحالة",
          align: "center",
          value: "status"
        },

        {
          text: "قبول",
          align: "center",
          value: "accept"
        },
        {
          text: "رفض",
          align: "center",
          value: "refused"
        },
        {
          text: "رؤية او حذف",
          align: "center",
          value: "actions"
        }
      ]
    };
  },
  methods: {
    statusData(item) {
      this.statusChange = true;
      this.requestStatus = item;
      this.requestStatus._id = item._id;
    },
    refused(item) {
      this.statusData(item);
      this.requestStatus.status = "refused";
    },
    accepted(item) {
      this.statusData(item);
      this.requestStatus.status = "accepted";
    },
    async confirmStatus() {
      try {
        this.loading = true;

        const res = await axios.put(
          "https://resturant-appv1.herokuapp.com/request",
          this.requestStatus
        );
        console.log(res);
        this.loading = false;
        this.statusChange = false;
      } catch (err) {
        console.log(err);
        this.loading = false;
      }
    },

    openSingleRequest(item) {
      this.openSingleReq = true;
      this.singleRequest = { ...item };
    },
    opendelRequest(item) {
      this.requestId = item._id;
      this.openDeleteRequest = true;
    },
    async sureDelRequest() {
      try {
        this.loading = true;
        console.log(this.requestId);
        let res = await axios.delete(
          `https://resturant-appv1.herokuapp.com/request/${this.requestId}`
        );
        console.log(res);
        this.loading = false;
        this.openDeleteRequest = false;
        this.$dialog.notify.success("تم مسح المتقدم بنجاح", {
          position: "bottom-right",
          timeout: 3000
        });
        this.request = this.request.filter(e => {
          return e._id !== this.requestId;
        });
        console.log(this.request);
      } catch (err) {
        console.log(err);
        this.loading = false;
        this.$dialog.notify.error("حدث خطأ اثناء مسح المتقدم", {
          position: "bottom-right",
          timeout: 3000
        });
      }
    }
  },
  async mounted() {
    try {
      const res = await axios.get("https://resturant-appv1.herokuapp.com/request/all");
      console.log(res);
      console.log(res.data.requests);
      this.request = res.data.requests;
    } catch (err) {
      console.log(err);
    }
  }
};
</script>

<style lang="scss" scoped></style>
ٍ
