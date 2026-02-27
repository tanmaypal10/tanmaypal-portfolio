# Tanmay Pal - Portfolio Website

A full-stack portfolio website with a modern React frontend and Node.js backend, showcasing my work as a Web & App Developer.

## 🌟 Features

### Frontend
- **Modern Design**: Dark cinematic theme with smooth animations using Framer Motion
- **Responsive Layout**: Fully responsive design that works on all devices
- **Interactive Components**: Hover effects, transitions, and micro-interactions
- **Project Gallery**: Filterable project showcase with categories
- **Contact Form**: Functional contact form with toast notifications
- **Image Gallery**: Lightbox modal for viewing images
- **Navigation**: Smooth scrolling navigation with active state indicators
- **Performance**: Optimized for speed and SEO

### Backend
- **RESTful API**: Clean and well-documented API endpoints
- **MongoDB Integration**: Persistent data storage with Mongoose ODM
- **Email Service**: Automated email notifications for contact forms
- **Input Validation**: Comprehensive validation with Joi schemas
- **Security**: Helmet, CORS, and rate limiting protection
- **Error Handling**: Robust error handling and logging
- **Environment Config**: Secure environment variable management

## 🛠️ Technologies Used

### Frontend
- **React 18** - UI framework with hooks and modern patterns
- **TypeScript** - Type-safe JavaScript development
- **Vite** - Fast build tool and development server
- **React Router** - Client-side routing with future flags enabled
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library for smooth transitions

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database for data persistence
- **Mongoose** - MongoDB object modeling and validation
- **Joi** - Input validation library
- **Nodemailer** - Email sending service
- **Helmet** - Security middleware for Express

### Shared Technologies
- **shadcn/ui** - Modern component library built on Radix UI
- **Lucide React** - Beautiful icon library
- **React Hook Form** - Form handling with validation
- **React Query** - Server state management

### Development Tools
- **ESLint** - Code linting and formatting
- **Vitest** - Unit testing framework
- **PostCSS** - CSS processing
- **Nodemon** - Development server auto-restart

## 📁 Project Structure

```
portfolio-website/
├── frontend/             # React frontend application
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   │   ├── ui/       # shadcn/ui components
│   │   │   ├── Hero.tsx  # Landing hero section
│   │   │   ├── Navbar.tsx # Navigation header
│   │   │   └── Footer.tsx # Footer component
│   │   ├── pages/         # Page components
│   │   │   ├── Index.tsx  # Home page
│   │   │   ├── About.tsx  # About page
│   │   │   ├── Projects.tsx # Projects showcase
│   │   │   ├── Gallery.tsx # Image gallery
│   │   │   ├── Contact.tsx # Contact form
│   │   │   └── NotFound.tsx # 404 page
│   │   ├── hooks/         # Custom React hooks
│   │   ├── lib/          # Utility functions
│   │   ├── assets/        # Static assets
│   │   └── styles/       # Global styles
│   ├── package.json       # Frontend dependencies
│   └── README.md         # Frontend documentation
├── backend/              # Node.js backend API
│   ├── models/           # Mongoose data models
│   │   ├── Contact.js    # Contact form model
│   │   └── Project.js   # Project portfolio model
│   ├── routes/          # API route handlers
│   │   ├── contact.js    # Contact endpoints
│   │   └── projects.js  # Project endpoints
│   ├── utils/           # Utility functions
│   │   └── email.js     # Email service
│   ├── server.js        # Main server file
│   ├── package.json     # Backend dependencies
│   ├── .env.example     # Environment variables template
│   └── README.md       # Backend documentation
└── README.md            # This file
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Installation

1. **Clone repository**
   ```bash
   git clone <repository-url>
   cd portfolio-website
   ```

2. **Install frontend dependencies**
   ```bash
   cd frontend
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd ../backend
   npm install
   ```

4. **Set up backend environment**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

5. **Start MongoDB**
   ```bash
   # For local MongoDB
   mongod
   ```

6. **Start both servers**
   ```bash
   # Terminal 1 - Backend
   cd backend
   npm run dev

   # Terminal 2 - Frontend
   cd frontend
   npm run dev
   ```

7. **Open your browser**
   - Frontend: `http://localhost:5173`
   - Backend API: `http://localhost:5000`
   - Health Check: `http://localhost:5000/api/health`

