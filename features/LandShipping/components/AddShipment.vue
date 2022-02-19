<template>
  <div>
    <v-row>
      <v-col cols="12" sm="6">
        <v-text-field
          :rules="[allRules.required]"
          dense
          ref="num4"
          outlined
          :loading="loadings"
          @keydown.enter.prevent="goToNext('num4')"
          @blur="getBookNum()"
          @keydown.enter="getBookNum()"
          label="اسم الكابتن"
          type="text"
          v-model="selected"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="6">
        <v-text-field
          :rules="[allRules.required]"
          dense
          ref="num4"
          outlined
          :loading="loadings"
          @keydown.enter.prevent="goToNext('num4')"
          @blur="getBookNum()"
          @keydown.enter="getBookNum()"
          label="محلة رقم"
          type="number"
          v-model="selected"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="6">
        <v-text-field
          :rules="[allRules.required]"
          dense
          ref="num4"
          outlined
          :loading="loadings"
          @keydown.enter.prevent="goToNext('num4')"
          @blur="getBookNum()"
          @keydown.enter="getBookNum()"
          label="رقم الهاتف"
          type="number"
          v-model="selected"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="6">
        <v-text-field
          :rules="[allRules.required]"
          dense
          ref="num4"
          outlined
          :loading="loadings"
          @keydown.enter.prevent="goToNext('num4')"
          @blur="getBookNum()"
          @keydown.enter="getBookNum()"
          label="نوع الدراجة"
          type="text"
          v-model="selected"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="6 ">
        <v-text-field
          :rules="[allRules.required]"
          dense
          ref="num4"
          outlined
          :loading="loadings"
          @keydown.enter.prevent="goToNext('num4')"
          @blur="getBookNum()"
          @keydown.enter="getBookNum()"
          label="البريد الإلكتروني"
          type="email"
          v-model="selected"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="6 ">
        <v-text-field
          :rules="[allRules.required]"
          dense
          ref="num4"
          outlined
          :loading="loadings"
          @keydown.enter.prevent="goToNext('num4')"
          @blur="getBookNum()"
          @keydown.enter="getBookNum()"
          label="رفع الجنسية (وجه أول)"
          type="text"
          v-model="selected"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="6 ">
        <v-text-field
          :rules="[allRules.required]"
          dense
          ref="num4"
          outlined
          :loading="loadings"
          @keydown.enter.prevent="goToNext('num4')"
          @blur="getBookNum()"
          @keydown.enter="getBookNum()"
          label="العنوان"
          type="text"
          v-model="selected"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="6 ">
        <v-text-field
          :rules="[allRules.required]"
          dense
          ref="num4"
          outlined
          :loading="loadings"
          @keydown.enter.prevent="goToNext('num4')"
          @blur="getBookNum()"
          @keydown.enter="getBookNum()"
          label="رفع الجنسية(وجه ثاني)"
          type="text"
          v-model="selected"
        ></v-text-field>
      </v-col>
    </v-row>
        <v-row>
      <v-col cols="12" sm="6 ">
        <v-text-field
          :rules="[allRules.required]"
          dense
          ref="num4"
          outlined
          :loading="loadings"
          @keydown.enter.prevent="goToNext('num4')"
          @blur="getBookNum()"
          @keydown.enter="getBookNum()"
          label="رقم الهوية"
          type="number"
          v-model="selected"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="6 ">
        <v-text-field
          :rules="[allRules.required]"
          dense
          ref="num4"
          outlined
          :loading="loadings"
          @keydown.enter.prevent="goToNext('num4')"
          @blur="getBookNum()"
          @keydown.enter="getBookNum()"
          label="رفع بطاقة السكن (وجه أول)"
          type="text"
          v-model="selected"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="6 ">
        <v-text-field
          :rules="[allRules.required]"
          dense
          ref="num4"
          outlined
          :loading="loadings"
          @keydown.enter.prevent="goToNext('num4')"
          @blur="getBookNum()"
          @keydown.enter="getBookNum()"
          label="رقم الدار"
          type="number"
          v-model="selected"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="6 ">
        <v-text-field
          :rules="[allRules.required]"
          dense
          ref="num4"
          outlined
          :loading="loadings"
          @keydown.enter.prevent="goToNext('num4')"
          @blur="getBookNum()"
          @keydown.enter="getBookNum()"
          label="رفع بطاقة السكن (وجه ثاني)"
          type="number"
          v-model="selected"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" sm="6">
        <v-text-field
          :rules="[allRules.required]"
          dense
          ref="num4"
          outlined
          :loading="loadings"
          @keydown.enter.prevent="goToNext('num4')"
          @blur="getBookNum()"
          @keydown.enter="getBookNum()"
          label="رقم الزقاق"
          type="text"
          v-model="selected"
        ></v-text-field>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import salesMenApi from "../services/SalesmenService.js";
