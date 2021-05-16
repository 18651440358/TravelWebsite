<template>
<!--  下拉菜单-->
  <transition name="dropdown">
    <ul class="zc-dropdown-menu" v-show="showMenu" :style="style">
      <slot></slot>
    </ul>
  </transition>
</template>

<script>
import pop from '@/util/floating'
export default {
  name: "zc-dropdown-menu",
  componentName: "ZcDropdownMenu",
  mixins: [pop],
  data() {
    return {
      // 下拉框显示
      showMenu: false,
    }
  },
  mounted() {
    // 初始化
    this.initialize();
  },
  methods: {
    // 初始化
    initialize() {
      // 获取触发器位置
      this.trigger = this.$parent.$el.children[0]
      this.dropdown = this.$el
      document.body.appendChild(this.$el)

      // 注册事件
      this.$on("visible", val => {
        this.showMenu = val
        val && this.$emit("position",val);
      })

      this.$on("position", val => {
        this.$nextTick(() => {
          val && this.position(this.trigger, this.dropdown)
        })
      })
      //实现滑动滚动条时，下拉框能跟随按钮一起滑动定位
      this.scrollHandle(this.trigger, () => {
        this.$nextTick(() => {
          this.showMenu && this.position(this.trigger, this.dropdown)
        })
      })
    },
  },
  computed: {
    style() {
      return {
        position: 'absolute',
        zIndex: '100',
        top: `${this.dropdownTop}px`,
        left: `${this.dropdownLeft}px`
      }
    }
  },
  destroyed() {
    if(this.$el) {
      document.body.removeChild(this.$el)
    }
  }
}
</script>

<style scoped>
  .zc-dropdown-menu{
    padding: 5px 0;
  }
  .dropdown-enter-active,.dropdown-leave-active{
    opacity: 1;
    -webkit-transform: scaleY(1);
    transform: scaleY(1);
    -webkit-transition: opacity .3s cubic-bezier(.23, 1, .32, 1), -webkit-transform .3s cubic-bezier(.23, 1, .32, 1);
    transition: opacity .3s cubic-bezier(.23, 1, .32, 1), -webkit-transform .3s cubic-bezier(.23, 1, .32, 1);
    transition: transform .3s cubic-bezier(.23, 1, .32, 1), opacity .3s cubic-bezier(.23, 1, .32, 1);
    transition: transform .3s cubic-bezier(.23, 1, .32, 1), opacity .3s cubic-bezier(.23, 1, .32, 1), -webkit-transform .3s cubic-bezier(.23, 1, .32, 1);
    -webkit-transform-origin: center top;
    transform-origin: center top;
  }
  .dropdown-enter,
  .dropdown-leave-active {
    opacity: 0;
    -webkit-transform: scaleY(0);
    transform: scaleY(0)
  }
</style>
