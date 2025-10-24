import servidor from "./servidor";

// 🔹 GerenteMineradora
export function serviçoCadastrarGerenteMineradora(gerenteMineradora) {
  return servidor.post("/gerente-mineradora", gerenteMineradora);
};
export function serviçoBuscarGerenteMineradora(cpf) {
  return servidor.get(`/gerente-mineradora/${cpf}`);
};
export function serviçoAtualizarGerenteMineradora(gerenteMineradora) {
  return servidor.patch("/gerente-mineradora", gerenteMineradora);
};

// 🔹 Patrocínio 
export function serviçoCadastrarPatrocínio(patrocínio) { // 🔄 alterado
  return servidor.post("/gerente-mineradora/patrocinios", patrocínio); // 🔄 alterado
};
export function serviçoAlterarPatrocínio(patrocínio) { // 🔄 alterado
  return servidor.patch("/gerente-mineradora/patrocinios", patrocínio); // 🔄 alterado
};
export function serviçoRemoverPatrocínio(id) { // 🔄 alterado
  return servidor.delete(`/gerente-mineradora/patrocinios/${id}`); // 🔄 alterado
};
export function serviçoBuscarPatrocíniosGerenteMineradora(cpf) { // 🔄 alterado
  return servidor.get(`/gerente-mineradora/patrocinios/gerente/${cpf}`); // 🔄 alterado
};
export function serviçoBuscarAplicaçõesPrevistasPatrocínios() { // 🔄 alterado
  return servidor.get("/gerente-mineradora/patrocinios/aplicacoes-previstas"); // 🔄 alterado
};
