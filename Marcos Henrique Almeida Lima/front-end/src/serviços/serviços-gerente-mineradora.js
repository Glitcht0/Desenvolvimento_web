

import servidor from "./servidor";
export function serviçoCadastrargerentemineradora(gerentemineradora)
{ return servidor.post("/gerente_mineradora", gerentemineradora); };
export function serviçoBuscargerentemineradora(cpf) { return servidor.get(`/gerente_mineradora/${cpf}`); };