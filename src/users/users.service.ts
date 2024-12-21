import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/users/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) { }

  getAll = async () => {
    return {
      data: [
        {
          name: 'John Doe',
          email: 'johndoe@gmail.com'
        }
      ]
    }
  }

}
