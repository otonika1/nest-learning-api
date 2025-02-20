import { BeforeInsert, Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Property } from "./property.entity";
import * as bcrypt from "bcrypt";
@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    firstName:string

    @Column()
    email:string

    @Column()
    lastName:string;

    @Column()
    identificationCode:string

    @Column()
    password:string

    @CreateDateColumn()
    createdAt: number;

    @OneToMany(()=> Property, (property)=>property.user, )
    @JoinColumn()
    properties?:Property[]

    @BeforeInsert()
    async hasPassword(){
        this.password = await bcrypt.hash(this.password, 10)
    }
}