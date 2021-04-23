<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
  // 去除浏览器默认样式
  body{
    width: 100vw;
  }
  a{
    text-decoration: none;
    cursor: pointer;
  }
  h1,h2,h3,h4,h5,h6,p{
    margin: 0;
  }
  // 统一样式
  *,*:before,*:after{
    box-sizing: border-box;
  }
</style>
