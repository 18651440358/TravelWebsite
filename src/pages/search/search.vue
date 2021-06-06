<template>
<!--  查询页面骨架-->
  <div class="zc-search-landing">
    <div class="header-nav">
      <zc-nav></zc-nav>
    </div>
<!--    header部分-->
    <header>
      <zc-container>
        <div class="filter-container">
          <div class="filter-top">
            <zc-col :grid="6" class="filter-item">
              <div class="filter-title">
                <i class="fi-br-marker"></i>
                <span>{{$t('filters')[0]}}</span>
              </div>
              <div class="filter-operate">
                <zc-input-suggest :suggestions="suggestions"
                                  v-model="location"
                                  theme="transparent"
                                  noFilling
                                  bold
                :placeholder="$i18n.locale === 'zh-CN'?'请输入地点':'Search for a place'">
                  <template slot-scope="{item}">
                    <div class="suggest-item">
                      <div class="suggest-city">
                        <i class="fi-br-calendar"></i>
                        <span>{{item.value}}</span>
                      </div>
                      <span class="suggest-country">{{item.country}}</span>
                    </div>
                  </template>
                </zc-input-suggest>
              </div>
            </zc-col>
            <zc-col :grid="5" class="filter-item">
              <div class="filter-title">
                <i class="fi-br-calendar"></i>
                <span>{{$t('filters')[1]}}</span>
              </div>
              <div class="filter-operate">
                <zc-date-picker bold
                                theme="transparent"
                                noFilling
                                v-model="startDate"
                                show-clear
                                show-today
                                :placeholder="$t('start-date')"
                ></zc-date-picker>
              </div>
            </zc-col>
            <zc-col :grid="5" class="filter-item">
              <div class="filter-title">
                <i class="fi-br-calendar"></i>
                <span>{{$t('filters')[2]}}</span>
              </div>
              <div class="filter-operate">
                <zc-date-picker bold
                                theme="transparent"
                                noFilling
                                v-model="endDate"
                                show-clear
                                show-today
                                :placeholder="$t('end-date')"
                ></zc-date-picker>
              </div>
            </zc-col>
            <zc-col :grid="4" class="filter-item">
              <div class="filter-title">
                <i class="fi-br-users"></i>
                <span>{{$t('filters')[3]}}</span>
              </div>
              <div class="filter-operate">
                <zc-input bold
                          theme="transparent"
                          noFilling
                          v-model="touristInfo"
                ></zc-input>
              </div>
            </zc-col>
            <zc-col :grid="4" class="filter-item" style="align-items: flex-end">
              <div class="filter-search">{{$t('filters')[4]}}</div>
            </zc-col>
          </div>
          <div class="filter-bottom">
            <zc-col :grid="6" class="bottom-item">
              <span class="bottom-title">{{$t('filter-bottom')[0]}}</span>
              <zc-slider
                  v-model="priceRange"
                  :min="80"
                  :max="300"
                  interval
                  :data="priceRangeList"
                  :name="this.$i18n.locale === 'zh-CN' ? '价格区间' : 'Price range'"
                 ></zc-slider>
