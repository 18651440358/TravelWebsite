<template>
  <!-- 系统着落页 -->
  <div class="zc-page-landing">
    <!--    header部分-->
    <header>
      <!--      导航-->
      <zc-nav></zc-nav>
      <!--      巨幕-->
      <section class="giant-screen">
        <zc-container style="height: 100%">
          <zc-row flex justify="between" style="height: 100%">
            <zc-col :grid="13" style="height: 100%">
              <!--              欢迎-->
              <div class="welcome-content">
                <h3>{{$t('greet')}}{{getUserName}}</h3>
                <p>{{sayHello}}</p>
              </div>
              <!--              title-->
              <div class="title-content">
                <h1 class="title">
                  <span v-html="$t('title')[0]"></span>
                  <span class="highlight" v-html="$t('title')[1]"></span>
                  <span v-html="$t('title')[2]"></span>
                </h1>
                <!--                search-->
                <div class="search-group">
                  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 24 24" version="1.1">
                    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                      <rect x="0" y="0" width="24" height="24"/>
                      <path d="M14.2928932,16.7071068 C13.9023689,16.3165825 13.9023689,15.6834175 14.2928932,15.2928932 C14.6834175,14.9023689 15.3165825,14.9023689 15.7071068,15.2928932 L19.7071068,19.2928932 C20.0976311,19.6834175 20.0976311,20.3165825 19.7071068,20.7071068 C19.3165825,21.0976311 18.6834175,21.0976311 18.2928932,20.7071068 L14.2928932,16.7071068 Z" fill="#000000" fill-rule="nonzero"/>
                      <path d="M11,16 C13.7614237,16 16,13.7614237 16,11 C16,8.23857625 13.7614237,6 11,6 C8.23857625,6 6,8.23857625 6,11 C6,13.7614237 8.23857625,16 11,16 Z M11,18 C7.13400675,18 4,14.8659932 4,11 C4,7.13400675 7.13400675,4 11,4 C14.8659932,4 18,7.13400675 18,11 C18,14.8659932 14.8659932,18 11,18 Z" fill="#000000" fill-rule="nonzero"/>
                    </g>
                  </svg>
                  <input type="text" value="Destination or a hotel name"/>
                  <a class="search">
                    <span>{{$t('search')}}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                        <polygon points="0 0 24 0 24 24 0 24"/>
                        <rect fill="#fff" transform="translate(12.000000, 12.000000) rotate(-90.000000) translate(-12.000000, -12.000000) " x="11" y="5" width="2" height="14" rx="1"/>
                        <path d="M9.70710318,15.7071045 C9.31657888,16.0976288 8.68341391,16.0976288 8.29288961,15.7071045 C7.90236532,15.3165802 7.90236532,14.6834152 8.29288961,14.2928909 L14.2928896,8.29289093 C14.6714686,7.914312 15.281055,7.90106637 15.675721,8.26284357 L21.675721,13.7628436 C22.08284,14.136036 22.1103429,14.7686034 21.7371505,15.1757223 C21.3639581,15.5828413 20.7313908,15.6103443 20.3242718,15.2371519 L15.0300721,10.3841355 L9.70710318,15.7071045 Z" fill="#fff" fill-rule="nonzero" transform="translate(14.999999, 11.999997) scale(1, -1) rotate(90.000000) translate(-14.999999, -11.999997) "/>
                      </g>
                    </svg>
                  </a>
                </div>
                <!--                tonight-->
                <div class="tonight">
                  <span class="highlight">{{$t('tonight')[0]}}</span>
                  <router-link to="/">{{$t('tonight')[1]}}</router-link>
                </div>
              </div>
              <!--              热门景点-->
              <div class="top-destination">
                <div class="title-group">
                  <h3>{{$t('top-destination')}}</h3>
                  <div class="button-group">
                    <a :class="{'active':prevButton}">
                      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                        <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                          <polygon points="0 0 24 0 24 24 0 24"/>
                          <rect fill="#000000" transform="translate(12.000000, 12.000000) scale(-1, 1) rotate(-90.000000) translate(-12.000000, -12.000000) " x="11" y="5" width="2" height="14" rx="1"/>
                          <path d="M3.7071045,15.7071045 C3.3165802,16.0976288 2.68341522,16.0976288 2.29289093,15.7071045 C1.90236664,15.3165802 1.90236664,14.6834152 2.29289093,14.2928909 L8.29289093,8.29289093 C8.67146987,7.914312 9.28105631,7.90106637 9.67572234,8.26284357 L15.6757223,13.7628436 C16.0828413,14.136036 16.1103443,14.7686034 15.7371519,15.1757223 C15.3639594,15.5828413 14.7313921,15.6103443 14.3242731,15.2371519 L9.03007346,10.3841355 L3.7071045,15.7071045 Z" fill="#000000" fill-rule="nonzero" transform="translate(9.000001, 11.999997) scale(-1, -1) rotate(90.000000) translate(-9.000001, -11.999997) "/>
                        </g>
                      </svg>
                    </a>
                    <a :class="{'active':nextButton}">
                      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                        <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                          <polygon points="0 0 24 0 24 24 0 24"/>
                          <rect fill="#000000" transform="translate(12.000000, 12.000000) rotate(-90.000000) translate(-12.000000, -12.000000) " x="11" y="5" width="2" height="14" rx="1"/>
                          <path d="M9.70710318,15.7071045 C9.31657888,16.0976288 8.68341391,16.0976288 8.29288961,15.7071045 C7.90236532,15.3165802 7.90236532,14.6834152 8.29288961,14.2928909 L14.2928896,8.29289093 C14.6714686,7.914312 15.281055,7.90106637 15.675721,8.26284357 L21.675721,13.7628436 C22.08284,14.136036 22.1103429,14.7686034 21.7371505,15.1757223 C21.3639581,15.5828413 20.7313908,15.6103443 20.3242718,15.2371519 L15.0300721,10.3841355 L9.70710318,15.7071045 Z" fill="#000000" fill-rule="nonzero" transform="translate(14.999999, 11.999997) scale(1, -1) rotate(90.000000) translate(-14.999999, -11.999997) "/>
                        </g>
                      </svg>
                    </a>
                  </div>
                </div>
                <swiper class="destinations">
                  <swiper-slide>
                    <div class="destination-item">
                      <card-destination title="Hotels in India"
                                        title-en="Hotels in India"
                                        :src="''"
                                        :hotels="3000"
                                        :avg="300"></card-destination>
                    </div>
                  </swiper-slide>
                </swiper>
              </div>
            </zc-col>
            <zc-col :grid="9" style="height: 100%">
              <div class="map-container">

              </div>
            </zc-col>
          </zc-row>
        </zc-container>
      </section>
    </header>
  </div>
