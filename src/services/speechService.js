class SpeechService {
  constructor() {
    this.synth = window.speechSynthesis;
    this.voices = [];
    this.settings = {
      voice: null,
      rate: 1,
      pitch: 1,
      volume: 1,
      lang: 'en-US'
    };
    this.lastSpokenText = '';
    this.lastSpokenTime = 0;
    this.cooldownMs = 2000; // 2 second cooldown
    
    this.loadVoices();
  }

  loadVoices() {
    this.voices = this.synth.getVoices();
    if (this.voices.length === 0) {
      // Voices might not be loaded yet
      this.synth.onvoiceschanged = () => {
        this.voices = this.synth.getVoices();
      };
    }
  }

  getVoices() {
    return this.voices;
  }

  setVoice(voiceIndex) {
    if (this.voices[voiceIndex]) {
      this.settings.voice = this.voices[voiceIndex];
    }
  }

  setRate(rate) {
    this.settings.rate = Math.max(0.1, Math.min(10, rate));
  }

  setPitch(pitch) {
    this.settings.pitch = Math.max(0, Math.min(2, pitch));
  }

  setVolume(volume) {
    this.settings.volume = Math.max(0, Math.min(1, volume));
  }

  setLanguage(lang) {
    this.settings.lang = lang;
  }

  speak(text, force = false) {
    if (!text || text.trim() === '') return;

    const now = Date.now();
    
    // Check cooldown to prevent repeated speech
    if (!force && 
        text === this.lastSpokenText && 
        (now - this.lastSpokenTime) < this.cooldownMs) {
      return;
    }

    // Cancel any ongoing speech
    this.synth.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = this.settings.rate;
    utterance.pitch = this.settings.pitch;
    utterance.volume = this.settings.volume;
    
    // Simple fallback - just speak with default voice
    console.log('Speaking:', text);
    
    utterance.onerror = (event) => {
      console.error('Speech error:', event);
    };
    
    utterance.onstart = () => {
      console.log('Speech started');
    };
    
    utterance.onend = () => {
      console.log('Speech ended');
    };

    this.synth.speak(utterance);
    
    this.lastSpokenText = text;
    this.lastSpokenTime = now;

    return utterance;
  }

  stop() {
    this.synth.cancel();
  }

  isSpeaking() {
    return this.synth.speaking;
  }
}

export const speechService = new SpeechService();