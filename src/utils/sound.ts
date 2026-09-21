// Web Audio API based chime synthesizer & audio unlocker for reliable sound alerts

let audioCtx: AudioContext | null = null;
let isAudioUnlocked = false;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

// Global user interaction listener to ensure AudioContext is unlocked
export function unlockAudio() {
  if (typeof window === 'undefined' || isAudioUnlocked) return;
  const ctx = getAudioContext();
  if (ctx && ctx.state === 'suspended') {
    ctx.resume().then(() => {
      isAudioUnlocked = true;
    }).catch(() => {});
  } else if (ctx && ctx.state === 'running') {
    isAudioUnlocked = true;
  }
}

if (typeof window !== 'undefined') {
  ['click', 'touchstart', 'touchend', 'pointerdown', 'keydown'].forEach((evt) => {
    window.addEventListener(evt, unlockAudio, { once: false, passive: true });
  });
}

/**
 * Plays a loud, clear, resonant restaurant kitchen / POS order chime.
 * Simulates dual harmonic bell rings (Ding-Dong ... Ding-Dong) with acoustic decay.
 */
export function playNewOrderSound() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    if (ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }

    const now = ctx.currentTime;

    // Helper to play a rich harmonic bell chord
    const playBell = (startTime: number, baseFreq: number, duration: number, gainLevel: number) => {
      const harmonics = [
        { mult: 1.0, gain: gainLevel },
        { mult: 2.0, gain: gainLevel * 0.4 },
        { mult: 3.0, gain: gainLevel * 0.2 },
        { mult: 4.2, gain: gainLevel * 0.1 },
      ];

      harmonics.forEach(({ mult, gain: hGain }) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = mult === 1.0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(baseFreq * mult, startTime);

        gain.gain.setValueAtTime(hGain, startTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + duration);
      });
    };

    // First sequence: High Bell (Ding) -> Lower Resonant Bell (Dong)
    playBell(now, 880, 0.45, 0.55); // A5 (Ding)
    playBell(now + 0.18, 659.25, 0.85, 0.65); // E5 (Dong)

    // Second sequence (repeated after 0.4s for unmistakable kitchen awareness)
    playBell(now + 0.45, 987.77, 0.45, 0.6); // B5 (Ding)
    playBell(now + 0.65, 783.99, 1.1, 0.7); // G5 (Dong)

  } catch {
    // Graceful fallback
  }
}

/**
 * Plays a subtle snappy sound when adding an item to the cart.
 */
export function playAddCartSound() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    if (ctx.state === 'suspended') ctx.resume().catch(() => {});

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(523.25, now); // C5
    osc.frequency.exponentialRampToValueAtTime(1046.5, now + 0.09); // C6

    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.12);
  } catch {
    // silent fallback
  }
}

/**
 * Plays a pleasant ascending celebration arpeggio when customer places order.
 */
export function playOrderSuccessSound() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    if (ctx.state === 'suspended') ctx.resume().catch(() => {});

    const now = ctx.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.5, 1318.51]; // C5, E5, G5, C6, E6

    notes.forEach((freq, idx) => {
      const startTime = now + idx * 0.07;
      const duration = 0.4;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(0.35, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + duration);
    });
  } catch {
    // silent fallback
  }
}
