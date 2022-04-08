import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGlobe,
  faLocationDot,
  faSearch,
} from '@fortawesome/free-solid-svg-icons';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import { faBuilding } from '@fortawesome/free-solid-svg-icons';
import styles from './HomePage.module.css';

export default function HomePage() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState('neiltonseguins');

  useEffect(() => {
    fetch(`https://api.github.com/users/${user}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        setError(error);
        throw new Error(`${error}`);
      })
      .finally(() => setLoading(false));
  }, [user]);

  if (loading) return 'Loading';
  if (error) return 'Error';

  return (
    <main className={styles.main}>
      <div className={styles.header}>
        <h1 className={styles.title}>_devfinder</h1>
        <form
          className={styles.form}
          onSubmit={(event) => {
            event.preventDefault();
            if (event.target.value !== '') {
              setUser(event.target.value);
            }
          }}
        >
          <div className={styles.form__content}>
            <label className={styles.form__label} htmlFor='user'>
              <FontAwesomeIcon icon={faSearch} size='lg' />
            </label>
            <input
              className={styles.form__input}
              type='text'
              name='user'
              id='user'
              placeholder='Pesquise um usuário do Github'
            />
          </div>
          <button type='submit' className={styles.form__button}>
            Pesquisar
          </button>
        </form>
      </div>
      <div className={styles.container}>
        <img className={styles.image} src={data.avatar_url} alt={data.name} />
        <div className={styles.container__wrapper}>
          <div className={styles.container__header}>
            <h2 className={styles.container__title}>{data.name}</h2>
            <p className={styles.container__description}>{data.created_at}</p>
          </div>
          <span className={styles.container__info}>{data.id}</span>
          <p className={styles.container__bio}>{data.bio}</p>
          <div className={styles.container__bloco}>
            <div className={styles.container__card}>
              <p>Repos</p>
              <span>{data.public_repos}</span>
            </div>
            <div className={styles.container__card}>
              <p>Seguidores</p>
              <span>{data.followers}</span>
            </div>
            <div className={styles.container__card}>
              <p>Seguindo</p>
              <span>{data.following}</span>
            </div>
          </div>
          <div className={styles.container__link}>
            <div className={styles.container__links}>
              <a
                className={styles.link}
                href='https://www.google.com/maps/place/S%C3%A3o+Lu%C3%ADs+-+Vila+Maranh%C3%A3o,+S%C3%A3o+Lu%C3%ADs+-+MA/@-2.5606303,-44.3281626,12z/data=!3m1!4b1!4m5!3m4!1s0x7f68ff06f7f6d21:0x983102e459a3de47!8m2!3d-2.5306721!4d-44.2988947'
              >
                <FontAwesomeIcon className={styles.icon} icon={faLocationDot} />
                {data.location}
              </a>
              <a
                className={styles.link}
                href='https://www.linkedin.com/in/ne%C3%ADlton-seguins/'
              >
                <FontAwesomeIcon className={styles.icon} icon={faLink} />
                {data.login}
              </a>
            </div>
            <div className={styles.container__links}>
              <a
                className={styles.link}
                href='https://www.twitter.com/SeguinsNeilton'
              >
                <FontAwesomeIcon className={styles.icon} icon={faGlobe} />
                {data.twitter_username}
              </a>
              <a className={styles.link} href='https://cursos.alura.com.br/'>
                <FontAwesomeIcon className={styles.icon} icon={faBuilding} />
                {data.company}
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
