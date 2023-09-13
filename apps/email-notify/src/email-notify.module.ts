import {Module} from '@nestjs/common';
import {EmailNotifyController} from './email-notify.controller';
import {EmailNotifyService} from './email-notify.service';

@Module({
    imports: [],
    controllers: [EmailNotifyController],
    providers: [EmailNotifyService],
})
export class EmailNotifyModule {
}
