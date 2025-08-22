import { BaseEntity, Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from
"typeorm";
import Usuário from "./usuário";
import ParticipacaoMineracao from "./participacao_mineracao";
export enum Titulação {MESTRADO = "mestrado", DOUTORADO = "doutorado"};
@Entity()
export default class GerenteMineradora extends BaseEntity {
@PrimaryGeneratedColumn()
id: number;
@Column({ type: "enum", enum: Titulação })
titulação: Titulação;
@Column()
anos_experiência_empresarial: number;
@OneToMany(() => ParticipacaoMineracao, (participacao_mineracao) => participacao_mineracao.gerente_mineradora)
participacoes_mineracao: ParticipacaoMineracao[];
@OneToOne(() => Usuário, (usuário) => usuário.gerente_mineradora, { onDelete: "CASCADE" })
@JoinColumn()
usuário: Usuário;
}