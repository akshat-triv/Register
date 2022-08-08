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
    },
    deleteTaskInList(state, taskIndex) {
      state.taskList.splice(taskIndex, 1);
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
    addMoneyInWallet({ commit }, amount) {
      commit("addMoneyInWallet", amount);
    },
    spendMoneyFromWallet({ commit }, amount) {
      commit("spendMoneyFromWallet", amount);
    },
  },
  modules: {},
});
