import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './services/user.service';
import { UserResolver } from './resolvers/user.resolver';
import { Users } from './entities/user.entity';
import { MailService } from 'src/mail/mailer.service';
import { Token } from './entities/token.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([Users]),
    TypeOrmModule.forFeature([Token]),
  ],
  providers: [UserResolver, UserService, MailService],
  exports: [UserService],
})
export class UserModule {}
