<template>
  <div class="hello">
    <el-row>
      <el-col :span="2">
        <h3 id="h">{{ testMsg }}</h3>
      </el-col>
      <el-col :span="2">
        <el-button type="primary" @click="changeTxt">change</el-button>
      </el-col>
    </el-row>
  </div>
</template>
 
<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      testMsg: "原始值",
    };
  },
  methods: {
    changeTxt() {
      let that = this;
      that.testMsg = "修改后的文本值"; //vue数据改变，改变dom结构
      let domTxt = document.getElementById("h").innerText; //后续js对dom的操作
      console.log(domTxt); //输出可以看到vue数据修改后DOM并没有立即更新，后续的dom都不是最新的
    
      that.$nextTick(function () {
        //使用vue.$nextTick()方法可以dom数据更新后延迟执行
        let domTxt = document.getElementById("h").innerText;
        console.log(domTxt); //输出可以看到vue数据修改后并没有DOM没有立即更新，
        if (domTxt === "原始值") {
          console.log("文本data被修改后dom内容没立即更新");
        } else {
          console.log("文本data被修改后dom内容被马上更新了");
        }
      });
    },
  },
};
</script>
 