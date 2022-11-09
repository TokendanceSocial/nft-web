<template lang="pug">
.ticket-info
  .info
    .header-bg
    .ticket-dec(v-if="info")
      .dec-title
        img.info-icon(:src="info.image", draggle="false")
        .info-text
          p.text-top {{info.title}}
          p.text-bottom {{info.introduce}}
      .address
        .item
          .icon-where.icon where
          span.detail {{info.where}}
        .item
          .icon-when.icon when
          span.detail {{info.when}}
      .line
      .chain
        .chain-item
          .item-name Chain
          .item-value polygon
        .chain-item
          .item-name Creator
          .item-value {{info.creator}}
        .chain-item
          .item-name Token Standard
          .item-value {{info.tokenstandard}}
        .chain-item
          .item-name Asset contract
          .item-value(@click="copyText(address, 'Copy successfully')") {{address}}
        .chain-item
          .item-name Token id
          .item-value {{info.tokenid}}
      .line
      .invite.invite-extra(v-show="showInviteBtn")
        .position(v-for="index in 2")
          .no-person(v-if="!inviteList[index - 1]" @click="copy")
          .has-person(v-if="inviteList[index - 1]")
            img(src="~@/assets/avatar11.png")
            p.name {{inviteList[index - 1]}}
      p.tip-btn(v-if="inviteList.length < 2 && showInviteBtn") You can click the invite button
      p.tip-btn(v-if="inviteList.length < 2 && showInviteBtn") to invite 2 people  to the conference
      p.tip-btn(v-if="inviteList.length === 2 && showInviteBtn") You have invited 2 people
  toast(:message="message", :type="toastType")
</template>

<script>
import { ref } from 'vue';
import { ethers } from 'ethers';
import { useRouter } from 'vue-router';
import toast from '../components/Toast.vue';
import config from '../config/index';
import { contractAbi } from '../config/TicketContract';

