import { container } from 'tsyringe';

import IStorageProvider from './StorageProvider/models/IStorageProvider';
import DiskStorageProvider from './StorageProvider/implementations/DiskStorageProvider';

// import IMaillProvider from './MailProvider/models/IMaillProvider';
// import DiskStorageProvider from './MailProvider/implementations';

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DiskStorageProvider,
);
// container.registerSingleton<IMaillProvider>(
//   'StorageProvider',
//   DiskStorageProvider,
// );
