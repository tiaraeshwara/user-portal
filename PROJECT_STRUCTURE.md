# User Portal - Frontend for User Service

A modern Next.js frontend application for managing users from the user-service backend.

## Project Structure

```
user-portal/
├── app/                          # Next.js app directory
│   ├── page.tsx                 # Main landing page
│   ├── layout.tsx               # Root layout
│   └── globals.css              # Global styles
├── components/                   # Reusable React components
│   ├── UsersList.tsx            # Component to display users with pagination
│   └── UserSearch.tsx           # Component to search users by ID or email
├── services/                     # API service functions
│   └── userService.ts           # Functions to call user-service endpoints
├── types/                        # TypeScript type definitions
│   └── user.ts                  # User and API response types
├── .env.local                    # Environment variables (local development)
├── package.json                  # Project dependencies
├── tsconfig.json                 # TypeScript configuration
├── next.config.ts               # Next.js configuration
├── postcss.config.mjs            # PostCSS configuration for Tailwind
├── tailwind.config.ts            # Tailwind CSS configuration
├── eslint.config.mjs             # ESLint configuration
└── README.md                     # This file
```

## Features

### 1. **User List Component** (`components/UsersList.tsx`)
- Displays all users in a paginated table format
- "View All Users" button to fetch users from the API
- Pagination controls (Previous, Next, page numbers)
- Responsive design with clean table layout
- Loading and error state handling

### 2. **User Search Component** (`components/UserSearch.tsx`)
- Search users by **User ID** or **Email**
- Toggle between search modes with radio buttons
- Displays search results in a formatted card
- Error handling for not found users
- Clean, intuitive UI with form validation

### 3. **API Service** (`services/userService.ts`)
Provides functions for all endpoints:
- `getAllUsers(page, pageSize)` - Get paginated list of users
- `getUserById(userId)` - Get user by ID
- `getUserByEmail(email)` - Get user by email
- `createUser(userData)` - Create new user
- `updateUser(userId, userData)` - Update user
- `deleteUser(userId)` - Delete user

### 4. **Type Definitions** (`types/user.ts`)
- `User` - User object interface
- `PaginatedResponse<T>` - Paginated API response
- `ApiResponse<T>` - Standard API response wrapper

## Setup Instructions

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Update the API base URL in `.env.local` (already configured):
```
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

### Landing Page
- **Left Column**: All Users list with pagination
  - Click "View All Users" button to load users
  - Navigate through pages using pagination controls
  - Table displays User ID, Name, and Email

- **Right Column**: Search Users
  - Toggle between "User ID" and "Email" search modes
  - Enter search value and click "Search"
  - View user details in a formatted card

## API Integration

The application communicates with the user-service backend running on `http://localhost:8080/`

### Expected Endpoints
- `GET /users?page=1&pageSize=10` - Get all users with pagination
- `GET /users/:id` - Get user by ID
- `GET /users/email/:email` - Get user by email
- `POST /users` - Create new user
- `PUT /users/:id` - Update user
- `DELETE /users/:id` - Delete user

> **Note**: Adjust the endpoint paths if your backend uses different routes

## Styling

The project uses:
- **Tailwind CSS** v4 for styling
- **PostCSS** for CSS processing
- Responsive design (mobile-first approach)
- Custom color scheme with gray theme

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

### Adding New Features

1. **Create new component** in `components/` directory:
   ```tsx
   "use client"; // If using hooks or interactivity
   
   export default function MyComponent() {
     return <div>Component content</div>;
   }
   ```

2. **Create service functions** in `services/` for API calls

3. **Add TypeScript types** in `types/` directory

4. **Import and use** in page or other components

## Error Handling

- Network errors are caught and displayed to users
- Loading states prevent multiple requests
- Validation for empty inputs
- User-friendly error messages

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Responsive design for mobile, tablet, and desktop

## Future Enhancements

- Add user creation form
- Add user update functionality
- Add delete confirmation dialog
- Add sorting and filtering options
- Add data export (CSV, JSON)
- Add user profile view
- Add role-based access control
- Add caching strategies

## Troubleshooting

### API Connection Issues
- Ensure user-service is running on `http://localhost:8080/`
- Check `.env.local` for correct base URL
- Check browser console for network errors

### Styling Issues
- Ensure Tailwind CSS is properly configured
- Clear `.next` directory and rebuild: `rm -rf .next && npm run dev`

### TypeScript Errors
- Run `npm run lint` to check for issues
- Ensure all imports use correct paths with `@/` alias

## License

Private project for internal use.
