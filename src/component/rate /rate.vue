<template>
  <div class="zc-rate">
    <div class="zc-rate-way" ref="way">
<!--      节点-->
      <div @click="selectRate(item)" :class="{'active': item <= value}" :key="index" :style="[{top: '-4px'},{left: wayW / totalScore * (index + 1) + 'px'},{transform: 'translate3d(-50%,0,0)'}]" class="rate-node" v-for="(item,index) in totalScore">{{ item }}</div>
<!--      满足条-->
      <div class="satisfy" :style="satisfyStyle"></div>
<!--      按钮-->
      <div class="current" :style="currentStyle"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "zc-rate",
  model: {
    prop: 'value',
    event: 'rateEvent'
  },
  props: {
    value: Number,
    totalScore: {
      type: Number,
      default: 5
    }
  },
  data() {
    return {
      wayW: 0
    }
  },
  methods: {
    // 初始化
    init() {
      var way = this.$refs.way.getBoundingClientRect()
      this.wayW = way.width
    },
    // 选择
    selectRate(item) {
      this.$emit('rateEvent',item);
    }
  },
  mounted() {
    this.$nextTick(() => {
      // 初始化
      this.init();
    })
  },
  computed: {
    satisfyStyle() {
      return {
        position: 'absolute',
        left: '0px',
        top: '0px',
        width: `${this.wayW / this.totalScore * this.value}px`,
      }
    },
    currentStyle() {
      return {
        position: 'absolute',
        left: '-8px',
        top: '-7px',
        transform: `translate3d(${this.wayW / this.totalScore * this.value}px,0,0)`,
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../assets/style/theme/_handle.scss";
.zc-rate {
  padding-right: 8px;
}
// 滑块
.zc-rate-way{
  width: 100%;
  height: 3px;
  position: relative;
  border-radius: 3px;
  @include bgColor(LightText);
  margin: 10px 0;
}
.rate-node{
  width: 11px;
  height: 11px;
  font-size: 0;
  border-radius: 50%;
  cursor: pointer;
  position: absolute;
  @include bgColor(LightText);
  z-index: 2;
  transition: background-color .3s;
}
.rate-node.active{
  @include bgColor(primary);
}
.current{
  width: 16px;
  height: 16px;
  border: 4px solid;
  @include bgColor(defaultBackground);
  @include border-color(primary);
  border-radius: 50%;
  cursor: pointer;
  will-change: transform;
  z-index: 3;
  transition: transform .3s;
}
// 填充滑块
.satisfy{
  height: 100%;
  border-radius: 5px;
  @include bgColor(primary);
  will-change: width;
  transition: width .3s;
}
</style>
