<template lang="pug">
.ticket
  .personal
    img.avatar(src="./../assets/avatar.png")
    .name {{name}}
  .card(@click="turn" v-if="!type")
    img.icon(:src="cardList.image")
    .title {{cardList.title}}
      img.open(src="./../assets/open.png")
    .info
      .options
        .label
          img.icon-label(src="./../assets/where.png")
          .label-desc Where
        .option {{cardList.where}}
      .options
        .label
          img.icon-label(src="./../assets/when.png")
          .label-desc Where
        .option {{cardList.when}}
  .message(v-if="type === 'notTicket'") There is no tickens yet
  .message(v-if="type === 'cantGetTicket'") The invitation seats have been filled
    br/ There is no tickens yet

</template>

<script>
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';

export default {
  name: 'TicketList',
  setup() {
    const router = useRouter();
    const { type } = useRoute().query;
    const cardList = ref('');
    if (!type) {
      cardList.value = window.wallet.tickInfo;
    }
    const connetIng = ref(false);
    const loading = ref(false);
    const name = ref();
    const changeName = (value) => {
      name.value = `${value.substring(0, 6)}……${value.substring(value.length - 4, value.length)}`;
    };
    changeName(window.wallet.address);
    const turn = () => {
      router.push({ path: 'ticketInfo' });
    };
    return {
      cardList,
      name,
      type,
      connetIng,
      loading,
      turn,
    };
  },
};
</script>
<style lang="stylus" scoped>
.ticket
  width 100%
  min-height 100%
  background #0C1119
  position relative
  overflow hidden
  .personal
    width 100%
    overflow hidden
  .message
    width 5.8rem
    font-family: 'PingFang SC';
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 24px;
    margin 2rem auto 0
    text-align center
    color: #FFFFFF;
    opacity: 0.5;
  .avatar
    width 2.08rem
    height 2.08rem
    border-radius 50%
    display block
    margin 0.5rem auto 0.3rem
  .name
    background rgba(86, 169, 249, 0.2)
    border-radius 0.4rem
    margin 0 auto 1rem
    padding 0.04rem 0.4rem
    display inline-block
    font-family 'PingFang SC'
    font-style normal
    font-weight 400
    font-size 0.28rem
    line-height 0.48rem
    text-align center
    color #FFFFFF
  .card
    width 6.7rem
    height 4.54rem
    border-radius 0px 0px 0.4rem 0.4rem
    margin 0 auto 0.4rem
    background-image url(./../assets/cardBg.png)
    background-size 100% 100%
    overflow hidden
    .icon
      width 2.3rem
      height 2.3rem
      margin 0.2rem auto 0.06rem
      display block
    .title
      font-family 'PingFang SC'
      font-style normal
      font-weight 500
      font-size 0.28rem
      line-height 0.48rem
      color #FFFFFF
      opacity 0.9
      text-align left
      margin 0 0.24rem 0.1rem 0.24rem
      position relative
    .open
      width 0.32rem
      height 0.32rem
      top 0.08rem
      right 0
      position absolute
    .info
      width 100%
      padding-top 0.24rem
      text-align left
      box-sizing border-box
      padding-left 0.24rem
      .options
        margin-bottom 0.24rem
        line-height 0.34rem
      .label
        width 2rem
        display inline-block
        line-height 0.34rem
      .icon-label
        width 0.32rem
        height 0.32rem
        display inline-block
        vertical-align: top;
        margin-right 0.2rem
      .label-desc
        font-family 'Inter'
        font-style normal
        font-weight 400
        font-size 0.28rem
        line-height 0.34rem
        color #A6A6A6
        opacity 0.5
        display inline-block
        vertical-align: top;
      .option
        font-family 'Inter'
        font-style normal
        font-weight 400
        font-size 0.28rem
        line-height 0.34rem
        display inline-block
        color #A6A6A6
        vertical-align: top;
</style>
