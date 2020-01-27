<template>
  <div id="Nav">
    <div>Round {{ currentRound }} of {{ totalRounds }}</div>
  </div>
</template>

<script>
export default {
  props: {
    currentRound: Number,
    totalRounds: Number
  }
}
</script>

<style>
#Nav {
  width: 100%;
  background-color: #000;
  color: #efefef;
  font-size: 2em;
  padding: 5px 10px;
}
</style>
