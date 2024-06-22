'use client';

import { useEffect, useState } from 'react';
import styles from './page.module.css';

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address?: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone?: string;
  website?: string;
  company?: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

function FetchPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      const limit = 5;
      const start = (currentPage - 1) * limit;

      const res = await fetch(
        `https://jsonplaceholder.typicode.com/users?_start=${start}&_limit=${limit}`
      );
      const users: User[] = await res.json();

      const totalRes = await fetch(
        'https://jsonplaceholder.typicode.com/users'
      );
      const totalUsers: User[] = await totalRes.json();
      const totalPages = Math.ceil(totalUsers.length / limit);

      setUsers(users);
      setTotalPages(totalPages);
    };

    fetchUsers();
  }, [currentPage]);

  const openModal = (user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        isModalOpen &&
        event.target instanceof Node &&
        !document
          .querySelector(`.${styles.modalContent}`)
          ?.contains(event.target)
      ) {
        closeModal();
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isModalOpen]);

  return (
    <div className={styles['users__wrapper']}>
      <h1 className={styles['users__intro']}>Users</h1>
      <ul>
        {users.map(user => (
          <li className={styles['users__li']} key={user.id}>
            <button
              className={styles['users__btn']}
              onClick={() => openModal(user)}
            >
              {user.name}
            </button>
          </li>
        ))}
      </ul>
      <div className={styles['users__btns']}>
        {currentPage > 1 && (
          <button onClick={() => setCurrentPage(currentPage - 1)}>
            Previous
          </button>
        )}
        {currentPage < totalPages && (
          <button onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
        )}
      </div>

      {isModalOpen && selectedUser && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <span className={styles.close} onClick={closeModal}>
              &times;
            </span>
            <h2>{selectedUser.name}</h2>
            <p>Username: {selectedUser.username}</p>
            <p>Email: {selectedUser.email}</p>
            {selectedUser.phone && <p>Phone: {selectedUser.phone}</p>}
            {selectedUser.website && <p>Website: {selectedUser.website}</p>}
            {selectedUser.address && (
              <p>
                Address: {selectedUser.address.street},{' '}
                {selectedUser.address.suite}, {selectedUser.address.city},{' '}
                {selectedUser.address.zipcode}
              </p>
            )}
            {selectedUser.company && (
              <p>Company: {selectedUser.company.name}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default FetchPage;
