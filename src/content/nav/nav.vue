<template>
<!--顶部导航-->
  <nav class="zc-nav">
    <zc-container>
      <zc-row>
        <div class="nav-content">
<!--        logo-->
          <router-link class="nav-logo" to="/">
          <span>Tootravel</span>
          </router-link>
<!--        导航部分-->
          <ul class="menu-box">
          <li>
            <router-link class="menu-item" to="/" :class="{'active': NavStyle[0]}">
              <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                  <rect x="0" y="0" width="24" height="24"/>
                  <path d="M12,21 C7.02943725,21 3,16.9705627 3,12 C3,7.02943725 7.02943725,3 12,3 C16.9705627,3 21,7.02943725 21,12 C21,16.9705627 16.9705627,21 12,21 Z M14.1654881,7.35483745 L9.61055177,10.3622525 C9.47921741,10.4489666 9.39637436,10.592455 9.38694497,10.7495509 L9.05991526,16.197949 C9.04337012,16.4735952 9.25341309,16.7104632 9.52905936,16.7270083 C9.63705011,16.7334903 9.74423017,16.7047714 9.83451193,16.6451626 L14.3894482,13.6377475 C14.5207826,13.5510334 14.6036256,13.407545 14.613055,13.2504491 L14.9400847,7.80205104 C14.9566299,7.52640477 14.7465869,7.28953682 14.4709406,7.27299168 C14.3629499,7.26650974 14.2557698,7.29522855 14.1654881,7.35483745 Z" fill="#000000" opacity="0.8" />
                </g>
              </svg>
              <span>{{$t('navigation')[0]}}</span>
            </router-link>
          </li>
          <li>
            <router-link class="menu-item" to="/" :class="{'active': NavStyle[1]}">
              <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                  <rect x="0" y="0" width="24" height="24"/>
                  <path d="M14.2928932,16.7071068 C13.9023689,16.3165825 13.9023689,15.6834175 14.2928932,15.2928932 C14.6834175,14.9023689 15.3165825,14.9023689 15.7071068,15.2928932 L19.7071068,19.2928932 C20.0976311,19.6834175 20.0976311,20.3165825 19.7071068,20.7071068 C19.3165825,21.0976311 18.6834175,21.0976311 18.2928932,20.7071068 L14.2928932,16.7071068 Z" fill="#000000" fill-rule="nonzero" opacity="0.3"/>
                  <path d="M11,16 C13.7614237,16 16,13.7614237 16,11 C16,8.23857625 13.7614237,6 11,6 C8.23857625,6 6,8.23857625 6,11 C6,13.7614237 8.23857625,16 11,16 Z M11,18 C7.13400675,18 4,14.8659932 4,11 C4,7.13400675 7.13400675,4 11,4 C14.8659932,4 18,7.13400675 18,11 C18,14.8659932 14.8659932,18 11,18 Z" fill="#000000" fill-rule="nonzero"/>
                </g>
              </svg>
              <span>{{$t('navigation')[1]}}</span>
            </router-link>
          </li>
          <li>
            <router-link class="menu-item" to="/" :class="{'active': NavStyle[2]}">
              <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                  <rect x="0" y="0" width="24" height="24"/>
                  <circle fill="#000000" opacity="0.3" cx="12" cy="12" r="9"/>
                  <path d="M11.7357634,20.9961946 C6.88740052,20.8563914 3,16.8821712 3,12 C3,11.9168367 3.00112797,11.8339369 3.00336944,11.751315 C3.66233009,11.8143341 4.85636818,11.9573854 4.91262842,12.4204038 C4.9904938,13.0609191 4.91262842,13.8615942 5.45804656,14.101772 C6.00346469,14.3419498 6.15931561,13.1409372 6.6267482,13.4612567 C7.09418079,13.7815761 8.34086797,14.0899175 8.34086797,14.6562185 C8.34086797,15.222396 8.10715168,16.1034596 8.34086797,16.2636193 C8.57458427,16.423779 9.5089688,17.54465 9.50920913,17.7048097 C9.50956962,17.8649694 9.83857487,18.6793513 9.74040201,18.9906563 C9.65905192,19.2487394 9.24857641,20.0501554 8.85059781,20.4145589 C9.75315358,20.7620621 10.7235846,20.9657742 11.7357634,20.9960544 L11.7357634,20.9961946 Z M8.28272988,3.80112099 C9.4158415,3.28656421 10.6744554,3 12,3 C15.5114513,3 18.5532143,5.01097452 20.0364482,7.94408274 C20.069657,8.72412177 20.0638332,9.39135321 20.2361262,9.6327358 C21.1131932,10.8600506 18.0995147,11.7043158 18.5573343,13.5605384 C18.7589671,14.3794892 16.5527814,14.1196773 16.0139722,14.886394 C15.4748026,15.6527403 14.1574598,15.137809 13.8520064,14.9904917 C13.546553,14.8431744 12.3766497,15.3341497 12.4789081,14.4995164 C12.5805657,13.664636 13.2922889,13.6156126 14.0555619,13.2719546 C14.8184743,12.928667 15.9189236,11.7871741 15.3781918,11.6380045 C12.8323064,10.9362407 11.963771,8.47852395 11.963771,8.47852395 C11.8110443,8.44901109 11.8493762,6.74109366 11.1883616,6.69207022 C10.5267462,6.64279981 10.170464,6.88841096 9.20435656,6.69207022 C8.23764828,6.49572949 8.44144409,5.85743687 8.2887174,4.48255778 C8.25453994,4.17415686 8.25619136,3.95717082 8.28272988,3.80112099 Z M20.9991771,11.8770357 C20.9997251,11.9179585 21,11.9589471 21,12 C21,16.9406923 17.0188468,20.9515364 12.0895088,20.9995641 C16.970233,20.9503326 20.9337111,16.888438 20.9991771,11.8770357 Z" fill="#000000" opacity="0.7"/>
                </g>
              </svg>
              <span>{{$t('navigation')[2]}}</span>
            </router-link>
          </li>
          <li>
            <router-link class="menu-item" to="/" :class="{'active': NavStyle[3]}">
              <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                  <rect x="0" y="0" width="24" height="24"/>
                  <path d="M12,3 C16.418278,3 20,6.581722 20,11 L20,21 C20,21.5522847 19.5522847,22 19,22 L5,22 C4.44771525,22 4,21.5522847 4,21 L4,11 C4,6.581722 7.581722,3 12,3 Z M9,10 C7.34314575,10 6,11.3431458 6,13 C6,14.6568542 7.34314575,16 9,16 L15,16 C16.6568542,16 18,14.6568542 18,13 C18,11.3431458 16.6568542,10 15,10 L9,10 Z" fill="#000000" opacity="0.8"/>
                  <path d="M15,14 C14.4477153,14 14,13.5522847 14,13 C14,12.4477153 14.4477153,12 15,12 C15.5522847,12 16,12.4477153 16,13 C16,13.5522847 15.5522847,14 15,14 Z M9,14 C8.44771525,14 8,13.5522847 8,13 C8,12.4477153 8.44771525,12 9,12 C9.55228475,12 10,12.4477153 10,13 C10,13.5522847 9.55228475,14 9,14 Z" fill="#000000" opacity="0.3"/>
                </g>
              </svg>
              <span>{{$t('navigation')[3]}}</span>
            </router-link>
          </li>
        </ul>
