<template>
  <div id="app">
    <h1>Redis Caching Example</h1>
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
