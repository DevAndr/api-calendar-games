import { SetMetadata } from '@nestjs/common';
import { IS_PUBLIC_KEY } from '@server/decorators/constants';

export const Private = () => SetMetadata(IS_PUBLIC_KEY, false);
