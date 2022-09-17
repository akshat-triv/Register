import { createStore } from "vuex";

export default createStore({
  state: {
    userDetails: {
      salary: null,
      workingDays: null,
      workingHours: null,
    },
    valueOfOneMinute: null,
    taskList: {},
    shopList: {},
    rewardList: {},
    rewardTimer: false,
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
    getRewardTimer(state) {
      return state.rewardTimer;
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
      state.taskList = { ...state.taskList, ...taskDetails };
      localStorage.setItem("taskList", JSON.stringify(state.taskList));
    },
    deleteTaskInList(state, taskId) {
      delete state.taskList[taskId];
      localStorage.setItem("taskList", JSON.stringify(state.taskList));
    },
    addShopInList(state, shopItemDetails) {
      state.shopList = { ...state.shopList, ...shopItemDetails };
      localStorage.setItem("shopList", JSON.stringify(state.shopList));
    },
    deleteShopInList(state, shopItemId) {
      delete state.shopList[shopItemId];
      localStorage.setItem("shopList", JSON.stringify(state.shopList));
    },
    addRewardInList(state, rewardDetails) {
      state.rewardList = { ...state.rewardList, ...rewardDetails };
      localStorage.setItem("rewardList", JSON.stringify(state.rewardList));
    },
    updateRewardInList(state, updatedDetails) {
      Object.assign(state.rewardList[updatedDetails.id], updatedDetails);
      localStorage.setItem("rewardList", JSON.stringify(state.rewardList));
    },
    updateRewardTimer(state, isActive) {
      state.rewardTimer = isActive;
    },
    deleteRewardInList(state, rewardId) {
      delete state.rewardList[rewardId];
      localStorage.setItem("rewardList", JSON.stringify(state.rewardList));
    },
    stopAndClearTimer(state, config) {
      if (!config.type || !config.id) return;
      const newValue = !state[`${config.type}List`][config.id].active;
      state[`${config.type}List`][config.id].active = newValue;
    },
  },
  actions: {
    updateUserDetails({ commit }, userDetails) {
      commit("updateUserDetails", userDetails);
    },
    addTaskInList({ commit }, taskDetails) {
      commit("addTaskInList", taskDetails);
    },
    deleteTaskInList({ commit }, taskIndex) {
      commit("deleteTaskInList", taskIndex);
    },
    addShopInList({ commit }, shopItemDetails) {
      commit("addShopInList", shopItemDetails);
    },
    deleteShopInList({ commit }, shopItemIndex) {
      commit("deleteShopInList", shopItemIndex);
    },
    addRewardInList({ commit }, rewardDetails) {
      commit("addRewardInList", rewardDetails);
    },
    updateRewardInList({ commit }, updatedDetails) {
      commit("updateRewardInList", updatedDetails);
    },
    updateRewardTimer({ commit }, isActive) {
      commit("updateRewardTimer", isActive);
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
    stopAndClearTimer({ commit }, config) {
      commit("stopAndClearTimer", config);
    },
  },
  modules: {},
});
