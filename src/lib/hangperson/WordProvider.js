/**
 * WordProvider Class - Manages the word dictionary availabe for
 * the HangPeson game.
 * @class
 */
class WordProvider {
  /**
   * Creates an instance of the provider.
   * @constructor
   */
  constructor() {
    this._wordList = ['3dhubs', 'marvin', 'print', 'filament', 'order', 'layer']
    this._usedWords = []
  }

  /**
   * Returns the next, previously unused word, from the wordlist.
   * @throws Will throw an error if there are no more unused words available.
   */
  getNextWord() {
    if (!this.remainingWords) {
      throw new Error('Word List Exhausted')
    }

    let unusedWords = this._wordList.filter(x => !this._usedWords.includes(x))
    const nextWord = unusedWords[Math.floor(Math.random() * unusedWords.length)]
    this._usedWords.push(nextWord)
    return nextWord
  }

  /**
   * Returns the number of remaining unused words available.
   */
  remainingWords() {
    return this._wordList.length - this._usedWords.length
  }

  /**
   * Resets the dictionary of used words to none.
   */
  reset() {
    this._usedWords.length = 0
  }
}

export default WordProvider
