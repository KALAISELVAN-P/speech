// Simple rule-based gesture recognition
export class GestureService {
  constructor() {
    this.gestures = new Map([
      ['pointing', 'I need water'],
      ['open_palm', 'Hello'],
      ['fist', 'Thank you'],
      ['thumbs_up', 'Good'],
      ['peace', 'Peace']
    ]);
  }

  // Analyze hand landmarks and return recognized gesture
  recognizeGesture(landmarks) {
    if (!landmarks || landmarks.length === 0) {
      return null;
    }

    try {
      const gesture = this.classifyHandShape(landmarks);
      return {
        gesture,
        phrase: this.gestures.get(gesture) || 'Unknown gesture',
        confidence: 0.8 // Mock confidence for rule-based system
      };
    } catch (error) {
      console.error('Error recognizing gesture:', error);
      return null;
    }
  }

  classifyHandShape(landmarks) {
    // Get finger tip and pip positions
    const fingerTips = [4, 8, 12, 16, 20]; // Thumb, Index, Middle, Ring, Pinky tips
    const fingerPips = [3, 6, 10, 14, 18]; // Finger PIP joints
    
    // Check if fingers are extended
    const fingersUp = this.getFingersUp(landmarks, fingerTips, fingerPips);
    
    // Rule-based classification
    if (this.isPointing(fingersUp)) return 'pointing';
    if (this.isOpenPalm(fingersUp)) return 'open_palm';
    if (this.isFist(fingersUp)) return 'fist';
    if (this.isThumbsUp(fingersUp)) return 'thumbs_up';
    if (this.isPeace(fingersUp)) return 'peace';
    
    return 'unknown';
  }

  getFingersUp(landmarks, tips, pips) {
    const fingersUp = [];
    
    // Thumb (special case - compare x coordinates)
    fingersUp.push(landmarks[tips[0]].x > landmarks[pips[0]].x);
    
    // Other fingers (compare y coordinates)
    for (let i = 1; i < tips.length; i++) {
      fingersUp.push(landmarks[tips[i]].y < landmarks[pips[i]].y);
    }
    
    return fingersUp;
  }

  isPointing(fingersUp) {
    // Only index finger up
    return !fingersUp[0] && fingersUp[1] && !fingersUp[2] && !fingersUp[3] && !fingersUp[4];
  }

  isOpenPalm(fingersUp) {
    // All fingers up
    return fingersUp.every(finger => finger);
  }

  isFist(fingersUp) {
    // All fingers down
    return fingersUp.every(finger => !finger);
  }

  isThumbsUp(fingersUp) {
    // Only thumb up
    return fingersUp[0] && !fingersUp[1] && !fingersUp[2] && !fingersUp[3] && !fingersUp[4];
  }

  isPeace(fingersUp) {
    // Index and middle finger up
    return !fingersUp[0] && fingersUp[1] && fingersUp[2] && !fingersUp[3] && !fingersUp[4];
  }

  // Add custom gesture
  addGesture(gestureKey, phrase) {
    this.gestures.set(gestureKey, phrase);
  }

  // Get all gestures
  getAllGestures() {
    return Array.from(this.gestures.entries()).map(([key, phrase]) => ({
      key,
      phrase
    }));
  }
}

export const gestureService = new GestureService();