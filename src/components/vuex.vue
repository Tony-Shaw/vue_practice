<template>
  <div>
    <el-card style="width: 550px">
      <div slot="title">
        <el-icon type="ios-film-outline"></el-icon>
        个人信息
      </div>
      <div>
        <p>姓名： {{ userInfo.userName }}</p>
        <p>年龄： {{ userInfo.age }}</p>

        {{ girlfirendInfo }}
      </div>
    </el-card>
    <hr style="margin: 20px 0" />
    <el-button type="success" @click="ageAdd()">增加了一岁</el-button>
    <hr style="margin: 20px 0" />
    <el-button type="success" @click="addAge">增加了两岁(commit)</el-button>
    <hr style="margin: 20px 0" />
    <el-card style="width: 550px">
      <div slot="title">
        <el-icon type="ios-film-outline"></el-icon>
        女友信息：
      </div>
      <div>
        名字：
        <el-input v-model="girlInfo.name"></el-input>
        年龄：
        <el-input-number
          :max="100"
          :min="1"
          v-model="girlInfo.age"
        ></el-input-number>
        国籍：
        <el-input v-model="girlInfo.nationality"></el-input>
      </div>
      <el-button type="success" @click="addGirlFirend(girlInfo)"
        >增加</el-button
      >
      <el-button type="success" @click="addGirlFirend1"
        >增加(dispatch)</el-button
      >
    </el-card>
    <hr style="margin: 20px 0" />

    <el-card style="width: 550px">
      <div slot="title">
        <el-icon type="ios-film-outline"></el-icon>
        朋友信息：
      </div>
      <div>
        <p v-for="item in firend" :key="item.userName">{{ item.userName }}</p>
      </div>
      <el-button type="info" @click="getFirends">获取朋友</el-button>
    </el-card>
  </div>
</template>
<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
export default {
  data() {
    return {
      girlInfo: {
        name: "",
        age: 18,
        nationality: "",
      },
    };
  },

  computed: {
    ...mapGetters(["girlfirendInfo"]),
    ...mapState({
      userInfo: (state) => state.moduleA.userInfo, //使用vuex的modules后一定要指明模块
      firend: (state) => state.moduleA.firend,
    }),
  },
  methods: {
    ...mapActions(["addGirlFirend", "getFirends"]), //this.$store.dispatch('addGirlFirend',payload)
    ...mapMutations(["ageAdd"]), //this.$store.commit('ageAdd',payload)
    // 上面两个辅助函数方法的实质跟下面是一样的，推荐 使用辅助函数
    addAge() {
      this.$store.commit("ageAdd", 2);
    },
    addGirlFirend1() {
      this.$store.dispatch("addGirlFirend", this.girlInfo);
    },
  },
};
</script>