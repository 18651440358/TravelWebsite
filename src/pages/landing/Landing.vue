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
                <div class="search-tip-container" :style="tipStyle" v-if="tipShow">
                  <vue-scroll :ops="ops">
                    <div class="tip-head" v-if="searchValue">
                      <span>{{$t('tip-head')}}</span>
                      <span class="destination">{{searchValue}}</span>
                    </div>
                    <ul v-if="tipList.length !== 0">
                      <li @click="submitLenovo(tip)" class="tip-item" v-for="(tip,index) in tipList" :key="'tipList' + index">
                        <div class="tip-icon">
                          <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                            <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                              <rect x="0" y="0" width="24" height="24"/>
                              <path d="M5,10.5 C5,6 8,3 12.5,3 C17,3 20,6.75 20,10.5 C20,12.8325623 17.8236613,16.03566 13.470984,20.1092932 C12.9154018,20.6292577 12.0585054,20.6508331 11.4774555,20.1594925 C7.15915182,16.5078313 5,13.2880005 5,10.5 Z M12.5,12 C13.8807119,12 15,10.8807119 15,9.5 C15,8.11928813 13.8807119,7 12.5,7 C11.1192881,7 10,8.11928813 10,9.5 C10,10.8807119 11.1192881,12 12.5,12 Z" fill="#000000" fill-rule="nonzero"/>
                            </g>
                          </svg>
                        </div>
                        <span style="font-weight: bold;margin-right: 5px" v-if="tip.city">{{tip.city}},</span>
                        <span v-if="tip.country">{{tip.country}}</span>
                      </li>
                    </ul>
                    <div v-if="tipList.length === 0" class='empty'>
                      <svg width="122px" height="104px" viewBox="0 0 122 104" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                        <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                          <g id="空白页" transform="translate(-502.000000, -664.000000)">
                            <g id="暂无评论" transform="translate(502.000000, 664.000000)">
                              <g id="分组-2">
                                <g id="背景/线" fill="#C3CBD6">
                                  <g id="-">
                                    <g id="编组" transform="translate(14.200000, 9.200000)" fill-rule="nonzero">
                                      <path d="M0.8,73.1 C0.3581722,73.1 -5.68434189e-14,72.7418278 -5.68434189e-14,72.3 C-5.68434189e-14,71.8581722 0.3581722,71.5 0.8,71.5 L70.8,71.5 C71.2418278,71.5 71.6,71.8581722 71.6,72.3 C71.6,72.7418278 71.2418278,73.1 70.8,73.1 L0.8,73.1 Z M74.8,73.1 C74.3581722,73.1 74,72.7418278 74,72.3 C74,71.8581722 74.3581722,71.5 74.8,71.5 L77.3,71.5 C77.7418278,71.5 78.1,71.8581722 78.1,72.3 C78.1,72.7418278 77.7418278,73.1 77.3,73.1 L74.8,73.1 Z M83.8,73.1 C83.3581722,73.1 83,72.7418278 83,72.3 C83,71.8581722 83.3581722,71.5 83.8,71.5 L92.8,71.5 C93.2418278,71.5 93.6,71.8581722 93.6,72.3 C93.6,72.7418278 93.2418278,73.1 92.8,73.1 L83.8,73.1 Z M23.8,80.6 C23.3581722,80.6 23,80.2418278 23,79.8 C23,79.3581722 23.3581722,79 23.8,79 L30.8,79 C31.2418278,79 31.6,79.3581722 31.6,79.8 C31.6,80.2418278 31.2418278,80.6 30.8,80.6 L23.8,80.6 Z M35.3,80.6 C34.8581722,80.6 34.5,80.2418278 34.5,79.8 C34.5,79.3581722 34.8581722,79 35.3,79 L65.8,79 C66.2418278,79 66.6,79.3581722 66.6,79.8 C66.6,80.2418278 66.2418278,80.6 65.8,80.6 L35.3,80.6 Z M80,52.8 C80,51.7333333 81.6,51.7333333 81.6,52.8 L81.6,55.8 C81.6,56.2418278 81.2418278,56.6 80.8,56.6 L77.8,56.6 C76.7333333,56.6 76.7333333,55 77.8,55 L80,55 L80,52.8 Z M81.6,58.8 C81.6,59.8666667 80,59.8666667 80,58.8 L80,55.8 C80,55.3581722 80.3581722,55 80.8,55 L83.8,55 C84.8666667,55 84.8666667,56.6 83.8,56.6 L81.6,56.6 L81.6,58.8 Z M4,28.8 C4,27.7333333 5.6,27.7333333 5.6,28.8 L5.6,31.8 C5.6,32.2418278 5.2418278,32.6 4.8,32.6 L1.8,32.6 C0.733333333,32.6 0.733333333,31 1.8,31 L4,31 L4,28.8 Z M78.1,3.5 L80.8,3.5 C81.8666667,3.5 81.8666667,5.1 80.8,5.1 L78.1,5.1 L78.1,7.8 C78.1,8.86666667 76.5,8.86666667 76.5,7.8 L76.5,5.1 L73.8,5.1 C72.7333333,5.1 72.7333333,3.5 73.8,3.5 L76.5,3.5 L76.5,0.8 C76.5,-0.266666667 78.1,-0.266666667 78.1,0.8 L78.1,3.5 Z M5.6,34.8 C5.6,35.8666667 4,35.8666667 4,34.8 L4,31.8 C4,31.3581722 4.3581722,31 4.8,31 L7.8,31 C8.86666667,31 8.86666667,32.6 7.8,32.6 L5.6,32.6 L5.6,34.8 Z" id="Path-2"></path>
                                      <path d="M14.0928932,61.1431458 C14.5642977,60.6717412 15.2714045,61.378848 14.8,61.8502525 L13.7393398,62.9109127 C13.5440777,63.1061748 13.2274952,63.1061748 13.032233,62.9109127 L11.9715729,61.8502525 C11.5001684,61.378848 12.2072751,60.6717412 12.6786797,61.1431458 L13.3857864,61.8502525 L14.0928932,61.1431458 Z M12.6786797,63.9715729 C12.2072751,64.4429774 11.5001684,63.7358706 11.9715729,63.2644661 L13.032233,62.2038059 C13.2274952,62.0085438 13.5440777,62.0085438 13.7393398,62.2038059 L14.8,63.2644661 C15.2714045,63.7358706 14.5642977,64.4429774 14.0928932,63.9715729 L13.3857864,63.2644661 L12.6786797,63.9715729 Z M22.9213203,8.8 C23.3927249,8.32859548 24.0998316,9.03570226 23.6284271,9.50710678 L22.567767,10.567767 C22.3725048,10.7630291 22.0559223,10.7630291 21.8606602,10.567767 L20.8,9.50710678 C20.3285955,9.03570226 21.0357023,8.32859548 21.5071068,8.8 L22.2142136,9.50710678 L22.9213203,8.8 Z M21.5071068,11.6284271 C21.0357023,12.0998316 20.3285955,11.3927249 20.8,10.9213203 L21.8606602,9.86066017 C22.0559223,9.66539803 22.3725048,9.66539803 22.567767,9.86066017 L23.6284271,10.9213203 C24.0998316,11.3927249 23.3927249,12.0998316 22.9213203,11.6284271 L22.2142136,10.9213203 L21.5071068,11.6284271 Z" id="Path复制"></path>
                                    </g>
                                  </g>
                                </g>
                                <g id="编组" transform="translate(34.000000, 26.000000)" stroke="#C3CBD6">
                                  <g id="编组-2" transform="translate(20.000000, 0.000000)">
                                    <path d="M30.009431,24 L27.7741927,26.6615957 C27.0638359,27.5074485 25.8022787,27.6172897 24.9564259,26.9069329 C24.8676943,26.8324151 24.7856065,26.7503272 24.7110887,26.6615957 L22.4758503,24 L3,24 C1.34314575,24 2.02906125e-16,22.6568542 0,21 L0,3 C-2.02906125e-16,1.34314575 1.34314575,3.04359188e-16 3,0 L33,0 C34.6568542,-3.04359188e-16 36,1.34314575 36,3 L36,21 C36,22.6568542 34.6568542,24 33,24 L30.009431,24 Z" id="矩形-2" stroke-width="1.6" fill="#F5F7F9"></path>
                                    <path d="M10,14 C8.8954305,14 8,13.1045695 8,12 C8,10.8954305 8.8954305,10 10,10 C11.1045695,10 12,10.8954305 12,12 C12,13.1045695 11.1045695,14 10,14 Z M18,14 C16.8954305,14 16,13.1045695 16,12 C16,10.8954305 16.8954305,10 18,10 C19.1045695,10 20,10.8954305 20,12 C20,13.1045695 19.1045695,14 18,14 Z M26,14 C24.8954305,14 24,13.1045695 24,12 C24,10.8954305 24.8954305,10 26,10 C27.1045695,10 28,10.8954305 28,12 C28,13.1045695 27.1045695,14 26,14 Z" id="椭圆形-2复制" fill="#C3CBD6"></path>
                                  </g>
                                  <g id="编组-3" transform="translate(0.000000, 18.000000)">
                                    <path d="M14.009431,24 L11.7741927,26.6615957 C11.0638359,27.5074485 9.8022787,27.6172897 8.95642589,26.9069329 C8.86769434,26.8324151 8.78560646,26.7503272 8.71108869,26.6615957 L6.47585035,24 L3,24 C1.34314575,24 2.02906125e-16,22.6568542 0,21 L0,3 C-2.02906125e-16,1.34314575 1.34314575,3.04359188e-16 3,0 L33,0 C34.6568542,-3.04359188e-16 36,1.34314575 36,3 L36,21 C36,22.6568542 34.6568542,24 33,24 L14.009431,24 Z" id="矩形复制-4" stroke-width="1.6" fill="#FFFFFF"></path>
                                    <path d="M10,14 C8.8954305,14 8,13.1045695 8,12 C8,10.8954305 8.8954305,10 10,10 C11.1045695,10 12,10.8954305 12,12 C12,13.1045695 11.1045695,14 10,14 Z M18,14 C16.8954305,14 16,13.1045695 16,12 C16,10.8954305 16.8954305,10 18,10 C19.1045695,10 20,10.8954305 20,12 C20,13.1045695 19.1045695,14 18,14 Z M26,14 C24.8954305,14 24,13.1045695 24,12 C24,10.8954305 24.8954305,10 26,10 C27.1045695,10 28,10.8954305 28,12 C28,13.1045695 27.1045695,14 26,14 Z" id="椭圆形-2" fill="#C3CBD6"></path>
                                  </g>
                                </g>
                              </g>
                            </g>
                          </g>
                        </g>
                      </svg>
                      <h3>{{$t('tio-empty')}}</h3>
                    </div>
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
<!--                map-tip-->
                <span class="map-tip" v-html="$t('map-tip')"></span>
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
import {titleCase} from '@/util/titleCase.js';
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
        vuescroll: {
          sizeStrategy: '100%'
        },
        scrollPanel: {
          maxHeight: 210,
        },
        rail: {},
        bar: {
          background: '#e2ebf3',
          size: '5px'
        }
      },
      tipList: [],
      tipShow: false,

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
      var value = [];
      this.tipList = [];



      if (val.trim() === ""){
        this.tipShow = false
        return
      }else{
        this.tipShow = true
      }

      // 先查找国家
      this.searchData.country.forEach((item)=>{
        if (this.$i18n.locale === 'en_US' && item.nameEn.toLowerCase().indexOf(val.toLowerCase()) !== -1){
          // 查到了是英文
          this.searchData.mainCity.forEach((city) => {
            if (city.countryCode === item.code)
              value.push({city: city.nameEn,country: item.nameEn})
          })
          if(!value.length)
            value.push({country: item.nameEn})
        }else if(this.$i18n.locale === 'zh-CN' && item.name.indexOf(val) !== -1){
          // 查到了是中文
          this.searchData.mainCity.forEach((city) => {
            if (city.countryCode === item.code)
              value.push({city: city.name,country: item.name})
          })
          if(!value.length)
            value.push({country: item.name})
        }
      })

      // 查找城市
      if(!value.length){
        // 没有相对应国家
        this.searchData.mainCity.forEach((city) => {
          if (this.$i18n.locale === 'en_US' && city.nameEn.toLowerCase().indexOf(val.toLowerCase()) !== -1){
            value.push({city: city.nameEn})
          }else if(this.$i18n.locale === 'zh-CN' && city.name.indexOf(val) !== -1){
            value.push({city: city.name})
          }
        })
      }

      this.tipList = value

      this.searchValue = titleCase(this.searchValue)

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
    },
    // 提交联想
    submitLenovo(obj){
      var str = "";
      if (obj.city)
        str += obj.city + ", "
      if (obj.country)
        str += obj.country

      this.searchValue = str
      this.tipList = []

      let _this = this;
      setTimeout(function (){
        _this.tipShow = false
      },150)
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
  padding: 30px 20px;
  position: fixed;
  left: 0;
  top: 0;
  max-height: 270px;
  z-index: 10;
  overflow: hidden;
}
.search-tip-container .empty{
  display: flex;
  flex-direction: column;
  align-items: center;
}
.search-tip-container .empty svg [fill="#C3CBD6"]{
  @include fill(LightText);
}
.search-tip-container .empty h3{
  margin-top: 20px;
  @include fontColor(LightText);
  font-size: 12px;
  font-weight: 400;
}
.tip-head{
  @include fontColor(grayText);
  font-size: 13px;
  margin-bottom: 5px;
  padding: 0 10px;
}
.tip-head .destination{
  font-weight: 500;
  @include fontColor(primaryText);
}
.tip-item{
  padding: 10px;
  border-radius: .5rem;
  display: flex;
  align-items: center;
  cursor: pointer;
  @include fontColor(primaryText);
}
.tip-item:hover{
  @include bgColor(hover);
}
.tip-item .tip-icon{
  width: 30px;
  line-height: 1;
}
.tip-item .tip-icon svg g [fill]{
  @include fill(primaryText);
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
.map-tip{
  color: #fff;
  position: absolute;
  left: 50%;
  top: 30px;
  transform: translate3d(-50%,0,0);
  z-index: 2;
  text-align: center;
}

</style>

<i18n>
{
  "zh-CN": {
    "greet": "您好 ",
    "defaultName": "旅行家，",
    "hello": ["早上好！","上午好！","中午好！","下午好！","晚上好！"],
    "title": ["","旅行 ","触手可及<br>现在开始你的假期"],
    "search": "现在出发",
    "tonight": ["或者","今晚在附近寻找酒店？"],
    "top-destination": "热门目的地",
    "map-step": ["目的地", "住宿时间", "游客登记"],
    "search-placeholder": "请查询目的地或者酒店名字",
    "tip-head": "正在对关键词进行搜索 ",
    "tio-empty": "抱歉，暂无找到目的地,敬请期待",
    "map-tip": "你的下一个度假胜地<br>比你想象的要更近."
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
    "tip-head": "Popular search for ",
    "tio-empty": "Sorry, no destination has been found yet, so stay tuned",
    "map-tip": "Your next vacation destination<br>is closer than you think."
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