## 📜 Available Scripts

### Frontend Scripts
```bash
cd frontend
npm run dev          # Start development server
npm run build        # Build for production
npm run build:dev    # Build for development mode
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run test         # Run tests
npm run test:watch   # Run tests in watch mode
```

### Backend Scripts
```bash
cd backend
npm start            # Start production server
npm run dev          # Start development server with nodemon
npm test             # Run test suite
```

## 🎨 Design System

### Color Scheme
- **Primary**: Blue gradient accents
- **Background**: Dark theme with subtle gradients
- **Card**: Semi-transparent cards with glow effects
- **Text**: High contrast for readability

### Typography
- **Display Font**: Space Grotesk (headings)
- **Body Font**: Inter (paragraphs)
- **Code Font**: Monospace family for code elements

### Animations
- Page transitions with Framer Motion
- Hover effects on interactive elements
- Smooth scrolling and parallax effects
- Loading states and micro-interactions

## 📱 Pages Overview

### Home (`/`)
- Hero section with call-to-action
- Services overview
- Featured projects showcase (fetched from API)
- Contact prompt

### About (`/about`)
- Personal introduction
- Skills and technologies
- Professional background

### Projects (`/projects`)
- Filterable project gallery (data from API)
- Category-based filtering
- Project cards with details
- Links to live demos and GitHub

### Gallery (`/gallery`)
- Image showcase with lightbox
- Mixed media portfolio
- Responsive grid layout

### Contact (`/contact`)
- Contact form with validation (submits to API)
- Social media links
- Contact information display

## 🔧 Configuration

### Frontend Environment Variables
Create `frontend/.env.local`:
```env
VITE_API_URL=http://localhost:5000/api
VITE_APP_TITLE="Tanmay Pal Portfolio"
VITE_APP_DESCRIPTION="Web & App Developer Portfolio"
```

### Backend Environment Variables
Create `backend/.env`:
```env
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
MONGODB_URI=mongodb://localhost:27017/portfolio
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM=your-email@gmail.com
```

## � API Endpoints

### Contact API (`/api/contact`)
- `POST /` - Submit contact form
- `GET /` - Get all contacts (admin)

### Projects API (`/api/projects`)
- `GET /` - Get all projects (with filtering)
- `GET /:id` - Get single project
- `POST /` - Create new project (admin)
- `PUT /:id` - Update project (admin)
- `DELETE /:id` - Delete project (admin)

## 🚀 Deployment

### Frontend Deployment
```bash
cd frontend
npm run build
# Deploy dist/ folder to Vercel, Netlify, etc.
```

### Backend Deployment
```bash
cd backend
npm start
# Deploy to Heroku, Railway, DigitalOcean, etc.
```

### Docker Deployment
```dockerfile
# Frontend Dockerfile
FROM node:18-alpine
WORKDIR /app/frontend
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
FROM nginx:alpine
COPY --from=0 /app/frontend/dist /usr/share/nginx/html

# Backend Dockerfile
FROM node:18-alpine
WORKDIR /app/backend
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

## 🧪 Testing

### Frontend Tests
```bash
cd frontend
npm run test
```

### Backend Tests
```bash
cd backend
npm test
```

## 📈 Performance

### Frontend
- **Lighthouse Score**: 95+ across all categories
- **Core Web Vitals**: Optimized for fast loading
- **Bundle Size**: Optimized with code splitting
- **Images**: Optimized and lazy loaded

### Backend
- **Response Time**: <200ms for most endpoints
- **Rate Limiting**: 100 requests per 15 minutes
- **Security**: Helmet, CORS, input validation
- **Database**: Indexed queries for performance

## 🤝 Contributing

1. Fork repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes (frontend and/or backend)
4. Add tests for new functionality
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

## 📄 License

This project is licensed under MIT License - see [LICENSE](LICENSE) file for details.

## 📞 Contact

- **Email**: 
- **GitHub**: [github.com/tanmaypal](https://github.com/tanmaypal)
- **LinkedIn**: [linkedin.com/in/tanmaypal](https://linkedin.com/in/tanmaypal)
- **Twitter**: [twitter.com/tanmaypal](https://twitter.com/tanmaypal)

---

Built with ❤️ using modern web technologies
