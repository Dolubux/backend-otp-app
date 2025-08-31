import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
export declare class UsersService {
    private userRepository;
    constructor(userRepository: Repository<User>);
    create(createUserDto: CreateUserDto): Promise<User>;
    findAll(): Promise<[User[], number]>;
    findOne(id: number): Promise<User | null>;
    count(): Promise<number>;
    update(id: number, updateUserDto: UpdateUserDto): string;
    remove(id: number): string;
}
