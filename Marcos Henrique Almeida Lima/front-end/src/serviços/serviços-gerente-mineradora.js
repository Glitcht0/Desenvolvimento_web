

import servidor from "./servidor";
export function serviçoCadastrarGerenteMineradora(gerentemineradora)
{ return servidor.post("/gerente-mineradora", gerentemineradora); };
export function serviçoBuscarGerenteMineradora(cpf) { return servidor.get(`/gerente-mineradora/${cpf}`); };