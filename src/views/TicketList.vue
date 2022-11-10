<template lang="pug">
.ticket
  .personal
    img.avatar(src="./../assets/avatar11.png")
    .name(@click="copyText(userAddress, 'Copy successfully')") {{name}}
  .card(@click="turn" v-if="!type && cardList.title")
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
          .label-desc When
        .option {{cardList.when}}
  .message(v-if="type === 'notTicket'") There is no tickens yet
  .message(v-if="type === 'cantGetTicket'") The invitation seats have been filled
    br/ There is no tickens yet
  toast(:message="message", :type="toastType")
</template>

<script>
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import axios from 'axios';
import webObj from './web';
import toast from '../components/Toast.vue';

export default {
  name: 'TicketList',
  components: {
    toast,
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const type = ref(route.query.type);
    const toastType = ref('right');
    const message = ref('');
    const cardList = ref('');
    const userAddress = ref('');
    const name = ref();
    const changeName = (value) => {
      name.value = `${value.substring(0, 6)}……${value.substring(value.length - 4, value.length)}`;
      userAddress.value = value;
    };
    const handleImgSrc = (baseUrl, urlDetail) => {
      console.log('urlDetail: ', urlDetail);
      console.log('baseUrl: ', baseUrl);
      const url = `${baseUrl.split('/ipfs/')[0]}/ipfs/${urlDetail.split('ipfs://')[1]}`;
      return `https://${url.split('//')[1].split('/').slice(0, -1).join('/')}/1.png`;
    };
    if (!window.wallet) {
      const { greet, provider } = webObj;
      console.log('provider: ', provider);
      provider.send('eth_requestAccounts', []).then((addressInfo) => {
        window.wallet = {};
        window.wallet.provider = provider;
        // eslint-disable-next-line prefer-destructuring
        window.wallet.address = addressInfo[0];
        // eslint-disable-next-line prefer-destructuring
        userAddress.value = addressInfo[0];
        changeName(addressInfo[0]);
        greet.check_tokenid(addressInfo[0]).then((res) => {
        // eslint-disable-next-line no-underscore-dangle
          const tockenId = parseInt(res._hex, 16);
          if (tockenId === 0) {
            type.value = 'notTicket';
            router.push({
              path: 'ticketList',
              query: {
                type: 'notTicket',
              },
            });
          }
          greet.tokenURI(tockenId).then((info) => {
            console.log('info: ', info);
            window.wallet.tockenUrl = info;
            const JSONUrl = `${info}${tockenId + 1}.json`;
            axios.get(JSONUrl).then((response) => {
              const data = { ...response?.data?.attributes, image: handleImgSrc(info, response?.data?.attributes.img) };
              cardList.value = data;
              window.wallet.tickInfo = data;
            });
          }).catch((reason) => {
            type.value = 'cantGetTicket';
            router.push({
              path: 'ticketList',
              query: {
                type: 'cantGetTicket',
              },
            });
            console.log('reason:====1', reason);
          });
        }).catch((reason) => {
          type.value = 'notTicket';
          router.push({
            path: 'ticketList',
            query: {
              type: 'notTicket',
            },
          });
          console.log('reason:====2', reason);
        });
      });
    }
    const copyText = (value, msg) => {
      console.log('value: ', value);
      console.log('msg: ', msg);
      const copyInput = document.createElement('input');
      document.body.appendChild(copyInput);
      copyInput.setAttribute('value', value);
      copyInput.select();
      document.execCommand('Copy');
      message.value = msg;
      setTimeout(() => {
        message.value = '';
      }, 2000);
      copyInput.remove();// 删除动态创建的节点
    };
    if (!type.value && window.wallet) {
      cardList.value = window.wallet.tickInfo;
    }
    if (window.wallet) {
      changeName(window.wallet.address);
    }
    const turn = () => {
      router.push({ path: 'ticketInfo' });
    };
    return {
      cardList,
      toastType,
      userAddress,
      copyText,
      message,
      name,
      type,
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
      width 1.46rem
      height 1.52rem
      margin 0.62rem auto 0.42rem
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
        text-align left
      .option
        font-family 'Inter'
        font-style normal
        font-weight 400
        font-size 0.28rem
        line-height 0.34rem
        display inline-block
        color #A6A6A6
        vertical-align: top;
        width 4.2rem
        overflow hidden
        white-space nowrap
        text-overflow ellipsis
</style>
