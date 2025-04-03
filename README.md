[![Ru](https://img.shields.io/badge/Rus-blue)](README.ru.md)
[![Live](https://img.shields.io/badge/Live-pink)](https://lms-lenno-frontend.vercel.app)

### Project Description
LMS Lenno is a Learning Management System designed to streamline educational processes. The system includes features for managing groups, disciplines, students, and calendar events with Google Calendar integration.

### Features
- **User Management**: Registration and authentication system
- **Group Management**: Create and manage student groups
- **Discipline Management**: Organize and track educational disciplines
- **Student Management**: Add and manage student information
- **Calendar Integration**: 
  - Create and manage events
  - Google Calendar synchronization
  - Event notifications and reminders

### Tech Stack
- **Frontend**: React, React-Big-Calendar, Bootstrap
- **Backend**: Node.js, Express
- **Database**: Supabase
- **Authentication**: Custom JWT-based system
- **Calendar Integration**: Google Calendar API
- **Containerization**: Docker

### Architecture
The backend is built using a microservices architecture, where each service is responsible for a specific domain of functionality:

- **loginService**: Handles user authentication and JWT token management
- **registerService**: Manages user registration and profile creation
- **groupService**: Handles group creation, management, and student assignments
- **classService**: Manages educational classes and schedules
- **calendarService**: Integrates with Google Calendar for event management

Each microservice:
- Runs in its own Docker container
- Has its own API endpoints
- Can be scaled independently
- Communicates with other services through HTTP
- Maintains its own error handling and logging

### Project Structure
```
lms-lenno/
├── frontend/              # React frontend application
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── api/          # API integration
│   │   └── assets/       # Styles and images
│   └── package.json
│
├── backend/               # Node.js backend services
│   ├── loginService/     # Authentication service
│   ├── registerService/  # User registration service
│   ├── groupService/     # Group management service
│   ├── classService/     # Class management service
│   ├── calendarService/  # Calendar integration service
│   └── docker-compose.yml
│
└── README.md
```

### Environment Variables
- `SUPABASE_URL`: Your Supabase project URL
- `SUPBASE_KEY`: Your Supabase API key
- `GOOGLE_CLIENT_EMAIL`: Google service account email
- `GOOGLE_PRIVATE_KEY`: Google service account private key
- `GCALENDAR_KEY`: Google Calendar API key

### API Documentation
- Authentication: `POST /api/auth/login`
- Registration: `POST /api/auth/register`
- Groups: `GET/POST /api/groups`
- Disciplines: `GET/POST /api/disciplines`
- Calendar Events: `GET/POST/DELETE /api/calendar/events`
