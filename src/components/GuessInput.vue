<template>
  <form @submit.prevent="makeGuess" id="GuessInput">
    <input v-model="currentGuess" type="text" ref="guessInput" maxlength="1" />
    <button type="submit" :disabled="!currentGuess" class="makeGuess">
      <span>Make Guess</span>
    </button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      currentGuess: ''
    }
  },
  methods: {
    makeGuess() {
      if (!this.currentGuess) return
      this.$emit('make-guess', this.currentGuess[0]) // Form should prevent multi-character input, but just in case
      this.$refs.guessInput.focus()
      this.currentGuess = ''
    }
  }
}
</script>

<style>
#GuessInput input {
  display: inline-block;
  margin: 0;
  vertical-align: bottom;
}

#GuessInput input[type='text'] {
  font-size: 3em;
  border: 4px solid #121212;
  padding: 5px 5px;
  height: 50px;
  width: 50px;
  text-align: center;
  margin-right: 10px;
}

#GuessInput .makeGuess {
  width: 250px;
  height: 65px;
  background: #fff;
  padding: 10px 45px;
  border: 4px solid #5252f2;
  border-radius: 60px;
  cursor: pointer;
  outline: none;
  transition: all 250ms;
}

#GuessInput .makeGuess > span {
  color: #5252f2;
  letter-spacing: 2px;
  font-size: 1.4em;
  font-weight: bold;
  transition: all 250ms;
}

#GuessInput .makeGuess:disabled {
  cursor: not-allowed;
}

#GuessInput .makeGuess:hover {
  background: #5252f2;
}

#GuessInput .makeGuess:hover > span {
  color: #fff;
  font-size: 1.45em;
}
</style>
