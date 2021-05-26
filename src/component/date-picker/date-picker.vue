<template>
<!--  日期选择-->
  <div class="zc-date-picker">
    <zc-input
        ref="input"
        v-bind="[$props, $attrs]"
        @input="$emit('input', $event)"
        @focus="$emit('focus', $event)"
        @blur="$emit('blur', $event)"
        @change="$emit('change', $event)"
        read-only
        :placeholder="zcPlaceholder"
        @click.native="show"
    ></zc-input>
<!--    弹出框-->
    <transition name="dropdown"  @after-leave="doDestroy">
      <div class="date-picker-popups" :style="style" v-show="visible" ref="picker">
<!--        日期-->
        <div class="picker-days" v-if="panel === 0">
          <!--        顶部-->
          <div class="picker-head">
            <div class="picker-button" @click.stop="selectPrev">
              <i class="fi-br-angle-small-left"></i>
            </div>
            <div class="datepicker-switch" @click.stop="panel = 1">
              <template v-if="$i18n.locale==='zh-CN'">
                {{yearView}}年{{monthName[monthView]}}月
              </template>
              <template v-if="$i18n.locale==='en_US'">
                {{monthNameEn[monthView]}} {{yearView}}
              </template>
            </div>
            <div class="picker-button" @click.stop="selectNext">
              <i class="fi-br-angle-small-right"></i>
            </div>
          </div>
<!--          身体-->
          <div class="picker-body">
<!--            星期-->
            <div class="picker-week">
              <div class="picker-row">
                <div class="picker-cell bold" v-for="(item,index) in $t('weeks')" :key="'weeks'+index">
                  {{item}}
                </div>
              </div>
            </div>
<!--            日期-->
            <div class="picker-date">
              <div class="picker-row" v-for="(row,index) in dateList.length / 7" :key="'row'+index">
                <template v-for="(row,dayIndex) in dateList" >
                  <div @click.stop="select(row.year,row.month,row.date,row.status)" :class="[{'today':row.status === 'today'},{'prev':row.status === 'prev'},{'over':row.status === 'over'},{'next':row.status === 'next'},{'selected':row.year === selected[0] && row.month === selected[1] && row.date === selected[2]}]" :key="'cell'+dayIndex" class="picker-cell zc-date"  v-if="index  * 7 <= dayIndex && (index+1) * 7 > dayIndex">
                    {{row.date}}
                  </div>
                </template>
              </div>
            </div>
          </div>
<!--          尾部-->
          <div class="picker-footer" v-if="showToday || showClear">
            <div class="today-button" v-if="showToday" @click.stop="selectToday">
              {{$t('today-button')}}
            </div>
            <div class="clear-button" @click.stop="clearSelected" v-if="showClear">
              {{$t('clear-button')}}
            </div>
          </div>
        </div>
<!--        月份-->
        <div class="picker-month" v-if="panel === 1">
          <!--        顶部-->
          <div class="picker-head">
            <div class="picker-button" @click.stop="prevYear">
              <i class="fi-br-angle-small-left"></i>
            </div>
            <div class="datepicker-switch" @click.stop="panel = 2">
              <template v-if="$i18n.locale==='zh-CN'">
                {{yearView}}年
              </template>
              <template v-if="$i18n.locale==='en_US'">
                {{yearView}}
              </template>
            </div>
            <div class="picker-button" @click.stop="nextYear">
              <i class="fi-br-angle-small-right"></i>
            </div>
          </div>
<!--          遍历-->
          <div class="picker-body">
            <div class="picker-row" v-for="(month,index) in 12" :key="'months'+index">
              <template v-for="(item,monthIndex) in $t('months')">
                <div @click.stop="showThisMonth(monthIndex)" :class="{'thisMonth':parseInt(monthIndex) === selected[1] && selected[0] === yearView}" :key="'monthIndex'+monthIndex" class="picker-cell zc-month" v-if="index * 4 <= monthIndex && (index+1) * 4 > monthIndex">
                  {{item}}
                </div>
              </template>
            </div>
          </div>
          <!--          尾部-->
          <div class="picker-footer" v-if="showToday || showClear">
            <div class="today-button" v-if="showToday" @click.stop="selectToday">
              {{$t('today-button')}}
            </div>
            <div class="clear-button" @click.stop="clearSelected" v-if="showClear">
              {{$t('clear-button')}}
            </div>
          </div>
        </div>
