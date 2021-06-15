<template>
  <div>
    <input
      class="inputClass"
      type="text"
      v-model="text"
      @click="handleClick"
      v-clickoutside="handleClose"
    />
    <!-- 下拉框选项 -->
    <ul v-show="isShow" class="ulClass">
      <li
        style="list-style-type:none;width:100%"
        v-for="(item,i) in arr"
        :class="{liClass:i===index}"
        :key="i"
        @click="handleClickLi(item,i)"
      >{{item}}</li>
    </ul>
  </div>
</template>
<script>
export default {
  // 自定义指令监听鼠标点击事件
  directives: {
    clickoutside: {
      bind(el, binding) {
        function documentHandler(e) {
          if (el.contains(e.target)) {
            return false;
          }
          if (binding.expression) {
            binding.value(e);
          }
        }
        el.__vueClickOutside__ = documentHandler;
        document.addEventListener("click", documentHandler);
      },
      unbind(el) {
        document.removeEventListener("click", el.__vueClickOutside__);
        delete el.__vueClickOutside__;
      }
    }
  },
  data() {
    return {
      text: "first",
      arr: ["first", "second", "three"],
      isShow: false,
      index: 0
    };
  },
  created() {},
  mounted() {},
  methods: {
    // 控制是否出现下拉框
    handleClick() {
      this.isShow = !this.isShow;
    },
    // 点击选项后隐藏下拉框，并更换input绑定值
    handleClickLi(item, index) {
      this.text = item;
      this.isShow = false;
      this.index = index;
      alert(item);
    },
    // 自定义指令监听方法，点击空白页面隐藏选项
    handleClose() {
      if (this.isShow) {
        this.isShow = !this.isShow;
      }
    }
  }
};
</script>

<style lang='less' scoped>
.liClass {
  font: block;
  background: #b5e0ff;
}
.ulClass {
  width: 185px;
  background: white;
  padding: 0;
  margin: 0;
}
.inputClass {
  width: 180px;
  border: 1px solid transparent;
}
.inputClass:focus {
  border: 1px solid #58a6e7;
  outline: 0;
}
</style>