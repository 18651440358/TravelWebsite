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
                <div ref="search_group" class="search-group">
                  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 24 24" version="1.1">
                    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                      <rect x="0" y="0" width="24" height="24"/>
                      <path d="M14.2928932,16.7071068 C13.9023689,16.3165825 13.9023689,15.6834175 14.2928932,15.2928932 C14.6834175,14.9023689 15.3165825,14.9023689 15.7071068,15.2928932 L19.7071068,19.2928932 C20.0976311,19.6834175 20.0976311,20.3165825 19.7071068,20.7071068 C19.3165825,21.0976311 18.6834175,21.0976311 18.2928932,20.7071068 L14.2928932,16.7071068 Z" fill="#000000" fill-rule="nonzero"/>
                      <path d="M11,16 C13.7614237,16 16,13.7614237 16,11 C16,8.23857625 13.7614237,6 11,6 C8.23857625,6 6,8.23857625 6,11 C6,13.7614237 8.23857625,16 11,16 Z M11,18 C7.13400675,18 4,14.8659932 4,11 C4,7.13400675 7.13400675,4 11,4 C14.8659932,4 18,7.13400675 18,11 C18,14.8659932 14.8659932,18 11,18 Z" fill="#000000" fill-rule="nonzero"/>
                    </g>
                  </svg>
                  <input id="searchDestination" type="text" @input="handleInput" v-model="searchValue" />
                  <label for="searchDestination" v-if="showPlaceholder">{{$t('search-placeholder')}}</label>
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
<!--                提示框-->
                <div class="search-tip-container" :style="tipStyle">
                  <vue-scroll :ops="ops">
                    <div class="tip-head">
                      <span>{{$t('tip-head')}}</span>
                      <span class="destination">{{searchValue}}</span>
                    </div>
                    <ul>
                      <li v-for="(tip,index) in tipList" :key="'tipList' + index">
                        <div class="tip-icon"></div>
                        <span>{{tip}}</span>
                        <span>{{searchValue}}</span>
                      </li>
                    </ul>
                  </vue-scroll>
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
                    <a @click="$refs.destinationSwiper.$swiper.slidePrev()" :class="{'active':destinationIndex > 0}">
                      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                        <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                          <polygon points="0 0 24 0 24 24 0 24"/>
                          <rect fill="#000000" transform="translate(12.000000, 12.000000) scale(-1, 1) rotate(-90.000000) translate(-12.000000, -12.000000) " x="11" y="5" width="2" height="14" rx="1"/>
                          <path d="M3.7071045,15.7071045 C3.3165802,16.0976288 2.68341522,16.0976288 2.29289093,15.7071045 C1.90236664,15.3165802 1.90236664,14.6834152 2.29289093,14.2928909 L8.29289093,8.29289093 C8.67146987,7.914312 9.28105631,7.90106637 9.67572234,8.26284357 L15.6757223,13.7628436 C16.0828413,14.136036 16.1103443,14.7686034 15.7371519,15.1757223 C15.3639594,15.5828413 14.7313921,15.6103443 14.3242731,15.2371519 L9.03007346,10.3841355 L3.7071045,15.7071045 Z" fill="#000000" fill-rule="nonzero" transform="translate(9.000001, 11.999997) scale(-1, -1) rotate(90.000000) translate(-9.000001, -11.999997) "/>
                        </g>
                      </svg>
                    </a>
                    <a @click="$refs.destinationSwiper.$swiper.slideNext()" :class="{'active':destinationIndex < 3}">
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
                <swiper @slideChange="slideChange" class="destinations" :options="swiperOptions" ref="destinationSwiper">
                  <swiper-slide v-for="(item,index) in topDestination" :key="'topDestination' + index">
                    <div class="destination-item">
                      <card-destination :title="item.title"
                                        :title-en="item.titleEn"
                                        :src="item.cover"
                                        :hotels="item.hotels"
                                        :avg="item.avg"></card-destination>
                    </div>
                  </swiper-slide>
                </swiper>
              </div>
            </zc-col>
            <zc-col :grid="9" style="height: 100%">
              <div class="map-container">
                <fusioncharts :type="chart.type"
                              :width="chart.width"
                              :height="chart.height"
                              :dataFormat="chart.dataFormat"
                              :dataSource="chart.dataSource"
                ></fusioncharts>