<!--        年份-->
        <div class="picker-year" v-if="panel === 2">
          <!--        顶部-->
          <div class="picker-head">
            <div class="picker-button" @click.stop="prevGroup">
              <i class="fi-br-angle-small-left"></i>
            </div>
            <div class="datepicker-switch final">
              <template v-if="$i18n.locale==='zh-CN'">
                {{pickerYear[0]}}年 - {{pickerYear[pickerYear.length - 1]}}年
              </template>
              <template v-if="$i18n.locale==='en_US'">
                {{pickerYear[0]}} - {{pickerYear[pickerYear.length - 1]}}
              </template>
            </div>
            <div class="picker-button" @click.stop="nextGroup">
              <i class="fi-br-angle-small-right"></i>
            </div>
          </div>
<!--          身体-->
          <div class="picker-body">
            <div class="picker-row" v-for="(year,index) in 12" :key="'years'+index">
              <template v-for="(item,yearIndex) in pickerYear">
                <div @click.stop="showThisYear(item)" :class="{'thisYear':parseInt(item) === selected[0]}" :key="'monthIndex'+yearIndex" class="picker-cell zc-year" v-if="index * 4 <= yearIndex && (index+1) * 4 > yearIndex">
                  {{item}}
                </div>
              </template>
            </div>
          </div>
          <!--          尾部-->
          <div class="picker-footer" v-if="showToday || showClear">
            <div class="today-button" v-if="showToday" @click.stop="selectToday">
              {{$t('today-button')}}
            </div>
            <div class="clear-button" @click.stop="clearSelected" v-if="showClear">
              {{$t('clear-button')}}
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import floating from '@/util/floating'
import ZcInput from "@/component/input/input";
export default {
  name: "zc-date-picker",
  mixins: [floating],
  model: {
    prop: 'value',
    event: 'input'
  },
  components: {ZcInput},
  props: {
    value: String,
    dividing: {
      type: String,
      default: '-'
    },
    placeholder: String,
    showToday: {
      type: Boolean,
      default: false
    },
    showClear: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      month_olympic: [31,29,31,30,31,30,31,31,30,31,30,31],
      month_normal: [31,28,31,30,31,30,31,31,30,31,30,31],
      monthName: ['一','二','三','四','五','六','七','八','九','十','十一','十二'],
      monthNameEn: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct' ,'Nov','Dec'],
      monthView: 0,
      yearView: 0,
      dateList: [],
      selected: [],

      visible: false,

      panel: 0,
      step: 1
    }
  },
  created() {
    // 获取本月视图
    var {zcYear,zcMonth} = this.currentDate();
    this.dateList = this.getDateList(zcYear,zcMonth)
    this.monthView = zcMonth
    this.yearView = zcYear
  },
  mounted() {
    // 初始化
    this.init()
  },
  watch: {
    selected: function (val){
      if(val.length === 3)
        if(this.$i18n.locale === 'zh-CN')
          this.$emit('input', val[0] + this.dividing + (val[1] + 1) + this.dividing + val[2])
        else
          this.$emit('input', val[1] + this.dividing + (val[2] + 1) + this.dividing + val[0])
      else
        this.$emit('input','')
    },
    visible(val) {
      this.visible = val
      if(val)
        document.body.appendChild(this.$refs.picker)
      this.$nextTick(() => {
        val && this.position(this.$refs.input.$el, this.$refs.picker)
      })
    },
  },
  computed: {
    style() {
      return {
        position: 'fixed',
        zIndex: '100',
        top: `${this.dropdownTop}px`,
        left: `${this.dropdownLeft}px`
      }
    },
    zcPlaceholder() {
      if(!this.placeholder)
        if(this.$i18n.locale === 'zh-CN')
          return `yyyy${this.dividing}mm${this.dividing}dd`;
        else
          return `mm${this.dividing}dd${this.dividing}yyyy`;
      else
        return this.placeholder
    },
    pickerYear() {
      var over = this.yearView % 10;
      var arr= []
      for(var i = 0; i < 12; i++) {
        arr.push(this.yearView + this.step - over - 2 + i)
      }
      return arr;
    }
  },
  methods: {
    prevGroup() {
      this.yearView -= 12
    },
    nextGroup() {
      this.yearView += 12
    },
    // 隐藏
    hide() {
      this.visible = false
    },
    // 显示
    show() {
      this.visible = true
    },
    // 初始化
    init() {
      var _this = this
      window.addEventListener("resize", () => {
        _this.visible && _this.position(_this.$refs.input.$el, _this.$refs.picker)
      })
      window.addEventListener("scroll", () => {
        _this.visible && _this.position(_this.$refs.input.$el, _this.$refs.picker)
      })

      // 监听选择
      document.addEventListener('click', event => {
        if(!this.$refs.input.$el.contains(event.target) && !this.$refs.picker.contains(event.target)){
          this.visible && this.hide()
        }
      })
    },
    // 下月
    selectNext() {
      if(this.monthView > 10){
        this.yearView++;
        this.monthView = 0;
      }else
        this.monthView++;
      this.getDateList(this.yearView,this.monthView)
    },
    // 上月
    selectPrev() {
      if(this.monthView < 1){
        this.yearView--;
        this.monthView = 11;
      }else{
        this.monthView--;
      }
      this.getDateList(this.yearView,this.monthView)
    },
    // 选择日期
    select(y,m,d,s){
      if (s === 'prev'){
        this.selectPrev();
        this.selected = [this.yearView,this.monthView,d]
      }else if(s === 'next'){
        // 获取下月日期
        this.selectNext()
        this.selected = [this.yearView,this.monthView,d]
      }else{
        this.selected = [y,m,d]
      }
    },
    // 获得当前日期列表
    getDateList(year,month) {
      var {zcYear,zcMonth,zcDay} = this.currentDate();
      var dataList = [];
      this.dateList = dataList
      // 获取当月第一天
      var firstDay = new Date(year,month,1).getDay();
      // 判断是不是闰年,获得总天数
      var totalDay = this.daysMonth(year,month);
      // 获取上月
      var prevYear = year
      var prevMonth = month
      if(month - 1 < 0) {
        prevYear = year - 1
        prevMonth = 11
      }else
        prevMonth = month - 1
      var prevDay = this.daysMonth(prevYear,prevMonth);
      // 补入上月天数
      for(var i = prevDay - firstDay + 1; i <= prevDay; i++){
        dataList.push({status: 'prev',year:prevYear,month:prevMonth,date:i})
      }
      // 当月天数
      for(var x = 1; x <= totalDay; x++) {
        if((x < zcDay && year === zcYear && month === zcMonth) || year < zcYear || (year === zcYear && month < zcMonth)) {
          dataList.push({status: 'over',year: year,month:month,date:x})
        }else if(x === zcDay && year === zcYear && month === zcMonth) {
          dataList.push({status: 'today',year: year,month:month,date:x})
        }else {
          dataList.push({status: 'future',year: year,month:month,date:x})
        }
      }
      // 获取下月日期
      var nextYear = year
      var nextMonth = month
      if(month + 1 >= 12){
        nextYear = year + 1;
        nextMonth = 0
      }else
        nextMonth = month + 1
      // 下月补天数
      var nextDay = dataList.length % 7 === 0 ? 0 : 7 - (dataList.length % 7)
      for(var y = 1; y <= nextDay; y++){
        dataList.push({status: 'next',year: nextYear,month:nextMonth,date:y})
      }
      return dataList;
    },
    // 当前日期
    currentDate() {
      var zcDate = new Date()
      return {
        zcYear: zcDate.getFullYear(),
        zcMonth: zcDate.getMonth(),
        zcDay: zcDate.getDate()
      };
    },
    // 获得当月天数
    daysMonth(year,month) {
      if (year % 100 !== 0 && year % 4 === 0 || year % 400 === 0)
        return this.month_olympic[month]
      else
        return this.month_normal[month]
    },
    // 选择今日
    selectToday() {
      // 获取本月视图
      var {zcYear,zcMonth,zcDay} = this.currentDate();
      this.dateList = this.getDateList(zcYear,zcMonth)
      this.monthView = zcMonth
      this.yearView = zcYear
      this.selected = [zcYear,zcMonth,zcDay]
      this.panel = 0
    },
    // 清空
    clearSelected() {
      this.selected = []
      var {zcYear,zcMonth} = this.currentDate();
      this.dateList = this.getDateList(zcYear,zcMonth)
      this.monthView = zcMonth
      this.yearView = zcYear
    },
    doDestroy() {
      if(this.$el)
        document.body.removeChild(this.$refs.picker)
    },
    prevYear() {
      this.yearView--
    },
    nextYear() {
      this.yearView++
    },
    showThisMonth(monthIndex) {
      this.dateList = this.getDateList(this.yearView,parseInt(monthIndex))
      this.monthView = parseInt(monthIndex)
      this.panel = 0
    },
    showThisYear(year) {
      this.yearView = year
      this.panel = 1
    }

  }
}
</script>

