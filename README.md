# ChitChat 🎥

A modern, peer-to-peer video calling application built with Angular 21 and WebRTC. ChitChat enables secure, direct video communication between users without requiring a central server for media streaming.

![Angular](https://img.shields.io/badge/Angular-21.0-red?logo=angular)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?logo=typescript)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.1-38B2AC?logo=tailwind-css)
![WebRTC](https://img.shields.io/badge/WebRTC-Enabled-green)

## ✨ Features

- **🔒 Peer-to-Peer Video Calls**: Direct WebRTC connections for secure, low-latency communication
- **🎤 Audio/Video Controls**: Toggle microphone and camera on/off during calls
- **📋 Simple Connection Flow**: Share offer/answer codes to establish connections
- **📱 Responsive Design**: Mobile-first UI built with TailwindCSS
- **🎨 Modern UI/UX**: Clean, intuitive interface with smooth animations
- **🔔 Toast Notifications**: Real-time feedback for user actions and errors
- **⚡ Standalone Components**: Built with Angular's latest standalone architecture
- **🎯 Signals-Based State**: Leveraging Angular signals for reactive state management

## 🚀 Quick Start

### Prerequisites

- **Node.js**: v18 or higher
- **npm**: v11.5.2 or higher
- **Modern Browser**: Chrome, Firefox, Safari, or Edge with WebRTC support

### Installation

```bash
# Clone the repository
git clone https://github.com/Satpal777/chit-chat.git

# Navigate to the project directory
cd chit-chat

# Install dependencies
npm install
```

### Development Server

```bash
npm start
```

Navigate to `http://localhost:4200/` in your browser. The application will automatically reload when you modify source files.

## 🎯 How to Use

### Starting a Call

1. **Create an Offer**
   - Click "Start a Call" on the home page
   - Click "Create Offer" to generate your offer code
   - Copy the generated offer code and share it with the person you want to call

2. **Receive Answer**
   - Wait for the other person to join using your offer code
   - They will provide you with an answer code
   - Paste the answer code and click "Connect"
   - You'll be automatically redirected to the call page

### Joining a Call

1. **Join with Offer**
   - Click "Join a Call" on the home page
   - Paste the offer code you received
   - Copy the generated answer code
   - Share the answer code with the person who created the offer
   - Click "Join Call" to enter the video chat

### During the Call

- **Toggle Microphone**: Mute/unmute your audio
- **Toggle Camera**: Turn your video on/off
- **Hang Up**: End the call and return to the home page

## 🏗️ Project Structure

```
src/
├── app/
│   ├── call-page/              # Active video call interface
│   ├── join-page/              # Landing and connection setup
│   │   ├── breadcrumb/         # Navigation breadcrumbs
│   │   ├── create-call-form/   # Offer creation form
│   │   ├── join-call-form/     # Answer creation form
│   │   └── join-menu/          # Main menu
│   ├── video-frames/           # Video display components
│   ├── components/             # Shared UI components
│   ├── directives/             # Custom Angular directives
│   ├── guards/                 # Route guards
│   │   └── call-guard.ts       # Protects call route
│   ├── services/
│   │   ├── webrtc.ts          # WebRTC connection management
│   │   └── toast.ts           # Notification service
│   └── header/                 # Application header
├── styles.css                  # Global styles
└── main.ts                     # Application entry point
```

## 🛠️ Technology Stack

### Core Framework
- **Angular 21**: Latest version with standalone components
- **TypeScript 5.9**: Strict type checking enabled
- **RxJS 7.8**: Reactive programming with Observables

### Styling
- **TailwindCSS 4.1**: Utility-first CSS framework
- **PostCSS**: CSS processing and optimization

### WebRTC
- **Native WebRTC API**: Peer-to-peer video/audio streaming
- **STUN Servers**: Google's public STUN servers for NAT traversal

### Testing
- **Vitest 4.0**: Fast unit testing framework
- **jsdom**: DOM implementation for testing

## 📦 Build

### Development Build

```bash
npm run build
```

### Production Build

```bash
npm run build -- --configuration production
```

Build artifacts will be stored in the `dist/` directory, optimized for performance and speed.

## 🧪 Testing

```bash
# Run unit tests
npm test

# Run tests in watch mode
npm run test -- --watch
```

## 🔧 Configuration

### Angular Configuration

The project uses Angular's latest build system with the following key configurations:

- **Standalone Components**: All components use the standalone API
- **OnPush Change Detection**: Optimized rendering performance
- **Lazy Loading**: Routes are lazy-loaded for better initial load times
- **Signals**: Modern reactive state management

### WebRTC Configuration

STUN servers are configured in `src/app/services/webrtc.ts`:

```typescript
iceServers: [
  { urls: 'stun:stun.l.google.com:19302' },
  { urls: 'stun:stun1.l.google.com:19302' }
]
```

> **Note**: For production use, consider adding TURN servers for better connectivity in restrictive network environments.

## 🎨 Code Style

This project follows strict Angular and TypeScript best practices:

- ✅ Standalone components (no NgModules)
- ✅ Signals for state management
- ✅ `input()` and `output()` functions instead of decorators
- ✅ OnPush change detection strategy
- ✅ Native control flow (`@if`, `@for`, `@switch`)
- ✅ Strict TypeScript typing (no `any`)
- ✅ `inject()` function for dependency injection
- ✅ WCAG AA accessibility compliance

### Code Formatting

Prettier is configured with the following settings:

```json
{
  "printWidth": 100,
  "singleQuote": true
}
```

## 🔐 Security Considerations

- **Peer-to-Peer**: Media streams are sent directly between peers, not through a server
- **HTTPS Required**: WebRTC requires HTTPS in production (localhost works for development)
- **Permissions**: Users must grant camera and microphone permissions
- **No Data Persistence**: Connection codes are temporary and not stored

## 🌐 Browser Support

ChitChat works on all modern browsers with WebRTC support:

- ✅ Chrome/Edge 80+
- ✅ Firefox 75+
- ✅ Safari 14+
- ✅ Opera 67+

## 🚧 Known Limitations

- **No Signaling Server**: Users must manually exchange offer/answer codes
- **No TURN Server**: May not work in highly restrictive network environments
- **Two-Person Limit**: Currently supports only 1-to-1 video calls
- **No Recording**: Calls are not recorded or stored

## 🗺️ Roadmap

- [ ] Implement signaling server for automatic connection setup
- [ ] Add TURN server support for better connectivity
- [ ] Support for group video calls
- [ ] Screen sharing functionality
- [ ] Chat messaging during calls
- [ ] Call recording feature
- [ ] Virtual backgrounds
- [ ] End-to-end encryption indicators

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Follow the existing code style and best practices
4. Commit your changes (`git commit -m 'Add amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- **Angular Team**: For the amazing framework
- **WebRTC Community**: For comprehensive documentation
- **Google**: For providing free STUN servers

## 📞 Support

For issues, questions, or suggestions:

- **GitHub Issues**: [Create an issue](https://github.com/Satpal777/chit-chat/issues)
- **Discussions**: [Join the discussion](https://github.com/Satpal777/chit-chat/discussions)

---

**Built with ❤️ using Angular and WebRTC**
