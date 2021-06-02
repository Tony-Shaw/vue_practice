import axios from 'axios';

const mutations = {
  ageAdd (state, payload) {
    payload = payload || 1
    state.userInfo.age += payload
  },
  addGirlFirend (state, payload) {
    state.girlfirend.push({ name: payload.name, age: payload.age, nationality: payload.nationality })
  },
  getFirend (state, payload) {
    state.firend = payload
  },
  mutfired (state) { //vuex严禁在mutations里面进行异步操作，严格模式报错，难于调试
    axios.get('/myServer').then(res => {
      if (res.status === 200) {
        state.firend = res.data.data.list
      }
    })
  }
}
export default mutations;

