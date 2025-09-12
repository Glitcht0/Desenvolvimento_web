import { Router } from "express";
import verificarToken from "../middlewares/verificar-token";
import verificarPerfilgerentemineradora from "../middlewares/verificar-perfil-gerente-mineradora";
import Serviçosgerentemineradora from "../serviços/serviços-gerente-mineradora";
const RotasGerentemineradora = Router();
export default RotasGerentemineradora;
RotasGerentemineradora.post("/", Serviçosgerentemineradora.cadastrargerentemineradora);
RotasGerentemineradora.get("/:cpf", verificarToken, verificarPerfilgerentemineradora,
Serviçosgerentemineradora.buscargerentemineradora);