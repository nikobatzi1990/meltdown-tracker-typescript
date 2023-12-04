import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
import auth from '../firebase';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut,
  onAuthStateChanged 
} from 'firebase/auth';

interface CurrentUser {
  username: string,
  email: string, 
  uid: string | null
}

const UserContext = createContext<CurrentUser | null>(null);

export const AuthContextProvider = ({children}: { children: ReactNode }) => {
  const [user, setUser] = useState({});

  const createUser = async (username: string, email: string, password: string) => {
    const newUserInfo = {
      username: username,
      email: email,
      password: password,
      uid: ''
    };

    const newUser = await createUserWithEmailAndPassword(auth, email, password);
    newUserInfo.uid = newUser.user.uid;
    await axios.post('/api/signup', newUserInfo);
    return newUser;
  };

  const loginUser = async (email: string, password: string) => {
    const loggedIn = signInWithEmailAndPassword(auth, email, password);
    return loggedIn;
  };

  const logoutUser = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const authenticatedUser = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      }
    });
      return authenticatedUser;
  }, []);
}