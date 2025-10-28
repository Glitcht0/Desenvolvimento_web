import servidor from "./servidor";

export function serviçoCadastrarGerenteTecnologia(gerente) {
    console.log("[serviçoCadastrarGerenteTecnologia] Dados enviados:", gerente);
    return servidor.post("/gerente-tecnologia", gerente, {
        headers: {
            // Força log do header Authorization
            Authorization: window?.localStorage?.getItem('token') || undefined
        }
    });
};

export function serviçoAtualizarGerenteTecnologia(gerente) {
    console.log("[serviçoAtualizarGerenteTecnologia] Dados enviados:", gerente);
    return servidor.patch("/gerente-tecnologia", gerente, {
        headers: {
            Authorization: window?.localStorage?.getItem('token') || undefined
        }
    });
};

export function serviçoBuscarGerenteTecnologia(cpf) {
    console.log("[serviçoBuscarGerenteTecnologia] CPF enviado:", cpf);
    // Loga o header Authorization antes de enviar
    const token = window?.localStorage?.getItem('token');
    console.log("[serviçoBuscarGerenteTecnologia] Token Authorization:", token);
    return servidor.get(`/gerente-tecnologia/${cpf}`, {
        headers: {
            Authorization: token || undefined
        }
    });
}






//🗡️ ------------------------------------- 🗡️
// Serviços para Participação Mineração (análogo ao Interesse do Aluno)

export function serviçoCadastrarParticipaçãoMineração(participacao) {
    // Corresponde à rota: RotasGerenteTecnologia.post("/participação-mineração", ...)
    return servidor.post("/gerente-tecnologia/participacao-mineracao", participacao, {
        headers: {
            Authorization: window?.localStorage?.getItem('token') || undefined
        }
    });
};

export function serviçoRemoverParticipaçãoMineração(id) {
    // Corresponde à rota: RotasGerenteTecnologia.delete("/participação-mineração/:id", ...)
    return servidor.delete(`/gerente-tecnologia/participacao-mineracao/${id}`, {
        headers: {
            Authorization: window?.localStorage?.getItem('token') || undefined
        }
    });
};

export function serviçoBuscarParticipaçõesMineraçãoGerenteTecnologia(cpf) {
    // Corresponde à rota: RotasGerenteTecnologia.get("/participação-mineração/gerente-tecnologia/:cpf", ...)
    return servidor.get(`/gerente-tecnologia/participacao-mineracao/gerente-tecnologia/${cpf}`, {
        headers: {
            Authorization: window?.localStorage?.getItem('token') || undefined
        }
    });
};

export function serviçoBuscarPatrocínios() {
    // Corresponde à rota: RotasGerenteTecnologia.get("/participação-mineração/Patroocínio/", ...)
    // ATENÇÃO: A URL usa "Patroocínio" (com dois 'o') para bater com a sua rota do backend.
    return servidor.get("/gerente-tecnologia/participacao-mineracao/Patrocinio/", {
        headers: {
            Authorization: window?.localStorage?.getItem('token') || undefined
        }
    });
};
//🗡️ ------------------------------------- 🗡️