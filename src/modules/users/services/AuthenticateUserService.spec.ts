import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUserService: CreateUserService;
let authenticateUserService: AuthenticateUserService;

describe('AutheticateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
    authenticateUserService = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to authenticate', async () => {
    const user = await createUserService.execute({
      name: 'Daniel Neris',
      email: 'daniel@daniel.com',
      password: '123456',
    });

    const response = await authenticateUserService.execute({
      email: 'daniel@daniel.com',
      password: '123456',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should not be able to authenticate with non existing user', async () => {
    await expect(
      authenticateUserService.execute({
        email: 'daniel@daniel.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with wrong password', async () => {
    await createUserService.execute({
      name: 'Daniel Neris',
      email: 'daniel@daniel.com',
      password: '123456',
    });

    await expect(
      authenticateUserService.execute({
        email: 'daniel@daniel.com',
        password: 'wrong-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
