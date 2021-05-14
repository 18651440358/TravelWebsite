<template>
<!--  查询页面骨架-->
  <div class="zc-search-landing">
    <div class="header-nav">
      <zc-nav></zc-nav>
    </div>
<!--    header部分-->
    <header>
      <zc-container>
        <div class="filter-container">
          <div class="filter-top">
          </div>
          <div class="filter-bottom">
            <zc-dropdown>
              <button>按钮1</button>
              <zc-dropdown-menu slot="zc-dropdown-menu">
                22
              </zc-dropdown-menu>
            </zc-dropdown>
          </div>
        </div>
      </zc-container>
    </header>
    <zc-dropdown>
      <button>按钮1</button>
      <zc-dropdown-menu slot="zc-dropdown-menu">
        11
      </zc-dropdown-menu>
    </zc-dropdown>

  </div>
</template>

<script>
import ZcNav from "@/content/nav/nav";
import ZcContainer from "@/component/container/container";
import ZcDropdown from "@/component/dropdown/dropdown";
import ZcDropdownMenu from "@/component/dropdown-menu/dropdown-menu";
export default {
  name: "zc-search-landing",
  components: {ZcDropdownMenu, ZcDropdown, ZcContainer, ZcNav}
}
</script>

<style scoped lang="scss">
@import "../../assets/style/theme/_handle.scss";
// 查询页面骨架
.zc-search-landing{
  width: 100vw;
  @include bgColor(lightBackground);
}
// 顶部导航
.header-nav{
  @include bgColor(defaultBackground);
  box-shadow: 3px 0 50px rgba(0,0,0,.05);
}
// 筛选
.filter-container{
  border-radius: 1rem;
  @include box-shadow(cardBoxShadow);
  @include bgColor(defaultBackground);
  padding: 30px 20px;
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
}
// 上部
.filter-top{

}
</style>
