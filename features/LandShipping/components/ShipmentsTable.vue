<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="entities"
      fixed-header
      :server-items-length="total"
      :search="search"
      :items-per-page="15"
      class="elevation-1"
    >
      <template v-slot:[`item.senderInfo`]="{ item }">
        <div v-if="item.senderInfo">
          <div>{{ item.senderInfo.name }}</div>
          <div>{{ item.senderInfo.phoneNumber }}</div>
        </div>
      </template>

      <template v-slot:[`item.receiverInfo`]="{ item }">
        <div v-if="item.receiverInfo">
          <div>{{ item.receiverInfo.name }}</div>
          <div>{{ item.receiverInfo.phoneNumber }}</div>
        </div>
      </template>
      <template v-slot:[`item.items`]="{ item }">
        <div v-if="item.items">
          <div v-if="item.items[0].merchandise">{{ item.items[0].merchandise.name }}</div>
          <div>{{ item.items[0].quantity }}</div>
        </div>
      </template>

      <template v-slot:[`item.actions`]="{ item }">
        <v-icon color="success" small @click="edit(item.id)">mdi-pen</v-icon>
        <v-icon color="error" small @click="del(item.id)">mdi-delete</v-icon>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import ApiService from "../services/ShipmentService";
import Enums from "./../../../plugins/enums";
import Localbase from "localbase";
let db = new Localbase("db");

export default {
  name: "ShipmentTable",
  props: ["value"],
  data() {
    return {
      loadings: {},
      showsearch: true,
      allIncludeTax: false,
      linesPricing: false,
      select: null,
      dialog: false,
      selected: {
        paymentType: 0,
        date: this.formateDateWithMoment(Date.now(), "YYYY-MM-DD"),
        senderInfo: {},
        receiverInfo: {},
        sender: {},
        receiver: {},
        serviceTypeId: 1,
        items: [{}],
        netPrice: null,
        totalPrice: null,
        addedValueTax: null
      },
      headers: [
        { text: "رقم", align: "start", sortable: false, value: "id", align: "center" },
        //   { text: 'التاريخ', value: 'date',align: 'center', },
        { text: "الرقم اليدوى", value: "manualNo", align: "center" },
        //   { text: 'نوع الخدمه ', value: 'serviceType',align: 'center', },
        { text: "الرحلة", value: "tripId", align: "center" },
        { text: "المرسل", value: "senderInfo", align: "center" },
        { text: " المستلم", value: "receiverInfo", align: "center" },
        { text: "الأصناف", value: "items", align: "center" },
        { text: "اجمالي السعر", value: "totalPrice", align: "center" },
        { text: " السعر", value: "items[0].price", align: "center" },
        { text: "تعديل / مسح", value: "actions", align: "center" }
      ],
      message: "",

      total: 10,
      search: "",
      loadingStates: { table: false },
      options: {},
      editMode: false
    };
  },

  mounted() {
    this.getLocalShipments();
  },
  computed: {
    entities: {
      get() {
        // return this.value;
        return this.$store.getters.polisas;
      },
      set(val) {
        this.$emit("input", val);
      }
    }
  },
  methods: {
    getLocalShipments() {
      this.$store.dispatch("getLocalShipments");
    },

    del(id) {
      this.$dialog
        .info({
          text: "هل أنت متاكد من حذف العنصر",
          title: "  حذف وحدة  ",
          persistent: true,
          actions: {
            true: {
              text: "نعم",
              color: "green",
              handle: () => {
                db.collection("shipments")
                  .doc({ id: id })
                  .delete()
                  .then(response => {
                    this.getLocalShipments();
                    this.message = "تم مسح العنصر بنجاح";
                    this.$dialog.notify.success(this.message, {
                      position: "top-right",
                      timeout: 3000
                    });
                  })
                  .catch(error => {
                    console.log("There was an error, do something else.");
                  });
              }
            },
            false: {
              text: "الغاء"
            }
          }
        })
        .then(res => {
          console.log("delet res:", res);
        });
    },

    edit(id) {
      this.selected = null;
      this.selected = { ...this.entities.filter(e => e.id == id)[0] };
      this.$emit("prepareToEdit", this.selected);
    }
  }
};
</script>

<style lang="scss" scoped></style>
