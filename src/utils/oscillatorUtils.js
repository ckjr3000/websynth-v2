export function createOscillator(ctx, freq, gainVal, muted){
    const osc = ctx.createOscillator();
    osc.frequency.setValueAtTime(freq, ctx.currentTime);

    const gainNode = ctx.createGain();
    if(!muted){
        gainNode.gain.linearRampToValueAtTime(gainVal, ctx.currentTime + 0.5);
    } else {
        gainNode.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.5);
    }

    return { osc, gainNode };
}