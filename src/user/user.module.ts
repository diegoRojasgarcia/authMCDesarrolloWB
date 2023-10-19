import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './services/user.service';
import { UserResolver } from './resolvers/user.resolver';
import { Users } from './entities/user.entity';
import { GraphQLModule } from '@nestjs/graphql';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';

@Module({
  imports: [TypeOrmModule.forFeature([Users])],
  providers: [UserResolver, UserService],
  exports: [UserService],
})
export class UserModule {}
