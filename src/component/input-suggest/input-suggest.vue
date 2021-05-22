<template>
  <div class="zc-input-suggest">
    <zc-input ref="zcInput"
              v-bind="[$props, $attrs]"
              @input="inputHandle"
              @focus="focusHandle"
              @blur="blurHandle"
              @change="$emit('change', $event)"
    ></zc-input>
<!--    弹出框-->
    <zc-suggest-item ref="suggest">
      <li class="suggest-item" v-for="(item,index) in querySearch"
          :key="index"
          @click="select(item)">
        <slot :item="item">
          {{ item[valueKey] }}
        </slot>
      </li>
    </zc-suggest-item>
  </div>
</template>

<script>
import floating from '@/util/floating'
import ZcInput from "@/component/input/input";
import ZcSuggestItem from "@/component/input-suggest/input-suggest-item";
export default {
  name: "zc-input-suggest",
  components: {ZcSuggestItem, ZcInput},
  mixins: [floating],
  model: {
    prop: 'value',
    event: 'input'
  },
  props: {
    value: String,
    loading: {
      type: Boolean,
      default: false
    },
    valueKey: {
      type: String,
      default: 'value'
    },
    suggestions: Array
  },
  computed: {
    querySearch() {
      var suggestions = this.suggestions;
      return this.userValue ? suggestions.filter(this.createFilter(this.userValue)) : suggestions;
    },
  },
  data() {
    return {
      visible: false,
      userValue: ''
    }
  },
  mounted() {
    // 监听选择
    document.addEventListener('click', event => {
      if(!this.$refs.zcInput.$el.contains(event.target) && !this.$refs.suggest.$el.contains(event.target)){
        this.visible && this.hide()
      }
    })

  },
  methods: {
    createFilter(queryString) {
      return (restaurant) => {
        return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },
    inputHandle(event){
     this.$emit('input', event);
     this.userValue = event
     if(event.trim() === '')
       this.hide()
     else
       this.show()
    },
    focusHandle(event) {
      this.$emit('focus', event)
      if(event.trim() === '')
        this.hide()
      else
        this.show()
    },
    blurHandle(event) {
      this.$emit('blur', event)
    },
    // 隐藏
    hide() {
      this.visible = false
    },
    // 显示
    show() {
      this.visible = true
    },
    // 选择
    select(item){
     this.$emit('input', item[this.valueKey]);
     this.$emit('select', item);
      this.visible && this.hide()
    },
  },
  watch: {
    visible(val) {
      this.broadcast(this.$children, "ZcSuggestItem", "visible", [val])
    },
  },
}
</script>

<style scoped lang="scss">
@import "../../assets/style/theme/_handle.scss";
  // 弹窗
  .suggest-item{
    padding: 5px 15px;
    cursor: pointer;
  }
.suggest-item:hover{
  @include bgColor(lightBackground);
}
</style>
