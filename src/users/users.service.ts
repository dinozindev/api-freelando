import { Injectable } from '@nestjs/common';

export interface User {
  userId: number;
  perfil?: 'cliente' | 'freelancer';
  interesse?: string;
  nome?: string;
  uf?: string;
  cidade?: string;
  email: string;
  senha: string;
}

@Injectable()
export class UsersService {
  private readonly users = [
    {
      userId: 1,
      email: 'john',
      senha: 'changeme',
    },
    {
      userId: 2,
      email: 'maria',
      senha: 'guess',
    },
  ];

  async findOne(email: string): Promise<User | undefined> {
    return this.users.find((user) => user.email === email);
  }
}
