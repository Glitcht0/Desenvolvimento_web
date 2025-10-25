

import servidor from "./servidor";
export function serviçoCadastrarGerenteMineradora(gerentemineradora)
{ return servidor.post("/gerente-mineradora", gerentemineradora); };
export function serviçoBuscarGerenteMineradora(cpf) { return servidor.get(`/gerente-mineradora/${cpf}`); };
export function serviçoAtualizarGerenteMineradora(gerentemineradora)
{ return servidor.patch("/gerente-mineradora", gerentemineradora); }


//🗡️ ------------------------------------- 🗡️

export function serviçoCadastrarPatrocínio(patrocínio) { 
    // Corresponde à rota: RotasGerenteMineradora.post("/patrocínio", ...)
    return servidor.post("/gerente-mineradora/patrocínio", patrocínio); 
};

export function serviçoAlterarPatrocínio(patrocínio) { 
    // Corresponde à rota: RotasGerenteMineradora.patch("/patrocínio", ...)
    return servidor.patch("/gerente-mineradora/patrocínio", patrocínio); 
};

export function serviçoRemoverPatrocínio(id) { 
    // Corresponde à rota: RotasGerenteMineradora.delete("/patrocínio/:id", ...)
    return servidor.delete(`/gerente-mineradora/patrocínio/${id}`); 
};

export function serviçoBuscarPatrocínioGerenteMineradora(cpf) { 
    // Corresponde à rota: RotasGerenteMineradora.get("/patrocínio/gerente-mineradora/:cpf", ...)
    return servidor.get(`/gerente-mineradora/patrocínio/gerente-mineradora/${cpf}`); 
};

export function serviçoBuscarÁreasAtuaçãoPatrocínio() { 
    // Corresponde à rota: RotasGerenteMineradora.get("/patrocínio/áreas-atuacao/", ...)
    return servidor.get("/gerente-mineradora/patrocínio/áreas-atuacao/"); 
};

//🗡️ ------------------------------------- 🗡️