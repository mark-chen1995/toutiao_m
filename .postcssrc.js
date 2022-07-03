module.exports = {
  plugins: {
    'postcss-pxtorem': {
      rootValue ({ file }) {
        // vant推荐其组件相对37.5px计算rem，非vant的按照设计稿750px/10
        return file.indexOf('vant') !== -1 ? 37.5 : 75
      },
      propList: ['*']
    }
  }
}
