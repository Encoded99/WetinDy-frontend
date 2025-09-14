import { create } from "zustand"




type NavigationStoreType={
 bellCount:number,
 setBellCount:(value:number)=>void
}

export const useNavigationStore=create<NavigationStoreType>((set)=>({
  bellCount:0,
  setBellCount:(value)=>set((state)=>({bellCount:state.bellCount+value}))
}))