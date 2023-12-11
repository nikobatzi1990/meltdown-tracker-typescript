import { useState, useEffect } from "react";
import axios from 'axios';
import { UserAuth } from "../context/AuthContext";
import { HiLightBulb } from "react-icons/hi";
import { getAll } from "firebase/remote-config";

interface Entry {
  id: number,
  title: string,
  body: string,
  flagged: boolean,
  timeOfDay: string,
  intensity: string,
  tags: string,
  createdAt: Date
}

const auth = UserAuth();
const uid = auth?.user?.uid

export async function getAllEntryIds() {
  const entries = await axios.get(`/api/entries/${auth?.user?.uid}`);
  return entries.data.map((entry: Entry) => {
    return {
      params: {
        id: entry.id
      }
    };
  });
}

const handleEntryData = async () => {
  try {
    const fetchedEntry = await axios.get(`/api/entries/${uid}/entry/###`);
    return fetchedEntry.data;
  } catch (err) {
    console.log("ERROR: ", err);
  }
}

export async function getStaticProps(context: {params: {id: number}}) {
  const entryId = context.params?.id;
  const entryData = await handleEntryData();

  return {
    props: {
      entryData,
    },
  };
}

export async function getStaticPaths() {
  const paths = getAllEntryIds();
  return {
    paths,
    fallback: false,
  };
}

export default function SingleEntry() {
  const [entry, setEntry] = useState<Entry>();
  const [date, setDate] = useState<string>('');

  return (
    <>
      
    </>
  );
}