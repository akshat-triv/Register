<script setup lang="ts">
import type { cardType } from "@/types/application.interface";
import type { Ref } from "vue";

import { useAppStore } from "@/stores";
import { computed, ref } from "@vue/reactivity";
import DeleteIcon from "../icons/DeleteIcon.vue";
import { inject } from "vue";

type timerCard = {
  cardType: cardType;
  title: string;
  description: string;
  duration: string;
  id: string;
  active: boolean;
};

const props = defineProps<timerCard>();
const emit = defineEmits(["delete-item"]);

const store = useAppStore();

const initialMinutes = computed(() => {
  return parseInt(props.duration.split(":")[0]);
});
const initialSeconds = computed(() => {
  return parseInt(props.duration.split(":")[1]);
});

const minutes = ref(initialMinutes.value);
const seconds = ref(initialSeconds.value);

const displaySeconds = computed(() => {
  if (seconds.value < 10) return `0${seconds.value}`;
  return `${seconds.value}`;
});
const displayMinutes = computed(() => {
  if (minutes.value < 10) return `0${minutes.value}`;
  return `${minutes.value}`;
});

function calculatePoints(minutes: number) {
  const valueOfOneMinute = store.getValueOfOneMinute;
  return parseFloat((valueOfOneMinute * minutes).toFixed(2));
}

const pointsWorth = computed(() => {
  return calculatePoints(initialMinutes.value);
});

const anotherTimerIsActive = inject<Ref>("timer-active");
const timerStarted = ref(false);
const wallet = computed(() => store.getWallet);

const actionDisabled = computed(() => {
  if (props.cardType === "shop") {
    return wallet.value < pointsWorth.value;
  }
  return anotherTimerIsActive?.value && !timerStarted.value;
});

const primaryBtnText = computed(() => {
  if (props.cardType === "shop") return "Buy";
  return timerStarted.value ? "Stop" : "Start";
});

function takeAction() {
  console.log("Take Action");
}
</script>

<template>
  <div class="timer-card">
    <div class="timer-card-top">
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
    <div class="timer-card-bottom">
      <div class="points-wrapper">
        <img
          class="points-icon"
          src="@/assets/images/gold-coin.png"
          alt="gold-coin"
        />
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
      <delete-icon
        :title="'delete'"
        class="delete-icon"
        @click="emit('delete-item')"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.timer-card {
  width: 100%;
  position: relative;
  background-color: rgba(#dfe6e9, 0.4);
  border-radius: 4px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  // Timer Card Top section
  &-top {
    display: flex;
    padding: 1.2rem;
    height: 11rem;
    border-bottom: 1px solid #fff;
  }
  // Timer Card Bottom section
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
