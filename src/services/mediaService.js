import { Hands } from '@mediapipe/hands';
import { Camera } from '@mediapipe/camera_utils';

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
      // Initialize MediaPipe Hands
      this.hands = new Hands({
        locateFile: (file) => {
          return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
        }
      });

      this.hands.setOptions({
        maxNumHands: 2,
        modelComplexity: 1,
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5
      });

      this.hands.onResults(this.onResults);

      // Initialize camera
      this.camera = new Camera(this.videoElement, {
        onFrame: async () => {
          if (this.hands) {
            await this.hands.send({ image: this.videoElement });
          }
        },
        width: 640,
        height: 480
      });

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

    try {
      await this.camera.start();
      return true;
    } catch (error) {
      console.error('Failed to start camera:', error);
      throw error;
    }
  }

  stopCamera() {
    if (this.camera) {
      this.camera.stop();
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
    if (this.hands) {
      this.hands.close();
    }
    this.isInitialized = false;
  }
}

export const mediaService = new MediaService();