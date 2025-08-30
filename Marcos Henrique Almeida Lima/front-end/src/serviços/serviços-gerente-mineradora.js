

import servidor from "./servidor";
export function serviçoCadastrargerentemineradora(gerentemineradora)
{ return servidor.post("/gerentesmineradora", gerentemineradora); };
export function serviçoBuscargerentemineradora(cpf) { return servidor.get(`/gerentesmineradora/${cpf}`); };