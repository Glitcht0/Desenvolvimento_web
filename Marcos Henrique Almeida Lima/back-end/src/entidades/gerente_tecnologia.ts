import { BaseEntity, Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn }
from "typeorm";
import Usuário from "./usuário";
import Patrocinio from "./patrocinio";
export enum Curso { EC = "Engenharia de Computação", SI = "Sistemas de Informação" };
@Entity()
export default class GerenteTecnologia extends BaseEntity {
@PrimaryGeneratedColumn()
id: number;
@Column({ type: "enum", enum: Curso })
curso: Curso;
@Column()
ano_ingresso: number;
@Column({ type: "date" })
data_nascimento: Date;
@Column()
telefone: string;
@OneToMany(() => Patrocinio, (patrocinio) => patrocinio.gerente_tecnologia)
patrocinios: Patrocinio[];
@OneToOne(() => Usuário, usuário => usuário.gerente_tecnologia, { onDelete: "CASCADE" })
@JoinColumn()
usuário: Usuário;
}