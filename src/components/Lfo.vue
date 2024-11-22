<template>
  <button id="mute-btn" @click="handleMute">Mute</button>
  <button id="unmute-btn" @click="handleUnMute">Unmute</button>
  <div class="gain">
    <label for="gain">Gain</label>
    <input name="gain" id="gain-ctrl" type="range" min="0" max="1" step="0.01" @input="handleGainChange">
  </div>
  <div class="frequency">
    <label for="frequency">Frequency:</label>
    <input name="frequency" id="freq-ctrl" type="range" min="45" max="100" step="0.01" @input="handleFreqChange">
  </div>
</template>

<script>
import { createOscillator, unMute, mute } from '../utils/oscillatorUtils.js';

export default {
    props: {
        audioContext: {
            type: Object,
            required: true
        }
    },
    data(){
        return {
            muted: true,
        }
    },
    mounted() {
        const ctx = this.audioContext;

        const freqCtrl = document.getElementById('freq-ctrl');
        const freqVal = parseFloat(freqCtrl.value);

        const gainCtrl = document.getElementById('gain-ctrl');
        const gainVal = parseFloat(gainCtrl.value);

        const muteBtn = document.getElementById('mute-btn');
        muteBtn.classList.add('hidden');

        const { osc, gainNode } = createOscillator(ctx, freqVal, gainVal);

        osc.connect(gainNode).connect(ctx.destination);
        osc.start();
    },
    methods: {
        handleUnMute(){
            this.muted = true;
            
            const muteBtn = document.getElementById('mute-btn');
            muteBtn.classList.remove('hidden');

            const unMuteBtn = document.getElementById('unmute-btn');
            unMuteBtn.classList.add('hidden');

            const ctx = this.audioContext;
            const gainCtrl = document.getElementById('gain-ctrl');
            const gainVal = parseFloat(gainCtrl.value);

            unMute(ctx, gainVal);
        },
        handleMute(){
            this.muted = false;

            const muteBtn = document.getElementById('mute-btn');
            muteBtn.classList.add('hidden');

            const unMuteBtn = document.getElementById('unmute-btn');
            unMuteBtn.classList.remove('hidden');

            const ctx = this.audioContext;
            mute(ctx);
        },
        handleGainChange(){},
        handleFreqChange(){},
    }
}
</script>

<style>

</style>