<template>
  <div>
    <button
      v-for="(tab, index) in tabs"
      :key="index"
      v-bind:class="['tab-button', { active: currentTab === tab }]"
      @click="currentTab = tab"
    >
      {{ tab }}
    </button>
    <component :is="currentTabComponent" class="tab"></component>
  </div>
</template>
<script>
import Home from "./com/home.vue";
import Posts from "./com/posts.vue";
import Archive from "./com/archive.vue";

export default {
  components: {
    Home,
    Posts,
    Archive,
  },
  data() {
    return {
      currentTab: "Home",
      tabs: ["Home", "Posts", "Archive"],
    };
  },
  created() {},
  async mounted() {
    // let res = await this.$http.get("/");
    // console.log(res);
  },
  computed: {
    currentTabComponent: function () {
      return this.currentTab.toLowerCase();
    },
  },
  methods: {},
};
</script>

<style lang='less' scoped>
</style>