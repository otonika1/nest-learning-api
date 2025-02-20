import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Property } from "./property.entity";

@Entity()
export class PropertyFeature{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    bedroom:number

    @Column()
    kitchen:number;

    @Column()
    hasYard:boolean;

    @Column()
    propertyId: number;

    @OneToOne(() => Property, (property) => property.propertyFeature, {cascade:true})
    @JoinColumn({ name: "propertyId" })
    property:Property
}