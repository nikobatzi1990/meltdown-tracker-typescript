"use client";
import { useState } from "react";
import Input from "../components/Input";
import Link from "next/link";

export default function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
        <Input type="submit"/>
      </form>
      <p>Already have an account?</p>
      <Link href='/login'>Login</Link>
    </>
  );
}