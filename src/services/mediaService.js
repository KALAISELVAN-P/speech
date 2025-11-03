export class MediaService {
  constructor() {
    this.camera = null;
    this.hands = null;
    this.videoElement = null;
    this.canvasElement = null;
    this.onResults = null;
    this.isInitialized = false;
  }

  async initialize(videoElement, canvasElement, onResults) {
    this.videoElement = videoElement;
    this.canvasElement = canvasElement;
    this.onResults = onResults;

    try {
      // Simple camera initialization without MediaPipe for now
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { width: 640, height: 480 } 
      });
      
      this.videoElement.srcObject = stream;
      this.videoElement.play();
      
      // Mock hand detection for testing
      setInterval(() => {
        if (this.onResults) {
          this.onResults({
            image: this.videoElement,
            multiHandLandmarks: [] // Empty for now
          });
        }
      }, 100);

      this.isInitialized = true;
      return true;
    } catch (error) {
      console.error('Failed to initialize MediaService:', error);
      throw error;
    }
  }

  async startCamera() {
    if (!this.isInitialized) {
      throw new Error('MediaService not initialized');
    }
    return true; // Already started in initialize
  }

  stopCamera() {
    if (this.videoElement && this.videoElement.srcObject) {
      const tracks = this.videoElement.srcObject.getTracks();
      tracks.forEach(track => track.stop());
      this.videoElement.srcObject = null;
    }
  }

  async requestCameraPermission() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { width: 640, height: 480 } 
      });
      
      // Stop the stream immediately, we just wanted to check permission
      stream.getTracks().forEach(track => track.stop());
      
      return true;
    } catch (error) {
      console.error('Camera permission denied:', error);
      return false;
    }
  }

  isCameraSupported() {
    return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
  }

  destroy() {
    this.stopCamera();
    this.isInitialized = false;
  }
}

export const mediaService = new MediaService();