// Offline Web Audio API Synthesizer for Yogic Frequencies & Breathing White Noise
class AudioEngine {
  private ctx: AudioContext | null = null;
  private osc1: OscillatorNode | null = null;
  private osc2: OscillatorNode | null = null;
  private filter: BiquadFilterNode | null = null;
  private noiseNode: AudioWorkletNode | ScriptProcessorNode | null = null;
  private masterGain: GainNode | null = null;
  private noiseGain: GainNode | null = null;
  private droneGain: GainNode | null = null;
  private chimeGain: GainNode | null = null;
  private isPlaying = false;
  private waveInterval: any = null;
  private musicInterval: any = null;

  public init() {
    if (this.ctx) return;
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    
    this.ctx = new AudioContextClass();
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(0.15, this.ctx.currentTime);
    this.masterGain.connect(this.ctx.destination);

    // Create sub gain nodes
    this.droneGain = this.ctx.createGain();
    this.droneGain.gain.setValueAtTime(0.7, this.ctx.currentTime);
    this.droneGain.connect(this.masterGain);

    this.noiseGain = this.ctx.createGain();
    this.noiseGain.gain.setValueAtTime(0.2, this.ctx.currentTime);
    this.noiseGain.connect(this.masterGain);

    this.chimeGain = this.ctx.createGain();
    this.chimeGain.gain.setValueAtTime(0.35, this.ctx.currentTime);
    this.chimeGain.connect(this.masterGain);
  }

  public toggle(forceState?: boolean, frequencyType: "432" | "528" | "639" = "432") {
    this.init();
    if (!this.ctx) return false;

    // Direct state matching
    const targetState = forceState !== undefined ? forceState : !this.isPlaying;
    if (targetState === this.isPlaying) return this.isPlaying;

    if (targetState) {
      this.ctx.resume();
      this.startDrone(frequencyType);
      this.startOceanBreath();
      this.startMelody(frequencyType);
      this.isPlaying = true;
    } else {
      this.stopAll();
      this.isPlaying = false;
    }
    return this.isPlaying;
  }

  public changeVolume(val: number) {
    if (!this.ctx || !this.masterGain) return;
    this.masterGain.gain.setValueAtTime(val, this.ctx.currentTime);
  }

  public active() {
    return this.isPlaying;
  }

  private startDrone(freqType: "432" | "528" | "639") {
    if (!this.ctx || !this.droneGain) return;

    let baseFreq = 432;
    if (freqType === "528") baseFreq = 528;
    if (freqType === "639") baseFreq = 639;

    // Warm, deep binaural sound model
    this.osc1 = this.ctx.createOscillator();
    this.osc1.type = "sine";
    this.osc1.frequency.setValueAtTime(baseFreq, this.ctx.currentTime);

    this.osc2 = this.ctx.createOscillator();
    this.osc2.type = "triangle";
    // Slight delta creating 4Hz soothing theta beat
    this.osc2.frequency.setValueAtTime(baseFreq - 4, this.ctx.currentTime);

    this.filter = this.ctx.createBiquadFilter();
    this.filter.type = "lowpass";
    this.filter.frequency.setValueAtTime(250, this.ctx.currentTime); // muffles high screech tones

    this.osc1.connect(this.filter);
    this.osc2.connect(this.filter);
    this.filter.connect(this.droneGain);

    this.osc1.start();
    this.osc2.start();
  }

