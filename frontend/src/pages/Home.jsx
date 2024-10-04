import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { IoMdAdd } from 'react-icons/io';
import Lottie from 'react-lottie';
import { useDispatch } from 'react-redux';
import EmailFormStep from '../components/EmailFormStep';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Modal from '../components/Modal';
import NameFormStep from '../components/NameFormStep';
import OptionalFormStep from '../components/OptionalFormStep';
import ReviewFormStep from '../components/ReviewFormStep';
import UserListItem from '../components/UserListItem';
import { addUser, deleteUser, updateUser } from '../reducers/userSlice';

import Loader from '../assets/lottie/loader.json';

const Home = () => {
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);
  const [totalCount, setTotalCount] = useState(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [editingUser, setEditingUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
  });

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: Loader,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  const openModal = () => setShowModal(true);
  const closeModal = () => {
    setShowModal(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      location: '',
    });
    setEditingUser(null);
    setStep(1);
  };

  const nextStep = () => setStep(step + 1);

  const prevStep = () => setStep(step - 1);

  const submitForm = async () => {
    if (editingUser) {
      await dispatch(updateUser({ ...editingUser, ...formData }));
    } else {
      await dispatch(addUser(formData));
    }
    const response = await axios.get(`/api/users?page=1`);
    setUsers(response.data.data);
    setTotalCount(response.data.meta.totalCount);
    setPage(1);
    closeModal();
  };

  const loadMoreUsers = async () => {
    if (users.length < totalCount) {
      setLoading(true);
      try {
        const response = await axios.get(`/api/users?page=${page + 1}`);
        setUsers(response.data.data);
        setTotalCount(response.data.meta.totalCount);
        setPage((prevPage) => prevPage + 1);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      phone: user.phone,
      location: user.location,
    });
    setStep(1);
    openModal();
  };

  const handleDelete = async (id) => {
    await dispatch(deleteUser(id));
    const response = await axios.get(`/api/users?page=1`);
    setUsers(response.data.data);
    setTotalCount(response.data.meta.totalCount);
    setPage(1);
  };

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/api/users?page=1`);
        setUsers(response.data.data);
        setTotalCount(response.data.meta.totalCount);
        setPage(1);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
    return () => {
      setUsers([]);
      setPage(1);
      setLoading(false);
      setTotalCount(null);
    };
  }, []);

  return (
    <div>
      <Header />
      <div className='container'>
        <div className='add-btn-container'>
          <button className='open-modal-btn' onClick={openModal}>
            <IoMdAdd size={20} />
            Add User
          </button>
        </div>
        {!loading && users.length > 0 && (
          <ul className='user-list'>
            {users.map((user) => (
              <UserListItem
                user={user}
                key={user._id}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
              />
            ))}
          </ul>
        )}
        <button
          onClick={loadMoreUsers}
          disabled={loading}
          className='load-more-btn'
        >
          Load More
        </button>
        {loading && (
          <div className='loader'>
            <Lottie options={defaultOptions} height={150} width={150} />
          </div>
        )}
        <Footer loading={loading} />
        <Modal showModal={showModal} handleClose={closeModal}>
          {step === 1 && (
            <NameFormStep
              formData={formData}
              setFormData={setFormData}
              nextStep={nextStep}
            />
          )}
          {step === 2 && (
            <EmailFormStep
              formData={formData}
              setFormData={setFormData}
              prevStep={prevStep}
              nextStep={nextStep}
            />
          )}
          {step === 3 && (
            <OptionalFormStep
              formData={formData}
              setFormData={setFormData}
              prevStep={prevStep}
              nextStep={nextStep}
            />
          )}
          {step === 4 && (
            <ReviewFormStep
              formData={formData}
              prevStep={prevStep}
              submitForm={submitForm}
            />
          )}
        </Modal>
      </div>
    </div>
  );
};

export default Home;
