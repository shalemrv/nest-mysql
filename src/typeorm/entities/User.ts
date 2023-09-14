import { Column, Entity, PrimaryGeneratedColumn,JoinColumn, OneToOne, OneToMany } from "typeorm";
import { Profile } from "./Profile";
import { Post } from "./Post";

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

    @OneToOne(() => Profile)
    @JoinColumn()
    profile: Profile;

    @OneToMany(() => Post, (post) => post.user)
    posts: Post[];
}