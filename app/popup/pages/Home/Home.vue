<template>
	<div class="home-box">
		<server></server>
	</div>
</template>

<script>
import server from './server'

export default {
  name: 'Home',
  components: {
    server
  },
  created () {
    this.$router.replace('/account')
  }
}
</script>

<style>
.home-box{height: 341px ;}
</style>
