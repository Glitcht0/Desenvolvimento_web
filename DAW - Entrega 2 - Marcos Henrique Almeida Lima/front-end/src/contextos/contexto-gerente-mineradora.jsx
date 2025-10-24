import { createContext, useState } from "react";
const ContextoGerenteMineradora = createContext();
export default ContextoGerenteMineradora;
export function ProvedorGerenteMineradora({ children }) {
const [patrocínioConsultada, setPatrocínioConsultada] = useState({});
return (
<ContextoGerenteMineradora.Provider value={{ designLogoConsultada: patrocínioConsultada, setDesignLogoConsultada: setPatrocínioConsultada
 }}>{children}</ContextoGerenteMineradora.Provider>
 );
}
