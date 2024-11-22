let osc;
let gainNode;

export function createOscillator(ctx, freq, gainVal){
    osc = ctx.createOscillator();
    osc.frequency.setValueAtTime(freq, ctx.currentTime);

    gainNode = ctx.createGain();

    gainNode.gain.setValueAtTime(0, ctx.currentTime);
    
    return { osc, gainNode };
}

export function unMute(ctx, gainVal){
    gainNode.gain.setValueAtTime(gainNode.gain.value, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(gainVal, ctx.currentTime + 0.05);
}

export function mute(ctx){
    gainNode.gain.setValueAtTime(gainNode.gain.value, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.05);
}