<template>
  <div id="Nav">
    <div>Round - {{ currentRound }} of {{ totalRounds }}</div>
    <div>Score - {{ currentScore }}</div>
    <div>High Score - {{ highScore }}</div>
  </div>
</template>

<script>
const lsHighScoreKey = 'hangperson_high_score'
export default {
  mounted() {
    this.bus.$on('roundComplete', this.checkHighScore)
    this.highScore = window.localStorage.getItem(lsHighScoreKey) || 0
  },
  props: {
    currentRound: {
      type: Number,
      default: 1
    },
    totalRounds: {
      type: Number,
      default: 1
    },
    currentScore: {
      type: Number,
      default: 0
    },
    bus: {
      type: Object
    }
  },
  data() {
    return {
      highScore: 0
    }
  },
  methods: {
    checkHighScore(newScore) {
      if (newScore > this.highScore) {
        this.highScore = newScore
        window.localStorage.setItem(lsHighScoreKey, this.highScore)
      }
    }
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
  display: flex;
  justify-content: space-around;
}
#Nav > div {
  display: inline-block;
  flex: 0 0 auto;
}
</style>
