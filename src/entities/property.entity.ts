import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { PropertyFeature } from "./propertyFeature.entity";
import { User } from "./user.entity";

@Entity()
export class Property{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name:string

    @Column()
    description:string;

    @Column({default:0})
    price:number;
    
    @OneToOne(() => PropertyFeature, (propertyFeature) => propertyFeature.property)
    propertyFeature:PropertyFeature


    @ManyToOne(() => User,(user) => user.properties, {cascade:true})
    @JoinColumn({name:"userId"})
    user?:User
    
    @Column({ nullable: true })
    userId?:number
}