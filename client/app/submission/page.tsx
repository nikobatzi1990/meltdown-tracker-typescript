"use client";
import { useState, ChangeEvent, FormEvent } from "react";
import axios from 'axios';
import { UserAuth } from "../context/AuthContext";
import { HiLightBulb } from "react-icons/hi";
import Input from "../components/Input";
import Intensity from "../components/Intensity";
import TimeOfDay from "../components/TimeOfDay";
import Button from "../components/Button";

export default function Submission() {
  const auth = UserAuth();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [tag, setTag] = useState("");
  const [time, setTime] = useState("");
  const [intensity, setIntensity] = useState("not specified");
  const [isFlagged, setIsFlagged] = useState(false);

  const submissionData = { 
    uid: auth?.user?.uid, 
    tagName: tag, 
    timesUsed: 0, 
    title: title, 
    body: body, 
    timeOfDay: time, 
    flagged: isFlagged, 
    intensity: intensity 
  };

  const handleSubmission = async(e: React.FormEvent) => {
    e.preventDefault();
    await axios.post(`/api/entries/${auth?.user?.uid}/submission`, submissionData);
  }

  return (
    <>
      <h1>Entry Submission</h1>
      <form onSubmit={handleSubmission}>
        <Intensity /> 
        <Button 
          text="Submit"
          title="Submit new entry"
          type='submit'
        />
      </form>
    </>
  );
}