import React from 'react';
import { Link } from 'react-router-dom';

const Users = (props) => {  
  return props.mapUsers.map((value, i) => (
        <Link to={`/dashboard/${value.id}`} key={value.id} className='user-card' >
          <div className='image-wrapper'>
            <img src={value.profilePicture} alt='user' />
          </div>
          <p className='user-name'>{value.displayName}</p>
          <p className='user-text'>{value.phoneNumber}</p>
          <p className='user-text'>{value.email}</p>

          <p className='user-role text-center'>Client</p>
      </Link>
  ));
};

export default Users;
