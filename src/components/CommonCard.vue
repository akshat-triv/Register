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
        :class="{ disabled: timerDisabled }"
        @click="startTimer"
      >
        {{ timerStarted ? "Stop" : "Start" }}
      </div>
      <inline-svg
        :src="require('@/assets/trash.svg')"
        class="delete-icon"
        title=""
        @click="emit('delete-task')"
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
});

const emit = defineEmits(["delete-task"]);

const store = useStore();

const minutes = ref(props.duration);
const seconds = ref(0);

const pointsWorth = computed(() => {
  const valueOfOneMinute = store.getters["getValueOfOneMinute"];
  return parseFloat(valueOfOneMinute * props.duration).toFixed(2);
});

const timerActive = inject("timer-active");
const timerStarted = ref(false);

watch(timerStarted, (newValue) => {
  timerActive.value = newValue;
});

const timerDisabled = computed(() => timerActive.value && !timerStarted.value);

const displaySeconds = computed(() => {
  if (seconds.value < 10) return `0${seconds.value}`;
  else return seconds.value;
});

const displayMinutes = computed(() => {
  if (minutes.value < 10) return `0${minutes.value}`;
  else return minutes.value;
});

let newTimer;

function startTimer() {
  if (timerDisabled.value) return;
  timerStarted.value = !timerStarted.value;

  if (!timerStarted.value) {
    minutes.value = props.duration;
    clearInterval(newTimer);
    return;
  }

  newTimer = setInterval(() => {
    if (seconds.value === 0) {
      minutes.value--;
      seconds.value = 59;
    } else seconds.value--;

    if (minutes.value === 0 && seconds.value === 0) {
      store.dispatch("addMoneyInWallet", pointsWorth.value);
      timerStarted.value = false;
      minutes.value = props.duration;
      clearInterval(newTimer);
    }
  }, 1000);
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
      color: white;
      font-size: 2.4rem;
      height: 100%;
      flex: 0 0 25%;
      max-width: 9.2rem;
      margin-right: 1.2rem;
      border-radius: 4px;
      overflow: hidden;
    }
    &-upper {
      background: #273c75;
      color: currentColor;
      display: flex;
      flex: 0 0 50%;
      justify-content: center;
      align-items: center;
    }
    &-lower {
      background: #192a56;
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
  }
}

.delete-icon {
  width: 2rem;
  height: 2rem;
  fill: #192a56;
  margin-left: 2rem;
}
</style>
