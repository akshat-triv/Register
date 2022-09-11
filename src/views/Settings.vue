<template>
  <div class="about-page">
    <div class="about-banner-wrapper">
      <img
        class="about-banner"
        src="@/assets/about-banner.jpg"
        alt="banner"
        rel="preload"
      />
    </div>
    <div class="common-board about-page-inner">
      <h3>
        Hi, I'm the developer of this application, and thank you for
        downloading, and using it. I hope you'll find this application helpful
        in managing your tasks and time. I built this application with a lot of
        love, so if you liked it please consider giving it a star on GitHub and
        this is just version 1, and I have a lot of future ideas to make this
        application more insightful. You can use the following links to contact
        me.
      </h3>
      <div class="social-wrapper">
        <div
          v-for="(socialArray, socialIdx) of socialMediaLinks"
          :key="`social-${socialIdx}`"
          class="social-wrapper-row"
        >
          <a
            v-for="social of socialArray"
            :key="`social-${social.icon}`"
            class="social-icon-wrapper"
            :href="social.link"
            target="_blank"
          >
            <inline-svg
              :src="require(`@/assets/${social.icon}.svg`)"
              class="social-icon"
              :title="social.icon"
            ></inline-svg>
          </a>
        </div>
      </div>

      <div class="btn btn-primary" @click="userDetailsModal = true">
        Update Your Information
      </div>
      <question-modal
        :is-visible="userDetailsModal"
        :close-when-clicked-outside="true"
        @close-modal="userDetailsModal = false"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import QuestionModal from "../components/QuestionModal.vue";

const userDetailsModal = ref(false);

const socialMediaLinks = [
  [
    { icon: "github", link: "https://github.com/akshat-triv/RegisterVueJs" },
    {
      icon: "linkedin",
      link: "https://www.linkedin.com/in/akshat-trivedi-18b8301a5/",
    },
    { icon: "medium", link: "https://medium.com/@akshattriv" },
  ],
  [
    { icon: "instagram", link: "https://www.instagram.com/akshat_triv/" },
    {
      icon: "youtube",
      link: "https://www.youtube.com/channel/UCi_zHXmSMoZeuwMAxfQpLeA/featured",
    },
    {
      icon: "gmail",
      link: "mailto:akshattriv.iit@gmail.com?subject=Hi Aksaht, I used your Register App",
    },
  ],
];
</script>

<style lang="scss" scoped>
h3 {
  font-size: 1.4rem;
  text-align: left;
  font-weight: 400;
  line-height: 2.4rem;
  text-align: justify;
}

.social-wrapper {
  margin-bottom: auto;
  padding: 2rem 2rem 3rem;

  &-row {
    display: flex;
    align-items: center;
    justify-content: space-between;

    &:not(:last-child) {
      margin-bottom: 2rem;
    }
  }

  .social-icon {
    display: inline-block;
    width: 100%;
    height: 100%;

    &-wrapper {
      background: var(--surface-bg-color-1);
      border-radius: 50%;
      box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
      padding: 1.6rem;
      width: 6.4rem;
      height: 6.4rem;
    }
  }
}

.about-banner {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;

  &-wrapper {
    width: 100%;
    height: 24rem;
  }
}

.about-page {
  flex: 1;
  overflow: auto;
  display: flex;
  flex-direction: column;

  &-inner {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    padding-bottom: 3rem;
  }
}
</style>
