import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import LoginForm from './components/Loginform';
import Registrationform from './components/Registrationform';
import Enduserhome from './components/Enduser/Enduserhome';
import Createnewtocken from './components/Enduser/Createnewtocken';
import Adminhome from './components/Admin/Adminhome';
import Techsupporthome from './components/Techsupport/Techsupporthome';
import TicketReply from './components/Techsupport/Ticketreply';
import TechSupportAllocation from './components/Admin/Techsupportallocation';


function Router() {
  return (
    <div className="flex flex-col min-h-screen">
      
        <div className="flex-grow pt-16">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<Registrationform />} />
            <Route path="/enduserhome" element={<Enduserhome />} />
            <Route path="/create-token" element={<Createnewtocken />} />
            <Route path="/adminhome" element={<Adminhome />} />
            <Route path="/techsupporthome" element={<Techsupporthome />} />
            <Route path="/ticketreply/:id" element={<TicketReply />} />
            <Route path="/techsupportallocation/:id" element={<TechSupportAllocation />} />
          </Routes>
        </div>
      
    </div>
  );
}

export default Router;
