<template>
  <label for="select-src">Add new sound source:</label>
  <select name="select-src" value="oscillator" @change="updateSrcType">
      <option value="oscillator">oscillator</option>
      <option value="white noise">white noise</option>
  </select>
  <button @click="handleAddSoundSrc">add</button>
  <div id="channels">
    <Channel 
      v-for="(source, index) in soundSrcs" 
      :key="index" 
      :type="source.type" 
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Channel from './components/Channel.vue';

interface SoundSrc {
  type: string;
}

export default defineComponent({
  name: 'App',
  components: {
    Channel
  },
  data(){
    return {
      ctx: new AudioContext(),
      newSoundSrcType: "oscillator",
      soundSrcs: [] as SoundSrc[],
    }
  },
  methods: {
    updateSrcType(e: Event): void{
      const selectElement = e.target as HTMLSelectElement | null;

      if (selectElement) {
        this.newSoundSrcType = selectElement.value;
      } else {
        console.error("No target element found for the event.");
      }
    },
    handleAddSoundSrc(): void{
      if(this.newSoundSrcType === "oscillator"){
        this.soundSrcs.push({ type: "oscillator" });
      } else if (this.newSoundSrcType === "white noise"){
        this.soundSrcs.push({ type: "white noise" });
      }
    },
  }
});
</script>

<style>

</style>
