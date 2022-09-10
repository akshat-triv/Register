<template>
  <div class="common-card">
    <div class="common-card-top">
      <div class="card-countdown-wrapper">
        <div class="card-countdown-upper">{{ displayMinutes }}</div>
        <div class="card-countdown-lower">{{ displaySeconds }}</div>
      </div>
      <div class="card-body">
        <div class="card-body-top">
          <h3 class="card-heading">{{ props.title }}</h3>
          <span class="card-description">
            {{ props.description }}
          </span>
        </div>
      </div>
    </div>
    <div class="common-card-bottom">
      <div class="points-wrapper">
        <img class="points-icon" src="@/assets/gold-coin.png" alt="gold-coin" />
        <span class="points-text">{{ pointsWorth }}</span>
      </div>
      <div
        class="btn btn-primary"
        :class="{ disabled: actionDisabled }"
        @click="takeAction"
      >
        {{ primaryBtnText }}
      </div>
      <inline-svg
        v-if="props.cardType !== 'reward'"
        :src="require('@/assets/trash.svg')"
        class="delete-icon"
        title=""
        @click="emit('delete-item')"
      ></inline-svg>
    </div>
  </div>
</template>

<script setup>
import { ref } from "@vue/reactivity";
import { computed, watch, inject } from "@vue/runtime-core";
import { useStore } from "vuex";

const props = defineProps({
  title: {
    type: String,
    default: "Title of the task",
  },
  description: {
    type: String,
    default: "Description of the task",
  },
  duration: {
    type: Number,
    default: 1,
  },
  cardType: {
    type: String,
    default: "task",
  },
});

const emit = defineEmits(["delete-item"]);

const store = useStore();

const wallet = computed(() => store.getters["getWallet"]);

const minutes = ref(props.duration);
const seconds = ref(0);

const pointsWorth = computed(() => {
  const valueOfOneMinute = store.getters["getValueOfOneMinute"];
  return parseFloat(valueOfOneMinute * props.duration).toFixed(2);
});

const timerActive = inject("timer-active");
const timerStarted = ref(false);

const primaryBtnText = computed(() => {
  if (props.cardType === "shop") return "Buy";
  return timerStarted.value ? "Stop" : "Start";
});

watch(timerStarted, (newValue) => {
  timerActive.value = newValue;
});

const actionDisabled = computed(() => {
  if (props.cardType === "shop") {
    return wallet.value < pointsWorth.value;
  }
  return timerActive.value && !timerStarted.value;
});

const displaySeconds = computed(() => {
  if (seconds.value < 10) return `0${seconds.value}`;
  else return seconds.value;
});

const displayMinutes = computed(() => {
  if (minutes.value < 10) return `0${minutes.value}`;
  else return minutes.value;
});

let newTimer;

const startTime = ref(null);

function stopTimer() {
  clearInterval(newTimer);
  minutes.value = props.duration;
  seconds.value = 0;
  startTime.value = null;
}

function startTimer() {
  if (seconds.value === 0) {
    minutes.value -= 1;
    seconds.value = 59;
  } else seconds.value -= 1;

  const startMinute = minutes.value;
  let startSeconds = seconds.value;

  newTimer = setInterval(() => {
    const currentTime = Date.now();
    const timeDifference = parseInt((currentTime - startTime.value) / 1000);
    const updatedSeconds = timeDifference % 60;
    const updatedMinutes = Math.floor(timeDifference / 60);

    if (seconds.value === 0 && startSeconds !== 59) {
      clearInterval(newTimer);
      startTimer();
      return;
    } else {
      minutes.value = startMinute - updatedMinutes;
      seconds.value = startSeconds - updatedSeconds;
    }

    if (minutes.value < 0 || (minutes.value <= 0 && seconds.value <= 0)) {
      timerStarted.value = false;
      minutes.value = props.duration;
      seconds.value = 0;
      clearInterval(newTimer);
    }
  }, 1000);
}

function deleteReward() {
  emit("delete-item");
}

function addMoneyInWallet() {
  store.dispatch("addMoneyInWallet", pointsWorth.value);
}

function spendMoneyFromWallet() {
  store.dispatch("spendMoneyFromWallet", pointsWorth.value);
}

function addRewardInList() {
  store.dispatch("addRewardInList", {
    title: props.title,
    description: props.description,
    duration: props.duration,
  });
}

const scheduleNotification = inject("scheduleNotification");

function executeEndActions() {
  if (props.cardType === "task") addMoneyInWallet();
  else if (props.cardType === "reward") deleteReward();
  timerStarted.value = false;
  minutes.value = props.duration;
  seconds.value = 0;
  if (newTimer) clearInterval(newTimer);
}

function getNotificationObject() {
  return {
    id: 1,
    title: "Timer has ended",
    body: "Money got credited to your wallet",
    summaryText: "Transaction",
    largeBody: "Money got credited to your wallet",
    schedule: {
      at: new Date(
        new Date().getTime() + parseInt(`${props.duration}`) * 60 * 1000
      ),
      allowWhileIdle: true,
    },
    extra: { callBack: executeEndActions },
    channelId: "transactions",
  };
}

function takeAction() {
  if (actionDisabled.value) return;

  if (["task", "reward"].includes(props.cardType)) {
    timerStarted.value = !timerStarted.value;

    // Stopping the timer if stop button is clicked
    if (!timerStarted.value) {
      stopTimer();
      return;
    }
    //Set starting time
    startTime.value = Date.now();
    //Start the timer
    startTimer();
    //Scheduling the notification
    scheduleNotification(getNotificationObject());

    return;
  }
  // If the control reaches here means this is a shop item card
  spendMoneyFromWallet();
  addRewardInList();
}
</script>

<style lang="scss" scoped>
.common-card {
  width: 100%;
  position: relative;
  background-color: rgba(#dfe6e9, 0.4);
  border-radius: 4px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  display: flex;
  flex-direction: column;

  &-top {
    display: flex;
    padding: 1.2rem;
    height: 11rem;
    border-bottom: 1px solid #fff;
  }

  &-bottom {
    display: flex;
    align-items: center;
    padding: 0.8rem 1.2rem;

    .points {
      &-wrapper {
        display: flex;
        align-items: center;
        margin-right: auto;
      }
      &-icon {
        width: 2.4rem;
        height: 2.4rem;
      }
      &-text {
        font-size: 1.4rem;
        display: inline-block;
        border-radius: 1.2rem;
        padding-left: 0.4rem;
      }
    }
  }
}

.card {
  &-countdown {
    &-wrapper {
      display: flex;
      flex-direction: column;
      color: var(--text-color-dark);
      font-size: 2.4rem;
      height: 100%;
      flex: 0 0 25%;
      max-width: 9.2rem;
      margin-right: 1.2rem;
      border-radius: 4px;
      overflow: hidden;
    }
    &-upper {
      background: var(--primary-color-2);
      color: currentColor;
      display: flex;
      flex: 0 0 50%;
      justify-content: center;
      align-items: center;
    }
    &-lower {
      background: var(--primary-color-1);
      color: currentColor;
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  &-heading {
    font-size: 1.6rem;
    margin-bottom: 0.4rem;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  &-body {
    display: flex;
    flex-direction: column;
    text-align: left;

    &-top {
      margin-bottom: auto;
    }
  }

  &-description {
    font-size: 1.2rem;
    font-weight: 300;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
}

.delete-icon {
  width: 2rem;
  height: 2rem;
  fill: var(--primary-color-1);
  margin-left: 2rem;
}
</style>
