<template>
  <div id="gallows">
    <div class="art">{{ hangingArt }}</div>
    <p>Misses Remaining: {{ missesRemaining }}</p>
  </div>
</template>

<script>
import GallowsArt from '../lib/hangperson/GallowsArt'

export default {
  computed: {
    hangingArt() {
      return GallowsArt[this.missesAvailable - this.missesRemaining]
    }
  },
  props: {
    missesRemaining: {
      type: Number,
      default: 5
    },
    missesAvailable: {
      type: Number,
      default: 5
    }
  }
}
</script>

<style>
#gallows {
  flex: 0 0 400px;
  background: #ccc;
}

#gallows .art {
  font-family: 'Ubuntu Mono', monospace;
  font-size: 5em;
  white-space: pre;
  line-height: 0.95em;
}
#gallows p {
  text-transform: uppercase;
  font-weight: 800;
}
</style>
