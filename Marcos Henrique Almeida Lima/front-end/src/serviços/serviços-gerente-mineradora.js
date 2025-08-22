import servidor from "./servidor";
export function serviçoCadastrarGerenteMineradora(gerente_mineradora)
{ return servidor.post("/gerentes_mineradora", gerente_mineradora); };
export function serviçoBuscarGerenteMineradora(cpf) { return servidor.get(`/gerentes_mineradora/${cpf}`); };