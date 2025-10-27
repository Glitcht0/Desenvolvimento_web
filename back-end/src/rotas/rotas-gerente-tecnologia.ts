import { Router } from "express";
import verificarToken from "../middlewares/verificar-token";
import verificarPerfilGerenteTecnologia from "../middlewares/verificar-perfil-gerente-tecnologia";
import ServiçosGerenteTecnologia from "../serviços/serviços-gerente-tecnologia";


const RotasGerenteTecnologia = Router();
export default RotasGerenteTecnologia;
RotasGerenteTecnologia.post("/", ServiçosGerenteTecnologia.cadastrarGerenteTecnologia);
RotasGerenteTecnologia.patch("/", verificarToken, verificarPerfilGerenteTecnologia, ServiçosGerenteTecnologia.atualizarGerenteTecnologia);
RotasGerenteTecnologia.get("/:cpf", verificarToken, verificarPerfilGerenteTecnologia, ServiçosGerenteTecnologia.buscarGerenteTecnologia);


//🗡️ ------------------------------------- 🗡️
RotasGerenteTecnologia.post("/participacao-mineracao", verificarToken, verificarPerfilGerenteTecnologia, ServiçosGerenteTecnologia.cadastrarParticipaçãoMineração);
RotasGerenteTecnologia.delete("/participacao-mineracao/:id", verificarToken, verificarPerfilGerenteTecnologia, ServiçosGerenteTecnologia.removerInteresse);
RotasGerenteTecnologia.get("/participacao-mineracao/gerente-tecnologia/:cpf", verificarToken, verificarPerfilGerenteTecnologia, ServiçosGerenteTecnologia.buscarParticipaçõesMineraçãoGerenteTecnologia);
RotasGerenteTecnologia.get("/participacao-mineracao/Patrocinio/", verificarToken, verificarPerfilGerenteTecnologia, ServiçosGerenteTecnologia.buscarPatrocínios);
//🗡️ ------------------------------------- 🗡️