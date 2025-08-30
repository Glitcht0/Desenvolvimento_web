import { BaseEntity, Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from
"typeorm";
import Usuário from "./usuário";
import Proposta from "./participacao_mineracao";
export enum Titulação {DiretorOperações = "diretor de operações", SupervisorLavragem = "supervisor de lavragem", CoordenadorExploração = "coordenador de exploração", EngenheiroMinas = "engenheiro de minas", TécnicoMinas = "técnico de minas"};
@Entity()
export default class GerenteMineradora extends BaseEntity {
@PrimaryGeneratedColumn()
id: number;
@Column({ type: "enum", enum: Titulação })
titulação: Titulação;
@Column()
anos_experiência_empresarial: number;
@OneToMany(() => Proposta, (proposta) => proposta.gerentemineradora)
propostas: Proposta[];
@OneToOne(() => Usuário, (usuário) => usuário.gerentemineradora, { onDelete: "CASCADE" })
@JoinColumn()


usuário: Usuário;
}