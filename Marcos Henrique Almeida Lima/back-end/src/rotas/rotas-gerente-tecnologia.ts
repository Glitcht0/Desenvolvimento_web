import { Router } from "express";
import verificarToken from "../middlewares/verificar-token";
import verificarPerfilGerenteMineradora from "../middlewares/verificar-perfil-gerente-tecnologia";
import ServiçosGerenteTecnologia from "../serviços/serviços-gerente-tecnologia";


const RotasGerenteMineradora = Router();
export default RotasGerenteMineradora;
RotasGerenteMineradora.post("/", ServiçosGerenteTecnologia.cadastrarGerenteTecnologia);
RotasGerenteMineradora.patch("/", verificarToken, verificarPerfilGerenteMineradora, ServiçosGerenteTecnologia.atualizarGerenteTecnologia);
RotasGerenteMineradora.get("/:cpf", verificarToken, verificarPerfilGerenteMineradora, ServiçosGerenteTecnologia.buscarGerenteTecnologia);
