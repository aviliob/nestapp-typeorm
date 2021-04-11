import { Column, CreateDateColumn, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Affiliate } from "./affiliate.entity";
import { Person } from "./person.entity";
import { Role } from "./role.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false, length: 50 })
  email!: string;

  @Column({ type: 'varchar', nullable: false, length: 100 })
  password!: string;

  @Column({ type: 'varchar', nullable: false, length: 25 })
  name!: string;

  @Column({ type: 'varchar', nullable: false, length: 25, name: 'last_name' })
  lastname!: string;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @Column({ name: 'id_person' })
  @OneToOne(type => Person, person => person.id)
  idPerson!: number;

  @Column({ name: 'id_affiliate' })
  @OneToOne(type => Affiliate, affiliate => affiliate.id)
  idAffiliate!: number;

  @Column({ name: 'id_role' })
  @OneToOne(type => Role, role => role.id)
  idRole!: number;
}