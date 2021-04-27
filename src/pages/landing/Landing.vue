<template>
<!-- 系统着落页 -->
  <div class="zc-page-landing">
<!--    header部分-->
    <header>
<!--      导航-->
      <zc-nav></zc-nav>
    </header>
  </div>
</template>

<script>
import ZcNav from "@/component/nav/nav";
export default {
  name: "zc-page-landing",
  components: {ZcNav}
}
</script>

<style scoped lang="scss">
@import "../../assets/style/theme/_handle.scss";
  // 着落页
  .zc-page-landing{
    width: 100vw;
    @include bgColor(lightBackground);
  }
  // header部分
  header{
    width: 100vw;
    height: 100vh;
  }
</style>
