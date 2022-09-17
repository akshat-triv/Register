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
      <a
        href="#"
        class="btn btn-primary"
        :class="{ disabled: actionDisabled }"
        @click="takeAction"
      >
        {{ primaryBtnText }}
      </a>
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
import { computed, watch, inject, toRefs } from "@vue/runtime-core";
import { useStore } from "vuex";

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    default: "Title of the task",
  },
  description: {
    type: String,
    default: "Description of the task",
  },
  duration: {
    type: String,
    default: "01:00",
  },
  cardType: {
    type: String,
    default: "task",
  },
  active: {
    type: Boolean,
    required: true,
  },
});

const { active } = toRefs(props);

const emit = defineEmits(["delete-item", "add-reward"]);

const store = useStore();

const wallet = computed(() => store.getters["getWallet"]);

const initialMinutes = computed(() => {
  return parseInt(props.duration.split(":")[0]);
});
const initialSeconds = computed(() => {
  return parseInt(props.duration.split(":")[1]);
});

const minutes = ref(parseInt(props.duration.split(":")[0]));
const seconds = ref(parseInt(props.duration.split(":")[1]));

function calculatePoints(minutes) {
  const valueOfOneMinute = store.getters["getValueOfOneMinute"];
  return parseFloat(valueOfOneMinute * minutes).toFixed(2);
}

const pointsWorth = computed(() => {
  return calculatePoints(initialMinutes.value);
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

const appPlatform = inject("app-platform");

let newTimer;

const startTime = ref(null);

async function pauseTimerAndCheckout() {
  // Stopping the timer
  clearInterval(newTimer);
  startTime.value = null;
  timerStarted.value = false;
  // Canceling the pre-scheduled notification
  await cancelPendingNotifications();

  // If card type is reward just update the reward left duration
  if (props.cardType === "reward") {
    const rewardDetails = {
      id: props.id,
      duration: `${displayMinutes.value}:${displaySeconds.value}`,
    };
    store.dispatch("updateRewardInList", rewardDetails);
    return;
  }

  // Calculating how much time has passed
  const timePassed =
    initialMinutes.value - minutes.value - 1 + (60 - seconds.value) / 60;
  // Calculating the points
  const currentPoints = calculatePoints(timePassed);
  // Reset Timer
  resetTimer();
  // If app platform is not web, schedule an immediate notification for adding points to wallet
  if (appPlatform !== "web") {
    scheduleNotification(getNotificationObject(true, currentPoints));
    return;
  }
  // If you've reached till here then platform is web, so add points to wallet and play cha-ching
  addMoneyInWallet(currentPoints);
  playNotificationAudio(props.cardType);
}

function resetTimer() {
  minutes.value = initialMinutes.value;
  seconds.value = initialSeconds.value;
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
      if (appPlatform === "web") executeEndActions();
      timerStarted.value = false;
      clearInterval(newTimer);
      resetTimer();
    }
  }, 1000);
}

watch(active, () => {
  timerStarted.value = false;
  clearInterval(newTimer);
  resetTimer();
});

function deleteReward() {
  emit("delete-item");
}

function addMoneyInWallet(money) {
  if (!money) money = pointsWorth.value;
  store.dispatch("addMoneyInWallet", money);
}

function addRewardAndSpendMoneyFromWallet() {
  emit("add-reward", {
    title: props.title,
    description: props.description,
    duration: props.duration,
  });
  store.dispatch("spendMoneyFromWallet", pointsWorth.value);
  if (appPlatform === "web") playNotificationAudio(props.cardType);
}

function playNotificationAudio(cardType) {
  const audioFile = ["task", "shop"].includes(cardType)
    ? "cash_register"
    : "notification_sound";
  const audio = new Audio(require(`@/assets/${audioFile}.mp3`));
  audio.play();
}

function executeEndActions() {
  if (props.cardType === "task") addMoneyInWallet();
  else if (props.cardType === "reward") deleteReward();
  playNotificationAudio(props.cardType);
}

const scheduleNotification = inject("schedule-notification");
const cancelPendingNotifications = inject("cancel-pending-notifications");

function getNotificationObject(immediate = false, points) {
  const durationInMilliSeconds =
    (initialMinutes.value * 60 + initialSeconds.value) * 1000;
  if (!points) points = pointsWorth.value;

  const notificationObject = {
    task: {
      title: `Timer has ended for: ${props.title}`,
      body: `${points} coins got credited to your wallet`,
      largeBody: `${points} coins got credited to your wallet`,
      schedule: {
        at: new Date(startTime.value + durationInMilliSeconds),
        allowWhileIdle: true,
      },
      channelId: "transactions",
      extra: {
        points,
        action: "credit",
        type: props.cardType,
        id: props.id,
      },
    },
    reward: {
      title: `Timer has ended for: ${props.title}`,
      body: "I suggest you start another task, or buy and cash another reward.",
      largeBody:
        "Your times up, I suggest you start another task, or buy and cash another reward.",
      schedule: {
        at: new Date(startTime.value + durationInMilliSeconds),
        allowWhileIdle: true,
      },
      channelId: "general",
      extra: {
        action: "delete",
        type: props.cardType,
        id: props.id,
      },
    },
    shop: {
      title: `${pointsWorth.value} coins got debited for ${props.title}`,
      body: "You can cash in this reward any time you want from the rewards section",
      largeBody: `${pointsWorth.value} coins got credited to your wallet`,
      channelId: "transactions",
    },
  };

  if (immediate) delete notificationObject[props.cardType].schedule;

  return {
    id: 1,
    ...notificationObject[props.cardType],
  };
}

async function takeAction() {
  if (actionDisabled.value) return;

  if (["task", "reward"].includes(props.cardType)) {
    timerStarted.value = !timerStarted.value;

    // Stopping the timer if stop button is clicked
    if (!timerStarted.value) {
      await pauseTimerAndCheckout();
      return;
    }
    //Set starting time
    startTime.value = Date.now();
    //Start the timer
    startTimer();
  }

  if (props.cardType === "shop") addRewardAndSpendMoneyFromWallet();

  //Scheduling the notification
  scheduleNotification(getNotificationObject());
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
