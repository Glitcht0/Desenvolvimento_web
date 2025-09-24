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





