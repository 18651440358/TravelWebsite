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
            <zc-col :grid="5" class="bottom-item">
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
            <zc-col :grid="5" class="bottom-item">
              <span class="bottom-title">{{$t('filter-bottom')[1]}}</span>

            </zc-col>
            <zc-col :grid="4" class="bottom-item">
              <span class="bottom-title">{{$t('filter-bottom')[2]}}</span>
            </zc-col>
            <zc-col :grid="5" class="bottom-item">
              <span class="bottom-title">{{$t('filter-bottom')[3]}}</span>
            </zc-col>
            <zc-col :grid="5" class="bottom-item">
              <span class="bottom-title">{{$t('filter-bottom')[4]}}</span>
            </zc-col>
          </div>
        </div>
      </zc-container>
    </header>
  <div style="height: 3000px;background:#000;"></div>

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
export default {
  name: "zc-search-landing",
  components: {ZcSlider, ZcInput, ZcDatePicker, ZcInputSuggest, ZcCol, ZcContainer, ZcNav},

  data() {
    return {
      location: '',
      suggestions: [],
      startDate: '',
      endDate: '',
      touristInfo: '2 Adults,1 Room',
      priceRange: [100,230],
      priceRangeList: []
    }
  },
  created() {
    // 初始化
    this.init();
    // 初始化图表
    this.initChart();
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
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../assets/style/theme/_handle.scss";
// 查询页面骨架
.zc-search-landing{
  width: 100vw;
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
</style>

<i18n>
{
  "zh-CN": {
    "filters": ["目的地","入住日期","退房日期","游客数","搜 索"],
    "filter-bottom": ["价格范围","类型","客人评价","位置","更多过滤器"],
    "start-date": "入住日期",
    "end-date": "离开日期"
  },
  "en_US": {
    "filters": ["Location","Check in","Check out","Guests","Search"],
    "filter-bottom": ["Price range","Type","Guest rating","Location","More filters"],
    "start-date": "Start date",
    "end-date": "End date"
  }
}
</i18n>
