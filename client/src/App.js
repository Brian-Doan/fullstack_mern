import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { Landing } from './components';
import { About, Auth, Dashboard } from './views';
import AuthContextProvider from './contexts/AuthContext';
import PostContextProvider from './contexts/PostContext';
import ProtectedRoute from './components/routing/ProtectedRoute';

import './App.css';
import React from 'react';

function App() {
  return (
    <AuthContextProvider>
      <PostContextProvider>
        <Router>
          <React.Fragment>
            <Routes>
              <Route path='/' element={<Landing />} />
              <Route path='/login' element={<Auth authRoute='login' />} />
              <Route path='/register' element={<Auth authRoute='register' />} />
              <Route path='/*' element={<ProtectedRoute />}>
                <Route path='dashboard' element={<Dashboard />} />
                <Route path='about' element={<About />} />
              </Route>
            </Routes>
          </React.Fragment>
        </Router>
      </PostContextProvider>
    </AuthContextProvider>
  );
}

export default App;
