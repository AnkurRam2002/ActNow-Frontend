# ActNow Frontend

A modern, responsive volunteer management system frontend built with React and Vite. This application provides an intuitive interface for NGOs to create and manage volunteering events, volunteers to discover and register for events, and administrators to oversee the entire platform.

## 🌟 Features

### User Management
- **Multi-role Interface**: Tailored experiences for volunteers, NGOs, and administrators
- **Secure Authentication**: JWT-based login and registration system
- **Profile Management**: Users can view and edit their profiles, skills, and preferences
- **Password Recovery**: Forgot password and reset password functionality

### Event Management
- **Event Discovery**: Browse and search events with advanced filtering options
- **Event Creation**: NGOs can create and manage volunteering events with detailed information
- **Event Registration**: Volunteers can register for events that match their skills
- **Event Details**: Comprehensive event information with location, date, and requirements
- **Event Editing**: NGOs can update their events with full edit capabilities

### Interactive Features
- **AI Chatbot**: Integrated chatbot for user assistance and queries
- **Real-time Notifications**: Web push notifications for event updates
- **Activity Timeline**: Track user activities and event participation
- **Search Functionality**: Advanced search with filters for location, skills, and keywords
- **Smooth Scrolling**: Enhanced navigation with React Scroll integration

### Admin Features
- **User Management**: View and manage all registered users
- **Pending Approvals**: Review and approve/reject user registrations
- **Event Oversight**: Monitor and manage all platform events
- **Admin Dashboard**: Centralized control panel for platform administration

### Design & UX
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Modern UI**: Clean and intuitive interface with React Icons
- **Progressive Web App**: PWA support for offline capabilities
- **Interactive Charts**: Data visualization with Chart.js
- **Toast Notifications**: User-friendly feedback with React Toastify
- **Tooltips**: Enhanced user guidance with React Tooltip
- **Timeline Components**: Visual event history with vertical timeline

## 🛠️ Tech Stack

- **Framework**: React 19
- **Build Tool**: Vite 6
- **Styling**: Tailwind CSS 4
- **Routing**: React Router DOM 7
- **HTTP Client**: Axios
- **State Management**: React Context API
- **Charts**: Chart.js with React-ChartJS-2
- **Icons**: React Icons
- **Notifications**: React Toastify
- **UI Components**: 
  - React Tooltip
  - React Vertical Timeline
  - React Scroll
