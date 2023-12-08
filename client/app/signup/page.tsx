"use client";
import { useState } from "react";
import Input from "../components/Input";
import Link from "next/link";
import { UserAuth } from "../context/AuthContext";

export default function Signup() {
  const auth = UserAuth();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async(e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    try {
      if (auth) {
        await auth.signup(username, email, password);
      }
    } catch (err) {
      console.log("ERROR: ", err);
    }
  }

  const handleUsernameInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();
    setUsername(e.target.value);
  }

  const handleEmailInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();
    setEmail(e.target.value);
  }
  
  const handlePasswordInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();
    setPassword(e.target.value);
  }

  return (
    <>
      <h1>SIGNUP</h1>
      <form onSubmit={handleSignup}>
        <Input
          id="username"
          name="username"
          // placeholder="Username"
          text="Username: "
          type="text"
          onChange={handleUsernameInput}
        />
        <Input
          id="email"
          name="email"
          // placeholder="Email"
          text="Email: "
          type="email"
          onChange={handleEmailInput}
        />
        <Input
          id="password"
          name="password"
          // placeholder="Password"
          text="Password: "
          type="password"
          onChange={handlePasswordInput}
        />
        <button type="submit">Sign Up</button>
      </form>
      <p>Already have an account?</p>
      <Link href='/login'>Login</Link>
    </>
  );
}