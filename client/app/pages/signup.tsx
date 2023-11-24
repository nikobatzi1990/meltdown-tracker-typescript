import { useState } from "react";
import Input from "../components/Input";

export default function Signup() {
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