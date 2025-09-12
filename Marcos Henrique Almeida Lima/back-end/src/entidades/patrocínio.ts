import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from
"typeorm";
import GerenteTecnologia from "./gerente-tecnologia";
import ParticipacaoMineração from "./participação-mineração";
@Entity()
export default class Patrocínio extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    necessidade_bolsa: boolean;

    @Column()
    justificativa: string;

    @CreateDateColumn()
    data_manifestação: Date;

    @ManyToOne(() => ParticipacaoMineração, (participacao_mineracao) => participacao_mineracao.patrocinios, { onDelete: "CASCADE" })
    participacao_mineracao: ParticipacaoMineração;
    
    @ManyToOne(() => GerenteTecnologia, (gerentetecnologia) => gerentetecnologia.patrocinios, { onDelete: "CASCADE" })
    gerentetecnologia: GerenteTecnologia;
}

