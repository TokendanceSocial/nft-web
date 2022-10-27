<template lang="pug">
.ticket-info
  .info
    .header-bg
    .ticket-dec
      .dec-title
        img.info-icon(src="@/assets/info-icon.png", draggle="false")
        .info-text
          p.text-top TokenDance 2022
          p.text-bottom A Web3 Evangelism Conference for Chinese Internet People.
            | To Explore Web3 Application Startup Opportunities
      .address
        .item
          .icon-where.icon where
          span This is a place
        .item
          .icon-when.icon when
          span 2022-12-12  14:00:00
      .line
      .chain
        .chain-item
          .item-name 主链
          .item-value -
        .chain-item
          .item-name Creator
          .item-value tokendance.eth
        .chain-item
          .item-name Token Standard
          .item-value ERC721
        .chain-item
          .item-name Asset contract
          .item-value 0x49cF…A28B
        .chain-item
          .item-name Token id
          .item-value 1324567
      .line
      .invite.invite-extra
        .position(v-show="!showInviteBtn")
          .no-person()(v-show="showInviteBtn")
          .has-person
            img(src="~@/assets/avatar.png")
            p.name 锅糊了
        .position(v-show="!showInviteBtn")
          .no-person
          .has-person
            img()
        .invite-btn(v-show="showInviteBtn")
      p.tip-btn You can click the invite button
      p.tip-btn to invite 2 people  to the conference
</template>

<script>
import { ref } from 'vue';

export default ({
  setup() {
    const showInviteBtn = ref(false);
    return {
      showInviteBtn,
    };
  },
});
</script>

<style scoped lang="stylus">
.ticket-info {
  background-color #303030
  width 100%
  height 100%
  overflow hidden
  display flex
  flex-direction column
  font-family 'Inter'
  font-style normal
  font-weight 400
  font-size 0.28rem
  color #FFFBFF
  .info {
    margin-top 0.32rem
    flex: 1
    display flex
    flex-direction column
    background-color rgba(0, 0, 0, 0.3)
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
      height 1.4rem
      width 100%
      margin 0.36rem 0 0.64rem 0
      border-radius 0.24rem
      background-color #1F2930
      padding 0.24rem 0 0.24rem 0.4rem
      box-sizing border-box
      color #A6A6A6
      font-size 0.28rem
      display flex
      flex-direction column
      justify-content space-between
      .item {
        display flex
        flex-direction row
        height: 0.34rem
        line-height: 0.34rem
        .icon {
          width: 0.88rem
          padding-left 0.44rem
          margin-right: 0.72rem
          opacity: 0.5;
        }
        .icon-where {
          background-image url('~@/assets/place.png')
          background-size 0.24rem 0.28rem
          background-repeat no-repeat
          background-position 0 50%
          color: #A6A6A6;
        }
        .icon-when {
          background-image url('~@/assets/time.png')
          background-size 0.24rem 0.28rem
          background-repeat no-repeat
          background-position 0 50%
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
            top: -50%;
            transform: translate(0, 70%);
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
