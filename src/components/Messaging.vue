<template>
  <div id="Messaging">
    <p v-if="gameStatus === GAME_STATUSES.WIN">
      You Won This Round!
      <a href="#" @click.prevent="nextRound">Next Round?</a>
    </p>
    <p v-if="gameStatus === GAME_STATUSES.LOSE">
      Darn it, better luck next time!
      <a href="#" @click.prevent="resetGame">Try Again?</a>
    </p>
    <p v-if="gameStatus === GAME_STATUSES.COMPLETE">
      You beat all the levels! Congrats!
      <a href="#" @click.prevent="resetGame">Try Again?</a>
    </p>
  </div>
</template>

<script>
import { GAME_STATUSES } from '../constants'

export default {
  created() {
    this.GAME_STATUSES = GAME_STATUSES
  },
  props: {
    gameStatus: {
      type: String,
      default: ''
    }
  },
  methods: {
    nextRound() {
      this.$emit('next-round')
    },
    resetGame() {
      this.$emit('reset-game')
    }
  }
}
</script>

<style>
#Messaging {
  font-size: 1.4em;
}
#Messaging a {
  color: #5252f2;
}
</style>
