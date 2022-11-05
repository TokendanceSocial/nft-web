<template lang="pug">
.home
  img.banner(src="./../assets/banner.png")
  .start(@click="turn")
  .title What kind of meeting is this？
  .goal
    //- .sub-title 会议目的
    .desc A co-creation conference for web3 buidlers and tech firm employees to explore new possibilities of Web3 applications
    p Purpose of the meeting: First-line experience + web3 technology and ideas = disruptive innovation
    p Venue:
    span Online: multi-channel LIVE streaming
    span Offline: Hongqiao region, Shanghai
    p Time: Nov. 25-Nov. 27, 2022
    p Participants: employees of BAT, Web3 buidlers, investors etc.
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
      // const { userAgent } = window.navigator;
      // console.log('userAgent: ', userAgent);
      // console.log('userAgent:=====', userAgent.indexOf('MetaMaskMobile'));
      // if (userAgent.indexOf('MetaMaskMobile') !== -1) {
      router.push({
        path: 'person',
      });
      // } else {
      //   window.location.href = 'https://metamask.app.link/dapp/www.baidu.com';
      // }
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
    margin 0.66rem auto 0.92rem
    border-radius 0.16rem
    background-size 100% 100%
    &:active
      background-image url('./../assets/startActive.png')
  .title
    width 100%
    height 0.44rem
    background-image url('./../assets/Frame1410098464.png')
    background-size 5.9rem 0.44rem
    margin-bottom 0.36rem
    background-position: center center;
    background-repeat no-repeat
    text-align center
    font-family: 'PingFang SC';
    font-style: normal;
    font-weight: 600;
    font-size: 0.32rem
    line-height: 0.44rem;
    text-align: center;
    letter-spacing: 0.145em;
    text-transform: capitalize;
    color: #D2F7FF;
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
    .desc
      font-family 'PingFang SC'
      font-style normal
      font-weight 400
      font-size 0.26rem
      line-height 0.4rem
      text-transform capitalize
      color #FFFFFF
      opacity 0.5
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
      &:before
        content '•'
        color black
        font-size 0.2rem
        margin-right 0.2rem
        line-height 0.4rem
        color #fff
        font-weight bold
    span
      font-family 'PingFang SC'
      font-style normal
      font-weight 400
      font-size 0.26rem
      line-height 0.4rem
      text-transform capitalize
      color #FFFFFF
      opacity 0.5
      text-align left
      display block
      margin-left 0.6rem
</style>
