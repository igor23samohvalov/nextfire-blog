import { createContext } from 'react';

interface UserContext {
  user: string | null | any;
  username: string | null;
}

export const UserContext = createContext<UserContext>({ user: null, username: null });
