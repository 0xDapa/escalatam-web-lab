// Loop propio de 124 BPM sintetizado con WebAudio (bombo, hi-hat, bajo): sin archivos, sin licencias.
export function startLoop() {
  const ac = new (window.AudioContext || window.webkitAudioContext)(), out = ac.createGain(); out.gain.value = 0.55;
  const an = ac.createAnalyser(); an.fftSize = 256; out.connect(an); an.connect(ac.destination);
  const beat = 60 / 124; let next = ac.currentTime + 0.05, step = 0, timer;
  const noise = ac.createBuffer(1, ac.sampleRate * 0.1, ac.sampleRate); noise.getChannelData(0).forEach((_, i, a) => (a[i] = Math.random() * 2 - 1));
  const kick = t => { const o = ac.createOscillator(), g = ac.createGain(); o.frequency.setValueAtTime(150, t); o.frequency.exponentialRampToValueAtTime(42, t + 0.12); g.gain.setValueAtTime(1, t); g.gain.exponentialRampToValueAtTime(0.001, t + 0.35); o.connect(g); g.connect(out); o.start(t); o.stop(t + 0.36); };
  const hat = t => { const s = ac.createBufferSource(), f = ac.createBiquadFilter(), g = ac.createGain(); s.buffer = noise; f.type = 'highpass'; f.frequency.value = 7000; g.gain.setValueAtTime(0.25, t); g.gain.exponentialRampToValueAtTime(0.001, t + 0.05); s.connect(f); f.connect(g); g.connect(out); s.start(t); };
  const bass = (t, n) => { const o = ac.createOscillator(), f = ac.createBiquadFilter(), g = ac.createGain(); o.type = 'sawtooth'; o.frequency.value = n; f.type = 'lowpass'; f.frequency.setValueAtTime(900, t); f.frequency.exponentialRampToValueAtTime(140, t + 0.18); g.gain.setValueAtTime(0.28, t); g.gain.exponentialRampToValueAtTime(0.001, t + 0.2); o.connect(f); f.connect(g); g.connect(out); o.start(t); o.stop(t + 0.22); };
  const NOTES = [55, 55, 65.4, 49];
  function sched() { while (next < ac.currentTime + 0.12) { const q = step % 4; if (q === 0) kick(next); if (q === 2) hat(next); if (q === 1 || q === 3) bass(next, NOTES[Math.floor(step / 16) % 4]); next += beat / 4; step++; } }
  timer = setInterval(sched, 25); sched();
  const data = new Uint8Array(an.frequencyBinCount);
  return { bands() { an.getByteFrequencyData(data); const b = []; for (let i = 0; i < 8; i++) { let s = 0; const a = Math.floor(2 ** i / 2), z = Math.max(a + 1, Math.floor(2 ** (i + 1) / 2)); for (let k = a; k < z; k++) s += data[k]; b.push(s / (z - a) / 255); } return b; },
    stop() { clearInterval(timer); ac.close(); } };
}
