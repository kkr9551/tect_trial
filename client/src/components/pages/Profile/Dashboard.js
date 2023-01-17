import React from 'react';
import UseRedirectLoggedOutUser from '../../../custom hook/UseRedirectLoggedOutUser';


const Dashboard = () => {
  UseRedirectLoggedOutUser("/login");

  return (
    <div>
        Dashboard
    </div>
  )
}

export default Dashboard;