<style scoped lang="scss">
@import "../../assets/style/theme/_handle.scss";
  // 下拉框
  .date-picker-popups{
    width: 265px;
    padding: 10px;
    margin: 5px 0;
    border-radius: 0.42rem;
    @include bgColor(defaultBackground);
    @include box-shadow(cardBoxShadow);
  }
  // 顶部
  .picker-head{
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .picker-button{
    width: 35px;
    height: 35px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: .5rem;
    cursor: pointer;
  }
  .picker-button:hover{
    @include bgColor(lightBackground);
  }
  .datepicker-switch{
    width: 175px;
    height: 35px;
    display: flex;
    border-radius: .5rem;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-weight: 600;
    font-size: 13px;
  }
  .datepicker-switch:hover{
    @include bgColor(lightBackground);
  }
  .datepicker-switch.final:hover{
    @include bgColor(dangerBackground);
    cursor: no-drop;
  }
  .zc-date{
    cursor: pointer;
    @include fontColor(primaryText);
  }
  .zc-month,.zc-year{
    width: 23%;
    height: 54px!important;
    cursor: pointer;
    @include fontColor(primaryText);
  }
  .zc-month:hover,.zc-year:hover{
    @include bgColor(lightBackground);
  }
  .zc-month.thisMonth,.zc-year.thisYear{
    @include bgColor(primaryBackground);
    @include fontColor(primary);
  }
  .zc-date:hover{
    @include bgColor(lightBackground);
  }
  .zc-date.today{
    @include bgColor(primaryBackground);
    @include fontColor(primary);
    //font-weight: 800;
    position: relative;
  }
  .zc-date.over,.zc-date.prev,.zc-date.next{
    @include fontColor(grayText);
  }
  .zc-date.today:before{
    content: "";
    display: inline-block;
    border: solid transparent;
    border-width: 0 0 7px 7px;
    @include border-bottom-color(primary);
    @include border-top-color(primary);
    position: absolute;
    bottom: 4px;
    right: 4px;
  }
  .zc-date.selected{
    @include bgColor(primary);
    @include fontColor(whiteText);
    text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.25);
  }
  .today.selected{
    @include bgColor(primaryBackground);
    @include fontColor(primary);
    font-weight: 800;
    text-shadow: none;
  }
  // 星期
  .picker-body{
    width: 100%;
    display: table;
    margin-top: 10px;
  }
  .picker-week{
    display: table-header-group;
  }
  .picker-date{
    display: table-row-group;
  }
  .picker-row{
    width: 100%;
    display: table-row;
  }
  .picker-cell{
    display: table-cell;
    text-align: center;
    width: 35px;
    height: 35px;
    border-radius: 4px;
    border: none;
    font-size: 14px;
    vertical-align: middle;
  }
  .picker-cell.bold{
    font-weight: 800;
  }
  // 弹出底部
  .picker-footer{
    margin-top: 10px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .today-button,.clear-button{
    width: 100%;
    height: 35px;
    border-radius: .5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
  }
  .today-button:hover{
    @include bgColor(primaryBackground);
  }
  .clear-button:hover{
    @include bgColor(warningBackground);
  }

.dropdown-enter-active,.dropdown-leave-active{
  opacity: 1;
  -webkit-transform: scaleY(1);
  transform: scaleY(1);
  -webkit-transition: opacity .3s cubic-bezier(.23, 1, .32, 1), -webkit-transform .3s cubic-bezier(.23, 1, .32, 1);
  transition: opacity .3s cubic-bezier(.23, 1, .32, 1), -webkit-transform .3s cubic-bezier(.23, 1, .32, 1);
  transition: transform .3s cubic-bezier(.23, 1, .32, 1), opacity .3s cubic-bezier(.23, 1, .32, 1);
  transition: transform .3s cubic-bezier(.23, 1, .32, 1), opacity .3s cubic-bezier(.23, 1, .32, 1), -webkit-transform .3s cubic-bezier(.23, 1, .32, 1);
  -webkit-transform-origin: center top;
  transform-origin: center top;
}
.dropdown-enter,
.dropdown-leave-active {
  opacity: 0;
  -webkit-transform: scaleY(0);
  transform: scaleY(0)
}
</style>

<i18n>
{
  "zh-CN": {
    "weeks": ["日","一","二","三","四","五","六"],
    "today-button": "今天",
    "clear-button": "清除",
    "months": ["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"]
  },
  "en_US": {
    "weeks": ["Su","Mo","Tu","We","Th","Fr","Sa"],
    "today-button": "Today",
    "clear-button": "Clear",
    "months": ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct" ,"Nov","Dec"]
  }
}
</i18n>
