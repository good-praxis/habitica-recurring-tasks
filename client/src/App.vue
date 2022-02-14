<template>
  <span>
    <p>Test</p>
    <img alt="Vue logo" src="./assets/logo.png"
  /></span>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
  components: {},
});
</script>

<style>
@font-face {
  font-family: 'Press Start 2P';
  src: local('Press Start 2P'),
    url('./fonts/PressStart2P-regular.ttf') format('truetype');
  style: normal;
  weight: 400;
  stretch: normal;
}

#app {
  font-family: 'Press Start 2P', Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
