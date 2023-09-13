import {SetMetadata} from '@nestjs/common';
import {IS_PUBLIC_KEY} from '@server/decorators/constants';

export const PublicDecorator = () => SetMetadata(IS_PUBLIC_KEY, true);
