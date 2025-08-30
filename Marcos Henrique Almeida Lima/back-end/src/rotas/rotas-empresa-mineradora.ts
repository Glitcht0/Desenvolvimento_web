import { Router } from "express";
import verificarToken from "../middlewares/verificar-token";
import verificarPerfilGerenteMineradora from "../middlewares/verificar-perfil-professor";
import Serviçosgerentemineradora from "../serviços/serviços-professor";
const RotasGerentemineradora = Router();
export default RotasGerentemineradora;
RotasGerentemineradora.post("/", Serviçosgerentemineradora.cadastrargerentemineradora);
RotasGerentemineradora.get("/:cpf", verificarToken, verificarPerfilGerenteMineradora,
Serviçosgerentemineradora.buscargerentemineradora);