<!--              价格区间-->
              <h5 class="range-title">
                <span>
                  <template v-if="this.$i18n.locale === 'zh-CN'">¥</template>
                  <template v-else>$</template>
                  {{priceRange[0]}}
                </span>
                <span> - </span>
                <span>
                  <template v-if="this.$i18n.locale === 'zh-CN'">¥</template>
                  <template v-else>$</template>
                  {{priceRange[1]}}
                </span>
              </h5>
            </zc-col>
            <zc-col :grid="6" class="bottom-item">
              <span class="bottom-title">{{$t('filter-bottom')[1]}}</span>
              <zc-tabs style="margin-top: 10px" v-model="reservationType">
                <zc-tabs-item :key="'type'+index" v-for="(item,index) in $t('reservationType')">{{item}}</zc-tabs-item>
              </zc-tabs>
            </zc-col>
            <zc-col :grid="4" class="bottom-item">
              <span class="bottom-title">{{$t('filter-bottom')[2]}}</span>
              <zc-rate v-model="guestRating" style="margin-top: 17px"></zc-rate>
            </zc-col>
            <zc-col :grid="4" class="bottom-item">
              <span class="bottom-title">{{$t('filter-bottom')[3]}}</span>
              <zc-dropdown style="margin-top: 10px" @command="locationCommand">
                <div class="select-button">
                  <span>{{locationValue || $t('locations')[0]}}</span>
                  <i class="fi-rr-angle-small-down"></i>
                </div>
                <zc-dropdown-menu slot="zc-dropdown-menu">
                  <div class="dropdown-panel">
                    <zc-dropdown-item :command="$t('locations')[0]">
                      <div class="location-item">
                        <i class="fi-br-building"></i>
                        <span>{{$t('locations')[0]}}</span>
                      </div>
                    </zc-dropdown-item>
                    <zc-dropdown-item :command="$t('locations')[1]">
                      <div class="location-item">
                        <i class="fi-br-school-bus"></i>
                        <span>{{$t('locations')[1]}}</span>
                      </div>
                    </zc-dropdown-item>
                    <zc-dropdown-item :command="$t('locations')[2]">
                      <div class="location-item">
                        <i class="fi-br-school"></i>
                        <span>{{$t('locations')[2]}}</span>
                      </div>
                    </zc-dropdown-item>
                    <zc-dropdown-item :command="$t('locations')[3]">
                      <div class="location-item">
                        <i class="fi-br-mode-landscape"></i>
                        <span>{{$t('locations')[3]}}</span>
                      </div>
                    </zc-dropdown-item>
                    <zc-dropdown-item :command="$t('locations')[4]">
                      <div class="location-item">
                        <i class="fi-br-rocket"></i>
                        <span>{{$t('locations')[4]}}</span>
                      </div>
                    </zc-dropdown-item>
                  </div>
                </zc-dropdown-menu>
              </zc-dropdown>
            </zc-col>
            <zc-col :grid="4" class="bottom-item">
              <span class="bottom-title">{{$t('filter-bottom')[4]}}</span>
              <zc-dropdown style="margin-top: 10px" @command="moreCommand">
                <div class="select-button">
                  <span>{{moreValue || $t('moreFilters')[0]}}</span>
                  <i class="fi-rr-angle-small-down"></i>
                </div>
                <zc-dropdown-menu slot="zc-dropdown-menu">
                  <div class="dropdown-panel">
                    <zc-dropdown-item :command="$t('moreFilters')[0]">
                      <div class="location-item">
                        <span>{{$t('moreFilters')[0]}}</span>
                      </div>
                    </zc-dropdown-item>
                    <zc-dropdown-item :command="$t('moreFilters')[1]">
                      <div class="location-item">
                        <span>{{$t('moreFilters')[1]}}</span>
                      </div>
                    </zc-dropdown-item>
                    <zc-dropdown-item :command="$t('moreFilters')[2]">
                      <div class="location-item">
                        <i class="fi-br-interactive"></i>
                        <span>{{$t('moreFilters')[2]}}</span>
                      </div>
                    </zc-dropdown-item>
                  </div>
                </zc-dropdown-menu>
              </zc-dropdown>
            </zc-col>
          </div>
        </div>
      </zc-container>
    </header>
<!--    主体部分-->
    <div class="content">
      <zc-container>
        <zc-row flex :spacing="20">
          <zc-col :grid="12">
            <div class="hotel-list">
