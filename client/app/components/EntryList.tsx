import { useState, useEffect } from 'react';
import { UserAuth } from "../context/AuthContext";
import axios from 'axios';
import { HiLightBulb } from "react-icons/hi";

interface Entries {
  id: number,
  title: string,
  body: string,
  flagged: boolean,
  intensity: number
};

export default function EntryList() {
  const auth = UserAuth();
  const currentUser = auth?.user
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

    </>
  );
}

