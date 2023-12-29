"use client";
import { useState, useEffect, ChangeEvent, FormEvent } from "react";
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
  const [timeOfDay, setTimeOfDay] = useState("");
  const [intensity, setIntensity] = useState("not specified");
  const [isFlagged, setIsFlagged] = useState(false);
  const [timesUsed, setTimesUsed] = useState(0);

  const submissionData = { 
    uid: auth?.user?.uid, 
    tagName: tag, 
    timesUsed: timesUsed, 
    title: title, 
    body: body, 
    timeOfDay: timeOfDay, 
    flagged: isFlagged, 
    intensity: intensity 
  };

  const handleTitleInput = (e: ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();
    const value = e.target.value;
    setTitle(value);
  }

  const handleTextBody = (e: ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();
    const value = e.target.value;
    setBody(value);
  }

  const handleTagInput = (e: ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();
    const value = e.target.value;
    setTag(value);
  }

  const handleTimeOfDay = (e: ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();
    const value = e.target.id;
    setTimeOfDay(value);
  }

  const handleIntensity = (e: ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();
    const value = e.target.id;
    setIntensity(value);
  }

  const handleSubmission = async(e: FormEvent) => {
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