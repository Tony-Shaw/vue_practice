<template>
  <vue-json-editor
    v-model="resultInfo"
    :showBtns="false"
    :mode="'code'"
    lang="zh"
    style="height: 100%"
    @json-change="onJsonChange"
    @json-save="onJsonSave"
  />
</template>
<script>
import vueJsonEditor from "vue-json-editor";

export default {
  data() {
    return {
      resultInfo: "",
    };
  },

  components: {
    vueJsonEditor,
  },

  methods: {
    onJsonChange(value) {
      console.log("value:", value);
    },
    onJsonSave(value) {
      console.log("value:", value);
    },
  },
};
</script>

<style>
/* jsoneditor右上角默认有一个链接,加css去掉了 */
.jsoneditor-poweredBy {
  display: none;
}
.jsoneditor-vue {
  height: 100%;
}
</style>