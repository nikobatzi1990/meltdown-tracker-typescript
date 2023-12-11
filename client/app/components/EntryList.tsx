import { useState, useEffect } from 'react';
import { UserAuth } from "../context/AuthContext";
import axios from 'axios';
import { HiLightBulb } from "react-icons/hi";
import Link from 'next/link';

interface Entries {
  id: number,
  title: string,
  body: string,
  flagged: boolean,
  intensity: number
};

export default function EntryList() {
  const auth = UserAuth();
  const currentUser = auth?.user;
  const [entries, setEntries] = useState<Entries[]>([]);

  const handleEntries = async () => {
    const uid = currentUser?.uid;
    try {
      const fetchedEntries = await axios.get(`/api/entries/${uid}`);
      setEntries(fetchedEntries.data);
    } catch (err) {
      console.log('ERROR: ', err);
    }
  }

  useEffect(() => {
    handleEntries();
    console.log('Entries: ', entries);
  }, [currentUser?.uid]);
  
  return (
    <>
      { entries.length > 0
      ? entries.map((entry) => (
          <div 
            key={entry.id} 
          >
            <Link href={`entry/${entry.id}`}>{entry.title}</Link>
              { entry.flagged &&
                <HiLightBulb title="This was a significant event!" alt="Significant Event" />
              }
            <p>{entry.body}</p>
          </div>
        ))
      : "You haven't added any entries yet."
      }
    </>
  );
}