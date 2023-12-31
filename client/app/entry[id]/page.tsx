import { useState, useEffect } from "react";
import axios from 'axios';
import { UserAuth } from "../context/AuthContext";
import { HiLightBulb } from "react-icons/hi";

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

const fetchEntry = async (id: number) => {
  try {
    const fetchedEntry = await axios.get(`/api/entries/${uid}/entry/${id}`);
    return fetchedEntry.data;
  } catch (err) {
    console.log("ERROR: ", err);
  }
}

export async function getStaticProps(context: {params: {id: number}}) {
  const entryId = context.params?.id;
  const entryData = await fetchEntry(entryId);

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

  useEffect(() => {
    const handleEntryData = async () => {
      try {
        const fetchedEntry = await axios.get(`/api/entries/entry/${entry?.id}`);
        setEntry(fetchedEntry.data);
        setDate(new Date(fetchedEntry.data.created_at)
          .toLocaleDateString(
            'en-gb',
            {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: "numeric", 
              minute: "numeric", 
              hour12: true,
              timeZoneName: "long"
            })
          );
      } catch (err) {
        console.log('ERROR: ', err);
      }
    }
    handleEntryData();
  }, []);

  return (
    <>
      <div>
        <p>Time of Day: {entry?.timeOfDay}</p>
        <p>Meltdown Intensity: {entry?.intensity}</p>
        <p>{date}</p>
      </div>
      { entry?.flagged &&
        <HiLightBulb title="This was a significant event!"/>
      }
      <h3>{ entry?.title }</h3>
      <p>Tags: {entry?.tags}</p>
      <p>{entry?.body}</p>
      
    </>
  );
}