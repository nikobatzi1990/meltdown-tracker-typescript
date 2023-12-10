import { useState, useEffect } from "react";
import axios from 'axios';
import { HiLightBulb } from "react-icons/hi";

interface Entry {
  title: string,
  body: string,
  flagged: boolean,
  timeOfDay: string,
  intensity: string,
  tags: string,
  createdAt: Date
}

export default function SingleEntry() {
  const [entry, setEntry] = useState<Entry>();

  return (
    <>
      
    </>
  );
}