# Banking App 🏦

A secure and user-friendly banking application built with **React, Redux Toolkit, and Node.js**. This project enables users to **register, log in, update their profiles, and manage their accounts** seamlessly.

## 🚀 Features

- User **authentication** (Register, Login, Logout)
- **Token-based authentication** (stored in `localStorage`)
- Fetch and update **user profiles**
- Responsive **dashboard** for managing accounts
- Protected routes for **authorized users**
- Redux Toolkit for **state management**
- API integration with a **Node.js backend** (via Axios)

## 🛠️ Tech Stack

- **Frontend**: React, Redux Toolkit, React Hook Form, React Router
- **Backend**: Node.js, Express (expected API)
- **State Management**: Redux Toolkit
- **HTTP Client**: Axios
- **Styling**: CSS, Flexbox

## 🔐 Authentication Flow
**1) Users register and receive an authentication token.**
**2)The token is stored in localStorage and used for subsequent API requests.**
**3)Users can log out, removing the token from local storage.**
**4)Redux manages global authentication state.**
