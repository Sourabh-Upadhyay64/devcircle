// File: src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
// It's conventional to name component files with PascalCase (e.g., HomePage.jsx)
// Make sure these paths match your file structure.
import HomePage from './components/HomePage';
import AuthPage from './components/AuthPage';
import TeamManagementPage from './components/TeamManagementPage';
// import NotFoundPage from './components/NotFoundPage'; // Example for a 404 page

function App() {
  return (
    // The Router component provides the routing context for your app.
    <Router>
      {/* The Routes component is where you define individual routes. */}
      <Routes>
        {/* Route for the Home Page.
          This is the main landing page of your application.
        */}
        <Route path="/" element={<HomePage />} />

        {/* Route for the Authentication (Login/Signup) Page.
          Users will navigate here to access their accounts.
        */}
        <Route path="/auth" element={<AuthPage />} />
        
        {/* Route for the Team Management Page.
          This follows the project specification for a dynamic route.
          The `:id` is a URL parameter that will represent the specific hackathon ID.
          For example, a user could visit '/hackathon/hack2024/team'.
        */}
        <Route path="/hackathon/:id/team" element={<TeamManagementPage />} />
        
        {/* (Optional) It's good practice to add a "catch-all" route at the end.
          This will render a 404 Not Found page if the user navigates to a URL
          that doesn't match any of the other routes.
        */}
        {/* <Route path="*" element={<NotFoundPage />} /> */}

      </Routes>
    </Router>
  );
}

export default App;

