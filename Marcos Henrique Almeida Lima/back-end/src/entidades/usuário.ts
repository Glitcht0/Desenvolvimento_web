import { BaseEntity, Column, CreateDateColumn, Entity, OneToOne, PrimaryColumn } from "typeorm";
import GerenteMineradora from "./gerente_mineradora";
import Aluno from "./gerente_tecnologia";
export enum Perfil { ALUNO = "aluno", PROFESSOR = "professor" };
export enum Status { PENDENTE = "pendente", ATIVO = "ativo" };

export enum Cores { AMARELO = "yellow", ANIL = "indigo", AZUL = "blue", AZUL_PISCINA = "cyan",
CINZA_ESCURO = "bluegray", LARANJA = "orange", ROSA = "pink", ROXO = "purple", VERDE = "green",
VERDE_AZULADO = "teal" };
@Entity()
export default class Usuário extends BaseEntity {
@PrimaryColumn()
cpf: string;
@Column({type: "enum", enum: Perfil })
perfil: Perfil;
@Column({type: "enum", enum: Status, default: Status.PENDENTE })
status: Status;
@Column()
nome: string;
@Column()
email: string;
@Column()
senha: string;
@Column()
questão: string;
@Column()
resposta: string;
@Column({ type: "enum", enum: Cores })
cor_tema: string;
@OneToOne(() => GerenteMineradora, (professor) => professor.usuário)
professor: GerenteMineradora;
@OneToOne(() => Aluno, (aluno) => aluno.usuário)
aluno: Aluno;
@CreateDateColumn()
dzata_criação: Date;
}