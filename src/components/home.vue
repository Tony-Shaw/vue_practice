<template>
  <div class="hello" style="height: 100%">
    <el-container style="height: 100%">
      <el-header>
        <div class="headerDiv">{{ msg }}</div>
      </el-header>
      <el-container>
        <el-aside :width="isCollapse ? '81.5px' : '220px'">
          <div class="toggle-button" @click="toggleCollapse">|||</div>
          <el-menu
            background-color="#333754"
            text-color="#fff"
            active-text-color="#409eff"
            unique-opened
            :collapse="isCollapse"
            :collapse-transition="false"
            router
            :default-active="activePath"
          >
            <!-- 一级菜单 -->
            <el-submenu :index="item.id + ''" v-for="item in menuList" :key="item.id">
              <template slot="title">
                <!-- 一级菜单模板区域 -->
                <i :class="iconsObj[item.id]"></i>
                <span>{{ item.authName }}</span>
              </template>
              <!-- 二级菜单 -->
              <el-menu-item
                :index="'/' + subItem.path"
                v-for="subItem in item.children"
                :key="subItem.id"
                @click="saveNavSate('/' + subItem.path)"
              >
                <!-- 二级菜单模板区域 -->
                <template>
                  <i class="el-icon-menu"></i>
                  <span>{{ subItem.authName }}</span>
                </template>
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main>
          <!-- 路由占位符 -->
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      msg: "Welcome ",
      // 左侧菜单数据
      menuList: [
        {
          id: 125,
          authName: "菜单",
          path: "dynamicComponents",
          children: [
            {
              id: 110,
              authName: "动态组件",
              path: "dynamicComponents",
              children: [],
              order: null
            },
            {
              id: 111,
              authName: "nextTick()",
              path: "nextTick",
              children: [],
              order: null
            },
            // {
            //   id: 112,
            //   authName: "vuexTest",
            //   path: "vuexTest",
            //   children: [],
            //   order: null
            // },
            {
              id: 113,
              authName: "echartsMap",
              path: "echartsMap",
              children: [],
              order: null
            },
             {
              id: 114,
              authName: "面试",
              path: "interview",
              children: [],
              order: null
            },
          ],
          order: 1
        }
      ],
      // 一级图标样式
      iconsObj: {
        125: "iconfont icon-user",
        110: "iconfont icon-tijikongjian",
        111: "iconfont icon-shangpin",
        112: "iconfont icon-danju",
        113: "iconfont icon-baobiao"
      },
      // 左侧菜单是否折叠
      isCollapse: false,
      // 当前激活链接
      activePath: ""
    };
  },
  methods: {
    handleClose() {},
    // 保存激活的链接
    saveNavSate(avtivePath) {
      // window.sessionStorage.setItem('activePath', avtivePath)
      // this.activePath = avtivePath
    },
    // 左侧菜单折叠
    toggleCollapse() {
      this.isCollapse = !this.isCollapse;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less' scoped>
.headerDiv {
  display: flex;
  justify-content: center;
  align-items: center;
  /* 不设置div盒子高度flex垂直居中无法实现 */
  height: 100%;
}
.el-header {
  background-color: #2ab600ab;
  height: 10% !important;
  position: relative;
  width: 100%;
  padding: 0;
  top: 0px;
}
.el-aside {
  // display: block;
  // position: absolute;
  // left: 0;
  // top: 10%;
  // bottom: 0;
  background-color: #333744;
  overflow: hidden;
  .el-menu {
    border-right: none;
  }
}
.el-main {
  background-color: cyan;
  // position: absolute;
  // left: 200px;
  // right: 0;
  // top: 10%;
  // bottom: 0;
  // overflow-y: scroll;
}
.toggle-button {
  color: #fff;
  background-color: #4a5046;
  font-size: 10px;
  line-height: 24px;
  text-align: center;
  letter-spacing: 0.2em;
}
</style>
