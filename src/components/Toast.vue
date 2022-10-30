<template lang="pug">
.toast(v-if="message")
  img.icon(src="./../assets/right.png" v-if="type === 'right'")
  img.icon(src="./../assets/wrong.png" v-if="type === 'wrong'")
  p.message {{message}}
</template>

<script>

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Toast',
  props: ['message', 'type'],
};
</script>
<style lang="stylus" scoped>
.toast
  width 5rem
  box-sizing border-box
  background: #000000;
  border-radius: 20px;
  padding 0.24rem 0.32rem 0.2rem 0.32rem
  position fixed
  top 50%
  left 50%
  transform translate(-50%, -50%);
  .icon
    width 0.4rem
    height 0.4rem
    display block
    margin 0 auto 0.2rem
  .message
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 0.28rem;
    line-height: 0.34rem;
    text-align: center;
    color: #FFFFFF;
</style>
