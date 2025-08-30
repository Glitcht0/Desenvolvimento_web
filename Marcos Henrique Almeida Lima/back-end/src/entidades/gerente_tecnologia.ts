import { BaseEntity, Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn }
from "typeorm";
import Usuário from "./usuário";
import Patrocínio from "./patrocinio";
export enum Titulacao  { EC = "Engenharia de Computação", SI = "Sistemas de Informação" };
@Entity()
export default class GerenteTecnologia extends BaseEntity {
@PrimaryGeneratedColumn()
id: number;
@Column({ type: "enum", enum: Titulacao  })
titulacao: Titulacao ;
@Column()
ano_ingresso: number;

@Column({ type: "date" })
data_nascimento: Date;

@Column()
telefone: string;

@OneToMany(() => Patrocínio, (patrocinio) => patrocinio.gerentetecnologia)
patrocinios: Patrocínio[];

@OneToOne(() => Usuário, usuário => usuário.gerentetecnologia, { onDelete: "CASCADE" })
@JoinColumn()
usuário: Usuário;
}