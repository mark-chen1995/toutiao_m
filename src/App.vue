<template>
  <div id="app">
    <router-view/>
    <div class="lala">lala</div>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="less">
.lala {
  width: 75px;
  height: 10px;
  background-color: pink;
}
</style>
