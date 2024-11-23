<template>
  <h2>{{ type }}</h2> 
  <button class="hidden" id="mute-btn" @click="handleMute">Mute</button>
  <button id="unmute-btn" @click="handleUnMute">Unmute</button>
  <div class="gain">
    <label for="gain">Gain</label>
    <input name="gain" id="gain-ctrl" type="range" min="0" max="1" step="any" @input="handleGainChange">
  </div>
  <div class="frequency">
    <label for="frequency">Frequency:</label>
    <input v-if="type === 'LFO'" name="frequency" id="freq-ctrl" type="range" min="45" max="120" step="0.01" @input="handleFreqChange">
    <input v-if="type === 'MFO'" name="frequency" id="freq-ctrl" type="range" min="121" max="1400" step="0.01" @input="handleFreqChange">
    <input v-if="type === 'HFO'" name="frequency" id="freq-ctrl" type="range" min="1401" max="15000" step="0.01" @input="handleFreqChange">
  </div>
</template>

<script>
import { createOscillator, mute, changeGain, changeFreq } from '../utils/oscillatorUtils.js';

export default {
    props: {
        audioContext: {
            type: Object,
            required: true
        },
        type: {
            type: String,
            required: true,
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

        // const muteBtn = document.getElementById('mute-btn');
        // muteBtn.classList.add('hidden');

        const { osc, gainNode } = createOscillator(ctx, freqVal, gainVal);

        osc.connect(gainNode).connect(ctx.destination);
        osc.start();
    },
    methods: {
        handleUnMute(){
            this.muted = false;
            const muted = this.muted;

            const muteBtn = document.getElementById('mute-btn');
            muteBtn.classList.remove('hidden');

            const unMuteBtn = document.getElementById('unmute-btn');
            unMuteBtn.classList.add('hidden');

            const ctx = this.audioContext;
            const gainCtrl = document.getElementById('gain-ctrl');
            const gainVal = parseFloat(gainCtrl.value);

            changeGain(ctx, gainVal, muted);
        },
        handleMute(){
            this.muted = true;

            const muteBtn = document.getElementById('mute-btn');
            muteBtn.classList.add('hidden');

            const unMuteBtn = document.getElementById('unmute-btn');
            unMuteBtn.classList.remove('hidden');

            const ctx = this.audioContext;
            mute(ctx);
        },
        handleGainChange(e){
            const ctx = this.audioContext;
            const gainVal = e.target.value;
            const muted = this.muted;
            changeGain(ctx, gainVal, muted);
        },
        handleFreqChange(e){
            const ctx = this.audioContext;
            const freqVal = e.target.value;
            changeFreq(ctx, freqVal);
        },
    }
}
</script>

<style>

</style>