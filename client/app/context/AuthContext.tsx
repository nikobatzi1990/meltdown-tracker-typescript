import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
import auth from '../firebase';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut,
  onAuthStateChanged,
  UserCredential 
} from 'firebase/auth';

interface User {
  username: string,
  email: string, 
  uid: string | null
};

interface AuthenticatedUser {
  signup: (username: string, email: string, password: string) => Promise<UserCredential | undefined>,
  login: (email: string, password: string) => Promise<UserCredential | undefined>,
  logout: () => Promise<void>,
  user: User | null
}

const UserContext = createContext<AuthenticatedUser | null>(null);

export const AuthContextProvider = ({children}: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const signup = async (username: string, email: string, password: string) => {
    const newUserInfo: User = {
      username: username,
      email: email,
      uid: ''
    };

    try {
      const newUser = await createUserWithEmailAndPassword(auth, email, password);
      newUserInfo.uid = newUser.user.uid;
      await axios.post('/api/signup', newUserInfo);
      return newUser;
    } catch (err) {
      console.error("Signup failed:", err);
      throw err;
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const loggedIn = await signInWithEmailAndPassword(auth, email, password);
      return loggedIn;
    } catch (err) {
      console.error("Login failed:", err);
      throw err;
    }
  };

  const logout = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const authenticatedUser = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        const { displayName, email, uid} = currentUser;
        setUser({
          username: displayName || '',
          email: email || '',
          uid: uid || null,
        });
      }
    });
      return authenticatedUser;
  }, []);

  return <UserContext.Provider value={{ signup, login, logout, user }}>
    {children}
  </UserContext.Provider>
};

export const UserAuth = () => {
  return useContext(UserContext);
}