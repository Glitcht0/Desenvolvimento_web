import { Router } from "express";
import verificarToken from "../middlewares/verificar-token";
import verificarPerfilGerenteMineradora from "../middlewares/verificar-perfil-gerente-mineradora";
import ServiçosGerenteMineradora from "../serviços/serviços-gerente-mineradora";
const RotasGerenteMineradora = Router();
export default RotasGerenteMineradora;
RotasGerenteMineradora.post("/", ServiçosGerenteMineradora.cadastrarGerenteMineradora);
RotasGerenteMineradora.get("/:cpf", verificarToken, verificarPerfilGerenteMineradora,
ServiçosGerenteMineradora.buscarGerenteMineradora);