<template>
<!--顶部导航-->
  <nav class="zc-nav">
    <zc-container>
      <div class="nav-content">
<!--        logo-->
        <router-link class="nav-logo" to="/">
          <span>Tootravel</span>
        </router-link>
<!--        导航部分-->
        <h1>{{$t('message')}}</h1>
<!--        头像-->
        <zc-avatar></zc-avatar>
      </div>
    </zc-container>
  </nav>
</template>

<script>
import ZcContainer from "@/component/container/container";
import ZcAvatar from "@/component/avatar/avatar";
export default {
  name: "zc-nav",
  components: {ZcAvatar, ZcContainer}
}
</script>

<style scoped lang="scss">
@import "../../assets/style/theme/_handle.scss";
  // 导航主体
  .nav-content {
    height: 65px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  // logo
  .nav-logo{
    font-weight: bold;
    font-family: "Pattaya";
    font-size: 30px;
    text-shadow: 3px 3px 5px #698096;
  }
</style>

<i18n>
{
  "zh-CN": {
    "message": "Hello World"
  }
}
</i18n>
