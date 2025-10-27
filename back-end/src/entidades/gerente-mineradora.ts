import { BaseEntity, Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from
"typeorm";
import Usuário from "./usuário";
import ParticipaçãoMineração from "./participação-mineração";
import Patrocínio from "./patrocínio";
export enum Titulação {DiretorOperações = "diretor de operações", SupervisorLavragem = "supervisor de lavragem", CoordenadorExploração = "coordenador de exploração", EngenheiroMinas = "engenheiro de minas", TécnicoMinas = "técnico de minas"};
@Entity()
export default class GerenteMineradora extends BaseEntity {
@PrimaryGeneratedColumn()
id: number;
@Column({ type: "enum", enum: Titulação })
titulação: Titulação;
@Column()
anos_experiência_empresarial: number;
@OneToMany(() => ParticipaçãoMineração, (participação) => participação.gerente_mineradora)
participações_mineração: ParticipaçãoMineração[];

@OneToMany(() => Patrocínio, (patrocínio) => patrocínio.gerentemineradora)
patrocínios: Patrocínio[];



@OneToOne(() => Usuário, (usuário) => usuário.gerente_mineradora, { onDelete: "CASCADE" })
@JoinColumn()


usuário: Usuário;
}