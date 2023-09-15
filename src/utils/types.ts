export type CreateUserParams = {
    username: string;
    password: string;
};

export type UpdateUserParams = {
    username: string;
    password: string;
};

export type CreateUserProfileParams = {
    firstname: string;
    lastname: string;
    nickname: string;
    age: number;
}

export type CreatePostParams = {
    title: string;
    description: string;
};

export type UpdatePostParams = {
    title: string;
    description: string;
};