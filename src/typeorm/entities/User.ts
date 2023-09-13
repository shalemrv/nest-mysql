import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: 'users'
})
export class User {
    @PrimaryGeneratedColumn({
        type: 'bigint'
    })
    
    id: number;

    @Column({unique: true})
    username: string;

    @Column()
    password: string;

    @Column({nullable: true})
    dob: Date;
    
    @Column()
    createdAt: Date;
}