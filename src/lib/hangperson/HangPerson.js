import WordProvider from './WordProvider'

/**
 * Valid results from making a guess action
 * @const {object}
 */
export const GUESS_RESULT = {
  GOOD_GUESS: 'GOOD_GUESS',
  BAD_GUESS: 'BAD_GUESS',
  GAME_LOSE: 'GAME_LOSE',
  GAME_WIN: 'GAME_WIN'
}

/**
 * Game Configuration Options
 * @const {object}
 */
export const GAME_CONFIG = {
  MISSES_PER_ROUND: 5,
  ROUNDS_PER_GAME: 6
}

/**
 * Main Class for the HangPerson Game logic
 * @class
 */
class HangPerson {
  /**
   * Creates a new instance of the game
   * @constructor
   */
  constructor() {
    this.wordProvider = new WordProvider()
    this.resetGame()
    this.nextRound()
  }

  /**
   * Starts a new round of the game with a new word.
   */
  nextRound() {
    this._word = this.wordProvider.getNextWord().toLowerCase()
    this._guesses = []
    this._missesRemaining = GAME_CONFIG.MISSES_PER_ROUND
    this._round++
  }

  /**
   * Effectively resets the game session by reseting the
   * game to it's intial state.
   */
  resetGame() {
    this._word = ''
    this._guesses = []
    this._missesRemaining = GAME_CONFIG.MISSES_PER_ROUND
    this._round = 0
    this.wordProvider.reset()
  }

  /**
   * Checks the input character against the current word and
   * returns the result of the guess.
   * @param {char} guess
   * @returns {GUESS_RESULT}
   */
  makeGuess(guess) {
    // Invalid Guess
    if (typeof guess !== 'string' || guess.length > 1) {
      throw new Error('Invalid Guess')
    }
    if (this._missesRemaining < 1) {
      return GUESS_RESULT.GAME_LOSE
    }

    guess = guess.toLowerCase()
    this._guesses.push(guess)

    // Successful Guess
    if (this._word.includes(guess)) {
      return this._checkWinCondition()
        ? GUESS_RESULT.GAME_WIN
        : GUESS_RESULT.GOOD_GUESS
    }
    // Failed Guess
    else {
      this._missesRemaining--
      return this._missesRemaining < 1
        ? GUESS_RESULT.GAME_LOSE
        : GUESS_RESULT.BAD_GUESS
    }
  }

  /**
   * Returns the current state of the puzzle board
   * including the remaining misses and the list of guesses.
   * @returns {object}
   */
  getPuzzleBoard() {
    const board = this._word.split('').map(l => {
      return this._guesses.includes(l) ? l : ''
    })

    return {
      board,
      missesRemaining: this._missesRemaining,
      playerGuesses: this._guesses
    }
  }

  /**
   * Checks if the player has won the round
   * @returns {boolean}
   */
  _checkWinCondition() {
    for (let l of this._word) {
      if (!this._guesses.includes(l)) return false
    }
    return true
  }
}

export default HangPerson
