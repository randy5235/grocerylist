import { useEffect, useState } from 'react';
import * as styles from '../styles/ListDashboard.module.css';

import { fetchLists } from '../actions';
import CreateListButton from './CreateListButton';

export default function ListDashboard() {

  const [lists, setLists] = useState([]);

  useEffect( () => {
     fetchLists().then((data) => { setLists(data); });
  }, []);

  return (
    <div className={styles}>
      <h1> Dashboard </h1>
      <div className={styles.listContainer}>
        <CreateListButton />
        <ul>
          {lists.length > 0 ?
          lists.map((list: any) => {
            return (
              <li key={list.id}>
                <h3>{list.name}</h3>
                <p>{list.description}</p>
              </li>
            );
          })
          : <p>No lists found</p>
        }
        </ul>
        </div>
    </div>
  );
}