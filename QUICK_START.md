# Authentication System - Quick Start Guide

## 🚀 How to Use

### 1. **Start the Development Server**
```bash
npm run dev
```

### 2. **Visit the App**
- Open `http://localhost:3000` in your browser
- You'll be automatically redirected to `/login` (since you're not logged in yet)

### 3. **Log In**
- **Username**: Any text (e.g., `admin`, `user`, `test`)
- **Password**: Any text (e.g., `password123`, `test`, anything)
- Click "Sign In"
- ✅ You'll be redirected to the dashboard

### 4. **Explore the Dashboard**
- You now have full access to all dashboard features
- Notice the **Logout** button in the bottom-left of the sidebar
- All pages under `/dashboard` are now accessible

### 5. **Log Out**
- Click the **Logout** button in the sidebar
- ✅ You'll be redirected to `/login`
- Token will be cleared from localStorage
- You'll need to log in again to access the dashboard

## 🔐 How It Works Behind the Scenes

1. **When you log in**: A token is generated and stored in localStorage
2. **When you navigate**: The app checks if a token exists
   - ✅ Token exists → Show dashboard
   - ❌ Token missing → Redirect to login
3. **When you log out**: Token is removed from localStorage

## 📝 Code Examples

### Checking if User is Logged In
```tsx
import { useAuth } from '@/app/context/AuthContext'

function MyComponent() {
  const { isAuthenticated } = useAuth()
  
  if (!isAuthenticated) {
    return <p>Please log in</p>
  }
  
  return <p>Welcome!</p>
}
```

### Getting the Token
```tsx
const { token } = useAuth()
console.log(token) // "YWRtaW46cGFzc3dvcmQxMjM6MTY3MjMwNTk4MjA2NA=="
```

### Manual Login
```tsx
const { login } = useAuth()

const handleLogin = () => {
  const success = login('username', 'password')
  if (success) {
    console.log('Logged in!')
  } else {
    console.log('Login failed')
  }
}
```

### Logging Out
```tsx
const { logout } = useAuth()

const handleLogout = () => {
  logout()
  router.push('/login')
}
```

## 🧪 Testing Scenarios

### Scenario 1: Fresh User (No Token)
```
1. Open browser DevTools (F12)
2. Clear all cookies and localStorage
3. Visit http://localhost:3000
4. ✅ Should see login page
```

### Scenario 2: Login Works
```
1. From login page, enter username and password
2. Click "Sign In"
3. ✅ Should see dashboard
4. Open DevTools → Application → localStorage
5. ✅ Should see 'authToken' key
```

### Scenario 3: Token Persistence
```
1. After logging in, refresh the page (Ctrl+R or Cmd+R)
2. ✅ Should still be on dashboard (still logged in)
3. Close browser tab and reopen
4. ✅ Should still be on dashboard (token persisted)
```

### Scenario 4: Protected Routes
```
1. Log out (or clear token manually)
2. Try to visit http://localhost:3000/dashboard
3. ✅ Should be redirected to /login
```

### Scenario 5: Logout Works
```
1. Click Logout button in sidebar
2. ✅ Should be redirected to /login
3. Open DevTools → Application → localStorage
4. ✅ 'authToken' should be gone
```

### Scenario 6: Auto-Redirect (Authenticated)
```
1. Log in to dashboard
2. Navigate to /login
3. ✅ Should be auto-redirected back to /dashboard
```

## 🛠️ Troubleshooting

### "I can't access the dashboard"
- **Solution**: Make sure you're logged in
  1. Go to `/login`
  2. Enter username and password
  3. Click "Sign In"
  4. Should redirect to `/dashboard`

### "I logged in but it didn't redirect"
- **Solution**: Check if there are console errors
  1. Open DevTools (F12)
  2. Check Console tab for errors
  3. Check Network tab to see if requests are failing

### "I logged out but can still access dashboard"
- **Solution**: Clear browser cache and localStorage
  1. Open DevTools (F12)
  2. Go to Application → Storage
  3. Clear All
  4. Hard refresh the page (Ctrl+Shift+R or Cmd+Shift+R)

### "Token is not being stored"
- **Solution**: Check if localStorage is accessible
  1. Open DevTools → Console
  2. Run: `localStorage.setItem('test', 'value')`
  3. Run: `localStorage.getItem('test')`
  4. If it doesn't work, you might be in incognito mode (localStorage is disabled)

## 📊 Files Overview

| File | Purpose |
|------|---------|
| `/app/context/AuthContext.tsx` | Manages auth state globally |
| `/app/login/page.tsx` | Login page UI |
| `/middleware.ts` | Server-side route protection |
| `/app/components/ProtectedLayout.tsx` | Client-side protection wrapper |
| `/app/layouts/Sidebar.tsx` | Sidebar with logout button |

## 🎯 Key Features

✅ **Simple to Use**: Just enter any username/password (demo mode)
✅ **Token Persistence**: Token survives page refreshes and tab closes
✅ **Double Protection**: Both server-side (middleware) and client-side checks
✅ **Auto-Redirect**: Automatically sends you to the right page based on auth status
✅ **Logout Support**: One-click logout with instant redirect
✅ **Loading States**: Shows loading indicators while checking auth
✅ **Error Handling**: Displays user-friendly error messages

## 🚀 Next Steps

1. **Test all scenarios** above to make sure everything works
2. **Read the documentation** in `AUTH_DOCUMENTATION.md` for detailed info
3. **Check the visual guide** in `AUTH_VISUAL_GUIDE.md` to understand the architecture
4. **When ready for production**, see the "Production Considerations" section in `AUTH_DOCUMENTATION.md`

## 💡 Pro Tips

- **Check localStorage**: Open DevTools and look at Application → Storage → localStorage to see the token
- **Test without logging in**: Try accessing `/dashboard` without logging in first (you should be redirected)
- **Custom credentials**: Try different usernames and passwords (demo accepts any)
- **Multiple tabs**: Log in on one tab, and you'll stay logged in on other tabs (thanks to localStorage)
- **Network offline**: If you go offline and return, you'll still be logged in (token is local)

---

**Everything is set up and ready to go!** 🎉

Start the dev server and try logging in.