</template>

<script>
import destinations from '@/data/destinations';
import ZcNav from "@/content/nav/nav";
import ZcContainer from "@/component/container/container";
import ZcRow from "@/component/row/row";
import ZcCol from "@/component/col/col";
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/swiper-bundle.css';
import CardDestination from "@/content/card-destination/card-destination";
export default {
  name: "zc-page-landing",
  components: {CardDestination, ZcCol, ZcRow, ZcContainer, ZcNav, Swiper, SwiperSlide},
  computed: {
    sayHello(){
      let hello = 0
      const time = new Date().getHours();
      if(time >= 6)
        hello = 1
      else if(time >= 12)
        hello = 2
      else if(time >= 19)
        hello = 3
      else
        hello = 4
      return this.$t('hello')[hello];
    },
    getUserName(){
      return this.$store.state.count || this.$t('defaultName')
    }
  },
  data() {
    return {
      // 上一个
      prevButton: false,
      // 下一个
      nextButton: true,
    }
  },
  mounted() {
    console.log(destinations);
  }
}
</script>

<style scoped lang="scss">

@import "../../assets/style/theme/_handle.scss";
// 着落页
.zc-page-landing{
  width: 100vw;
  @include bgColor(lightBackground);
}
// header部分
header{
  width: 100vw;
  height: 100vh;
  min-width: 1200px;
  min-height: 768px;
  padding-bottom: 30px;
}
// 巨幕
.giant-screen{
  margin-top: 30px;
  height: calc(100% - 65px - 30px);
}
// 欢迎
.welcome-content h3{
  font-size: 1.2rem;
}
.welcome-content p{
  font-weight: 500;
  @include fontColor(regularText);
}
// title
.title-content{
  padding-top: 50px;
}
.title{
  font-size: 48px;
}
.title .highlight{
  @include fontColor(primary);
}
// search
.search-group{
  margin-top: 30px;
  position: relative;
}
.search-group > svg{
  position: absolute;
  top: 50%;
  left: 30px;
  transform: translate3d(0,-50%,0);
  z-index: 2;
}
.search-group > svg g [fill]{
  @include fill(grayText);
  opacity: .5;
}
.search-group input{
  width: 100%;
  background: #fff;
  height: 80px;
  border-radius: 40px;
  border: none;
  padding-left: 80px;
  padding-right: 200px;
  font-size: 20px;
  @include fontColor(LightText);
  @include box-shadow(cardBoxShadow);
}
.search{
  position: absolute;
  top: 50%;
  transform: translate3d(0,-50%,0);
  right: 7px;
  height: 66px;
  border-radius: 33px;
  width: 180px;
  @include bgColor(primary);
  display: flex;
  align-items: center;
  justify-content: center;
}
.search span{
  color: #fff;
  font-weight: 500;
  margin-right: 10px;
}
// tonight
.tonight{
  margin-top: 20px;
  font-size: 14px;
  font-weight: 600;
  @include transition(150ms);
}
.tonight .highlight{
  @include fontColor(LightText);
  margin-right: 10px;
}
.tonight a:hover{
  @include fontColor(primary);
  text-decoration: underline;
}
// 热门景点
.top-destination{
  margin-top: 30px;
}
.title-group{
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.title-group a{
  padding: .5rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: .5rem;
  @include transition(150ms);
}
.title-group a svg g [fill]{
  @include fill(LightText);
}
.title-group a:hover{
  @include bgColor(lightBackground);
}
.title-group a:first-child{
  margin-right: .3rem;
}
.title-group a.active svg g [fill]{
  @include fill(primaryText);
}
// 景点
.destinations{
  margin-top: 10px;
}
.destination-item{
  width: 170px;
  @include box-shadow(cardBoxShadow);
}

// 地图容器
.map-container{
  height: 100%;
  @include bgColor(primary);
  border-radius: 2rem;
}
</style>

<i18n>
{
  "zh-CN": {
    "greet": "您好 ",
    "defaultName": "旅行家，",
    "hello": ["早上好！","上午好！","中午好！","下午好！","晚上好！"],
    "title": ["","旅行 ","触手可及<br>现在开始你的假期"],
    "search": "Let's Go",
    "tonight": ["或者","今晚在附近寻找酒店？"],
    "top-destination": "热门目的地"
  },
  "en_US": {
    "greet": "Hey ",
    "defaultName": "Traveler,",
    "hello": ["Good morning","Good morning","Good noon","Good afternoon","Good evening"],
    "title": ["","Where ","are you<br/>going to go?"],
    "search": "Let's Go",
    "tonight": ["or","looking for a hotel nearby tonight?"],
    "top-destination": "Top Destinations"
  }
}
</i18n>
