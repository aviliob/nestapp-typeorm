import { Column, CreateDateColumn, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { TypeDocument } from "./type-document.entity";

@Entity()
export class Person {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false, length: 50, name: ' first_name' })
  firstname!: string;

  @Column({ type: 'varchar', nullable: false, length: 50, name: 'last_name' })
  lastname!: string;

  @Column({ type: 'varchar', nullable: false, length: 50 })
  document!: string;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @Column({ name: 'id_type_document' })
  @OneToOne(type => TypeDocument, doc => doc.id)
  idTypeDocument!: number;
}