import { BadRequestException, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { uuid } from 'uuidv4';

export interface User {
  userId: string;
  perfil?: 'cliente' | 'freelancer';
  interesse?: string;
  nome?: string;
  uf?: string;
  cidade?: string;
  email: string;
  senha: string;
  refresh_token?: string;
}

@Injectable()
export class UsersService {
  constructor(private db: DatabaseService) {}

  save(usuario: User): User {
    const usuarioComMesmoEmail = this.findOne(usuario.email);
    if (usuarioComMesmoEmail) {
      throw new BadRequestException(
        'Já existe um usuário cadastrado com esse e-mail.',
      );
    }
    usuario.userId = uuid();
    this.db.storage.usuarios.push(usuario);
    this.db.sync();
    return usuario;
  }

  findById(id: string): User | undefined {
    return this.db.storage.usuarios.find((user) => user.userId === id);
  }

  findOne(email: string): User | undefined {
    return this.db.storage.usuarios.find((user) => user.email === email);
  }

  update(data: User): User {
    let user = this.findOne(data.email);
    user = { ...data };
    this.db.sync();
    return user;
  }

  updateRefreshToken(userId: string, refresh_token: string) {
    const user = this.findById(userId);
    user.refresh_token = refresh_token;
    this.update({ ...user });
  }
}
