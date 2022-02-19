import Vue from "vue";
import Vuex from "vuex";
import Localbase from "localbase";
let db = new Localbase("db");

Vue.use(Vuex);
import axios from "axios";
export default new Vuex.Store({
  state: {
    printingData: [],
    currentuser: {},
    user: {},
    // polisas:JSON.parse(localStorage.getItem('shipment')),
    polisas: [],
    distrbuters: [
      {
        name: "احمد",
        id: 2,
        phoneNum: 421225125,
        cityId: 1,
        polisas: [],
        cityObject: [{ id: 1, name: "cairo" }]
      },
      {
        name: "mohamed",
        id: 1,
        phoneNum: 4242152,
        polisas: [],
        cityObject: [{ id: 2, name: "asawn" }]
      }
    ],
    outSources: [
      {
        name: "احمد",
        id: 2,
        phoneNum: 42,
        userCities: [
          { id: 1, name: "as1eeewr", phoneNum: 454 },
          { id: 2, name: "as1sad", phoneNum: 44254 }
        ]
      },
      {
        name: "mohamed",
        id: 1,
        phoneNum: 4242,
        userCities: [
          { id: 1, name: "asqwr1", phoneNum: 454 },
          { id: 2, name: "avas1", phoneNum: 4534 }
        ]
      }
    ],
    // clients:[],
    clients: [
      {
        name: "احمد",
        id: 2,
        allPolis: [
          { taxs: 100, tottalPrice: 20 },
          { taxs: 100, tottalPrice: 40 },
          { taxs: 60, tottalPrice: 20 }
        ]
      },
      {
        name: "محمد",
        id: 1,
        allPolis: [
          { taxs: 100, tottalPrice: 50 },
          { taxs: 10, tottalPrice: 40 },
          { taxs: 200, tottalPrice: 20 }
        ]
      }
    ],
    token: localStorage.getItem("token") || "",
    notifications: [
      { title: " اشعار جديدعن موضوع", date: new Date(), seen: true },
      { title: "اشعار جديد", date: new Date(), seen: false }
    ]
  },

  getters: {
    distrbuters(state) {
      return state.distrbuters;
    },
    printinData(state) {
      return state.printingData;
    },
    polisas(state) {
      return state.polisas;
    },
    outSources(state) {
      return state.outSources;
    },
    clients(state) {
      return state.clients;
    },
    // cuurentUser(state) {
    //   return state.currentuser;
    // },
    notifications(state) {
      return state.notifications;
    },
    isAuthenticated: state => !!state.token,
    cuurentUser() {
      var u = localStorage.getItem("user");
      if (u) return JSON.parse(u);
    }
  },
  mutations: {
    // currentUser(state, payload) {
    //   state.currentuser = payload;
    // },
    printData(state, payload) {
      state.printingData = payload;
    },
    getLocalShipments(state, payload) {
      state.polisas = payload;
    },
    stillNot(state, payload) {
      let item = state.polisas.findIndex(i => {
        return i.id == payload.id;
      });
      state.polisas[item].state = { id: 0, name: "لم تسلم" };

      let userIndex = state.distrbuters.findIndex(i => {
        return i.id == payload.userId;
      });
      state.distrbuters[userIndex].polisas = state.distrbuters[userIndex].polisas.filter(i => {
        return i.id !== payload.id;
      });
    },
    sent(state, payload) {
      let item = state.polisas.findIndex(i => {
        return i.id == payload.id;
      });
      state.polisas[item].state = { id: 2, name: " سلمت" };
      let userIndex = state.distrbuters.findIndex(i => {
        return i.id == payload.userId;
      });
      state.distrbuters[userIndex].polisas = state.distrbuters[userIndex].polisas.filter(i => {
        return i.id !== payload.id;
      });
    },

    pushPolisaToDist(state, payload) {
      let item = state.distrbuters.findIndex(i => {
        return i.id === payload.id;
      });
      state.distrbuters[item].polisas = [...payload.polisas];
      state.polisas.forEach(i => {
        return payload.polisas.forEach(p => {
          if (i.id == p.id) {
            i.state = { id: 1, name: " قيد التسليم" };
          }
        });
      });
    },
    distrbuters(state, payload) {
      state.distrbuters = payload;
    },
    addNewClient(state, payload) {
      state.clients.push(payload);
    },
    pushOutSource(state, payload) {
      state.outSources = payload;
    },
    editOutClient(state, payload) {
      state.clients = payload;
    },

    addPolisaToClient(state, payload) {
      let sender = payload.senderId;
      let receiver = payload.receiverId;

      if (sender && sender.id) {
        let getSender = state.clients.findIndex(i => {
          return i.id == sender.id;
        });
        state.clients[getSender].allPolis.push(payload);
      }
      if (receiver && receiver.id) {
        let getReciver = state.clients.findIndex(i => {
          return i.id == receiver.id;
        });
        state.clients[getReciver].allPolis.push(payload);
      }
    },
    pushPolisa(state, payload) {
      state.polisas.push(payload);
    },
    setPolisa(state, payload) {
      state.polisas = payload;
    },
    setUser(state, resp) {
      state.currentUser = resp.user;
      localStorage.setItem("token", `Bearer ${resp.token}`);
      localStorage.setItem("user", JSON.stringify(resp.user));
    },
    logOut(state) {
      debugger;
      state.user = null;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    }
  },
  actions: {
    async getLocalShipments({ commit }) {
      let shipments = await db.collection("shipments").get();
      commit("getLocalShipments", shipments);
    },
    // async login({ commit }, user) {
    //   await axios.post("account/login", user).then(resp => {
    //     commit("setUser", resp);
    //   });
    // },
    // async signup({ commit }, user) {
    //   const resp = await axios.post("account", user);
    //   commit("setUser", resp);
    // },
    logOut({ commit }) {
      commit("logOut");
    },
    currentuser({ commit }, payload) {
      // commit("currentUser", payload);
      commit("setUser", payload);

    },
    changeUserInfo({commit}, payload) {
      commit("setUser", payload)
    }
  },
  modules: {}
});
