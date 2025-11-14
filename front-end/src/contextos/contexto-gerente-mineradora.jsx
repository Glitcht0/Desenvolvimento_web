import { createContext, useState } from "react";
const ContextoGerenteMineradora = createContext();
export default ContextoGerenteMineradora;
export function ProvedorGerenteMineradora({ children }) {
const [patrocínioConsultada, setPatrocínioConsultada] = useState({});
const [participaçãoMineraçãoConsultado, setParticipaçãoMineraçãoConsultado] = useState(null);
const [gerenteTecnologiaInteressado, setGerenteTecnologiaInteressado] = useState(null);
return (
<ContextoGerenteMineradora.Provider value={{patrocínioConsultada,  setPatrocínioConsultada, participaçãoMineraçãoConsultado, setParticipaçãoMineraçãoConsultado, gerenteTecnologiaInteressado, setGerenteTecnologiaInteressado
}}>{children}</ContextoGerenteMineradora.Provider>
);
}


