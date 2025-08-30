import { Router } from "express";
import verificarToken from "../middlewares/verificar-token";
import verificarPerfilgerentemineradora from "../middlewares/verificar-perfil-gerentemineradora";
import Serviçosgerentemineradora from "../serviços/serviços-gerentemineradora";
const RotasGerentemineradora = Router();
export default RotasGerentemineradora;
RotasGerentemineradora.post("/", Serviçosgerentemineradora.cadastrargerentemineradora);
RotasGerentemineradora.get("/:cpf", verificarToken, verificarPerfilgerentemineradora,
Serviçosgerentemineradora.buscargerentemineradora);