import { createContext, useState } from "react";
const ContextoGerenteTecnologia = createContext();
export default ContextoGerenteTecnologia;
export function ProvedorGerenteTecnologia({ children }) {

const [participaçãoMineraçãoConsultado, setParticipaçãoMineraçãoConsultado] = useState({});
const [patrocínioConsultada, setPatrocínioConsultada] = useState({});
const [patrocínioSelecionada, setPatrocínioSelecionada] = useState({});
const [patrocínioCandidatura, setPatrocínioCandidatura] = useState({});
return (
<ContextoGerenteTecnologia.Provider value={{
 candidaturaConsultado: participaçãoMineraçãoConsultado, setCandidaturaConsultado: setParticipaçãoMineraçãoConsultado, designLogoConsultada: patrocínioConsultada, setDesignLogoConsultada: setPatrocínioConsultada,
 designLogoSelecionada: patrocínioSelecionada, setDesignLogoSelecionada: setPatrocínioSelecionada, designLogoCandidatura: patrocínioCandidatura, setDesignLogoCandidatura: setPatrocínioCandidatura
 }}>{children}</ContextoGerenteTecnologia.Provider>
 );
}
