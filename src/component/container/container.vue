<template>
<!--  容器-->
  <div class="zc-container" :style="style">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "zc-container",
  props: {
    paved: Boolean
  },
  watch: {
    paved: function (val){
      this.paved = val
    }
  },
  computed: {
    style(){
      if(this.paved)
        return {
          maxWidth: '100%!important'
        }
      else
        return {}
    }
  }
}
</script>

<style scoped>
  .zc-container{
    width: 100%;
    margin-right: auto;
    margin-left: auto;
    padding-left: 15px;
    padding-right: 15px;
  }
  @media (min-width: 576px){
    .zc-container{
      max-width: 540px;
    }
  }
  @media (min-width: 768px){
    .zc-container{
      max-width: 720px;
    }
  }
  @media (min-width: 992px){
    .zc-container{
      max-width: 960px;
    }
  }
  @media (min-width: 1200px){
    .zc-container{
      max-width: 1140px;
    }
  }
  @media (min-width: 1400px){
    .zc-container{
      max-width: 1320px;
    }
  }
</style>
