import {Module} from '@nestjs/common';
import {CoreService} from './core.service';
import {ConfigModule, ConfigService} from "@nestjs/config";
import config from "@app/core/config";

@Module({
    imports: [
        ConfigModule.forRoot({load: [config]}),
    ],
    providers: [CoreService, ConfigService],
    exports: [CoreService],
})
export class CoreModule {
}
