/**
 * Rajasthan Tourism — Ambient Soundscape Synthesizer
 * 
 * Uses standard Web Audio API to synthesize a serene, authentic Indian classical
 * Tanpura/Acoustic drone (Sa-Pa fundamental chord with gentle harmonics and desert breeze modulation).
 * Runs completely in-browser without external MP3 dependencies, preventing CORS or 404 issues.
 */

class SoundscapeEngine {
  private audioCtx: AudioContext | null = null;
  private isPlaying = false;
  private masterGain: GainNode | null = null;
  private oscillators: OscillatorNode[] = [];
  private filter: BiquadFilterNode | null = null;
  private lfo: OscillatorNode | null = null;

  public init() {
    if (this.audioCtx) return;
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      this.audioCtx = new AudioContextClass();
    }
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.play();
      return true;
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public play() {
    this.init();
    if (!this.audioCtx) return;

    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }

    // Master gain with smooth fade in
    this.masterGain = this.audioCtx.createGain();
    this.masterGain.gain.setValueAtTime(0.001, this.audioCtx.currentTime);
    this.masterGain.gain.exponentialRampToValueAtTime(0.08, this.audioCtx.currentTime + 2.5);

    // Warm low-pass acoustic resonance filter
    this.filter = this.audioCtx.createBiquadFilter();
    this.filter.type = 'lowpass';
    this.filter.frequency.setValueAtTime(450, this.audioCtx.currentTime);
    this.filter.Q.setValueAtTime(2, this.audioCtx.currentTime);

    // Gentle LFO for wind-like breathing texture
    const lfoGain = this.audioCtx.createGain();
    lfoGain.gain.setValueAtTime(150, this.audioCtx.currentTime);

    this.lfo = this.audioCtx.createOscillator();
    this.lfo.frequency.setValueAtTime(0.18, this.audioCtx.currentTime); // very slow cycle
    this.lfo.connect(lfoGain);
    lfoGain.connect(this.filter.frequency);
    this.lfo.start();

    // Fundamental Indian Classical Tanpura frequencies (C# / D tuning)
    // Pa (Fifth) = 207.65 Hz, Sa (Root) = 138.59 Hz, Mandra Sa (Octave below) = 69.3 Hz
    const harmonicLayers = [
      { freq: 69.3, gain: 0.4, type: 'sine' as OscillatorType },
      { freq: 138.59, gain: 0.5, type: 'triangle' as OscillatorType },
      { freq: 207.65, gain: 0.35, type: 'sine' as OscillatorType },
      { freq: 277.18, gain: 0.25, type: 'triangle' as OscillatorType },
      { freq: 415.3, gain: 0.15, type: 'sine' as OscillatorType },
    ];

    this.oscillators = harmonicLayers.map(({ freq, gain, type }) => {
      const osc = this.audioCtx!.createOscillator();
      const oscGain = this.audioCtx!.createGain();

      osc.type = type;
      // Slight detune for natural acoustic chorus shimmer
      osc.frequency.setValueAtTime(freq, this.audioCtx!.currentTime);
      osc.detune.setValueAtTime((Math.random() - 0.5) * 6, this.audioCtx!.currentTime);

      oscGain.gain.setValueAtTime(gain, this.audioCtx!.currentTime);
      osc.connect(oscGain);
      oscGain.connect(this.filter!);

      osc.start();
      return osc;
    });

    this.filter.connect(this.masterGain);
    this.masterGain.connect(this.audioCtx.destination);
    this.isPlaying = true;
  }

  public stop() {
    if (!this.audioCtx || !this.masterGain) {
      this.isPlaying = false;
      return;
    }

    try {
      const now = this.audioCtx.currentTime;
      this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
      this.masterGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);

      setTimeout(() => {
        this.oscillators.forEach((osc) => {
          try {
            osc.stop();
            osc.disconnect();
          } catch {
            // Ignore if already stopped
          }
        });
        this.oscillators = [];

        if (this.lfo) {
          try {
            this.lfo.stop();
            this.lfo.disconnect();
          } catch {
            // Ignore
          }
          this.lfo = null;
        }

        this.isPlaying = false;
      }, 1300);
    } catch {
      this.isPlaying = false;
    }
  }
}

export const soundscapeEngine = new SoundscapeEngine();
