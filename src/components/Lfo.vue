<template>
  <button id="mute-btn">Mute</button>
  <button id="unmute-button" class=".hidden">Unmute</button>
  <div class="gain">
    <label for="gain">Gain</label>
    <input name="gain" id="gain-ctrl" type="range" min="0" max="1" step="0.01">
  </div>
  <div class="frequency">
    <label for="frequency">Frequency:</label>
    <input name="frequency" id="freq-ctrl" type="range" min="45" max="100" step="0.01" >
  </div>
</template>

<script>
import { createOscillator } from '../utils/oscillatorUtils.js';

export default {
    props: {
        audioContext: {
            type: Object,
            required: true
        }
    },
    mounted() {
        const ctx = this.audioContext;

        const freqCtrl = document.getElementById('freq-ctrl');
        const freqVal = parseFloat(freqCtrl.value);

        const gainCtrl = document.getElementById('gain-ctrl');
        const gainVal = parseFloat(gainCtrl.value);

        const muted = false; // Change later

        const { osc, gainNode } = createOscillator(ctx, freqVal, gainVal, muted);

        osc.connect(gainNode).connect(ctx.destination);
        osc.start();
    }
}
</script>

<style>

</style>