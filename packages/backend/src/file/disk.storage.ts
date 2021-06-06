import * as multer from 'multer';
import { Config } from '../config';
import { randomUUID } from 'crypto';

export const DiskStorage = multer.diskStorage({
  destination(
    req,
    file,
    callback: (error: Error, destination: string) => void,
  ) {
    callback(null, Config.files.rootDirectory);
  },
  filename(
    req,
    file,
    callback: (error: Error | null, filename: string) => void,
  ) {
    callback(null, randomUUID());
  },
});
