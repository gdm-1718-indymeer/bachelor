import React from 'react';
import { Link } from 'react-router-dom';

const Users = (props) => {
  console.log(props.mapUsers)
  
  return props.mapUsers.map((value, i) => (
      <Link to={`/dashboard/`} key={i} className='user-cards' >
        <div className='user-card'>
          <i className='fas fa-ellipsis-v'></i>
          <div className='image-wrapper'>
            <img src={value.profilePicture} alt='user' />
          </div>
          <p className='user-name'>{value.displayName}</p>
          <p className='user-mail'>{value.phoneNumber}</p>
          <p className='user-mail'>{value.email}</p>

          <p className='user-role'>Client</p>
        </div>
      </Link>
  ));
};

export default Users;
