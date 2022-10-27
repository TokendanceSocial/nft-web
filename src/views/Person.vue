<template lang="pug">
.person(@click="connet")
  .content
    .title Connet your Wallet
    img.avatar(src="./../assets/avatar.png")
    p.name MetaMask
    .division
    .into Click to authorize
</template>

<script>
import { useRouter } from 'vue-router';

export default {
  name: 'PersonView',
  components: {
  },
  setup() {
    const router = useRouter();
    const connet = () => {
      router.push({
        path: 'getTicket',
      });
    };
    return {
      connet,
    };
  },
};
</script>
<style lang="stylus" scoped>
.person
  width 100%
  height 100%
  background #001419
  position relative
  .content
    width 6.3rem
    height 8.52rem
    position absolute
    top 2rem
    left 50%
    transform translateX(-50%)
    background-image url(./../assets/bg-personal.png)
    background-size 100% 100%
    .title
      font-family 'Inter'
      font-style italic
      font-weight 800
      font-size 0.4rem
      line-height 0.76rem
      color #FFFFFF
      margin-top 0.32rem
      text-align center
      margin-bottom 1.52rem
    .avatar
      width 2.52rem
      height 2.52rem
      margin 0 auto 0.28rem
      display block
    .name
      font-family 'PingFang SC'
      font-style normal
      font-weight 400
      font-size 0.28rem
      line-height 0.48rem
      text-align center
      color #FFFFFF
      margin-bottom 1.38rem
    .division
      width 4.56rem;
      opacity 0.2;
      border 0.5px solid #9FC9F7;
      margin 0 auto 0.28rem
    .into
      font-family 'PingFang SC'
      font-style normal
      font-weight 500
      font-size 0.32rem
      line-height 0.48rem
      text-align center
      color #FFFFFF
      opacity 0.6
</style>
