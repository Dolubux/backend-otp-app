import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User>  {
    const { name, email, phone } = createUserDto;
    const existingUser = await this.userRepository.findOne({
      where: [{ name }, { email }, { phone }]
    });

    if (!existingUser) {
      const user = this.userRepository.create(createUserDto);
      return await this.userRepository.save(user);
    }

    return existingUser;
    
  }

  findAll() {
    return this.userRepository.findAndCount();
  }

  async findOne(id: number): Promise<User | null> {
    return await this.userRepository.findOne({ where: { id } });
  }

  async count(): Promise<number> {
    return await this.userRepository.count();
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
