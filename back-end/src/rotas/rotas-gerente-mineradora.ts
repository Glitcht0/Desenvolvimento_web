import { Router } from "express";
import verificarToken from "../middlewares/verificar-token";
import verificarPerfilGerenteMineradora from "../middlewares/verificar-perfil-gerente-mineradora";
import ServiçosGerenteMineradora from "../serviços/serviços-gerente-mineradora";
const RotasGerenteMineradora = Router();
export default RotasGerenteMineradora;
RotasGerenteMineradora.post("/", ServiçosGerenteMineradora.cadastrarGerenteMineradora);
RotasGerenteMineradora.get("/:cpf", verificarToken, verificarPerfilGerenteMineradora,
ServiçosGerenteMineradora.buscarGerenteMineradora);

RotasGerenteMineradora.patch("/", verificarToken, verificarPerfilGerenteMineradora,
 ServiçosGerenteMineradora.AtualizarGerenteMineradora);



 //🗡️ ------------------------------------- 🗡️
RotasGerenteMineradora.post("/patrocínio", verificarToken, verificarPerfilGerenteMineradora, ServiçosGerenteMineradora.cadastrarPatrocínio);
RotasGerenteMineradora.patch("/patrocínio", verificarToken, verificarPerfilGerenteMineradora, ServiçosGerenteMineradora.alterarPatrocínio);
RotasGerenteMineradora.delete("/patrocínio/:id", verificarToken, verificarPerfilGerenteMineradora, ServiçosGerenteMineradora.removerPatrocínio);
RotasGerenteMineradora.get("/patrocínio/gerente-mineradora/:cpf", verificarToken, verificarPerfilGerenteMineradora, ServiçosGerenteMineradora.buscarPatrocínioGerenteMineradora);
RotasGerenteMineradora.get("/patrocínio/áreas-atuacao/", verificarToken, verificarPerfilGerenteMineradora, ServiçosGerenteMineradora.buscarÁreasAtuaçãoPatrocínio);


 //🗡️ ------------------------------------- 🗡️