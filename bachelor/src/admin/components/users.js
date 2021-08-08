import React from 'react';

const Users = () => {
  return (
    <div className='container'>
      <div className='user-cards'>
        <div className='user-card'>
          <i className='fas fa-ellipsis-v'></i>
          <div className='image-wrapper'>
            <img src='https://source.unsplash.com/H982yXJ7vOk/120x120' />
          </div>
          <p className='user-name'>Henry Paulista</p>
          <p className='user-mail'>henry.p@gmail.com</p>

          <p className='user-role'>SENIOR CREATIVE DIRECTOR</p>
        </div>
      </div>
    </div>
  );
};

export default Users;
