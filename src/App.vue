<template>
  <div id="app" v-cloak>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted() {
    // 检测主题
    this.checkTheme();

    this.$i18n.locale = "en_US"
  },
  methods: {
    // 检测主题
    checkTheme() {
      var theme = localStorage.getItem("theme");
      window.document.documentElement.setAttribute(
          "theme",
          theme ? theme : "light"
      );
    }
  }
}
</script>

<style lang="scss">
  @import "./assets/style/theme/_handle.scss";
  [v-cloak]{
    display: none;
  }
  // 去除浏览器默认样式
  body{
    margin: 0;
    padding: 0;
    width: 100vw;
    @include fontColor(primaryText);
    font-family: 'poppins',"SourceHanSans",Helvetica,sans-serif;
    font-weight: 400;
    -webkit-font-smoothing: antialiased;
  }
  a{
    text-decoration: none;
    cursor: pointer;
    @include fontColor(primaryText);
  }
  h1,h2,h3,h4,h5,h6,p{
    margin: 0;
  }
  ul,li{
    list-style: none;
    padding: 0;
  }
  // 统一样式
  *,*:before,*:after{
    box-sizing: border-box;
    outline: none;
  }
  img{
    display: block;
    user-select: none;
  }
</style>
