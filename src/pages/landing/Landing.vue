<template>
<!-- 系统着落页 -->
  <div class="zc-page-landing">
<!--    header部分-->
    <header>
<!--      导航-->
      <zc-nav></zc-nav>
<!--      巨幕-->
      <section class="giant-screen">
        <zc-container>
          <zc-row flex justify="between">
            <zc-col grid="12">
              <div style="height: 200px;background:red;"></div>
            </zc-col>
            <zc-col grid="10">
              <div style="height: 200px;background:red;"></div>
            </zc-col>
          </zc-row>
        </zc-container>
      </section>
    </header>
  </div>
</template>

<script>
import ZcNav from "@/content/nav/nav";
import ZcContainer from "@/component/container/container";
import ZcRow from "@/component/row/row";
import ZcCol from "@/component/col/col";
export default {
  name: "zc-page-landing",
  components: {ZcCol, ZcRow, ZcContainer, ZcNav}
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
    min-width: 1200px;
    min-height: 768px;
  }
  // 巨幕
  .giant-screen{
    margin-top: 30px;
    height: calc(100% - 65px - 30px);
  }
</style>
