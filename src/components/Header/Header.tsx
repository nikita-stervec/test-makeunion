import React from 'react';
import styles from './Header.module.css';
import Link from 'next/link';

const Header: React.FC = () => {
  return (
    <div className={styles['header__wrapper']}>
      <div className={styles['header__interface']}>
        <Link className={styles['header__link']} href='/'>
          tt
        </Link>
        <span className={styles['header__link-separator']}>|</span>
        <Link className={styles['header__link']} href='/bio'>
          html
        </Link>
        <span className={styles['header__link-separator']}>|</span>
        <Link className={styles['header__link']} href='/todo'>
          js
        </Link>
        <span className={styles['header__link-separator']}>|</span>
        <Link className={styles['header__link']} href='/fetch'>
          fetch
        </Link>
      </div>
    </div>
  );
};

export default Header;
