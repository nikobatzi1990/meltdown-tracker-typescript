"use client";
import { useState } from "react";
import Input from "../components/Input";
import Link from "next/link";
import { UserAuth } from "../context/AuthContext";

export default function Signup() {
  const auth = UserAuth();
  const { signup } = auth || {};
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async(e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    try {
      await signup?.(username, email, password);
    } catch (err) {
      console.log("ERROR: ", err);
    }
  }

  return (
    <>
      <h1>SIGNUP</h1>
      <form>
        <Input
          id="username"
          name="username"
          // placeholder="Username"
          text="Username: "
          type="text"
        />
        <Input
          id="email"
          name="email"
          // placeholder="Email"
          text="Email: "
          type="email"
        />
        <Input
          id="password"
          name="password"
          // placeholder="Password"
          text="Password: "
          type="password"
        />
        <Input 
          type="submit"/>
      </form>
      <p>Already have an account?</p>
      <Link href='/login'>Login</Link>
    </>
  );
}