<!--            排序-->
              <div class="list-header">
                <span>{{$t('list-title')}}</span>
                <zc-dropdown @command="sortCommand">
                  <div class="select-button big">
                    <span>{{sortValue || $t('sorts')[0]}}</span>
                    <i class="fi-rr-angle-small-down"></i>
                  </div>
                  <zc-dropdown-menu slot="zc-dropdown-menu">
                    <div class="dropdown-panel big">
                      <zc-dropdown-item :command="$t('sorts')[0]">
                        <div class="location-item">
                          <span>{{$t('sorts')[0]}}</span>
                        </div>
                      </zc-dropdown-item>
                      <zc-dropdown-item :command="$t('sorts')[1]">
                        <div class="location-item">
                          <span>{{$t('sorts')[1]}}</span>
                        </div>
                      </zc-dropdown-item>
                      <zc-dropdown-item :command="$t('sorts')[2]">
                        <div class="location-item">
                          <span>{{$t('sorts')[2]}}</span>
                        </div>
                      </zc-dropdown-item>
                      <zc-dropdown-item :command="$t('sorts')[3]">
                        <div class="location-item">
                          <span>{{$t('sorts')[3]}}</span>
                        </div>
                      </zc-dropdown-item>
                    </div>
                  </zc-dropdown-menu>
                </zc-dropdown>
              </div>
<!--              遍历-->
              <div class="list-content">
                <transition-group name="list" tag="div">
                  <div class="list-item"
                       v-for="(hotel,index) in hotelList"
                       :key="'hotel'+index">
                      <zc-room-card-detail
                          :portrait="hotel.portrait"
                          :title="hotel.title"
                          :titleEn="hotel.titleEn"
                          :type="hotel.type"
                          :score="hotel.score"
                          :reviews="hotel.reviews"
                          :distanceCenter="hotel.distanceCenter"
                          :bookPrice="hotel.bookPrice"
                          :lowestPrice="hotel.lowestPrice"
                          :discountPrice="hotel.discountPrice"
                      ></zc-room-card-detail>
                  </div>
                </transition-group>
              </div>
            </div>
          </zc-col>
          <zc-col :grid="12" ref="mapBox">
            <div id="hotelMap" :style="mapStyle">

            </div>
          </zc-col>
        </zc-row>
      </zc-container>
    </div>
  </div>
</template>