export default ({
  components: {
    toast,
  },
  setup() {
    const showInviteBtn = ref(false);
    const address = ref('');
    const router = useRouter();
    const toastType = ref('right');
    const message = ref('');
    const info = ref('');
    const inviteList = ref([]);
    if (!window.wallet) {
      router.push({ path: 'ticketList' });
    } else {
      info.value = window.wallet.tickInfo;
      const { provider } = window.wallet;
      const signer = provider.getSigner();
      const greet = new ethers.Contract(config.CONTRACT_ADDRESS, contractAbi.abi, signer);
      // eslint-disable-next-line no-underscore-dangle
      greet._1gpeople(window.wallet.address).then(async (i) => {
        console.log('i: ', i);
        if (!i) return;
        showInviteBtn.value = true;
        // eslint-disable-next-line no-underscore-dangle
        let address1 = '';
        let address2 = '';
        try {
        // eslint-disable-next-line no-underscore-dangle
          address1 = await greet._invitepeople(window.wallet.address, 0);
          inviteList.value.push(address1);
        } catch (error) {
          console.log('error: ', error);
        }
        try {
          if (address1) {
          // eslint-disable-next-line no-underscore-dangle
            address2 = await greet._invitepeople(window.wallet.address, 1);
            inviteList.value.push(address2);
          }
        } catch (error) {
          console.log('error: ', error);
        }
        console.log('inviteList: ', inviteList);
      }).catch((reason) => {
        console.log('reason:œ====', reason);
      });
    }
    const changeName = () => {
      address.value = `${config.CONTRACT_ADDRESS.substring(0, 6)}……${config.CONTRACT_ADDRESS.substring(config.CONTRACT_ADDRESS.length - 4, config.CONTRACT_ADDRESS.length)}`;
    };
    const copyText = (value, msg) => {
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
    const copy = () => {
      const value = `${window.location.origin}/#/?address=${window.wallet.address}&tockenUrl=${encodeURIComponent(window.wallet.tockenUrl)}`;
      copyText(value, 'The link was successfully copied');
    };
    changeName();
    return {
      toastType,
      message,
      copyText,
      showInviteBtn,
      inviteList,
      info,
      address,
      copy,
    };
  },
});
</script>

<style scoped lang="stylus">
.ticket-info {
  background-color #0C1119
  width 100%
  min-height 100%
  overflow hidden
  display flex
  flex-direction column
  font-family 'Inter'
  font-style normal
  font-weight 400
  font-size 0.28rem
  color #FFFBFF
  .tip-btn {
    opacity 0.5
  }
  .info {
    margin-top 0.32rem
    flex: 1
    display flex
    flex-direction column
    background-color #0C1119
    .header-bg {
      height: 0.96rem
      width: 100%
      background-image url('~@/assets/info-bg.png')
      background-size 100% 100%
      background-repeat no-repeat
    }
    .ticket-dec {
      flex: 1
      padding 0.14rem 0.4rem 1rem 0.4rem
      .dec-title {
        display flex
        flex-direction row
        align-items center
        justify-content space-between
        overflow: hidden;
        .info-icon {
          width 1.96rem
          height 2rem
          object-fit contain
        }
        .info-text {
          width 4.36rem
          text-align left
          .text-top {
            font-style italic
            font-weight 800
            font-size 0.4rem
            height 0.72rem
            line-height 0.72rem
          }
          .text-bottom {
            font-weight 400
            font-size 0.28rem
            line-height 0.34rem
            word-wrap break-word
          }
        }
      }
    }
    .address {
      width 100%
      margin 0.36rem 0 0.64rem 0
      border-radius 0.24rem
      background-color #1F2930
      padding 0.24rem 0.24rem 0.24rem 0.4rem
      box-sizing border-box
      color #A6A6A6
      font-size 0.28rem
      display flex
      flex-direction column
      justify-content space-between
      .detail {
        text-align left
        width 4.5rem
      }
      .item {
        display flex
        flex-direction row
        line-height: 0.34rem
        margin-bottom 0.2rem
        .icon {
          width: 0.88rem
          padding-left 0.44rem
          margin-right: 0.4rem
          opacity: 0.5;
        }
        .icon-where {
          background-image url('~@/assets/place.png')
          background-size 0.24rem 0.28rem
          background-repeat no-repeat
          background-position 0 0
          color: #A6A6A6;
          text-align left
        }
        .icon-when {
          background-image url('~@/assets/time.png')
          background-size 0.24rem 0.28rem
          background-repeat no-repeat
          background-position 0 50%
          text-align left
        }
      }
    }
    .line {
      width 6.7rem
      height 0.01rem
      background  linear-gradient(90deg, #6AEDFF 0%, rgba(115, 162, 255, 0.573355) 42.66%, #3AE2A6 66.62%, #AC3AE2 100%)
      border-radius 0.05rem
      transform matrix(1, 0, 0, -1, 0, 0)
    }
    .chain {
      padding 0.5rem 0 0.5rem 0.84rem
      .chain-item {
        display flex
        flex-direction row
        align-items center
        justify-content flex-start
        font-weight 400
        font-size 0.28rem
        color #FFFFFF
        opacity 0.5
        margin-bottom 0.28rem
        text-align left
        &:last-child {
          margin-bottom 0
        }
        .item-name {
          width 2.1rem
          overflow hidden
          white-space nowrap
          text-overflow ellipsis
          margin-right 0.44rem
        }
      }
    }
    .invite {
      padding 0.64rem 0.92rem 0.92rem 0.92rem
      display flex
      flex-direction row
      justify-content space-between
      .position {
        width 1.42rem
        height 1.42rem
        border-radius: 50%
        .no-person {
          width 100%
          height 100%
          background-image: url('~@/assets/invite.png')
          background-size 100% 100%
          background-repeat no-repeat
        }
        .has-person {
          width 100%
          height 100%
          position: relative
          .avatar {
            object-fit contain
          }
          .name {
            font-size 0.24rem
            height: 0.4rem
            line-height: 0.4rem
            background-image url('~@/assets/name-bg.png')
            background-repeat no-repeat
            background-size: 100%, 100%
            font-weight 800
            font-size: 0.24rem
            position: relative;
            color: rgba(51, 0, 194, 1);
            font-weight: 800;
            top: -50%;
            transform: translate(0, 70%);
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            box-sizing border-box
            padding 0 0.2rem
          }
        }
      }
      .invite-btn {
        background-image url('~@/assets/invite-btn.png')
        width: 3.62rem
        height: 1rem
        margin-top 0.82rem
        background-size 100% 100%
        background-repeat no-repeat
        position: relative;
        left: 50%;
        transform: translate(-50%);
      }
    }
    .invite-extra {
      padding-bottom 0.67rem
    }
    .tip-bottom  {
      line-height 0.3rem
    }
  }
}

</style>
