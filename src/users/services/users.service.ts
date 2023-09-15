import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/User';
import { Profile } from 'src/typeorm/entities/Profile';
import { Post } from 'src/typeorm/entities/Post';
import { CreatePostParams, CreateUserParams, CreateUserProfileParams, UpdateUserParams } from 'src/utils/types';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        @InjectRepository(Profile) private profileRepository: Repository<Profile>,
        @InjectRepository(Post) private postRepository: Repository<Post>
    ) {}

    private async getUser(id: number) {
        const user = await this.userRepository.findOneBy({ id });

        if (!user)
            throw new HttpException(
                'Invalid User ID. User not found.',
                HttpStatus.BAD_REQUEST
            );

        return user;
    }
    
    index() {
        return this.userRepository.find({
            relations: ['profile']
        });
    }


    show(id: number) {
        return this.userRepository.find({
            where: { id },
            relations: ['profile', 'posts']
        });
    }


    store(userDetails: CreateUserParams) {
        const newUser = this.userRepository.create({
            ...userDetails
        })

        return this.userRepository.save(newUser);
    }


    update(id: number, updateUserDetails: UpdateUserParams) {
        return this.userRepository.update({ id }, {...updateUserDetails });
    }

    delete(id: number) {
        return this.userRepository.delete({ id });
    }

    async storeProfile(id: number, createUserProfileDetails: CreateUserProfileParams) {
        const user = await this.getUser(id);
        
        let newProfile = this.profileRepository.create(createUserProfileDetails);
        newProfile = await this.profileRepository.save(newProfile);

        user.profile = newProfile;

        return this.userRepository.save(user);
    }

    getPosts(id: number) {
        const user = this.getUser(id);

        return this.postRepository.find({ where: { id } });
    }

    async storePost(id: number, createPostDetails: CreatePostParams) {
        const user = await this.getUser(id);
        
        let newPost = this.postRepository.create({
            ...createPostDetails,
            user
        });

        return await this.postRepository.save(newPost);
    }

    async indexPosts(id: number) {
        let _ = await this.getUser(id);

        return await this.postRepository.find({
            where: { id }
        })
    }
}
