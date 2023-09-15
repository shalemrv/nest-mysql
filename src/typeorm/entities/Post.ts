import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";


@Entity({ name: 'posts' })
export class Post {

    @PrimaryGeneratedColumn({ type: 'bigint'})
    id: number;

    @Column()
    title: string;

    @Column({ type: 'text' })
    description: string;

    @ManyToOne(() => User, (user) => user.posts)
    user: User;

}