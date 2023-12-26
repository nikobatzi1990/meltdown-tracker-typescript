"use client";
import { useState } from "react";
import axios from 'axios';
import { UserAuth } from "../context/AuthContext";
import { HiLightBulb } from "react-icons/hi";
import Intensity from "../components/Intensity";
import Button from "../components/Button";

export default function Submission() {

  const handleSubmission = async() => {

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