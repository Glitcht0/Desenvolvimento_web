import { Router } from "express";
import ServiçosUsuário from "../serviços/serviços-usuário";
const RotasUsuário = Router();
export default RotasUsuário;
RotasUsuário.post("/login", (req, res, next) => {
    // Adicione este log para confirmar que a rota foi acessada
    console.log("Rota de login acessada.");
    next();
}, ServiçosUsuário.logarUsuário);

RotasUsuário.get("/verificar-cpf-existente/:cpf", (req, res) => {
    console.log("Rota de verificação de CPF acessada.");
    ServiçosUsuário.verificarCpfExistente(req, res);
});