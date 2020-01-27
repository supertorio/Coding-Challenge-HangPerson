<template>
  <div id="app">
    <Nav v-bind:currentRound="currentRound" v-bind:totalRounds="TOTAL_ROUNDS" />
    <div id="GameBoard">
      <Gallows v-bind:missesRemaining="missesRemaining" v-bind:missesAvailable="MISSES_AVAILABLE" />
      <div class="user-area">
        <div id="CurrentWord">
          <ul>
            <li v-for="(char, index) in gameBoard" :key="index">{{ char.length ? char : '_' }}</li>
          </ul>
        </div>
        <hr />
        <GuessInput v-if="gameStatus === GAME_STATUSES.IN_ROUND" @make-guess="makeGuess" />
        <Messaging v-bind:gameStatus="gameStatus" @next-round="nextRound" @reset-game="resetGame" />
        <p class="guesses">
          Guesses:
          <span>{{ playerGuesses.length ? playerGuesses.join(', ') : 'No Guesses' }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import HangPerson, {
  GUESS_RESULT,
  GAME_CONFIG
} from './lib/hangperson/HangPerson'
import { GAME_STATUSES } from './constants'
import Nav from './components/Nav'
import Gallows from './components/Gallows'
import GuessInput from './components/GuessInput'
import Messaging from './components/Messaging'

export default {
  name: 'app',
  components: {
    Nav,
    Gallows,
    GuessInput,
    Messaging
  },
  created() {
    this.GAME_STATUSES = GAME_STATUSES
    this.TOTAL_ROUNDS = GAME_CONFIG.ROUNDS_PER_GAME
    this.MISSES_AVAILABLE = GAME_CONFIG.MISSES_PER_ROUND
  },
  mounted() {
    this.gameInstance = new HangPerson()
    this.syncGameState(this.gameInstance.getPuzzleBoard())
    this.gameStatus = this.GAME_STATUSES.IN_ROUND
  },
  data() {
    return {
      gameBoard: [],
      missesRemaining: 0,
      playerGuesses: [],
      gameStatus: null,
      currentRound: 1
    }
  },
  methods: {
    makeGuess(currentGuess) {
      const guessResult = this.gameInstance.makeGuess(currentGuess)
      const gameState = this.gameInstance.getPuzzleBoard()
      this.syncGameState(gameState)

      // Handle Result conditions
      if (guessResult === GUESS_RESULT.GAME_LOSE) {
        this.gameStatus = this.GAME_STATUSES.LOSE
      } else if (guessResult === GUESS_RESULT.GAME_WIN) {
        this.gameStatus =
          this.currentRound === this.TOTAL_ROUNDS
            ? (this.gameStatus = this.GAME_STATUSES.COMPLETE)
            : (this.gameStatus = this.GAME_STATUSES.WIN)
      }
    },
    syncGameState(gameState) {
      this.missesRemaining = gameState.missesRemaining
      this.playerGuesses = gameState.playerGuesses
      this.gameBoard = gameState.board
      this.currentGuess = ''
    },
    nextRound() {
      this.gameInstance.nextRound()
      this.currentRound++
      this.syncGameState(this.gameInstance.getPuzzleBoard())
      this.gameStatus = this.GAME_STATUSES.IN_ROUND
    },
    resetGame() {
      this.gameInstance.resetGame()
      this.gameInstance.nextRound()
      this.currentRound = 1
      this.syncGameState(this.gameInstance.getPuzzleBoard())
      this.gameStatus = this.GAME_STATUSES.IN_ROUND
    }
  }
}
</script>

<style>
#app {
  font-family: 'Rokkitt', serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  box-sizing: border-box;
  margin: 60px auto;
  max-width: 1280px;
}

#GameBoard {
  display: flex;
}

.user-area {
  flex: 1 1 auto;
  margin: 0 30px;
  padding-top: 60px;
}

.user-area hr {
  border: 0;
  height: 2px;
  background: #5252f2;
  margin-bottom: 30px;
}

.user-area .guesses {
  font-size: 1.2em;
}

#CurrentWord {
  display: block;
  font-family: 'Ubuntu Mono', monospace;
  padding-bottom: 40px;
}

#CurrentWord ul,
#CurrentWord li {
  display: inline;
  list-style-type: none;
}

#CurrentWord li {
  margin: 0 8px;
  font-size: 4em;
}
</style>
