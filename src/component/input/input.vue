<template>
  <div class="zc-input-container">
<!--    单行输入-->
    <input v-if="type !== 'textarea'" :type="type"
           :value="value"
           @input="$emit('input', $event.target.value)"
           @focus="$emit('focus', $event.target.value)"
           @blur="$emit('blur', $event.target.value)"
           @change="$emit('change', $event.target.value)"
           :placeholder="placeholder"
           :readonly="readOnly"
           :class="[
               'zc-input',
               {
                  'is-disabled': disabled,
                  'bold': bold,
                  'no-filling': noFilling,
                  'theme-classic': theme === 'classic',
                  'theme-transparent': theme === 'transparent',
               }
               ]"
/>
<!--    多文本输入-->
    <textarea v-if="type === 'textarea'"
              :value="value"
              @input="$emit('input', $event.target.value)"
              @focus="$emit('focus', $event.target.value)"
              @blur="$emit('blur', $event.target.value)"
              @change="$emit('change', $event.target.value)"
              :placeholder="placeholder"
              :readonly="readOnly"
              :class="[
               'zc-input',
               {
                  'is-disabled': disabled,
                  'bold': bold,
                  'theme-classic': theme === 'classic',
                  'theme-transparent': theme === 'transparent',
               }
               ]"
    ></textarea>
  </div>
</template>

<script>
export default {
  name: "zc-input",
  model: {
    prop: 'value',
    event: 'input'
  },
  mounted() {

  },
  data() {
    return {

    }
  },
  props: {
    readOnly: {
      type: Boolean,
      default: false
    },
    value: String,
    type: {
      type: String,
      default: "text",
      validator: function (val){
        return ['text','password','textarea'].includes(val);
      }
    },
    theme: {
      type: String,
      default: "classic",
      validator: function (val){
        return ['classic','transparent'].includes(val);
      }
    },
    placeholder: String,
    disabled: {
      type: Boolean,
      default: false
    },
    bold: {
      type: Boolean,
      default: false
    },
    noFilling: {
      type: Boolean,
      default: false
    },
  }
}
</script>

<style scoped lang="scss">
  @import "../../assets/style/theme/_handle.scss";
  // 容器初始化
  .zc-input-container input,.zc-input-container textarea{
    width: 100%;
  }
  // 输入框
  .zc-input{
    width: 100%;
    font-size: 14px;
    line-height: 14px;
    height: 40px;
    padding: 10px 16px;
    outline: none;
    border-radius: 8px;
    //line-height: 24px;
    appearance: none;
    font-family: 'poppins',"SourceHanSans",Helvetica,sans-serif;
  }
  .zc-input.no-filling{
    padding: 0!important;
  }
  .zc-input.bold{
    font-weight: 800!important;
  }
  .zc-input::placeholder{
    font-family: 'poppins',"SourceHanSans",Helvetica,sans-serif !important;
  }
  // 经典
  .zc-input.theme-classic{
    border-width: 1px;
    border-style: solid;
    border-color: transparent;
    @include bgColor(grayBackground);
    transition: background-color 200ms ease,
                outline 200ms ease,
                color 200ms ease,
                box-shadow 200ms ease,
                -webkit-box-shadow 200ms ease;
  }
  .zc-input.theme-classic:hover{
    box-shadow: 0 0 0 4px rgba(#0080FF,.3);
    @include bgColor(defaultBackground);
    border-color: #dfdfdf;
  }
  .zc-input.theme-classic:focus{
    box-shadow: 0 0 0 4px rgba(#0080FF,.2);
    @include border-color(primary);
    @include bgColor(defaultBackground);
  }
  // 透明主题
  .zc-input.theme-transparent{
    border: none;
  }
  .zc-input-container textarea.zc-input{
    padding: 16px;
    resize: vertical;
    height: 108px;
  }

</style>
