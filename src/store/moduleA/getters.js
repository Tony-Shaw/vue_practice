const getters = {
    userJob: (state) => {
      return `${state.userInfo.job}`
    },
    girlfirendInfo: (state, getters) => {
      const girlfirend = state.girlfirend
      let info = girlfirend.map((item, index) => {
        return `${index + 1}号女友的名字是${item.name}，年龄${item.age}，来自${item.nationality}`
      }).join('，')
      return `一共有${girlfirend.length}个女友,${info},可怕的是他只是一名${getters.userJob}。`
    }
  }
  export default getters;
  
  