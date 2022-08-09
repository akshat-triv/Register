import { createStore } from "vuex";

export default createStore({
  state: {
    userDetails: {
      salary: null,
      workingDays: null,
      workingHours: null,
    },
    valueOfOneMinute: null,
    taskList: [],
    shopList: [],
    rewardList: [],
    wallet: 0,
  },
  getters: {
    getWallet(state) {
      return state.wallet;
    },
    getUserDetails(state) {
      return state.userDetails;
    },
    getValueOfOneMinute(state) {
      return state.valueOfOneMinute;
    },
    getTaskList(state) {
      return state.taskList;
    },
    getShopList(state) {
      return state.shopList;
    },
    getRewardList(state) {
      return state.rewardList;
    },
  },
  mutations: {
    addMoneyInWallet(state, amount) {
      state.wallet += Number(amount);
      localStorage.setItem("wallet", String(state.wallet));
    },
    spendMoneyFromWallet(state, amount) {
      state.wallet -= amount;
      localStorage.setItem("wallet", String(state.wallet));
    },
    updateUserDetails(state, userDetails) {
      state.userDetails = userDetails;
      const { salary, workingDays, workingHours } = userDetails;
      const hoursInAMonth = (workingDays * 4 + 2) * workingHours;
      const valueOfOneHour = salary / hoursInAMonth;
      state.valueOfOneMinute = valueOfOneHour / 60;
    },
    addTaskInList(state, taskDetails) {
      state.taskList = [...state.taskList, ...taskDetails];
      localStorage.setItem("taskList", JSON.stringify(state.taskList));
    },
    deleteTaskInList(state, taskIndex) {
      state.taskList.splice(taskIndex, 1);
      localStorage.setItem("taskList", JSON.stringify(state.taskList));
    },
    addShopInList(state, shopItemDetails) {
      state.shopList = [...state.shopList, ...shopItemDetails];
      localStorage.setItem("shopList", JSON.stringify(state.shopList));
    },
    deleteShopInList(state, shopItemIndex) {
      state.shopList.splice(shopItemIndex, 1);
      localStorage.setItem("shopList", JSON.stringify(state.shopList));
    },
    addRewardInList(state, rewardDetails) {
      state.rewardList = [...state.rewardList, ...rewardDetails];
      localStorage.setItem("rewardList", JSON.stringify(state.rewardList));
    },
    deleteRewardInList(state, rewardIndex) {
      state.rewardList.splice(rewardIndex, 1);
      localStorage.setItem("rewardList", JSON.stringify(state.rewardList));
    },
  },
  actions: {
    updateUserDetails({ commit }, userDetails) {
      commit("updateUserDetails", userDetails);
    },
    addTaskInList({ commit }, taskDetails) {
      if (!Array.isArray(taskDetails)) taskDetails = [taskDetails];
      commit("addTaskInList", taskDetails);
    },
    deleteTaskInList({ commit }, taskIndex) {
      commit("deleteTaskInList", taskIndex);
    },
    addShopInList({ commit }, shopItemDetails) {
      if (!Array.isArray(shopItemDetails)) shopItemDetails = [shopItemDetails];
      commit("addShopInList", shopItemDetails);
    },
    deleteShopInList({ commit }, shopItemIndex) {
      commit("deleteShopInList", shopItemIndex);
    },
    addRewardInList({ commit }, rewardDetails) {
      if (!Array.isArray(rewardDetails)) rewardDetails = [rewardDetails];
      commit("addRewardInList", rewardDetails);
    },
    deleteRewardInList({ commit }, rewardIndex) {
      commit("deleteRewardInList", rewardIndex);
    },
    addMoneyInWallet({ commit }, amount) {
      commit("addMoneyInWallet", amount);
    },
    spendMoneyFromWallet({ commit }, amount) {
      commit("spendMoneyFromWallet", amount);
    },
  },
  modules: {},
});
