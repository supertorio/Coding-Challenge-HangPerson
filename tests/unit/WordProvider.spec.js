import WordProvider from '@/lib/hangperson/WordProvider'

describe('WordProvider.js', () => {
  it('should return a new word', () => {
    const wp = new WordProvider()
    const word = wp.getNextWord()
    expect(word).not.toBeUndefined
    expect(word.length).toBeGreaterThan(0)
  })

  it('should return how many words are remaining', () => {
    const wp = new WordProvider()
    expect(wp.remainingWords()).toBeGreaterThan(0)
  })

  it('should throw an error when it is out of words', () => {
    const wp = new WordProvider()
    try {
      for (let i = 0; i < 10; i++) {
        wp.getNextWord()
      }
    } catch (e) {
      expect(e.message).toBe('Word List Exhausted')
    }
  })
})
