<template>
  <div id="add-src-btn">
    <button v-for="src in soundSrcTypes" :key="src" @click="handleAddSoundSrc(src)">{{ src }}</button>
  </div>
  <div class="activeSoundSrcs">
    <div v-for="(src) in activeSoundSrcs" :key="src">
      <div v-if="src === 'LFO' || src === 'MFO' || src === 'HFO'">
        <Osc :audioContext="audioContext" :type="src"/>
      </div>
      <div v-if="src === 'Noise'">Noise</div>
      <div v-if="src === 'Clicker'">Clicker</div>
      <div v-if="src === 'Keyboard'">Keyboard</div>
    </div>
  </div>
</template>

<script>
import Osc from './components/Osc.vue'

export default {
  components: { Osc },
  data(){
    return {
      audioContext: new AudioContext(),
      soundSrcTypes: ['LFO', 'MFO', 'HFO', 'Noise', 'Clicker', 'Keyboard'],
      activeSoundSrcs: []
    }
  },
  methods: {
    handleAddSoundSrc(src) {
      if (this.audioContext.state === 'suspended') {
        this.audioContext.resume().then(() => {
          this.activeSoundSrcs.push(src);
        }).catch(err => console.error('Error resuming AudioContext', err));
      } else {
        this.activeSoundSrcs.push(src);
      }
    }
  }
}
</script>

<style>

</style>