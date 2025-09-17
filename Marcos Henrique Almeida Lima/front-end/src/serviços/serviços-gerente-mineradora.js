

import servidor from "./servidor";
export function serviçoCadastrarGerenteMineradora(gerentemineradora)
{ return servidor.post("/gerente_mineradora", gerentemineradora); };
export function serviçoBuscarGerenteMineradora(cpf) { return servidor.get(`/gerente_mineradora/${cpf}`); };