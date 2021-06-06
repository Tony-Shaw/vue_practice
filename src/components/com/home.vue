<template>
  <div>
    <input type="input" @input="handleInput" :value="message" />{{message}}
    <!-- <el-input @input="handleInput" :value="message"></el-input>{{message}} -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      message: "input框"
    };
  },
  created() {},
  mounted() {},
  methods: {
    handleInput(e) {
      this.message = e.target.value;
    }
  }
};
</script>

<style lang='less' scoped>
</style>