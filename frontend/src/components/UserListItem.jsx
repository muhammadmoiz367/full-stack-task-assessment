import React from 'react';
import { AiFillEdit } from 'react-icons/ai';
import { FaAddressCard, FaPhoneAlt } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';

import ProfileImg from '../assets/images/profile.png';

const UserListItem = ({ user, handleEdit, handleDelete }) => {
  return (
    <li className={`user-list-item ${user.role === 'admin' ? 'admin' : ''}`}>
      <div className='user-main-info'>
        <img
          src={ProfileImg}
          alt={user.name}
          loading='lazy'
          className='user-avatar'
        />
        <div className='user-details'>
          <h3 className='user-name'>{user.name}</h3>
          <span className='user-email'>{user.email}</span>
          <span className='user-role'>{user.role}</span>
        </div>
      </div>

      <div className='user-extra-info'>
        {user.phone && (
          <span className='user-phone'>
            <FaPhoneAlt className='icon' /> {user.phone}
          </span>
        )}
        {user.location && (
          <span className='user-location'>
            <FaAddressCard className='icon' /> {user.location}
          </span>
        )}
      </div>

      {user.role !== 'admin' && (
        <div className='user-actions'>
          <div className='icon-round'>
            <MdDelete
              color='red'
              size={20}
              cursor={'pointer'}
              onClick={() => handleDelete(user._id)}
            />
          </div>
          <div className='icon-round'>
            <AiFillEdit
              color='blue'
              size={20}
              cursor={'pointer'}
              onClick={() => handleEdit(user)}
            />
          </div>
        </div>
      )}
    </li>
  );
};

export default UserListItem;
