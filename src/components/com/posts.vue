<template>
  <div>
    <!-- <el-button @click="handleChange">{{value}}</el-button> -->
    <el-button @click="$emit('update:value', 'sync使用方法')">{{value}}</el-button>
    <!-- <el-button @click="$emit('changeValue','sync使用方法')">点我</el-button> -->

  </div>
</template>
<script>
export default {
  props: ["value"],
  data() {
    return {
      message: "Posts"
    };
  },
  created() {},
  mounted() {},
  methods: {
    handleChange() {
      this.$emit("update:value", "sync使用方法");
    }
  }
};
</script>

<style lang='less' scoped>
</style>