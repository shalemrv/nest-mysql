import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from 'src/typeorm/entities/Profile';
import { User } from 'src/typeorm/entities/User';
import { CreateUserParams, CreateUserProfileParams, UpdateUserParams } from 'src/utils/types';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        @InjectRepository(Profile) private profileRepository: Repository<Profile>
    ) {}
    
    index() {
        return this.userRepository.find();
    }


    show(id: number) {
        return this.userRepository.findOneBy({ id });
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
        const user = await this.userRepository.findOneBy({ id });

        if (!user)
            throw new HttpException(
                'User not found. Cannot create profile.',
                HttpStatus.BAD_REQUEST
            );
        
        let newProfile = this.profileRepository.create(createUserProfileDetails);
        newProfile = await this.profileRepository.save(newProfile);

        user.profile = newProfile;

        return this.userRepository.save(user);
    }
}
