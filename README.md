# Real-Time Chat Application

A modern, real-time chat application built with React and Node.js, featuring WebSocket communication, user authentication, and a clean, responsive UI.

## 🚀 Features

- **Real-time messaging** - Instant message delivery using Socket.IO
- **User authentication** - Secure JWT-based authentication
- **User presence** - See who's online/offline
- **Typing indicators** - Real-time typing status
- **Responsive design** - Works on desktop and mobile
- **Message history** - Persistent conversation storage
- **Clean UI** - Modern interface built with React and Tailwind CSS

## 🛠 Tech Stack

### Frontend
- **React 19** - User interface framework
- **Vite** - Build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **Socket.IO Client** - Real-time communication
- **ESLint** - Code linting

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **Socket.IO** - Real-time bidirectional communication
- **MongoDB** - Database
- **Mongoose** - MongoDB object modeling
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing

## 📁 Project Structure

```
chat-app/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── constants/      # Application constants
│   │   ├── utils/          # Utility functions
│   │   └── assets/         # Static assets
│   ├── public/             # Public assets
│   └── package.json
│
├── server/                 # Backend Node.js application
│   ├── config/             # Configuration files
│   ├── middleware/         # Express middleware
│   ├── models/             # MongoDB models
│   ├── routes/             # API routes
│   ├── socket/             # Socket.IO handlers
│   ├── utils/              # Utility functions
│   └── package.json
│
└── README.md
```

## 🔧 Prerequisites

Before running this application, make sure you have:

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **MongoDB** (local installation or MongoDB Atlas)

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/Rahul-chhajed/chat_room.git
cd chat_room
```

### 2. Backend Setup

Navigate to the server directory:
```bash
cd server
```

Install dependencies:
```bash
npm install
```

Create a `.env` file in the server directory:
```env
JWT_SECRET=your-super-secret-jwt-key
PORT=5000
CLIENT_URL=http://localhost:5173
MONGODB_URI=mongodb://localhost:27017/chatapp
```

Start the backend server:
```bash
# Development mode
npm run dev

# Production mode
npm start
```

The server will start on `http://localhost:5000`

### 3. Frontend Setup

Open a new terminal and navigate to the client directory:
```bash
cd client
```

Install dependencies:
```bash
npm install
```

Start the development server:
```bash
npm run dev
```

The client will start on `http://localhost:5173`

## 🎯 Usage

1. **Open your browser** and navigate to `http://localhost:5173`
2. **Register/Login** with your credentials
3. **Select a user** from the user list to start chatting
4. **Send messages** in real-time
5. **See typing indicators** when someone is typing
6. **View online status** of other users

## 🔑 Environment Variables

### Server (.env)
| Variable | Description | Default |
|----------|-------------|---------|
| `JWT_SECRET` | Secret key for JWT tokens | `your-secret-key` |
| `PORT` | Server port | `5000` |
| `CLIENT_URL` | Frontend URL for CORS | `http://localhost:5173` |
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/chatapp` |

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Users
- `GET /api/users` - Get all users (authenticated)

### Conversations
- `GET /api/conversations/:userId` - Get conversation with specific user

## 🔌 Socket Events

### Client → Server
- `message:new` - Send a new message
- `typing:start` - Start typing indicator
- `typing:stop` - Stop typing indicator

### Server → Client
- `message:sent` - Message successfully sent
- `message:new` - New message received
- `typing:start` - User started typing
- `typing:stop` - User stopped typing
- `user:status` - User online/offline status

## 🏗 Development

### Frontend Development
```bash
cd client
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Backend Development
```bash
cd server
npm run dev          # Start with nodemon
npm start            # Start production server
```

## 🧪 Testing

Currently, this project doesn't include automated tests. Consider adding:
- Unit tests with Jest
- Integration tests for API endpoints
- E2E tests with Cypress or Playwright

## 🚀 Deployment

### Frontend (Vercel/Netlify)
1. Build the client: `npm run build`
2. Deploy the `dist` folder to your hosting service
3. Update environment variables

### Backend (Heroku/Railway/DigitalOcean)
1. Set environment variables on your hosting platform
2. Ensure MongoDB is accessible
3. Deploy the server directory

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Rahul Chhajed**
- GitHub: [@Rahul-chhajed](https://github.com/Rahul-chhajed)

## 🐛 Issues & Support

If you encounter any issues or have questions, please [open an issue](https://github.com/Rahul-chhajed/chat_room/issues) on GitHub.

## 🔮 Future Enhancements

- [ ] File sharing capabilities
- [ ] Voice/Video calling
- [ ] Group chat functionality
- [ ] Message reactions and emojis
- [ ] Push notifications
- [ ] Dark/Light theme toggle
- [ ] Message search functionality
- [ ] User profiles and avatars
- [ ] Message encryption
- [ ] Mobile app (React Native)

---

⭐ If you found this project helpful, please give it a star!
