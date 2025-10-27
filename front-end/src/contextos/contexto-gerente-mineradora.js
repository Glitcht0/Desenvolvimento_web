import { createContext, useState } from "react";
const ContextoGerenteMineradora = createContext();
export default ContextoGerenteMineradora;
export function ProvedorGerenteMineradora({ children }) {
const [patrocínioConsultada, setPatrocínioConsultada] = useState({});
return (
<ContextoGerenteMineradora.Provider value={{patrocínioConsultada,  setPatrocínioConsultada
}}>{children}</ContextoGerenteMineradora.Provider>
);
}