  private startOceanBreath() {
    if (!this.ctx || !this.noiseGain) return;

    // Synthesize organic breathing white noise using legacy safe ScriptProcessor
    const bufferSize = 4096;
    try {
      this.noiseNode = this.ctx.createScriptProcessor(bufferSize, 1, 1);
      this.noiseNode.onaudioprocess = (e) => {
        const output = e.outputBuffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          output[i] = Math.random() * 2 - 1; // raw white noise
        }
      };

      const waveFilter = this.ctx.createBiquadFilter();
      waveFilter.type = "bandpass";
      waveFilter.frequency.setValueAtTime(300, this.ctx.currentTime);
      waveFilter.Q.setValueAtTime(1.5, this.ctx.currentTime);

      this.noiseNode.connect(waveFilter);
      waveFilter.connect(this.noiseGain);

      // Create an automatic breath swelling envelope (6 seconds loop - 3s inhale, 3s exhale)
      let breathIn = true;
      const swingLoop = () => {
        if (!this.ctx || !this.isPlaying || !this.noiseGain) return;
        const targetGain = breathIn ? 0.35 : 0.08;
        const targetCutoff = breathIn ? 550 : 220;
        
        this.noiseGain.gain.exponentialRampToValueAtTime(targetGain, this.ctx.currentTime + 3);
        waveFilter.frequency.exponentialRampToValueAtTime(targetCutoff, this.ctx.currentTime + 3);
        
        breathIn = !breathIn;
      };

      swingLoop();
      this.waveInterval = setInterval(swingLoop, 3100);
    } catch (e) {
      console.warn("Ocean breathing noise synthesizer not supported on this platform.", e);
    }
  }

  private startMelody(freqType: "432" | "528" | "639") {
    if (!this.ctx || !this.chimeGain) return;

    let baseFreq = 432;
    if (freqType === "528") baseFreq = 528;
    if (freqType === "639") baseFreq = 639;

    // Soothing Indian blueprint & Zen pentatonic scale multipliers
    // 1 (sa), 9/8 (re), 5/4 (ga), 3/2 (pa), 5/3 (dha) and Octaves
    const pentatonicRatios = [0.5, 0.75, 1.0, 1.125, 1.25, 1.5, 1.667, 2.0, 2.25, 2.5, 3.0];

    const triggerChime = () => {
      if (!this.ctx || !this.isPlaying || !this.chimeGain) return;

      // Random 30% rest beat to keep melody flowing naturally, non-mechanic
      if (Math.random() > 0.7) return;

      const ratio = pentatonicRatios[Math.floor(Math.random() * pentatonicRatios.length)];
      // Keep frequencies in an audible, beautiful peaceful range (e.g., 200Hz - 1200Hz)
      let targetFreq = baseFreq * ratio;
      while (targetFreq > 1300) {
        targetFreq *= 0.5;
      }
      while (targetFreq < 150) {
        targetFreq *= 2.0;
      }

      try {
        const chimeOsc = this.ctx.createOscillator();
        const overtoneOsc = this.ctx.createOscillator();
        const chimeEnvelope = this.ctx.createGain();
        const overtoneGain = this.ctx.createGain();

        // Soft, sweet sine wave fundamental
        chimeOsc.type = "sine";
        chimeOsc.frequency.setValueAtTime(targetFreq, this.ctx.currentTime);

        // Warm metallic overtone (physics-modeled bell chime)
        overtoneOsc.type = "sine";
        // Slightly detuned third harmonic
        overtoneOsc.frequency.setValueAtTime(targetFreq * 2.001, this.ctx.currentTime);

        overtoneGain.gain.setValueAtTime(0.04, this.ctx.currentTime);

        const now = this.ctx.currentTime;
        const ringDuration = 2.5 + Math.random() * 2.0; // long, sweet, cozy sustain ring

        chimeEnvelope.gain.setValueAtTime(0.0, now);
        // Silky soft attack to avoid sharp popping clicks
        chimeEnvelope.gain.linearRampToValueAtTime(0.08, now + 0.1);
        // Exponential decay into deep zen silence
        chimeEnvelope.gain.exponentialRampToValueAtTime(0.0001, now + ringDuration);

        // Route routing nodes
        chimeOsc.connect(chimeEnvelope);
        overtoneOsc.connect(overtoneGain);
        overtoneGain.connect(chimeEnvelope);

        chimeEnvelope.connect(this.chimeGain);

        // Start and program auto-termination
        chimeOsc.start(now);
        overtoneOsc.start(now);

        chimeOsc.stop(now + ringDuration + 0.05);
        overtoneOsc.stop(now + ringDuration + 0.05);
      } catch (e) {
        // Safe play
      }
    };

    // Trigger immediately
    triggerChime();

    // Trigger sequentially every 3 seconds
    this.musicInterval = setInterval(triggerChime, 3000);
  }

  private stopAll() {
    try {
      if (this.osc1) {
        this.osc1.stop();
        this.osc1.disconnect();
        this.osc1 = null;
      }
      if (this.osc2) {
        this.osc2.stop();
        this.osc2.disconnect();
        this.osc2 = null;
      }
      if (this.noiseNode) {
        this.noiseNode.disconnect();
        this.noiseNode = null;
      }
      if (this.waveInterval) {
        clearInterval(this.waveInterval);
        this.waveInterval = null;
      }
      if (this.musicInterval) {
        clearInterval(this.musicInterval);
        this.musicInterval = null;
      }
    } catch (e) {
      // safe cleanup
    }
  }
}

export const PranaAudio = new AudioEngine();
