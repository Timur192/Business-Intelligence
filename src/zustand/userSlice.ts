import { create } from 'zustand'
import { User } from "firebase/auth";

type UserState = {
    userState: User | undefined,
    setUser: (user: User | undefined) => void
}

const userSlice = create<UserState>((set) => ({
  userState: undefined,
  setUser: (user: User | undefined) => set((state) => ({ userState: state.userState = user })),
}))

export default userSlice