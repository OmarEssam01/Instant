import { create } from 'zustand'

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("instant-theme") || "coffee" , 
  setTheme: (theme) => {
    localStorage.setItem("instant-theme" , theme)
    set({theme})
  }
}))