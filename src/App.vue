<template>
  <div id="add-src-btn">
    <button v-for="src in soundSrcTypes" :key="src" @click="handleAddSoundSrc(src)">{{ src }}</button>
  </div>
  <div class="activeSoundSrcs">
    <div v-for="(src) in activeSoundSrcs" :key="src">
      <div v-if="src === 'LFO'">
        <Lfo :audioContext="audioContext"/>
      </div>
      <div v-if="src !== 'LFO'">Other</div>
    </div>
  </div>
</template>

<script>
import Lfo from './components/Lfo.vue'

export default {
  components: { Lfo },
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
          console.log('AudioContext resumed');
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