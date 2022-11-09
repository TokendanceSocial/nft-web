<template lang="pug">
.person
  .content
    img.title(src="./../assets/NewTicken.png")
    .loading(v-if="loading") Your ticken is coming…
    img.icon(:src="tickInfo.image" v-show="!loading")
    .desc(v-show="!loading") {{tickInfo.title}}
    img.get-it(src="./../assets/getIt.png" v-show="!loading" @click="turn")
</template>

<script>
import { ref, nextTick } from 'vue';
import { useRouter } from 'vue-router';
import { ethers } from 'ethers';
import axios from 'axios';
import { contractAbi } from '../config/TicketContract';
import config from '../config/index';

export default {
  name: 'GetTicket',
  setup() {
    const router = useRouter();
    const loading = ref(true);
    const turn = () => {
      router.push({ path: 'ticketList' });
    };
    const tockenId = ref('');
    const tickInfo = ref({});
    const isBuy = ref(false);
    const handleImgSrc = (baseUrl, urlDetail) => {
      console.log('urlDetail: ', urlDetail);
      console.log('baseUrl: ', baseUrl);
      const url = `${baseUrl.split('/ipfs/')[0]}/ipfs/${urlDetail.split('ipfs://')[1]}`;
      return `https://${url.split('//')[1].split('/').slice(0, -1).join('/')}/1.png`;
    };
    let provider = {};
    let address = '';
    let signer = {};
    let greet = {};
    if (!window.wallet) {
      router.push({ path: 'ticketList' });
    } else {
      provider = window.wallet.provider;
      address = window.wallet.address;
      signer = provider.getSigner();
      greet = new ethers.Contract(config.CONTRACT_ADDRESS, contractAbi.abi, signer);
    }
    const getTicketInfo = () => {
      greet.check_tokenid(address).then((res) => {
        // eslint-disable-next-line no-underscore-dangle
        tockenId.value = parseInt(res._hex, 16);
        if (tockenId.value === 0) {
          router.push({
            path: 'ticketList',
            query: {
              type: 'notTicket',
            },
          });
        }
        greet.tokenURI(tockenId.value).then((info) => {
          console.log('info: ', info);
          window.wallet.tockenUrl = info;
          const JSONUrl = `${info}${tockenId.value + 1}.json`;
          axios.get(JSONUrl).then((response) => {
            const data = { ...response?.data?.attributes, image: handleImgSrc(info, response?.data?.attributes.img) };
            tickInfo.value = data;
            window.wallet.tickInfo = data;
            if (!isBuy.value) {
              router.push({
                path: 'ticketList',
              });
            }
            nextTick(() => {
              loading.value = false;
            });
          });
        }).catch((reason) => {
          loading.value = false;
          router.push({
            path: 'ticketList',
            query: {
              type: 'cantGetTicket',
            },
          });
          console.log('reason:====1', reason);
        });
      }).catch((reason) => {
        loading.value = false;
        router.push({
          path: 'ticketList',
          query: {
            type: 'cantGetTicket',
          },
        });
        console.log('reason:====2', reason);
      });
    };
    const handleEthereum = async () => {
      if (window.inviteInfo) {
        // 判断是否是购买了
        greet.check_tokenid(address).then((res) => {
          // eslint-disable-next-line no-underscore-dangle
          tockenId.value = parseInt(res._hex, 16);
          // tockenId.value = 0 代表没购买
          if (tockenId.value === 0) {
            const { address: shareAddress, tockenUrl } = window.inviteInfo;
            console.log('tockenUrl: ', tockenUrl);
            console.log('address: ', address);
            console.log('shareAddress: ', shareAddress);
            greet.mint_2g(shareAddress, address, tockenUrl, {
              gasLimit: 600000,
              gasPrice: 300000000000,
            }).then((i) => {
              console.log('info:i====', i);
              i.wait(5);
              isBuy.value = true;
              setTimeout(() => {
                getTicketInfo();
              }, 10000);
            }).catch((reason) => {
              loading.value = false;
              if (typeof reason === 'object' && reason.error?.code === -32603) {
                getTicketInfo();
              } else if (reason.code === 4001) {
                console.log('reason:====312', reason.code);
                router.push({
                  path: 'ticketList',
                  query: {
                    type: 'notTicket',
                  },
                });
              } else {
                router.push({
                  path: 'ticketList',
                  query: {
                    type: 'cantGetTicket',
                  },
                });
              }
            });
          } else {
            getTicketInfo();
          }
        }).catch((reason) => {
          loading.value = false;
          router.push({
            path: 'ticketList',
            query: {
              type: 'cantGetTicket',
            },
          });
          console.log('reason:====2', reason);
        });
      } else {
        getTicketInfo();
      }
    };
    console.log('window.inviteInfo', window.inviteInfo);
    handleEthereum();
    return {
      tickInfo,
      loading,
      turn,
    };
  },
};
</script>
<style lang="stylus" scoped>
.person
  width 100%
  height 100%
  background-color #0C1119
  background-image url(./../assets/bg-ticket.png)
  background-size 100% 100%
  position relative
  overflow hidden
  .title
    width 4.2rem
    margin 1.32rem auto 0.5rem
    display block
  .content
    width 100%
    height 100%
    overflow hidden
    background-image url(./../assets/bg-cord.png)
    background-size 100%
    background-repeat no-repeat
    overflow hidden
    // margin 0 auto 0.43rem
  .get-it
    width 3.96rem
    display block
    margin 0 auto
  .loading
    margin 4.46rem 0 0 1.68rem
    text-align left
    font-family 'Inter'
    font-style italic
    font-weight 800
    font-size 0.4rem
    line-height 0.76rem
    color #FFFBFF
  .icon
    width: 3.14rem;
    display block
    margin 2.78rem auto 1.02rem
  .desc
    font-family 'Inter'
    font-style italic
    font-weight 800
    font-size 0.4rem
    line-height 0.76rem
    color #FFFBFF
    margin 0 0 1.27rem 0
</style>
