# Authentication System Documentation

## Overview
This application now includes a complete authentication system with login functionality, token management, and protected routes.

## Features

### 1. **Login Page**
- Located at `/login`
- Username and password form
- Demo credentials: Any username and password will work (for development)
- Error handling and user feedback
- Automatic redirect to dashboard on successful login

### 2. **Token Management**
- Tokens are stored in `localStorage` as `authToken`
- Tokens are generated using a simple encoding mechanism (Base64)
- Tokens persist across page refreshes
- Automatic logout clears the token

### 3. **Protected Routes**
- All dashboard routes (`/dashboard/*`) are protected
- Users without valid tokens are redirected to `/login`
- Authentication is checked in the Next.js middleware layer

### 4. **Authentication Context**
- Global authentication state managed via React Context (`AuthContext`)
- Provides `isAuthenticated`, `token`, `loading`, `login()`, and `logout()` methods
- Available throughout the app via the `useAuth()` hook

## How It Works

### Login Flow
1. User navigates to `/login`
2. Enters username and password
3. Submits the form
4. `AuthContext.login()` creates a token and stores it in localStorage
5. User is redirected to `/dashboard`

### Route Protection
1. **Middleware Layer** (`middleware.ts`): Checks for token in cookies/headers
   - Redirects to `/login` if no token exists
   - Redirects to `/dashboard` if user is on `/login` with a valid token

2. **Client-Side Protection** (`ProtectedLayout`): Double-checks authentication
   - Shows loading state while checking
   - Redirects to `/login` if not authenticated
   - Renders protected content if authenticated

### Logout Flow
1. User clicks "Logout" in the sidebar
2. `AuthContext.logout()` is called
3. Token is removed from localStorage
4. User is redirected to `/login`

## File Structure

```
app/
├── context/
│   └── AuthContext.tsx          # Authentication context & hooks
├── login/
│   └── page.tsx                 # Login page
├── components/
│   └── ProtectedLayout.tsx      # Client-side route protection wrapper
├── layouts/
│   └── Sidebar.tsx              # Updated with logout button
├── dashboard/
│   └── layout.tsx               # Updated with protected layout
├── page.tsx                     # Root page (redirects based on auth)
└── layout.tsx                   # Root layout (includes AuthProvider)

middleware.ts                     # Route protection at middleware level
```

## Usage

### Using the `useAuth()` Hook
```tsx
import { useAuth } from '@/app/context/AuthContext'

function MyComponent() {
  const { isAuthenticated, token, login, logout } = useAuth()

  return (
    <div>
      {isAuthenticated ? (
        <button onClick={logout}>Logout</button>
      ) : (
        <button onClick={() => login('user', 'pass')}>Login</button>
      )}
    </div>
  )
}
```

### Checking Authentication Status
```tsx
const { isAuthenticated, loading } = useAuth()

if (loading) return <div>Loading...</div>
if (!isAuthenticated) return <div>Please log in</div>

return <div>Protected content</div>
```

## Production Considerations

⚠️ **This is a demo implementation. For production use:**

1. **Backend API Integration**: Replace the simple token generation with actual API calls:
   ```tsx
   const login = async (username: string, password: string) => {
     const response = await fetch('/api/auth/login', {
       method: 'POST',
       body: JSON.stringify({ username, password })
     })
     const data = await response.json()
     if (data.token) {
       localStorage.setItem('authToken', data.token)
       setToken(data.token)
       setIsAuthenticated(true)
       return true
     }
     return false
   }
   ```

2. **Secure Token Storage**: Consider using:
   - HttpOnly cookies (more secure than localStorage)
   - Secure storage libraries
   - Token refresh mechanisms

3. **Token Validation**: Implement:
   - Server-side token verification
   - Token expiration
   - Refresh token rotation

4. **Environment Variables**: Store API endpoints in `.env`:
   ```
   NEXT_PUBLIC_API_URL=https://api.example.com
   ```

5. **Error Handling**: Implement proper error handling for:
   - Network failures
   - Invalid credentials
   - Token expiration
   - Unauthorized access

## Testing the Authentication

1. **Without Token**:
   - Navigate to `http://localhost:3000/dashboard`
   - Should redirect to `/login`

2. **Login**:
   - Go to `/login`
   - Enter any username and password (demo mode)
   - Click "Sign In"
   - Should redirect to `/dashboard`

3. **Logout**:
   - Click "Logout" button in sidebar
   - Should redirect to `/login`
   - Token should be cleared

4. **Persistence**:
   - Log in and refresh the page
   - Should remain logged in
   - Token persists in localStorage

## API Routes (Future)

Consider adding these API routes for production:
- `POST /api/auth/login` - Authenticate user and return token
- `POST /api/auth/logout` - Invalidate token
- `POST /api/auth/refresh` - Refresh expired token
- `GET /api/auth/me` - Get current user info
