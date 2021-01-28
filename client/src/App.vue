<template>
  <div id="app">
    <div style="position: absolute; top: 0px; right: 0px;">
      <img width="300" height="300" src="https://redislabs.com/wp-content/uploads/2020/12/RedisLabs_Illustration_HomepageHero_v4.svg">
    </div>

    <h1>Redis Caching Example</h1>
    
    <div style="height: 200px" />
    <example />
  </div>
</template>

<script>
import Example from './components/Example.vue'

export default {
  name: 'App',
  components: {
    Example,
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
