# Tanmay Pal Portfolio Backend

A robust Node.js and Express.js backend API for the Tanmay Pal portfolio website, featuring MongoDB integration, email functionality, and comprehensive security measures.

## 🚀 Features

- **RESTful API**: Clean and well-documented API endpoints
- **MongoDB Integration**: Mongoose ODM for database operations
- **Email Service**: Automated email notifications for contact forms
- **Input Validation**: Joi schema validation for all inputs
- **Security**: Helmet, CORS, and rate limiting
- **Error Handling**: Comprehensive error handling and logging
- **Environment Configuration**: Secure environment variable management

## 🛠️ Technologies Used

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **Joi** - Input validation library
- **Nodemailer** - Email sending service
- **Helmet** - Security middleware
- **CORS** - Cross-origin resource sharing
- **Rate Limiting** - API request throttling
- **dotenv** - Environment variable management

## 📁 Project Structure

```
backend/
├── models/              # Mongoose models
│   ├── Contact.js        # Contact form submissions
│   └── Project.js       # Project portfolio items
├── routes/              # API route handlers
│   ├── contact.js        # Contact form endpoints
│   └── projects.js      # Project management endpoints
├── utils/               # Utility functions
│   └── email.js         # Email service utilities
├── server.js            # Main server file
├── package.json         # Dependencies and scripts
├── .env.example        # Environment variables template
└── README.md           # This file
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
   cd portfolio/backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` file with your actual values:
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

4. **Start MongoDB**
   ```bash
   # For local MongoDB
   mongod
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

## 📜 Available Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm test` - Run test suite

## 🛡️ Security Features

- **Helmet.js**: Security headers and XSS protection
- **CORS**: Configurable cross-origin resource sharing
- **Rate Limiting**: Prevents API abuse and spam
- **Input Validation**: Joi schema validation for all inputs
- **Environment Variables**: Secure configuration management

## 📡 API Endpoints

### Contact Routes (`/api/contact`)

| Method | Endpoint | Description | Auth Required |
|---------|----------|-------------|---------------|
| POST | `/` | Submit contact form | No |
| GET | `/` | Get all contacts (paginated) | Yes |

**POST /api/contact Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Project Inquiry",
  "message": "I would like to discuss a project..."
}
```

### Project Routes (`/api/projects`)

| Method | Endpoint | Description | Auth Required |
|---------|----------|-------------|---------------|
| GET | `/` | Get all projects (filtered) | No |
| GET | `/:id` | Get single project | No |
| POST | `/` | Create new project | Yes |
| PUT | `/:id` | Update project | Yes |
| DELETE | `/:id` | Delete project | Yes |

**GET /api/projects Query Parameters:**
- `page` (number): Page number (default: 1)
- `limit` (number): Items per page (default: 10)
- `category` (string): Filter by category
- `featured` (boolean): Filter featured projects
- `status` (string): Filter by status (default: 'published')

## 📊 Database Models

### Contact Model
```javascript
{
  name: String (required, max 50 chars),
  email: String (required, valid email),
  subject: String (required, max 100 chars),
  message: String (required, max 1000 chars),
  status: String (pending|read|responded, default: pending),
  createdAt: Date (default: Date.now)
}
```

### Project Model
```javascript
{
  title: String (required, max 100 chars),
  description: String (required, max 500 chars),
  image: String (required, URI),
  tags: [String],
  category: String (Web|Mobile|AI/ML|Design|Other, required),
  liveUrl: String (URI, default: '#'),
  githubUrl: String (URI, default: '#'),
  featured: Boolean (default: false),
  status: String (draft|published|archived, default: published),
  createdAt: Date (default: Date.now),
  updatedAt: Date (default: Date.now)
}
```

## 📧 Email Service

The backend includes an automated email service that:
- Sends notifications to the admin for new contact submissions
- Sends confirmation emails to users
- Uses responsive HTML email templates
- Handles email errors gracefully

### Email Configuration
Configure email settings in `.env`:
- Gmail: Use App Password for 2FA accounts
- Other providers: Update SMTP settings accordingly

## 🔧 Configuration

### Environment Variables
Create `.env` file based on `.env.example`:

```env
# Server
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173

# Database
MONGODB_URI=mongodb://localhost:27017/portfolio

# Email
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM=your-email@gmail.com

# Security
JWT_SECRET=your-super-secret-jwt-key-here
```

## 🧪 Testing

Run the test suite:
```bash
npm test
```

## 🚀 Deployment

### Environment Setup
1. Set production environment variables
2. Configure MongoDB connection (MongoDB Atlas recommended)
3. Set up email service credentials
4. Update CORS origins for production domain

### Docker Deployment
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

### PM2 Deployment
```bash
pm2 start server.js --name "portfolio-backend"
```

## 📈 Performance & Monitoring

- **Request Logging**: All API requests logged with timestamps
- **Error Tracking**: Comprehensive error logging and reporting
- **Rate Limiting**: Configurable request limits per IP
- **Health Check**: `/api/health` endpoint for monitoring
- **Database Indexing**: Optimized queries with proper indexes

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🐛 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running
   - Check connection string in `.env`
   - Verify network connectivity

2. **Email Sending Fails**
   - Verify email credentials
   - Check SMTP settings
   - Ensure app password for Gmail (not regular password)

3. **CORS Errors**
   - Update `FRONTEND_URL` in `.env`
   - Check allowed origins in CORS configuration

4. **Port Already in Use**
   - Change `PORT` in `.env`
   - Kill existing process on the port

## 📞 Support

For issues and questions:
- Create an issue in the repository
- Email: hello@tanmay.dev

---

Built with ❤️ using Node.js and Express.js
