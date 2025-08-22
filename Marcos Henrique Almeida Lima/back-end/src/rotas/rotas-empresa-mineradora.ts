import { Router } from "express";
import verificarToken from "../middlewares/verificar-token";
import verificarPerfilProfessor from "../middlewares/verificar-perfil-professor";
import ServiçosProfessor from "../serviços/serviços-professor";
const RotasGerentemineradora = Router();
export default RotasGerentemineradora;
RotasGerentemineradora.post("/", ServiçosProfessor.cadastrarProfessor);
RotasGerentemineradora.get("/:cpf", verificarToken, verificarPerfilProfessor,
ServiçosProfessor.buscarProfessor);