<template>
  <div class="zc-room-card-detail">
<!--    顶部-->
    <div class="room-content">
<!--      头像-->
      <div class="room-portrait">
        <img :src="portrait">
<!--        点赞-->
        <div class="heart" @click="isHeart=!isHeart">
          <i v-show="!isHeart" class="fi-rr-heart"></i>
          <i v-show="isHeart" class="fi-sr-heart isHeart"></i>
        </div>
      </div>
<!--      内容-->
      <div class="room-container">
        <h3 v-if="$i18n.locale === 'zh-CN'">{{title}}</h3>
        <h3 v-if="$i18n.locale === 'en_US'">{{titleEn}}</h3>
<!--        状态-->
        <div class="room-box">
          <span v-if="type === 1" class="room-type">{{$t('type')[0]}}</span>
          <span v-if="type === 2" class="room-type">{{$t('type')[1]}}</span>
          <span v-if="type === 3" class="room-type">{{$t('type')[2]}}</span>
          <span class="star-box">
            <i class="fi-sr-star"></i>
            <i class="fi-sr-star"></i>
            <i class="fi-sr-star"></i>
            <i class="fi-sr-star"></i>
            <i class="fi-sr-star"></i>
          </span>
          <span class="room-score">{{score.toFixed(1)}}</span>
          <span class="reviews">{{$t('reviews')[0]}}&nbsp;&nbsp;({{reviews}} {{$t('reviews')[1]}})</span>
        </div>
<!--        位置-->
        <div class="room-state">
          <i class="fi-br-marker"></i>
          <span>{{distanceCenter.toFixed(1)}}</span>
          <span v-html="$t('distanceCenter')"></span>
        </div>
<!--        房间-->
        <ul class="rooms">
          <li>
            <div class="left">
              <h3>{{$t('book-title')}}</h3>
            </div>
            <div class="right">
              <span><font v-if="$i18n.locale==='zh-CN'">¥</font><font v-else>$</font>{{price(bookPrice)}}<font class="util" style="font-size: 12px;">{{$t('night')}}</font></span>
              <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                  <rect x="0" y="0" width="24" height="24"/>
                  <circle fill="#0080FF" cx="12" cy="12" r="10"/>
                  <path d="M7.96323356,15.1775211 C7.62849853,15.5122561 7.08578582,15.5122561 6.75105079,15.1775211 C6.41631576,14.842786 6.41631576,14.3000733 6.75105079,13.9653383 L11.8939067,8.82248234 C12.2184029,8.49798619 12.7409054,8.4866328 13.0791905,8.79672747 L18.2220465,13.5110121 C18.5710056,13.8308912 18.5945795,14.3730917 18.2747004,14.7220508 C17.9548212,15.0710098 17.4126207,15.0945838 17.0636617,14.7747046 L12.5257773,10.6149773 L7.96323356,15.1775211 Z" fill="#fff" fill-rule="nonzero" transform="translate(12.500001, 12.000001) rotate(-270.000000) translate(-12.500001, -12.000001) "/>
                </g>
              </svg>
            </div>
          </li>
          <li>
            <div class="left">
              <h3>{{$t('lowest-title')}}</h3>
              <span style="font-size: 13px;font-weight: 600" class="util">{{$t('lowest')}}</span>
            </div>
            <div class="right"><span><font v-if="$i18n.locale==='zh-CN'">¥</font><font v-else>$</font>{{price(lowestPrice)}}<font class="util" style="font-size: 12px;">{{$t('night')}}</font></span>
              <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                  <rect x="0" y="0" width="24" height="24"/>
                  <circle fill="#0080FF" cx="12" cy="12" r="10"/>
                  <path d="M7.96323356,15.1775211 C7.62849853,15.5122561 7.08578582,15.5122561 6.75105079,15.1775211 C6.41631576,14.842786 6.41631576,14.3000733 6.75105079,13.9653383 L11.8939067,8.82248234 C12.2184029,8.49798619 12.7409054,8.4866328 13.0791905,8.79672747 L18.2220465,13.5110121 C18.5710056,13.8308912 18.5945795,14.3730917 18.2747004,14.7220508 C17.9548212,15.0710098 17.4126207,15.0945838 17.0636617,14.7747046 L12.5257773,10.6149773 L7.96323356,15.1775211 Z" fill="#fff" fill-rule="nonzero" transform="translate(12.500001, 12.000001) rotate(-270.000000) translate(-12.500001, -12.000001) "/>
                </g>
              </svg>
            </div>
          </li>
        </ul>
      </div>
    </div>
