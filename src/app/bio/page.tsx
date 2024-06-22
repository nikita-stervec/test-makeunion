'use client';

import Image from 'next/image';
import styles from './page.module.css';

interface userData {
  name: string;
  image: string;
  bio: string;
  contacts: {
    email: string;
    tel: number;
  };
}

const data = {
  name: 'Alex',
  image: '/user-pic.png',
  bio: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Amet cum laboriosam aliquam quos perferendis? Doloribus quos soluta obcaecati accusamus id!',
  contacts: {
    email: 'a@gmail.com',
    tel: 123456789,
  },
};

export default function BioPage() {
  return (
    <section className={styles['bio__wrapper']}>
      <article className={styles['bio__card']}>
        <header>
          <Image
            src={data.image}
            alt={data.name}
            width={300}
            height={300}
            className={styles['bio__image']}
          />
        </header>
        <div className={styles['bio__info']}>
          <h2>{data.name}</h2>
          <p>
            <span className={styles['bio__desc']}>bio:</span>
            <br />
            {data.bio}
          </p>
          <footer className={styles['bio__contacts']}>
            <p>email: {data.contacts.email}</p>
            <p>tel: {data.contacts.tel}</p>
          </footer>
        </div>
      </article>
    </section>
  );
}
