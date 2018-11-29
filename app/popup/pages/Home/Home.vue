<template>
	<div class="home-box">
		<tab-bar :idx="0"></tab-bar>
		<server></server>
	</div>
</template>

<script>
import tabBar from '../../components/tabbar'
import server from './server'

export default {
  name: 'Home',
  components: {
    tabBar,
    server
  }
}
</script>

<style>
.home-box{height: 341px ;}
</style>
