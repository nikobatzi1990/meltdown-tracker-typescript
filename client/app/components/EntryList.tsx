import { useState, useEffect } from 'react';
import { UserAuth } from "../context/AuthContext";
import axios from 'axios';
import { HiLightBulb } from "react-icons/hi";

export default function EntryList() {
  const auth = UserAuth();
  const [entries, setEntries] = useState([]);

  
  return (
    <>
    </>
  );
}

