<template>
  <transition name="dropdown" @after-leave="doDestroy">
    <ul class="zc-suggest-menu" v-show="showPopper" :style="style">
      <vue-scroll ref="scroll" :ops="ops">
        <li v-if="parent.loading || parent.querySearch.length === 0" class="loading-container">
          <i class="fi-br-spinner-alt"></i>
        </li>
        <slot v-else></slot>
      </vue-scroll>
    </ul>
  </transition>
</template>

<script>
import VueScroll from 'vuescroll'
import floating from '@/util/floating'
export default {
  name: "ZcSuggestItem",
  componentName: 'ZcSuggestItem',
  components: {VueScroll},
  mixins: [floating],
  props: {

  },
  data() {
    return {
      dropdownWidth: 0,
      parent: this.$parent,
      showPopper: false,
      ops: {
        vuescroll: {

        },
        scrollPanel: {
          maxHeight: 280,
        },
        rail: {},
        bar: {
          background: '#e2ebf3',
        }
      },
    }
  },
  mounted() {
    // 初始化
    this.init();
  },
  methods: {
    // 初始化
    init() {
      this.trigger = this.$parent.$el.children[0]
      this.dropdown = this.$el

      // 获取宽度
      this.dropdownWidth = this.trigger.getBoundingClientRect().width

      // 注册事件
      this.$on("visible", val => {
        this.$refs.scroll.ops.scrollPanel.maxHeight = 280
        if(val)
          document.body.appendChild(this.$el)
        this.$refs.scroll.refresh()
        this.showPopper = val
        val && this.$emit("position",val);
      })
      this.$on("position", val => {
        this.$nextTick(() => {
          val && this.position(this.trigger, this.dropdown)
        })
      })

    },
    doDestroy() {
      if(this.$el) {
        this.$refs.scroll.destroy()
        document.body.removeChild(this.$el)
      }
    }
  },
  computed: {
    style() {
      return {
        width: `${this.dropdownWidth}px`,
        position: 'absolute',
        zIndex: '100',
        top: `${this.dropdownTop}px`,
        left: `${this.dropdownLeft}px`
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../assets/style/theme/_handle.scss";
  .zc-suggest-menu{
    margin-top: 5px;
    padding: 8px 0;
    @include bgColor(defaultBackground);
    @include box-shadow(cardBoxShadow);
    border-radius: .7rem;
    overflow: hidden;
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

// loading
.loading-container{
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.loading-container i{
  @include fontColor(primary);
  animation: loading 3s infinite linear;
  transform-origin: center center;
}
@keyframes loading {
  0%{
    transform: rotate(0deg);
  }
  100%{
    transform: rotate(-360deg);
  }
}
</style>
