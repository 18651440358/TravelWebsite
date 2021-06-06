<template>
  <div class="zc-tabs">
    <vue-scroll :ops="ops">
      <ul ref="tabsRow">
        <slot></slot>
        <!--    背景滑块-->
        <div :style="style" class="zc-tabs-active"></div>
      </ul>
    </vue-scroll>
  </div>
</template>

<script>
import VueScroll from 'vuescroll'
export default {
  name: "zc-tabs",
  components: {VueScroll},
  model: {
    prop: "value",
    event: 'tabsOptions'
  },
  computed: {
    style(){
      return {
        width: `${this.activeW}px`,
        height: `${this.activeH}px`,
        transform: `translate3d(${this.activeX}px,0,0)`,
        position: 'absolute',
        left: '0px',
        top: '0px'
      }
    }
  },
  data() {
    return {
      activeW: 0,
      activeH: 0,
      activeX: 0,
      ops: {
        bar: {
          opacity: 0,
          size: '1px'
        },
        rail: {
          gutterOfSide: '-5px'
        }
      },
      childrens: []
    }
  },
  props: {
    value: String
  },
  mounted() {
    this.init();
    this.initActive();
  },
  methods: {
    init() {
      // 获取自组件
      var childrens = this.$slots.default
      this.childrens = childrens
      childrens.forEach((child,index) => {
        if(child.componentOptions.tag === 'zc-tabs-item') {
          // ---
          child.elm.addEventListener('click', () => {
            this.selectItem(index);
          })
        }
      })
    },
    initActive() {
      let current = this.value
      if(current)
        this.childrens.forEach((item,index) => {
          if(item.elm.innerText === current)
            this.selectItem(index);
        })
      else
        this.selectItem(0);
    },
    selectItem(index) {
      this.childrens.forEach((item) => {item.elm.classList.remove('active')})
      this.childrens[index].elm.classList.add('active')
      var {width,height,left} = this.childrens[index].elm.getBoundingClientRect();
      this.activeW = width;
      this.activeH = height
      this.activeX = left - this.$refs.tabsRow.getBoundingClientRect().left
      this.$emit('tabsOptions',this.childrens[index].elm.innerText)
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../assets/style/theme/_handle.scss";
  .zc-tabs{
    display: inline-block;
    padding: 5px;
    border-radius: 100px;
    @include bgColor(grayBackground);
    @include fontColor(grayText);
    font-size: 14px;
    position: relative;
    overflow: hidden;
  }
  .zc-tabs ul{
    display: inline-flex;
    align-items: center;
    position: relative;
  }
  .zc-tabs-active{
    @include bgColor(primary);
    border-radius: 100px;
    transition: transform .3s;
  }
</style>