<!--                进度-->
                <div class="map-step">
                  <div class="map-step-item active">
                    <div class="icon">
                      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                        <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                          <rect x="0" y="0" width="24" height="24"/>
                          <path d="M5,10.5 C5,6 8,3 12.5,3 C17,3 20,6.75 20,10.5 C20,12.8325623 17.8236613,16.03566 13.470984,20.1092932 C12.9154018,20.6292577 12.0585054,20.6508331 11.4774555,20.1594925 C7.15915182,16.5078313 5,13.2880005 5,10.5 Z M12.5,12 C13.8807119,12 15,10.8807119 15,9.5 C15,8.11928813 13.8807119,7 12.5,7 C11.1192881,7 10,8.11928813 10,9.5 C10,10.8807119 11.1192881,12 12.5,12 Z" fill="#000000" fill-rule="nonzero"/>
                        </g>
                      </svg>
                    </div>
                    <span>{{$t('map-step')[0]}}</span>
                  </div>
                  <div class="map-step-item">
                    <div class="icon">
                      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                        <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                          <rect x="0" y="0" width="24" height="24"/>
                          <rect fill="#000000" x="2" y="4" width="19" height="4" rx="1"/>
                          <path d="M3,10 L6,10 C6.55228475,10 7,10.4477153 7,11 L7,19 C7,19.5522847 6.55228475,20 6,20 L3,20 C2.44771525,20 2,19.5522847 2,19 L2,11 C2,10.4477153 2.44771525,10 3,10 Z M10,10 L13,10 C13.5522847,10 14,10.4477153 14,11 L14,19 C14,19.5522847 13.5522847,20 13,20 L10,20 C9.44771525,20 9,19.5522847 9,19 L9,11 C9,10.4477153 9.44771525,10 10,10 Z M17,10 L20,10 C20.5522847,10 21,10.4477153 21,11 L21,19 C21,19.5522847 20.5522847,20 20,20 L17,20 C16.4477153,20 16,19.5522847 16,19 L16,11 C16,10.4477153 16.4477153,10 17,10 Z" fill="#000000" opacity="0.3"/>
                        </g>
                      </svg>
                    </div>
                    <span>{{$t('map-step')[1]}}</span>
                  </div>
                  <div class="map-step-item">
                    <div class="icon">
                      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="20px" height="20px" viewBox="0 0 24 24" version="1.1">
                        <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                          <polygon points="0 0 24 0 24 24 0 24"/>
                          <path d="M18,14 C16.3431458,14 15,12.6568542 15,11 C15,9.34314575 16.3431458,8 18,8 C19.6568542,8 21,9.34314575 21,11 C21,12.6568542 19.6568542,14 18,14 Z M9,11 C6.790861,11 5,9.209139 5,7 C5,4.790861 6.790861,3 9,3 C11.209139,3 13,4.790861 13,7 C13,9.209139 11.209139,11 9,11 Z" fill="#000000" fill-rule="nonzero" opacity="0.3"/>
                          <path d="M17.6011961,15.0006174 C21.0077043,15.0378534 23.7891749,16.7601418 23.9984937,20.4 C24.0069246,20.5466056 23.9984937,21 23.4559499,21 L19.6,21 C19.6,18.7490654 18.8562935,16.6718327 17.6011961,15.0006174 Z M0.00065168429,20.1992055 C0.388258525,15.4265159 4.26191235,13 8.98334134,13 C13.7712164,13 17.7048837,15.2931929 17.9979143,20.2 C18.0095879,20.3954741 17.9979143,21 17.2466999,21 C13.541124,21 8.03472472,21 0.727502227,21 C0.476712155,21 -0.0204617505,20.45918 0.00065168429,20.1992055 Z" fill="#000000" fill-rule="nonzero"/>
                        </g>
                      </svg>
                    </div>
                    <span>{{$t('map-step')[2]}}</span>
                  </div>
                </div>
              </div>
            </zc-col>
          </zc-row>
        </zc-container>
      </section>
    </header>
  </div>
</template>

<script>
import ZcNav from "@/content/nav/nav";
import ZcContainer from "@/component/container/container";
import ZcRow from "@/component/row/row";
import ZcCol from "@/component/col/col";
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/swiper-bundle.css';
import CardDestination from "@/content/card-destination/card-destination";
import dataSource from './dataSource';

import Vue from 'vue';
import VueFusionCharts from 'vue-fusioncharts';
import FusionCharts from 'fusioncharts';
import Maps from 'fusioncharts/fusioncharts.maps'
import World from 'fusioncharts/maps/fusioncharts.europewithcountries.js'
Vue.use(VueFusionCharts, FusionCharts, Maps, World)

