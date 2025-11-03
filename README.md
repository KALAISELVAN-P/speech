# SignSpeak - Sign Language to Speech

A production-ready React application that converts hand gestures to spoken text using MediaPipe and Web Speech API.

## Features

- 🎥 **Real-time Gesture Recognition** - Convert hand gestures to speech instantly
- 🗣️ **Text-to-Speech** - High-quality voice synthesis with multiple language options
- 🎯 **Custom Training** - Train your own gestures (coming soon)
- 📱 **Progressive Web App** - Works offline and installable on any device
- 🔒 **Privacy First** - All processing happens in your browser
- ♿ **Accessibility Focused** - Designed to break communication barriers

## Tech Stack

- **Frontend**: React 18 + Vite
- **Routing**: React Router v6
- **Styling**: Tailwind CSS
- **Hand Detection**: MediaPipe Hands
- **Speech**: Web Speech API
- **Authentication**: Firebase Auth
- **Database**: Firestore
- **PWA**: Service Worker + Manifest

## Quick Start

### Prerequisites

- Node.js 16+ and npm
- Modern web browser with webcam support
- Firebase project (for authentication)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd sign-language-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Firebase**
   
   Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
   
   Update `src/config/firebase.js` with your Firebase configuration:
   ```javascript
   const firebaseConfig = {
     apiKey: "your-api-key",
     authDomain: "your-project.firebaseapp.com",
     projectId: "your-project-id",
     storageBucket: "your-project.appspot.com",
     messagingSenderId: "123456789",
     appId: "your-app-id"
   };
   ```

4. **Enable Firebase services**
   - Authentication (Email/Password + Google)
   - Firestore Database
   - Storage (optional)

5. **Start development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── components/
│   ├── auth/           # Authentication components
│   ├── app/            # Main app components
│   └── common/         # Shared components
├── services/           # Business logic services
│   ├── authService.js  # Firebase authentication
│   ├── mediaService.js # Camera & MediaPipe
│   ├── gestureService.js # Gesture recognition
│   └── speechService.js # Text-to-speech
├── config/
│   └── firebase.js     # Firebase configuration
└── App.jsx            # Main app component
```

## Gesture Recognition

The app currently supports these built-in gestures:

- **Pointing** (Index finger up) → "I need water"
- **Open Palm** (All fingers up) → "Hello"
- **Fist** (All fingers down) → "Thank you"
- **Thumbs Up** → "Good"
- **Peace Sign** (Index + Middle up) → "Peace"

## Deployment

### Vercel (Recommended)

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Build and deploy**
   ```bash
   npm run build
   vercel --prod
   ```

### Netlify

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy to Netlify**
   - Drag and drop the `dist` folder to [Netlify Drop](https://app.netlify.com/drop)
   - Or connect your Git repository for automatic deployments

### Manual Deployment

1. **Build for production**
   ```bash
   npm run build
   ```

2. **Serve the `dist` folder** using any static file server

## Firebase Setup Guide

### 1. Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project"
3. Follow the setup wizard

### 2. Enable Authentication

1. Go to Authentication → Sign-in method
2. Enable "Email/Password"
3. Enable "Google" (optional)

### 3. Setup Firestore

1. Go to Firestore Database
2. Click "Create database"
3. Choose "Start in test mode" (update rules later)

### 4. Get Configuration

1. Go to Project Settings → General
2. Scroll to "Your apps"
3. Click "Web" icon to create web app
4. Copy the configuration object

## Browser Support

- Chrome 88+ (recommended)
- Firefox 85+
- Safari 14+
- Edge 88+

**Note**: MediaPipe requires a modern browser with WebAssembly support.

## Privacy & Security

- Camera frames are processed locally in your browser
- No video data is transmitted to external servers
- Firebase handles user authentication securely
- Gesture data is only stored if you explicitly save custom gestures

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Testing

### Unit Tests (Coming Soon)
```bash
npm run test
```

### E2E Tests (Coming Soon)
```bash
npm run test:e2e
```

## Troubleshooting

### Camera Issues
- Ensure camera permissions are granted
- Check if camera is being used by another application
- Try refreshing the page

### MediaPipe Loading Issues
- Check internet connection (MediaPipe loads from CDN)
- Clear browser cache
- Try in incognito/private mode

### Firebase Issues
- Verify Firebase configuration
- Check Firebase console for authentication/database rules
- Ensure Firebase services are enabled

## Roadmap

- [ ] Custom gesture training with TensorFlow.js
- [ ] Multi-language phrase translation
- [ ] Gesture history and analytics
- [ ] Voice settings and customization
- [ ] Offline gesture recognition
- [ ] Mobile app version

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Acknowledgments

- [MediaPipe](https://mediapipe.dev/) for hand tracking
- [Firebase](https://firebase.google.com/) for backend services
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [React](https://reactjs.org/) for the UI framework

---

Built with ❤️ for accessibility and inclusion.