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
  const [timeOfDay, setTimeOfDay] = useState("morning");
  const [intensity, setIntensity] = useState("1");
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
    setTitle(e.target.value);
  }

  const handleTextBody = (e: ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();
    setBody(e.target.value);
  }

  const handleTagInput = (e: ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();
    setTag(e.target.value);
  }

  const handleTimeOfDay = (e: ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();
    setTimeOfDay(e.target.value);
  }

  const handleIntensity = (e: ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();
    setIntensity(e.target.value);
  }

  const handleTagTimesUsed = async() => {
    const previousTimesUsed = await axios.get(`/api/tags/${submissionData.tagName}/timesUsed`);
    setTimesUsed(Number(previousTimesUsed.data) + 1);
  }

  const handleSubmission = async(e: FormEvent) => {
    e.preventDefault();
    await handleTagTimesUsed();
    await axios.post(`/api/entries/${auth?.user?.uid}/submission`, submissionData);
  }

  return (
    <>
      <h1>Entry Submission</h1>
      <form onSubmit={handleSubmission}>
        <Input onChange={handleTitleInput} type='text' text="Title"/>
        <Input onChange={handleTagInput} type='text' text="Tags"/>
        <TimeOfDay timeOfDay={timeOfDay} onChange={handleTimeOfDay}/>
        <Intensity intensity={intensity} onChange={handleIntensity}/> 
        <Button 
          text="Submit"
          title="Submit new entry"
          type='submit'
        />
      </form>
    </>
  );
}