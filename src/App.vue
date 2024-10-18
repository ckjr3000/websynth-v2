<template>
  <label for="select-src">Add new sound source:</label>
  <select name="select-src" value="oscillator" @change="updateSrcType">
      <option value="oscillator">oscillator</option>
      <option value="white noise">white noise</option>
  </select>
  <button @click="handleAddSoundSrc">add</button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
  components: {
    
  },
  data(){
    return {
      newSoundSrcType: "oscillator",
    }
  },
  methods: {
    updateSrcType(e: Event): void{
      // Type assertion and null check for target
      const selectElement = e.target as HTMLSelectElement | null;

      if (selectElement) {
        this.newSoundSrcType = selectElement.value;
      } else {
        console.error("No target element found for the event.");
      }
    },
    handleAddSoundSrc(): void{
      console.log(this.newSoundSrcType);
    },
  }
});
</script>

<style>

</style>
