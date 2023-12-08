import { useState, useEffect } from 'react';
import { UserAuth } from "../context/AuthContext";
import axios from 'axios';
import { HiLightBulb } from "react-icons/hi";

export default function EntryList() {
  const auth = UserAuth();
  const currentUser = auth?.user
  const [entries, setEntries] = useState<string[]>([]);

  const handleEntries = async () => {
    const uid = currentUser?.uid;
    try {
      const fetchedEntries = await axios.get(`/api/entries/${uid}`);
      console.log('Fetched Entries: ', fetchedEntries.data);
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
    <div>

    </div>
  );
}