<script>
import ZcNav from "@/content/nav/nav";
import ZcContainer from "@/component/container/container";
import ZcCol from "@/component/col/col";
import ZcInputSuggest from "@/component/input-suggest/input-suggest";
import ZcDatePicker from "@/component/date-picker/date-picker";
import ZcInput from "@/component/input/input";
import ZcSlider from "@/component/slider/slider";
import ZcTabs from "@/component/tabs/tabs";
import ZcTabsItem from "@/component/tabs/tabs-item";
import ZcRate from "@/component/rate /rate";
import ZcDropdown from "@/component/dropdown/dropdown";
import ZcDropdownMenu from "@/component/dropdown-menu/dropdown-menu";
import ZcDropdownItem from "@/component/dropdown-item/dropdown-item";
import ZcRow from "@/component/row/row";
import ZcRoomCardDetail from "@/content/room-card-detail/card";
export default {
  name: "zc-search-landing",
  components: {
    ZcRoomCardDetail,
    ZcRow,
    ZcDropdownItem,
    ZcDropdownMenu,
    ZcDropdown,
    ZcRate, ZcTabsItem, ZcTabs, ZcSlider, ZcInput, ZcDatePicker, ZcInputSuggest, ZcCol, ZcContainer, ZcNav},

  data() {
    return {
      location: '',
      suggestions: [],
      startDate: '',
      endDate: '',
      touristInfo: '2 Adults,1 Room',
      priceRange: [100,230],
      priceRangeList: [],
      reservationType: '',
      guestRating: 3,
      locationValue: '',
      moreValue: '',
      mapH: 0,
      sortValue: '',
      hotelList: require('@/data/hotels').slice(0,3)
    }
  },
  computed: {
    mapStyle(){
      return {
        height: `${this.mapH}px`
      }
    }
  },
  created() {
    // 初始化
    this.init();
    // 初始化图表
    this.initChart();

    this.$nextTick(() => {
      // 初始化地图
      this.initMap();
    })
  },
  methods: {
    // 初始化图表
    initChart() {
      var priceRangeList = []
      priceRangeList.push({x: 80,y: 0})
      for(var i = 90; i <= 290; i += 20) {
        priceRangeList.push({x: i, y: Math.floor(Math.random() * 80 + 20)})
      }
      priceRangeList.push({x: 300,y: 0})
      this.priceRangeList = priceRangeList
    },
    // 初始化
    init() {
      // 记载数据
      var mainCity = require('@/data/mainCity.js');
      var country = require('@/data/country.js');
      var suggestions = [];
      mainCity.forEach((item)=>{
        var obj = {
          value: this.$i18n.locale === 'zh-CN' ? item.name : item.nameEn,
          country: this.$i18n.locale === 'zh-CN' ? country.filter((c) => {return item.countryCode === c.code})[0].name : country.filter((c) => {return item.countryCode === c.code})[0].nameEn
        }
        suggestions.push(obj)
      })
      this.suggestions = suggestions
    },
    locationCommand(command){
      this.locationValue = command
    },
    moreCommand(command){
      this.moreValue = command
    },
    sortCommand(command){
      this.sortValue = command
    },
    // 计算高度
    initMap() {
      var map = this.$refs.mapBox.$el.getBoundingClientRect()
      var winH = document.documentElement.clientHeight;
      this.mapH = winH - map.top - 30

      // const mapboxgl = require('mapbox-gl');  //引入组件
      // new mapboxgl.Map({
      //   container: 'hotelMap',
      //   style: 'mapbox://styles/mapbox/streets-v11', //地图样式，可以使用官网预定义的样式,也可以自定义
      //   center: [118.726533,32.012005], // 初始坐标系，这个是南京建邺附近
      //   zoom: 15,     // starting zoom 地图初始的拉伸比例
      //   pitch: 60,  //地图的角度，不写默认是0，取值是0-60度，一般在3D中使用
      //   bearing: -17.6, //地图的初始方向，值是北的逆时针度数，默认是0，即是正北
      //   antialias: true, //抗锯齿，通过false关闭提升性能
      // })
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../assets/style/theme/_handle.scss";
// 查询页面骨架
.zc-search-landing{
  width: 100vw;
  //height: 100vh;
  //overflow: scroll;
  @include bgColor(lightBackground);
}
// 顶部导航
.header-nav{
  @include bgColor(defaultBackground);
  box-shadow: 3px 0 50px rgba(0,0,0,.05);
}
// 筛选
.filter-container{
  border-radius: 1rem;
  @include box-shadow(cardBoxShadow);
  @include bgColor(defaultBackground);
  padding: 30px 20px;
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  user-select: none;
}
// 上部
.filter-top,.filter-bottom{
  display: flex;
  align-items: stretch;
}
.filter-item{
  padding: 0 15px;
  display: inline-flex;
  flex-direction: column;
  position: relative;
  margin-right: 10px;
}
.filter-item:last-child{
  margin: 0;
}
.filter-item:nth-child(1)::after,.filter-item:nth-child(2)::after,.filter-item:nth-child(3)::after{
  content: '';
  width: 1px;
  height: 80%;
  position: absolute;
  right: 0;
  top: 50%;
  transform: translate3d(0,-50%,0);
  @include bgColor(lightBackground);
}

// 过滤器标题
.filter-title{
  display: flex;
  align-items: center;
}
.filter-title i{
  @include fontColor(primary);
  font-size: 16px;
}
.filter-title span{
  display: inline-block;
  @include fontColor(regularText);
  font-weight: 500;
  margin-left: 10px;
  font-size: 13px;
  line-height: 13px;
  height: 13px;
}
// 搜索按钮
.filter-search{
  color: #fff;
  @include bgColor(primary);
  width: 90%;
  height: 100%;
  border-radius: 50px;
  @include box-shadow(buttonShadow);
  font-size: 14px;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
// 自定义
.suggest-item{
  width: 100%;
  display: flex;
  flex-direction: column;
}
.suggest-city{
  display: flex;
  align-items: center;
  font-size: 14px;
  @include fontColor(primaryText);
  font-weight: 800;
}
.suggest-city i{
  margin-right: 5px;
}
.suggest-country{
  @include fontColor(grayText);
  font-size: 13px;
}

// 下部
.filter-bottom{
  margin-top: 20px;
}
.filter-bottom .bottom-title{
  font-size: 12px;
  @include fontColor(regularText);
  font-weight: 500;
  user-select: none;
}
.bottom-item{
  padding: 0 15px;
  display: inline-flex;
  flex-direction: column;
  position: relative;
  margin-right: 10px;
}
.bottom-item:last-child{
  margin: 0;
}
// 价格区间
.range-title{
  position: absolute;
  right: 0;
  top: 0;
}
// 下拉按钮
.select-button{
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  border-radius: 40px;
  @include bgColor(grayBackground);
  cursor: pointer;
}

.select-button i{
  @include fontColor(grayText);
}
.select-button span{
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: 13px;
  font-weight: 600;
}
// 下拉面板
.dropdown-panel{
  padding: 5px 0;
  width: 230px;
  border-radius: .5rem;
  @include bgColor(defaultBackground);
  @include box-shadow(cardBoxShadow);
  overflow: hidden;
}
.location-item{
  padding: 10px 15px;
  width: 100%;
  display: flex;
  align-items: center;
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
  user-select: none;
}
.location-item span{
  margin-left: 10px;
}
.location-item:hover{
  @include bgColor(lightBackground);
}
// 主体部分
.content{
  margin-top: 30px;
}
// 排序
.list-header{
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.select-button.big{
  width: 300px;
  @include bgColor(garyButtonBackground);
}
.list-header>span{
  font-weight: 600;
  @include fontColor(regularText);
  font-size: 14px;
}
.dropdown-panel.big{
  width: 300px;
}

// 遍历
.list-content{
  margin-top: 20px;
}
.list-item{
  margin-bottom: 20px;
}
// 动画
.list-enter-active,.list-leave-active{
  opacity: 1;
  transform: translate3d(0,0,0);
  transition: all .3s cubic-bezier(.23, 1, .32, 1);
}
.list-enter,
.list-leave-active {
  opacity: 0;
  transform: translate3d(0,50%,0);
}

// 地图
#hotelMap{
  @include box-shadow(cardBoxShadow);
  border-radius: .5rem;

}
</style>

<i18n>
{
  "zh-CN": {
    "filters": ["目的地","入住日期","退房日期","游客数","搜 索"],
    "filter-bottom": ["价格范围","类型","客人评价","位置","更多过滤器"],
    "start-date": "入住日期",
    "end-date": "离开日期",
    "reservationType": ["所有","酒店","民房/民俗"],
    "locations": ["市中心附近","客运汽车站","高铁站附近","旅游风景区","国际机场"],
    "moreFilters": ["默认选择","自定义选择","带图标的"],
    "list-title": "排序方式",
    "sorts": ["我们的建议","根据价格升序","根据价格降序","根据评分","综合评价"]
  },
  "en_US": {
    "filters": ["Location","Check in","Check out","Guests","Search"],
    "filter-bottom": ["Price range","Type","Guest rating","Location","More filters"],
    "start-date": "Start date",
    "end-date": "End date",
    "reservationType": ["All","Hotel","House/Apartment"],
    "locations": ["City Center","Passenger Station","High Speed Rail Station","Tourism Scenic Area","International Airport"],
    "moreFilters": ["Default Selection", "Custom Selection", "With Icons"],
    "list-title": "Sort By",
    "sorts": ["Our suggestion","Ascending order by price","Descending order by price","According to rating","Comprehensive evaluation"]
  }
}
</i18n>