import VueScroll from 'vuescroll'
export default {
  name: "zc-page-landing",
  components: {
    CardDestination,
    ZcCol,
    ZcRow,
    ZcContainer,
    ZcNav,
    Swiper,
    SwiperSlide,
    VueScroll
  },
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
    },
    tipStyle(){
      return {
        width: `${this.searchPosition.width - 60}px`,
        transform: `translate3d(${this.searchPosition.left + 30}px,${this.searchPosition.top + this.searchPosition.height + 40}px,0)`
      }
    }
  },
  data() {
    return {
      destinationIndex: 0,

      // 滚动轮播配置
      swiperOptions: {
        slidesPerView: 3,
      },

      // 热门城市
      topDestination: [],

      searchData: {
        country: {},
        mainCity: {}
      },

      // 是否显示占位
      showPlaceholder: true,
      searchValue: '',
      searchPosition: {
        width: 0,
        height: 0,
        left: 0,
        top: 0
      },
      ops: {
        vuescroll: {},
        scrollPanel: {},
        rail: {},
        bar: {
          background: '#698096'
        }
      },
      tipList: [],

      // 地图
      chart: {
        type: 'europewithcountries',
        width: '100%',
        height: '110%',
        dataFormat: 'json',
        dataSource: dataSource
      }
    }
  },
  watch: {
    searchValue: function (val){
      const value = [];
      this.searchData.country.forEach((item)=>{
        if (item.indexOf(val) === -1)
          value.push(item)
      })

    }
  },
  mounted() {
    // 初始化
    this.initialization();
  },
  methods: {
    // 初始化
    initialization(){
      // 加载热门景区
      const destinations = require('@/data/destinations')
      let popular = [];
      // 随机去除6个
      while (popular.length < 6){
        var index = Math.floor(Math.random() * destinations.length);
        if (index < destinations.length)
          popular.push(destinations.splice(index,index + 1)[0])
      }
      this.topDestination = popular

      // 获取搜索框状态
      this.searchPosition.width = this.$refs.search_group.getBoundingClientRect().width
      this.searchPosition.height = this.$refs.search_group.getBoundingClientRect().height
      this.searchPosition.top = this.$refs.search_group.getBoundingClientRect().top
      this.searchPosition.left = this.$refs.search_group.getBoundingClientRect().left

      const country = require('@/data/country');
      const mainCity = require('@/data/mainCity');

      this.searchData.country = country
      this.searchData.mainCity = mainCity

    },
    slideChange($event){
      this.destinationIndex = $event.activeIndex
    },
    handleInput(){
      if (this.searchValue.trim() === "")
        this.showPlaceholder = true
      else
        this.showPlaceholder = false
    }
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
  @include box-shadow(cardBoxShadow);
}
.search-group label{
  font-size: 20px;
  @include fontColor(grayText);
  position: absolute;
  left: 80px;
  top: 50%;
  transform: translate3d(0,-50%,0);
  cursor: text;
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
// 提示框
.search-tip-container{
  @include bgColor(defaultBackground);
  @include box-shadow(cardBoxShadow);
  border-radius: 1rem;
  padding: 30px;
  position: fixed;
  left: 0;
  top: 0;
  max-height: 300px;
}
.tip-head{
  @include fontColor(grayText);
  font-size: 13px;
}
.tip-head .destination{
  font-weight: 500;
  @include fontColor(primaryText);
}
// tonight
.tonight{
  margin-top: 20px;
  font-size: 14px;
  font-weight: 600;
  @include transition(150ms);
}
.tonight .highlight{
  @include fontColor(grayText);
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
  @include fill(grayText);
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
  filter: drop-shadow(0 0 10px rgba(#698096, 0.2));
}
.destination-item{
  width: 170px;
  display: inline-block;
}

// 地图容器
.map-container{
  height: 100%;
  @include bgColor(primary);
  border-radius: 2rem;
  overflow: hidden;
  position: relative;
}
// 步骤条
.map-step{
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
  position: absolute;
  bottom: 50px;
}
.map-step-item{
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 40px;
  position: relative;
}
.icon:after{
  content: '';
  width: 90px;
  height: 2px;
  background: rgba(255,255,255, .2);
  position: absolute;
  right: -90px;
  top: 25px;
}
.map-step-item:last-child .icon:after{
  content: none;
}
.icon{
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: rgba(255,255,255,.2);
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(10px);
}
.icon svg g [fill]{
  fill: #fff;
}
.map-step-item.active .icon{
  background: #fff;
}

.map-step-item.active .icon svg g [fill]{
  fill: #0080FF;
}
.map-step-item span{
  font-size: 12px;
  color: rgba(255,255,255,.6);
  margin-top: 10px;
  font-weight: 500;
}
.map-step-item.active span{
  color: #fff!important;
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
    "top-destination": "热门目的地",
    "map-step": ["目的地", "住宿时间", "游客登记"],
    "search-placeholder": "请查询目的地或者酒店名字",
    "tip-head": "正在对关键词进行搜索 "
  },
  "en_US": {
    "greet": "Hey ",
    "defaultName": "Traveler,",
    "hello": ["Good morning","Good morning","Good noon","Good afternoon","Good evening"],
    "title": ["","Where ","are you<br/>going to go?"],
    "search": "Let's Go",
    "tonight": ["or","looking for a hotel nearby tonight?"],
    "top-destination": "Top Destinations",
    "map-step": ["Location", "Stay Dates", "Guests"],
    "search-placeholder": "Destination or a hotel name",
    "tip-head": "Popular search for "
  }
}
</i18n>

<style lang="scss">
  .zc-page-landing .fc__tooltip.fusioncharts-div{
    background: rgba(255,255,255,0.1)!important;
    border: none!important;
    color: #fff!important;
    font-size: 14px!important;
    backdrop-filter: blur(3px);
    padding: .5rem .75rem!important;
    border-radius: 50px!important;
    font-weight: bold;
    font-family: 'poppins',"SourceHanSans",Helvetica,sans-serif !important;
    text-shadow: 0 0 3px #0080FF;
    box-shadow: 0 0 10px rgba(#698096, 0.2)!important;
  }
</style>
