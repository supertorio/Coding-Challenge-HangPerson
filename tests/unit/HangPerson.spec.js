import HangPerson, {
  GUESS_RESULT,
  GAME_CONFIG
} from '@/lib/hangperson/HangPerson'

describe('HangPerson.js', () => {
  it('should instantiate a new round on instantiation', () => {
    const hp = new HangPerson()
    expect(hp._word).not.toBeNull
    expect(hp._guesses).toBeInstanceOf(Array)
    expect(hp._guesses.length).toEqual(0)
    expect(hp._missesRemaining).toStrictEqual(GAME_CONFIG.MISSES_PER_ROUND)
    expect(hp._round).toStrictEqual(1)
  })

  it('should return the state of the game board', () => {
    const hp = new HangPerson()
    const gb = hp.getPuzzleBoard()

    expect(gb.board).toBeInstanceOf(Array)
    expect(gb.board.length).toBeGreaterThan(0)
    expect(gb.missesRemaining).toStrictEqual(GAME_CONFIG.MISSES_PER_ROUND)
    expect(gb.playerGuesses).toBeInstanceOf(Array)
    expect(gb.playerGuesses.length).toStrictEqual(0)
  })

  it('should respond to a correct player guess', () => {
    const hp = new HangPerson()
    hp._word = 'fixed'
    const result = hp.makeGuess('f')
    expect(result).toStrictEqual(GUESS_RESULT.GOOD_GUESS)
  })

  it('should respond to an incorrect player guess', () => {
    const hp = new HangPerson()
    hp._word = 'fixed'
    let gb_before = hp.getPuzzleBoard()
    const result = hp.makeGuess('q')
    let gb_after = hp.getPuzzleBoard()
    expect(result).toStrictEqual(GUESS_RESULT.BAD_GUESS)
    expect(gb_after.missesRemaining).toStrictEqual(
      gb_before.missesRemaining - 1
    )
  })

  it('should respond to an solved puzzle', () => {
    const hp = new HangPerson()
    hp._word = 'fixed'
    let result
    for (let char of hp._word) {
      result = hp.makeGuess(char)
    }
    expect(result).toStrictEqual(GUESS_RESULT.GAME_WIN)
  })

  it('should respond to an failed puzzle', () => {
    const hp = new HangPerson()
    let result
    for (let i = 0; i < GAME_CONFIG.MISSES_PER_ROUND; i++) {
      result = hp.makeGuess('q')
    }
    expect(result).toStrictEqual(GUESS_RESULT.GAME_LOSE)
  })

  it('should reset the current game', () => {
    const hp = new HangPerson()
    hp.makeGuess('x')
    let gb = hp.getPuzzleBoard()
    expect(gb.playerGuesses.length).toStrictEqual(1)
    expect(gb.missesRemaining).toStrictEqual(GAME_CONFIG.MISSES_PER_ROUND - 1)

    hp.resetGame()
    gb = hp.getPuzzleBoard()
    expect(gb.playerGuesses.length).toStrictEqual(0)
    expect(gb.missesRemaining).toStrictEqual(GAME_CONFIG.MISSES_PER_ROUND)
  })
})