import tripsApi from "../services/TripsService";
import lineApi from "../services/LinesService.js";
import servicesTypesApi from "../../Settings/services/ServiceTypesService";
import ClientsService from "../services/ClientsService.js";

import unitsApi from "../../Settings/services/UnitsService";
import MerchandisesApi from "../services/MerchandisesService";
import ApiService from "../services/ShipmentService";
import PricesApi from "../services/PricesService";
import CityService from "../../Settings/services/CityService";
import BookService from "../services/BooksService";
import Enums from "./../../../plugins/enums";
export default {
  props: ["value", "editMode"],
  data() {
    return {
      loadings: {},
      mer: null,
      valid: false,
      valid2: false,
      Productdialog: false,
      validProduct: false,
      combo: null,
      showsearch: true,
      paymentEnum: Enums.PaymentTypes,
      sizeEnum: Enums.Sizes,
      cities: [],
      clients: [],
      avalibaleTrips: [],
      polisa: {},
      switch1: false,

      servicesTypeList: null,
      unitsList: null,
      showSenderBranches: false,
      userBranches: null,
      userSenderBranches: [],
      salesMenData: null,
      trips: null,
      merchandisesList: [],
      isDisabled: false,
      lines: null,
      SpecialBranches: null,
      SpecialBranches2: null,
      allIncludeTax: false,
      linesPricing: false,
      select: null,
      dialog: false,
      // selectedLine: {},
      product: { includeTax: false },
      editDialog: null,
      defaulatSelected: {
        lineObject: "",
        lineId: "",
        unitId: null,
        date: "",
        merchandisObject: null,
        unitObbject: null,
        quantity: null
      },
      mainMerchandesList: [],
      showBranches: false,
      message: "",
      entities: [],
      total: 10,
      search: "",
      loadingStates: { table: false },
      options: {}
    };
  },
  created() {
    try {
      console.log(this.editMode);

      const salesMen = salesMenApi.query();
      const trips = tripsApi.query();
      const line = lineApi.query();
      const servicesType = servicesTypesApi.get();
      const units = unitsApi.get();
      CityService.typeHead("", true).then(resp => (this.cities = resp.data));
      MerchandisesApi.query().then(resp => (this.merchandisesList = resp.data.items));
      Promise.all([salesMen, trips, line, servicesType, units]).then(res => {
        this.salesMenData = res[0].data.items;
        this.trips = res[1].data;
        this.lines = res[2].data.items;
        this.servicesTypeList = res[3].data;
        this.unitsList = res[4].data;
        this.loading = false;
      });
    } catch (error) {
      console.log(error);
    }
  },
  computed: {
    test() {
      let m = this.selected.items[0].merchandiseId;
      return m;
    },
    outSources() {
      return this.$store.getters.outSources;
    },
    selected: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      }
    }
  },

  mounted() {
    window.addEventListener("keydown", this.keyDown);
  },
  destroyed() {
    window.removeEventListener("keydown", this.keyDown);
  },

  methods: {
    totalPriceManual(e) {
      // if(e.keyCode!=13)
      // return;
      console.log("Updating price manually");
      var totalPrice = parseFloat(this.selected.totalPrice);
      var addedValueTaxPercentage = 0.15;
      if (this.selected.includeTax) {
        var total =
          totalPrice - (totalPrice / (1 + addedValueTaxPercentage)) * addedValueTaxPercentage;
        this.selected.totalPrice = this.round(total, 2);
        this.selected.addedValueTax = this.round(totalPrice - total, 2);
        this.selected.netPrice = this.round(totalPrice - this.selected.addedValueTax, 2);
      } else {
        //  this.selected.addedValueTax=this.round(totalPrice*addedValueTaxPercentage);
        //  this.selected.netPrice=this.round(totalPrice-this.selected.addedValueTax) ;

        this.$set(this.selected, "addedValueTax", this.round(totalPrice * addedValueTaxPercentage));
        this.$set(this.selected, "netPrice", totalPrice - this.selected.addedValueTax);
      }
    },
    getClients(searchTerm) {
      return ClientsService.typeHead(searchTerm, false, true);
    },
    getBookNum() {
      this.$set(this.loadings, "manualNo", true);
      BookService.getBookNum(this.selected)
        .then(resp => {
          this.$set(this.selected, "bookNum", resp.data);
          this.$set(this.selected, "bookId", resp.data.id);
        })
        .finally(resp => {
          this.loadings = false;
          this.$set(this.loadings, "manualNo", false);
        });
    },
    keyDown(e) {
      if (e.keyCode == 121) {
        console.log("its f10");
        // do your function
      }
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
                let indexOfItem = this.entities.findIndex(i => {
                  return i.id == id;
                });
                this.entities.splice(indexOfItem, 1);
                this.message = "تم مسح العنصر بنجاح";
                this.$dialog.notify.success(this.message, {
                  position: "top-right",
                  timeout: 3000
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

    goToNext() {},
    saveAll() {
      console.log(this.entities);
    },
    updatePrice() {
      console.log(this.editMode);

      // if (this.editMode) {
      //   console.log(this.editMode);

      // }else{

      console.log("Updating price");
      var shipment = this.selected;
      shipment.items.forEach(item => {
        var price = parseFloat(item.price | 0);
        var quantity = parseInt(item.quantity | 0);
        var addedValueTaxPercentage = 0.15;
        var total = quantity * price;
        item.includeTax = shipment.includeTax;
        if (item.includeTax) {
          var total = total - (total / (1 + addedValueTaxPercentage)) * addedValueTaxPercentage;
          item.total = this.round(total, 2);
          item.addedValueTax = this.round(price * quantity - total, 2);
          item.addedValueTax = this.round(price * quantity - total, 2);
        } else {
          var addedValueTax = addedValueTaxPercentage * total;
          item.total = this.round(total + addedValueTax, 2);
          item.addedValueTax = this.round(addedValueTax, 2);
        }
        var itemsTotal = shipment.items.map(i => i.total).reduce((a, b) => a + b);
        var itemsAddedValueTax = shipment.items.map(i => i.addedValueTax).reduce((a, b) => a + b);

        var totalPrice =
          itemsTotal +
          parseFloat(shipment.insurance | 0) +
          parseFloat(shipment.otherServicesPrice | 0) +
          parseFloat(shipment.deliveryPrice | 0) +
          parseFloat(shipment.duePrice | 0);

        shipment.addedValueTax = this.round(itemsAddedValueTax);
        shipment.totalPrice = this.round(totalPrice);
        shipment.netPrice = this.round(totalPrice - shipment.addedValueTax);
      });
      // }
    },

    clickInput() {
      this.$refs.num8.click();
    },
    async changePrice(id) {
      let client = this.selected.receiver;
      let item = this.merchandisesList.find(i => {
        return i.id == id;
      });
      var shipment = this.selected.items[0];
      if (client && client.id) {
        const products = await PricesApi.get(client);
        let checkIfExist = products.data.items.find(i => {
          return i.merchandiseId == id;
        });
        if (checkIfExist) {
          this.$set(shipment, "price", checkIfExist.privatePrice);
          this.$set(shipment, "quantity", shipment.quantity | 1);
        } else {
          this.$dialog
            .info({
              text: "هذا الصنف غير موجود للعميل هل تريد اضافته ؟",
              title: "  اضافه صنف   ",
              persistent: true,
              actions: {
                true: {
                  text: "نعم",
                  color: "green",
                  handle: () => {
                    this.Productdialog = true;
                    this.product.merchandiseId = item;
                    this.product.lineId = this.selected.selectedLine;
                  }
                },
                false: {
                  text: "لا"
                }
              }
            })
            .then(res => {
              if (!res) {
                this.$set(shipment, "price", item.price);
              }
            });
        }
      } else {
        this.$set(shipment, "price", item.price);
      }
      // if (this.switch2 === true) {
      //   this.selected.totalPrice += mianPrice * 0.15;
      //   this.selected.taxs = this.selected.totalPrice * 0.15;
      // }
    },

    addNewMerchandis() {
      if (this.product.includeTax === true) {
        this.product.privatePrice = this.product.afterTax;
      }

      this.product.merchandiseId = this.product.merchandiseId.id;
      this.product.lineId = this.product.lineId.id;
      this.product.clientId = this.selected.receiver.id;
      //  fake price
      this.product.price = this.product.privatePrice;

      let data = {
        clientId: this.product.clientId,
        clientData: this.product
      };
      PricesApi.add(data).then(resp => {
        this.product = { includeTax: false };
        let newMerchandis = {
          id: resp.data.merchandiseId,
          // fake data also
          price: resp.data.price
        };
        this.Productdialog = false;
        let shipment = this.selected.items[0];
        this.$set(shipment, "merchandiseId", newMerchandis.id);
        this.$set(shipment, "price", newMerchandis.price);
        this.$set(shipment, "quantity", newMerchandis.quantity | 1);
        //  this.updatePrice()
        this.message = "تم إضافة صنف بنجاح";
        this.$dialog.notify.success(this.message, {
          position: "top-right",
          timeout: 3000
        });
      });
    },
    cancelMerchandis() {
      this.Productdialog = false;
      // this.defaultPrice(this.product.merchandisObject)
    }
  },

  watch: {
    "selected.selectedLine"(val) {
      this.selected.selectedLine = val;
    },
    switch1: function(newVal) {
      if (newVal == true) {
        this.selected.serviceTypeId = 3;
      }
    },
    test(newval) {
      this.changePrice(newval);
    },

    "selected.receiverBranch"(newValue) {
      if (this.selected.receiverBranch)
        this.selected.receiverInfo.phoneNumber = this.selected.receiverBranch.phoneNumber;
      else this.selected.receiverInfo.phoneNumber = this.selected.receiver.phoneNumber;
    },
    "selected.senderBranch"(newValue) {
      if (this.selected.senderBranch) {
        this.selected.senderInfo.phoneNumber = this.selected.senderBranch.phoneNumber;
      } else this.selected.senderInfo.phoneNumber = this.selected.sender.phoneNumber;
    },

    "selected.sender.id"(newValue) {
      if (newValue) this.selected.senderInfo.phoneNumber = this.selected.sender.phoneNumber;
    },

    "selected.receiver.id"(newValue) {
      if (newValue) this.selected.receiverInfo.phoneNumber = this.selected.receiver.phoneNumber;
    },

    "selected.insurance"() {
      this.updatePrice();
    },
    "selected.deliveryPrice"() {
      this.updatePrice();
    },
    "selected.otherServicesPrice"() {
      this.updatePrice();
    },
    "selected.duePrice"() {
      this.updatePrice();
    },
    "selected.items": {
      deep: true,
      handler: function(after, before) {
        this.updatePrice();
      }
    },
    selected: {
      deep: true,
      handler: function(after, before) {
        console.log("selected changed ");
        console.log(this.selected);
      }
    },

    entities: {
      handler() {
        this.$store.commit("pushPolisa", this.entities);
      },
      deep: true
    },
    "selected.includeTax"(newValue) {
      this.updatePrice();
    }
  }
};
</script>

<style lang="scss" scoped></style>
