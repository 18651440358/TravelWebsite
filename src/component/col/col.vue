<template>
<!-- 行容器 -->
  <div class="zc-col">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "zc-col",
  props: {
    grid: {
      type: Number,
      default: 24
    }
  }
}
</script>

<style scoped>

</style>
