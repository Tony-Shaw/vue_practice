<template>
  <div>
    <button
      v-for="(tab, index) in tabs"
      :key="index"
      v-bind:class="['tab-button', { active: currentTab === tab }]"
      @click="currentTab = tab"
    >{{ tab }}</button>
    <!-- 官网推荐 -->
    <!-- <component :is="currentTabComponent" :value.sync="value" class="tab"></component> -->
    <!-- 官网举例 -->
    <!-- <component
      :is="currentTabComponent"
      :value="value"
      v-on:update:value="value = $event"
      class="tab"
    ></component>-->
    <!-- 另一种 -->
    <!-- <component :is="currentTabComponent" @changeValue="changeValue" :value="value" class="tab"></component> -->
    {{'父组件'+value}}
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
    Archive
  },
  data() {
    return {
      currentTab: "Home",
      tabs: ["Home", "Posts", "Archive"],
      value: "sync"
    };
  },
  created() {},
  async mounted() {
    // let res = await this.$http.get("/");
    // console.log(res);
  },
  computed: {
    currentTabComponent: function() {
      return this.currentTab.toLowerCase();
    }
  },
  methods: {
    // 子组件修改父组件,不使用sync
    changeValue(val) {
      this.value = val;
    }
  }
};
</script>

<style lang='less' scoped>
</style>