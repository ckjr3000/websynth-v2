<template>
    <div class="channel">
      <div class="osc" v-if="type === 'oscillator'">oscillator</div>
      <div class="white-noise" v-if="type === 'white noise'">white noise buffer</div>
      <!-- shared controls -->
       <div class="gain">
        <label for="gain">Gain:</label>
        <input type="range" name="gain" min="0" max="1" step="any" value="0">
       </div>
       <div class="frequency">
        <label for="frequency">Frequency:</label>
        <input type="range" name="frequency" min="50" max="1000" step="any" value="250">
       </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, PropType } from 'vue';
  
  export default defineComponent({
    name: 'Channel',
    props: {
      type: {
        type: String as PropType<string>, 
        required: true, 
      },
    },
  });
  </script>
  
  <style>
    .channel {
        display: flex;
        flex-direction: row;
    }
  </style>
  