import axios from 'axios';
const actions = {
  addGirlFirend({ commit, state, getters }, payload) {
    commit('addGirlFirend', payload);
  },
  getFirends(ctx) { //ctx是store下当前module对象
    // axios.get('/myServer').then(res => {
    // if (res.status === 200) {
    // ctx.commit('getFirend', res.data.data.list)
    ctx.commit('getFirend', [{ userName: '袁梦梦', id: 3 }, { userName: '文雪倩', id: 5 }])

    //直接在actions里面也可以修改state，但是不建议，创建store时用严格模式，会报错，不符合vuex单向数据流的规范（只能在mutions里面修改state）
    // ctx.state.firend = res.data.data.list
    // }
    // })
  }
}
export default actions;

