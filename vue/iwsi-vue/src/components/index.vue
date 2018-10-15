<template>
  <div>
    <h1>{{msg}}</h1>
    <button @click="tabRouter()">切换路由</button>
  </div>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    tabRouter () {
      console.info(this)
      this.$router.push('/user/index')
    }
  },
  created () {
    // console.info(this)
  }
}
</script>

<style scoped>

</style>
