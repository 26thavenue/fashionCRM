# Authentication System - Visual Guide

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    Next.js App Router                       │
└─────────────────────────────────────────────────────────────┘
                           │
                           ▼
        ┌──────────────────────────────────────┐
        │      Root Layout (layout.tsx)        │
        │  ┌────────────────────────────────┐  │
        │  │    AuthProvider (Context)      │  │
        │  │  ┌──────────────────────────┐  │  │
        │  │  │   ModalProvider          │  │  │
        │  │  │  ┌────────────────────┐  │  │  │
        │  │  │  │   {children}       │  │  │  │
        │  │  │  └────────────────────┘  │  │  │
        │  │  └──────────────────────────┘  │  │
        │  └────────────────────────────────┘  │
        └──────────────────────────────────────┘
                           │
         ┌─────────────────┼─────────────────┐
         │                 │                 │
         ▼                 ▼                 ▼
    ┌─────────┐       ┌─────────┐     ┌──────────────┐
    │ / (root)│       │ /login  │     │ /dashboard/* │
    │ Redirect│       │  Page   │     │ Protected    │
    └─────────┘       └─────────┘     └──────────────┘
         │                 │                 │
         │                 │                 ▼
         │                 │         ┌──────────────┐
         │                 │         │ middleware   │
         │                 │         │ (Check token)│
         │                 │         └──────────────┘
         │                 │                 │
         │                 │                 ▼
         │                 │      ┌──────────────────┐
         │                 │      │ ProtectedLayout  │
         │                 │      │ (Client-side     │
         │                 │      │  check)          │
         │                 │      └──────────────────┘
         │                 │                 │
         │                 │                 ▼
         │                 │      ┌──────────────────┐
         │                 │      │  Dashboard Comp  │
         │                 │      └──────────────────┘
         │                 │
         └────────────────→ Middleware ←─────────────┘
```

## Authentication Flow Diagram

```
                          START
                            │
                            ▼
                    User visits /
                            │
                            ▼
            ┌───────────────────────────┐
            │   Check localStorage      │
            │   for authToken?          │
            └───────────────────────────┘
                  │              │
            YES  │              │  NO
                 ▼              ▼
         ┌─────────────┐  ┌──────────────┐
         │ Redirect to │  │ Redirect to  │
         │ /dashboard  │  │ /login       │
         └─────────────┘  └──────────────┘
                │                  │
                │                  ▼
                │         ┌──────────────────┐
                │         │  Login Page      │
                │         │  ┌────────────┐  │
                │         │  │ Username   │  │
                │         │  │ Password   │  │
                │         │  │ Sign In    │  │
                │         │  └────────────┘  │
                │         └──────────────────┘
                │                  │
                │                  ▼
                │         AuthContext.login()
                │                  │
                │                  ▼
                │         Generate Token
                │                  │
                │                  ▼
                │         Store in localStorage
                │                  │
                │                  ▼
                │         Set isAuthenticated=true
                │                  │
                │                  ▼
                │         Redirect to /dashboard
                │                  │
                └─────────────────→│
                                   ▼
            ┌────────────────────────────────┐
            │    Middleware Check            │
            │    Token exists in storage?    │
            └────────────────────────────────┘
                    │              │
               YES  │              │  NO
                    ▼              ▼
            ┌──────────────┐  ┌──────────────┐
            │ Allow Access │  │ Redirect to  │
            │ to /dashboard│  │ /login       │
            └──────────────┘  └──────────────┘
                    │
                    ▼
        ┌────────────────────────────┐
        │  ProtectedLayout           │
        │  (Client-side double-check)│
        │  - Show loading state      │
        │  - Verify authentication   │
        │  - Render protected content│
        └────────────────────────────┘
                    │
                    ▼
            ┌──────────────────┐
            │ Dashboard Layout │
            │ + Sidebar        │
            │ + Content        │
            └──────────────────┘
                    │
                    ▼
            User sees [Logout] button in sidebar
                    │
                    ▼
            ┌────────────────────┐
            │ User clicks Logout │
            └────────────────────┘
                    │
                    ▼
            AuthContext.logout()
                    │
                    ▼
            Remove token from localStorage
                    │
                    ▼
            Set isAuthenticated=false
                    │
                    ▼
            Redirect to /login
                    │
                    ▼
                  END
```

## State Management

```
┌──────────────────────────────────────┐
│      AuthContext (Global State)      │
├──────────────────────────────────────┤
│                                      │
│  isAuthenticated: boolean            │
│  ├─ true: User is logged in          │
│  └─ false: User needs to login       │
│                                      │
│  token: string | null                │
│  ├─ null: No token                   │
│  └─ string: Base64 encoded token     │
│                                      │
│  loading: boolean                    │
│  ├─ true: Checking auth status       │
│  └─ false: Auth status known         │
│                                      │
│  Methods:                            │
│  ├─ login(username, password)        │
│  │  ├─ Validates input               │
│  │  ├─ Generates token               │
│  │  ├─ Stores in localStorage        │
│  │  └─ Returns boolean success       │
│  │                                   │
│  └─ logout()                         │
│     ├─ Clears localStorage           │
│     ├─ Resets state                  │
│     └─ No return value               │
│                                      │
└──────────────────────────────────────┘
          │
          │ Accessed via useAuth() hook
          │
    ┌─────┴──────┬──────────┬──────────┐
    │            │          │          │
    ▼            ▼          ▼          ▼
  Page.tsx   Sidebar.tsx Protected  Navbar
                        Layout.tsx
```

## Token Storage

```
Local Storage
├─ authToken: "YWRtaW46cGFzc3dvcmQxMjM6MTY3MjMwNTk4MjA2NA=="
│  └─ This is a Base64 encoded string containing:
│     ├─ username
│     ├─ password
│     └─ timestamp (for uniqueness)
└─ (cleared on logout)
```

## Component Tree

```
html
└─ body
   └─ RootLayout
      └─ AuthProvider
         └─ ModalProvider
            ├─ route: /
            │  └─ page.tsx (redirects based on auth)
            │
            ├─ route: /login
            │  └─ LoginPage.tsx (login form)
            │
            └─ route: /dashboard/*
               └─ DashboardLayout ('use client')
                  ├─ ProtectedLayout (guards content)
                  │  ├─ Sidebar.tsx
                  │  │  ├─ Logo
                  │  │  ├─ Navigation Items
                  │  │  ├─ Settings Link
                  │  │  └─ Logout Button ← Calls useAuth().logout()
                  │  │
                  │  └─ main
                  │     └─ {children}
                  │        ├─ Overview Page
                  │        ├─ Orders Page
                  │        ├─ Clients Page
                  │        ├─ Inventory Page
                  │        ├─ Tasks Page
                  │        └─ Calendar Page
                  │
                  └─ (If not authenticated)
                     └─ null (redirects in useEffect)
```

## Security Layers

```
Layer 1: Middleware (server-side)
├─ Checks token on every request
├─ Redirects to /login if no token
└─ Can't be bypassed by client code

Layer 2: ProtectedLayout (client-side)
├─ Double-checks authentication
├─ Prevents rendering protected content
├─ Shows loading state while checking
└─ Catches client-side auth changes

Layer 3: useAuth() hook (context)
├─ Manages token state
├─ Provides login/logout functions
├─ Persists token in localStorage
└─ Available to all components
```

## Data Flow

```
User Input (username, password)
    │
    ▼
LoginPage.tsx
    │
    ▼
useAuth().login(username, password)
    │
    ▼
AuthContext.login()
    ├─ Generate token: btoa(`${username}:${password}:${Date.now()}`)
    ├─ localStorage.setItem('authToken', token)
    ├─ Update state: isAuthenticated = true
    │
    └─ return true
    │
    ▼
router.push('/dashboard')
    │
    ▼
Middleware checks token ✓
    │
    ▼
ProtectedLayout verifies auth ✓
    │
    ▼
Render Dashboard Content
    │
    ▼
User sees [Logout] button
    │
    ▼
User clicks Logout
    │
    ▼
useAuth().logout()
    ├─ localStorage.removeItem('authToken')
    ├─ Update state: isAuthenticated = false
    │
    └─ return
    │
    ▼
router.push('/login')
    │
    ▼
Page reloads at login
```

---

This visual guide helps understand how all the pieces of the authentication system work together!
