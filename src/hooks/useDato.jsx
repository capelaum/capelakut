import { createContext } from "react";

const DatoContext = createContext({});

export function DatoProvider({ children }) {
  return <DatoContext.Provider>{children}</DatoContext.Provider>;
}
