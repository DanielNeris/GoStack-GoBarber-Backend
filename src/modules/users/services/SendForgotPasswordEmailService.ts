import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
// import User from '../infra/typeorm/entities/User';
import IMaillProvider from '@shared/container/providers/MailProvider/models/IMaillProvider';
import IUsersRepository from '../repositories/IUsersRepository';
import IUserTokensRepository from '../repositories/IUserTokensRepository';

interface IResquest {
  email: string;
}
@injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject('UsersRepository') private usersRepository: IUsersRepository,
    @inject('MaillProvider') private maillProvider: IMaillProvider,
    @inject('userTokensRepository')
    private userTokensRepository: IUserTokensRepository,
  ) {}

  public async execute({ email }: IResquest): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('User does not .');
    }

    await this.userTokensRepository.generate(user.id);

    this.maillProvider.sendMail(email, 'Pedido de recupeção de senha falhou');
  }
}

export default SendForgotPasswordEmailService;
