"use client";
import { useState } from "react";
import Input from "../components/Input";

export default function Login() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <>
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
    </>
  );
}