<!--        头像-->
          <zc-avatar></zc-avatar>
        </div>
      </zc-row>
    </zc-container>
  </nav>
</template>

<script>
import ZcContainer from "@/component/container/container";
import ZcAvatar from "@/component/avatar/avatar";
import ZcRow from "@/component/row/row";
export default {
  name: "zc-nav",
  components: {ZcRow, ZcAvatar, ZcContainer},
  computed: {
    NavStyle(){
      const path = this.$route.path;
      return [
          ["/landing"].includes(path),
          [""].includes(path),
          [""].includes(path),
          [""].includes(path)
      ]
    }
  },
  mounted() {

  }
}
</script>

<style scoped lang="scss">
@import "../../assets/style/theme/_handle.scss";
  // 导航主体
  .nav-content {
    height: 65px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  // logo
  .nav-logo{
    font-weight: bold;
    font-family: "Pattaya",sans-serif;
    font-size: 30px;
    text-shadow: 3px 3px 5px #698096;
  }

  // 导航主体
  .menu-box,.menu-item{
    display: flex;
    align-items: center;
  }
  .menu-item{
    padding: .75rem 1.25rem;
  }
  .menu-item svg g [fill]{
    @include fill(regularText);
    @include transition(150ms);
  }
  .menu-item span{
    margin-left: .3rem;
    font-size: 16px;
    line-height: 1;
    transform: translate3d(0,1px,0);
    font-weight: 500;
    @include fontColor(regularText);
    @include transition(150ms);
  }
  .menu-item:hover span{
    @include fontColor(primaryText);
  }
  .menu-item:hover  svg g [fill]{
    @include fill(primaryText);
  }

  // 选中后
  .menu-item.active span{
    @include fontColor(primary);
  }
  .menu-item.active svg g [fill]{
    @include fill(primary);
  }

</style>

<i18n>
{
  "zh-CN": {
    "navigation": ["探索景点","开始旅程","景点打卡","新闻&故事"]
  },
  "en_US": {
    "navigation": ["Discover","Search", "Travel Blog", "News & Stories"]
  }
}
</i18n>
