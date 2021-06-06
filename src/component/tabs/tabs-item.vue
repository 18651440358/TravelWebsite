<template>
  <li class="zc-tabs-item">
    <slot></slot>
  </li>
</template>

<script>
export default {
  name: "zc-tabs-item",
  componentName: 'ZcTabsItem'
}
</script>

<style scoped lang="scss">
@import "../../assets/style/theme/_handle.scss";
  .zc-tabs-item{
    padding: 0 15px;
    height: 30px;
    line-height: 30px;
    cursor: pointer;
    z-index: 2;
  }
  .zc-tabs-item.active{
    color: #fff;
  }
</style>
