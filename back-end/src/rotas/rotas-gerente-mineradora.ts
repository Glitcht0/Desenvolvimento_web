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
RotasGerenteMineradora.post("/patrocinio", verificarToken, verificarPerfilGerenteMineradora, ServiçosGerenteMineradora.cadastrarPatrocínio);
RotasGerenteMineradora.patch("/patrocinio", verificarToken, verificarPerfilGerenteMineradora, ServiçosGerenteMineradora.alterarPatrocínio);
RotasGerenteMineradora.delete("/patrocinio/:id", verificarToken, verificarPerfilGerenteMineradora, ServiçosGerenteMineradora.removerPatrocínio);
RotasGerenteMineradora.get("/patrocinio/gerente-mineradora/:cpf", verificarToken, verificarPerfilGerenteMineradora, ServiçosGerenteMineradora.buscarPatrocínioGerenteMineradora);
RotasGerenteMineradora.get("/patrocinio/areas-atuacao/", verificarToken, verificarPerfilGerenteMineradora, ServiçosGerenteMineradora.buscarÁreasAtuaçãoPatrocínio);


 //🗡️ ------------------------------------- 🗡️