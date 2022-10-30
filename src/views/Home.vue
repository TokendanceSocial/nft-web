<template lang="pug">
.home
  img.banner(src="./../assets/banner.png")
  .start(@click="turn")
  img.title(src="./../assets/Frame1410098464.png")
  .goal
    .sub-title 会议目的
    p 面向中文互联网从业者、创业者普及 Web3 应用创新创业知识，探索 Web3 时代中国互联网全球增长之道面向中文互联网从业者、
    p 创业者普及 Web3 应用创新创业知识，探索 Web3 时代中国互联网全球增长之道面向中文互联网从业者、创业者普及 Web3 应用创
    p 新创业知识，探索 Web3 时代中国互联网全球增长之道面向中文互联网从业者、创业者普及 Web3 应用创新创业知识，探索 Web3
    p 时代中国互联网全球增长之道面向中文互联网从业者、创业者普及 Web3 应用创新创业知识，探索 Web3 时代中国互联网全球增长之道
</template>

<script>
import { useRouter, useRoute } from 'vue-router';

export default {
  name: 'HomeView',
  components: {
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const { address, tockenUrl } = route.query;
    if (address && tockenUrl) {
      window.inviteInfo = {
        address,
        tockenUrl: decodeURIComponent(tockenUrl),
      };
    }
    console.log('router: ', router);
    const turn = () => {
      console.log('userAgent:=====', window.navigator.userAgent);
      router.push({
        path: 'person',
      });
      // window.location.href = 'https://metamask.app.link/dapp/www.baidu.com';
      // window.location.href = 'https://metamask.app.link/dapp/www.baidu.com/';
    };
    return {
      turn,
    };
  },
};
</script>
<style lang="stylus" scoped>
.home
  width 100%
  min-height 100%
  background-image url('./../assets/home-bg.png')
  background-size 100%
  background-repeat no-repeat
  background-color #0C0C10
  padding-top 0.76rem
  overflow hidden
  .banner
    width 100%
  .start
    width 6.44rem
    height 1rem
    background-image url('./../assets/startDefault.png')
    box-shadow inset 0px 4.36364px 5.45455px rgba(255, 255, 255, 0.6)
    filter drop-shadow(0px 4.36364px 4.36364px rgba(0, 0, 0, 0.25))
    margin 0.66rem auto 0.96rem
    border-radius 0.16rem
    background-size 100% 100%
    &:active
      background-image url('./../assets/startActive.png')
  .title
    width 5.9rem
  .goal
    box-sizing border-box
    width 6.7rem
    margin 0 auto 0.4rem
    border 0.01rem solid #C1E9FF
    padding 0.46rem 0.4rem 0.4rem
    border-radius 0.76rem
    .sub-title
      margin-bottom 0.18rem
      font-family 'PingFang SC'
      font-style normal
      font-weight 600
      font-size 0.28rem
      line-height 0.4rem
      letter-spacing 0.1em
      text-transform capitalize
      background linear-gradient(180deg, #87BECA 0%, rgba(135, 190, 202, 0) 100%)
      -webkit-background-clip text
      -webkit-text-fill-color transparent
      background-clip text
      text-fill-color transparent
      text-align left
    p
      font-family 'PingFang SC'
      font-style normal
      font-weight 400
      font-size 0.26rem
      line-height 0.4rem
      text-transform capitalize
      color #FFFFFF
      opacity 0.5
      text-align left
</style>
