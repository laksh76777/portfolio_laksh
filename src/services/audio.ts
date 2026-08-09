// High-Fidelity Web Audio API Synthesizer & Looping Background Audio for Universe Portfolio

class UniverseAudioService {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private bgAudio: HTMLAudioElement | null = null;
  private ambientGain: GainNode | null = null;
  private ambientOsc1: OscillatorNode | null = null;
  private ambientOsc2: OscillatorNode | null = null;
  private isAmbientPlaying: boolean = false;
  private bgAudioVolume: number = 0.12; // Minimum subtle background sound as requested

  constructor() {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('universe_sound_muted');
      this.isMuted = stored === 'true';

      // Setup Looping Background Soundtrack
      this.initBackgroundAudio();

      // Global click listener to ensure audio feedback on all button/link interactions
      window.addEventListener('click', (e) => {
        const target = e.target as HTMLElement;
        if (target && (target.closest('button') || target.closest('a') || target.closest('[role="button"]'))) {
          this.playClickBeep();
        }
      }, { passive: true });

      // Start background audio on first user gesture
      const startOnGesture = () => {
        this.initContext();
        if (!this.isMuted) {
          this.playBackgroundAudio();
        }
        window.removeEventListener('pointerdown', startOnGesture);
        window.removeEventListener('keydown', startOnGesture);
        window.removeEventListener('click', startOnGesture);
      };
      window.addEventListener('pointerdown', startOnGesture, { once: true });
      window.addEventListener('keydown', startOnGesture, { once: true });
      window.addEventListener('click', startOnGesture, { once: true });
    }
  }

  private initBackgroundAudio() {
    if (typeof window === 'undefined') return;
    try {
      this.bgAudio = new Audio('/audio/background.mp3');
      this.bgAudio.loop = true;
      this.bgAudio.volume = this.bgAudioVolume;
      this.bgAudio.preload = 'auto';
    } catch {
      // Audio element initialization fallback
    }
  }

  public playBackgroundAudio() {
    if (this.isMuted) return;
    if (!this.bgAudio) {
      this.initBackgroundAudio();
    }
    if (this.bgAudio) {
      this.bgAudio.volume = this.bgAudioVolume;
      this.bgAudio.play().catch(() => {
        // Handled after gesture
      });
    }
  }

  public pauseBackgroundAudio() {
    if (this.bgAudio) {
      this.bgAudio.pause();
    }
  }

  private initContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (typeof window !== 'undefined') {
      localStorage.setItem('universe_sound_muted', String(this.isMuted));
    }
    
    if (this.isMuted) {
      this.pauseBackgroundAudio();
      this.stopAmbientDrone();
    } else {
      this.initContext();
      this.playClickBeep();
      this.playBackgroundAudio();
      this.startAmbientDrone();
    }
    return this.isMuted;
  }

  // Background Ambient Cosmic Drone (Complementary synth layer)
  public startAmbientDrone() {
    if (this.isMuted || this.isAmbientPlaying) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      this.ambientGain = this.ctx.createGain();
      this.ambientGain.gain.setValueAtTime(0.001, this.ctx.currentTime);
      this.ambientGain.gain.exponentialRampToValueAtTime(0.02, this.ctx.currentTime + 3);

      this.ambientOsc1 = this.ctx.createOscillator();
      this.ambientOsc1.type = 'sine';
      this.ambientOsc1.frequency.setValueAtTime(55, this.ctx.currentTime);

      this.ambientOsc2 = this.ctx.createOscillator();
      this.ambientOsc2.type = 'triangle';
      this.ambientOsc2.frequency.setValueAtTime(110, this.ctx.currentTime);

      this.ambientOsc1.connect(this.ambientGain);
      this.ambientOsc2.connect(this.ambientGain);
      this.ambientGain.connect(this.ctx.destination);

      this.ambientOsc1.start();
      this.ambientOsc2.start();
      this.isAmbientPlaying = true;
    } catch {
      // Audio context handling
    }
  }

  public stopAmbientDrone() {
    if (!this.isAmbientPlaying) return;
    try {
      if (this.ambientGain && this.ctx) {
        this.ambientGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.5);
      }
      setTimeout(() => {
        this.ambientOsc1?.stop();
        this.ambientOsc2?.stop();
        this.ambientOsc1?.disconnect();
        this.ambientOsc2?.disconnect();
        this.ambientGain?.disconnect();
        this.isAmbientPlaying = false;
      }, 500);
    } catch {
      this.isAmbientPlaying = false;
    }
  }

  // UI interaction click sound
  public playClickBeep() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(1400, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(800, this.ctx.currentTime + 0.06);

      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.06);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.06);
    } catch {
      // Ignore
    }
  }

  // Hover chirp
  public playHoverChirp() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(900, this.ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(1100, this.ctx.currentTime + 0.04);

      gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.04);
    } catch {
      // Ignore
    }
  }

  // Holographic chime used by loading and sims
  public playHolographicChime() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const freqs = [659.25, 880, 1174.66]; // E5, A5, D6
      freqs.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.05);

        gain.gain.setValueAtTime(0.07, this.ctx.currentTime + idx * 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + idx * 0.05 + 0.2);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(this.ctx.currentTime + idx * 0.05);
        osc.stop(this.ctx.currentTime + idx * 0.05 + 0.2);
      });
    } catch {
      // Ignore
    }
  }

  // Modal open synthesizer sweep
  public playModalOpen() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(400, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1200, this.ctx.currentTime + 0.18);

      gain.gain.setValueAtTime(0.09, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.18);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.18);
    } catch {
      // Ignore
    }
  }

  public playModalClose() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(1000, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(300, this.ctx.currentTime + 0.14);

      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.14);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.14);
    } catch {
      // Ignore
    }
  }

  public playSuccessChime() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const notes = [523.25, 659.25, 783.99, 1046.50];
      notes.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.07);

        gain.gain.setValueAtTime(0.08, this.ctx.currentTime + idx * 0.07);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + idx * 0.07 + 0.25);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(this.ctx.currentTime + idx * 0.07);
        osc.stop(this.ctx.currentTime + idx * 0.07 + 0.25);
      });
    } catch {
      // Ignore
    }
  }

  public playWarpSpeed() {
    this.playSuccessChime();
  }

  public playTransmissionSuccess() {
    this.playSuccessChime();
  }

  public playCopySound() {
    this.playClickBeep();
  }
}

export const universeAudio = new UniverseAudioService();