- **PWA**: Vite Plugin PWA
- **Web Push**: Web Push library
- **Font**: Poppins (via Fontsource)
- **Linting**: ESLint 9

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn package manager
- ActNow Backend API running (see [ActNow-Backend](https://github.com/AnkurRam2002/ActNow-Backend))

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/AnkurRam2002/ActNow-Frontend.git
   cd ActNow-Frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory with the following variables:
   ```env
   # Backend API Configuration
   VITE_BACKEND_URL=http://localhost:5000/api
   VITE_BACKEND_URL_UPLOADS=http://localhost:5000

   # Web Push Notifications
   VITE_VAPID_PUBLIC_KEY=your_vapid_public_key

   # Payment Gateway (Razorpay)
   VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

   The application will start on `http://localhost:5173`

5. **Build for production**
   ```bash
   npm run build
   ```

6. **Preview production build**
   ```bash
   npm run preview
   ```

## 📁 Project Structure

```
ActNow-Frontend/
├── public/
│   ├── icons/                   # PWA icons
│   ├── favicon.png              # Site favicon
│   ├── manifest.webmanifest     # PWA manifest
│   ├── service-worker.js        # Service worker for PWA
│   └── _redirects               # Netlify redirects
├── src/
│   ├── assets/                  # Static assets (images, etc.)
│   ├── components/
│   │   ├── About.jsx            # About section component
│   │   ├── BackToTop.jsx        # Back to top button
│   │   ├── Chatbot.jsx          # AI chatbot component
│   │   ├── Contact.jsx          # Contact section
│   │   ├── EventCard.jsx        # Event card display
│   │   ├── EventCardContainer.jsx
│   │   ├── EventSidebar.jsx     # Event filtering sidebar
│   │   ├── EventTopbar.jsx      # Event page header
│   │   ├── Footer.jsx           # Site footer
│   │   ├── Header.jsx           # Landing page header
│   │   ├── HomeHeader.jsx       # Home page header
│   │   ├── LandingHome.jsx      # Landing hero section
│   │   ├── Nav.jsx              # Navigation component
│   │   ├── ProfileMenu.jsx      # User profile menu
│   │   ├── ProfileTopbar.jsx    # Profile page header
│   │   ├── SearchBar.jsx        # Search functionality
│   │   └── Services.jsx         # Services section
│   ├── context/
│   │   └── UserContext.jsx      # User state management
│   ├── pages/
│   │   ├── ActivityTimeline.jsx # User activity history
│   │   ├── AdminHomePage.jsx    # Admin dashboard
│   │   ├── CreateEvent.jsx      # Event creation page
│   │   ├── EditEvent.jsx        # Event editing page
│   │   ├── EditProfile.jsx      # Profile editing page
│   │   ├── EventDetails.jsx     # Single event details
│   │   ├── EventsList.jsx       # All events listing
│   │   ├── ForgotPassword.jsx   # Password recovery
│   │   ├── HomePage.jsx         # User home page
│   │   ├── Landing.jsx          # Landing page
│   │   ├── Login.jsx            # Login page
│   │   ├── PendingRegistrationsPage.jsx  # Admin approval page
│   │   ├── Profile.jsx          # User profile page
│   │   ├── Register.jsx         # Registration page
│   │   ├── ResetPassword.jsx    # Password reset page
│   │   └── UsersList.jsx        # All users listing (Admin)
│   ├── utils/
│   │   └── activityMessages.jsx # Activity message utilities
│   ├── App.css                  # Application styles
│   ├── App.jsx                  # Main application component
│   ├── api.js                   # API configuration
│   ├── index.css                # Global styles
│   └── main.jsx                 # Application entry point
├── .env                         # Environment variables
├── .gitignore                   # Git ignore rules
├── eslint.config.js             # ESLint configuration
├── index.html                   # HTML template
├── package.json                 # Project dependencies
├── package-lock.json            # Dependency lock file
├── README.md                    # Project documentation
└── vite.config.js               # Vite configuration
```

## 📜 Available Scripts

- **`npm run dev`** - Start development server with hot reload
- **`npm run build`** - Build production-ready bundle
- **`npm run preview`** - Preview production build locally
- **`npm run lint`** - Run ESLint to check code quality

## 🎨 Key Pages & Routes

- **`/`** - Landing page with features and information
- **`/login`** - User login
- **`/register`** - New user registration
- **`/forgot-password`** - Password recovery
- **`/reset-password`** - Password reset
- **`/home`** - User home dashboard
- **`/create-event`** - Create new event (NGO only)
- **`/events/:id`** - Event details page
- **`/events/:id/edit`** - Edit event (NGO owner only)
- **`/users/:id`** - User profile
- **`/users/:id/edit`** - Edit user profile
- **`/activity-timeline`** - User activity history
- **`/events-list`** - All events listing
- **`/users-list`** - All users listing (Admin only)
- **`/admin-home`** - Admin dashboard
- **`/pending-registrations`** - Pending user approvals (Admin only)

## 👥 User Roles

1. **Volunteer**: Can browse events, register for events, view profile, and track activities
2. **NGO**: Can create and manage events, view registrations, and manage event participants
3. **Admin**: Can approve/reject registrations, manage all users and events, and access admin dashboard

## 🔐 Authentication

The application uses JWT (JSON Web Tokens) stored in localStorage for authentication. The token is automatically included in API requests via Axios interceptors.

## 🌐 API Integration

The frontend communicates with the ActNow Backend API. Configure the backend URL in the `.env` file:

```env
VITE_BACKEND_URL=http://localhost:5000/api
```

All API calls are centralized in `src/api.js` using Axios with automatic token injection.

## 📱 Progressive Web App (PWA)

This application includes PWA support with:
- Offline capability
- Add to home screen
- Service worker for caching
- Web manifest for app metadata

## 🎨 Styling

The application uses Tailwind CSS 4 for styling with:
- Utility-first approach
- Responsive design
- Custom color schemes
- Modern UI components

## 📄 License

This project is licensed under the ISC License.

## 👥 Contributors

- **Ankur Ram**
- **Ayushi Moitra**
- **Bitas Maiti**
- **Ishita Dutta**
- **Sarbajit Paul**

## 🙏 Acknowledgments

- Built as a final year project to facilitate volunteer management
- Thanks to all the open-source libraries that made this possible
- Backend repository: [ActNow-Backend](https://github.com/AnkurRam2002/ActNow-Backend)

---

**Note**: Make sure to keep your `.env` file secure and never commit it to version control. All sensitive credentials should be stored in environment variables.
