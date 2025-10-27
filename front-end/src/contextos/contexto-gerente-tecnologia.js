import { createContext, useState } from "react";
const ContextoGerenteTecnologia = createContext();
export default ContextoGerenteTecnologia;
export function ProvedorGerenteTecnologia({ children }) {
const [participaçãoMineraçãoConsultado, setParticipaçãoMineraçãoConsultado] = useState({});
const [PatrocínioConsultada, setPatrocínioConsultada] = useState({});
const [PatrocínioSelecionada, setPatrocínioSelecionada] = useState({});
const [PatrocínioCandidatura, setPatrocínioCandidatura] = useState({});
return (
<ContextoGerenteTecnologia.Provider value={{
 participaçãoMineraçãoConsultado, setParticipaçãoMineraçãoConsultado, PatrocínioConsultada, setPatrocínioConsultada,
 PatrocínioSelecionada,setPatrocínioSelecionada, PatrocínioCandidatura, setPatrocínioCandidatura
 }}>{children}</ContextoGerenteTecnologia.Provider>
 );
}
