"use client";
import { useState } from "react";
import Input from "../components/Input";
import Link from "next/link";
import { UserAuth } from "../context/AuthContext";

export default function Login() {
  const auth = UserAuth();
  const { login } = auth || {};
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async(e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    try {
      await login?.(email, password);
    } catch (err) {
      console.log("ERROR: ", err);
    }
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
    <h1>LOGIN</h1>
      <form onSubmit={handleLogin}>
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
        <button type="submit">Submit</button>
      </form>
      <p>Don&apos;t have an account?</p>
      <Link href='/signup'>Sign Up!</Link>
    </>
  );
}