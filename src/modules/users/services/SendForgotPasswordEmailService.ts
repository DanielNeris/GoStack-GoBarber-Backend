import { injectable, inject } from 'tsyringe';

// import AppError from '@shared/errors/AppError';
// import User from '../infra/typeorm/entities/User';
import IMaillProvider from '@shared/container/providers/MailProvider/models/IMaillProvider';
import IUsersRepository from '../repositories/IUsersRepository';

interface IResquest {
  email: string;
}
@injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject('UsersRepository') private usersRepository: IUsersRepository,
    @inject('MaillProvider') private maillProvider: IMaillProvider,
  ) {}

  public async execute({ email }: IResquest): Promise<void> {
    this.maillProvider.sendMail(email, 'Foi vai');
  }
}

export default SendForgotPasswordEmailService;
