import { create } from 'zustand'

type dataState = {
    dataState: {country: string | null, options: string | null}
    setData: (country: string, options: string) => void
}

const useDataSlice = create<dataState>((set) => ({
  dataState: {country: null, options: null},
  setData: (country, options) => set((state) => ({
    dataState: { ...state.dataState, country: country, options: options }
  })),
}))

export default useDataSlice