<!--    底部-->
    <div class="room-book">
      <div class="room-left">
        <h4>{{$t('discount')[0]}}</h4>
        <div class="cancellation">
          <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="20px" height="20px" viewBox="0 0 24 24" version="1.1">
            <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
              <rect x="0" y="0" width="24" height="24"/>
              <circle fill="#000000" opacity="0.3" cx="12" cy="12" r="10"/>
              <path d="M16.7689447,7.81768175 C17.1457787,7.41393107 17.7785676,7.39211077 18.1823183,7.76894473 C18.5860689,8.1457787 18.6078892,8.77856757 18.2310553,9.18231825 L11.2310553,16.6823183 C10.8654446,17.0740439 10.2560456,17.107974 9.84920863,16.7592566 L6.34920863,13.7592566 C5.92988278,13.3998345 5.88132125,12.7685345 6.2407434,12.3492086 C6.60016555,11.9298828 7.23146553,11.8813212 7.65079137,12.2407434 L10.4229928,14.616916 L16.7689447,7.81768175 Z" fill="#000000" fill-rule="nonzero"/>
            </g>
          </svg>
          <span>{{$t('discount')[1]}}</span>
        </div>
      </div>
      <div class="room-right">
        <div class="price">
          <div class="number">
            <span style="display: inline-flex;align-items: flex-end"><font style="margin-right: 3px;font-weight: 600;font-size: 14px" v-if="$i18n.locale==='zh-CN'">¥</font><font style="margin-right: 3px;font-weight: 600;" v-else>$</font>{{price(discountPrice)}}</span>
            <span style="font-size: 12px;font-weight: 500;opacity: .8">{{$t('night')}}</span>
          </div>
          <span class="pay">{{$t('pay')}}</span>
        </div>
        <div class="book">{{$t('book-now')}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "zc-room-card-detail",
  data() {
    return {
      isHeart: false
    }
  },
  props: {
    portrait: {
      type: String,
      default: require('@/assets/images/hotels/hotel_default.jpg')
    },
    title: String,
    titleEn: String,
    type: Number,
    score: Number,
    reviews: String,
    distanceCenter: Number,
    bookPrice: Number,
    lowestPrice: Number,
    discountPrice: Number,
  },
  methods: {
    price(bookPrice){
      var _this = this;
      if(this.$i18n.locale === 'zh-CN')
        return bookPrice.toFixed(0)
      else
        return  (bookPrice * _this.$store.state.exchangeRate.USA).toFixed(0)
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../assets/style/theme/_handle.scss";
// 容器
.zc-room-card-detail{
  @include box-shadow(cardBoxShadow);
  @include bgColor(defaultBackground);
  border-radius: .7rem;
  padding: 15px;
}
.room-content{
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  margin-bottom: 15px;
}
// 预定
.room-book{
  @include bgColor(lightBackground);
  padding: 15px;
  border-radius: .7rem;
}
// 头像
.room-portrait,.room-portrait img{
  width: 210px;
  height: 210px;
  border-radius: .7rem;
  position: relative;
  display: block;
}
.room-portrait img{
  object-fit: cover;
  object-position: center center;
}
.room-container{
  padding-left: 15px;
  flex: 1;
}
.heart{
  @include bgColor(defaultBackground);
  width: 28px;
  height: 28px;
  border-radius: 5px;
  @include box-shadow(primaryBoxShadow);
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 10px;
  left: 10px;
  cursor: pointer;
  line-height: 1;
}
.isHeart{
  @include fontColor(danger);
}
// 标题
.room-container h3{
  font-weight: 600;
}
.room-box{
  display: flex;
  align-items: center;
}
.room-type{
  font-size: 13px;
  font-weight: 600;
  margin-right: 10px;
}
// 星
.star-box{
  display: inline-flex;
  align-items: center;
  line-height: 1;
  white-space: nowrap;
}
.star-box i{
  @include fontColor(warning);
  font-size: 12px;
  margin-right: 3px;
}
.room-score{
  margin-left: 5px;
  font-weight: 600;
  font-size: 13px;
}
.reviews{
  @include fontColor(grayText);
  font-size: 13px;
  margin-left: 10px;
  font-weight: 600;
}
.room-state{
  @include fontColor(regularText);
  display: flex;
  align-items: center;
  font-size: 13px;
}
.room-state i{
  margin-right: 10px;
}
.room-state span{
  font-weight: 600;
  margin-right: 5px;
  transform: translate3d(0,2px,0);
}
// 底部
.room-book{
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.room-left{
  display: flex;
  flex-direction: column;
}
.room-left h4{
  font-weight: 600;
  font-size: 16px;
}
.cancellation{
  display: inline-flex;
  align-items: center;
  line-height: 1;
  @include fontColor(primary);
  font-weight: 600;
}
.cancellation span{
  margin-left: 5px;
  font-size: 13px;
}
.cancellation svg g [fill]{
  @include fill(primary);
}
// 右侧
.room-right{
  display: flex;
  align-items: stretch;
}
.price{
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}
.book{
  @include bgColor(primary);
  @include box-shadow(buttonShadow);
  padding: 10px 30px;
  color: #fff;
  font-size: 15px;
  font-weight: 600;
  border-radius: 50px;
  line-height: 1;
  display: inline-flex;
  align-items: center;
  margin-left: 15px;
  cursor: pointer;
}
.number{
  font-size: 20px;
  @include fontColor(primary);
  font-weight: 800;
  line-height: 1;
}
.pay{
  font-size: 13px;
  @include fontColor(grayText);
  font-weight: 600;
}
// 房间
.rooms li{
  padding: 10px;
  border: 1px solid #f2f5fb;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
  border-radius: .5rem;
  cursor: pointer;
  @include bgColor(defaultBackground);
  transition: all .3s;
}
.rooms li:hover{
  @include box-shadow(cardBoxShadow);
}
.rooms .left{
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
}
.left h3{
  font-weight: 600;
  font-size: 15px;
}
.right{
  display: inline-flex;
  align-items: center;
}
.right span{
  font-weight: 600;
}
.util{
  @include fontColor(grayText);
}
.right svg{
  margin-left: 15px;
}
.right svg g path [fill]{
  @include fill(defaultBackground);
}
</style>

<i18n>
{
  "zh-CN": {
    "type": ["酒店","名宿","居民楼"],
    "reviews": ["好评居多","评论"],
    "distanceCenter": " 千米 距离市中心",
    "discount": ["今日特价房","免费取消"],
    "book-now": "现在预定",
    "pay": "在酒店付款",
    "night": " / 一晚",
    "book-title": "精装大床房",
    "lowest-title": "精装双人房",
    "lowest": "豪华套房"
  },
  "en_US": {
    "type": ["Hotel","Famous","Dwelling"],
    "reviews": ["Excellent","reviews"],
    "distanceCenter": " kilometes to City center",
    "discount": ["Marriott Bonvoy Rate","Free cancellation"],
    "book-now": "Book now",
    "pay": "Pay at the Hotel",
    "night": " / night",
    "book-title": "Booking.com",
    "lowest-title": "Lowest price",
    "lowest": "AC Hotels"
  }
}
</i18n>
