<template>
<!--  目的地-->
  <div class="card-destination">
<!--    封面-->
    <div class="destination-cover">
      <img :src="coverSrc"  :alt="title"/>
    </div>
<!--    文字-->
    <div class="destination-content swiper-no-swiping">
      <h3 v-if="$i18n.locale === 'zh-CN'">{{title}}</h3>
      <h3 v-else>{{titleEn}}</h3>
      <div class="hotel-content">
        <span class="number">{{ hotelNumbers }}</span>
        <span>{{ $t('hotel') }} - </span>
        <div class="avg">
          <span>{{$t('avg')}}</span>
          <span>{{price}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "card-destination",
  props: {
    src: String,
    title: String,
    titleEn: String,
    hotels: Number,
    avg: Number,
  },
  computed: {
    coverSrc(){
      var ImgObj = new Image();
      ImgObj.src = this.src;
      if(ImgObj.fileSize > 0 || (ImgObj.width > 0 && ImgObj.height > 0))
        return this.src;
      else
        return require("./static/default.jpg");

    },
    hotelNumbers(){
      let num = this.hotels
      var result = '', counter = 0;
      num = (num || 0).toString();
      for (var i = num.length - 1; i >= 0; i--) {
        counter++;
        result = num.charAt(i) + result;
        if (!(counter % 3) && i !== 0) { result = ',' + result; }
      }
      return result;
    },
    price(){
      let _this = this;
      if(this.$i18n.locale === 'zh-CN')
        return "¥" + _this.avg.toFixed(0)
      else
        return "$" + (_this.avg * _this.$store.state.exchangeRate.USA).toFixed(0)
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../assets/style/theme/_handle.scss";
  .destination-cover{
    width: 100%;
    padding-top: 75%;
    position: relative;
    border-radius: 1rem;
    overflow: hidden;
    @include box-shadow(cardBoxShadow);
  }
  .destination-cover > img{
    width: 100%;
    height: 100%;
    position: absolute;
    object-position: center;
    object-fit: cover;
    top: 0;
  }
  // 内容
  .destination-content{
    margin-top: 10px;
  }
  .destination-content h3{
    font-size: 14px;
    font-weight: 700;
  }
  .hotel-content{
    display: flex;
    align-items: center;
    @include fontColor(regularText);
    font-size: 12px;
    font-weight: 500;
  }
  .hotel-content .number{
    margin-right: 5px;
  }
  .hotel-content .avg{
    font-weight: 600;
    margin-left: 3px;
    @include fontColor(grayText);
  }
</style>

<i18n>
{
  "zh-CN": {
    "hotel": "家酒店",
    "avg": "平均"
  },
  "en_US": {
    "hotel": "Hotels",
    "avg": "Avg."
  }
}
</i18n>
