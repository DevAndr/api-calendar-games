import { Test, TestingModule } from '@nestjs/testing';
import { EmailNotifyController } from './email-notify.controller';
import { EmailNotifyService } from './email-notify.service';

describe('EmailNotifyController', () => {
  let emailNotifyController: EmailNotifyController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [EmailNotifyController],
      providers: [EmailNotifyService],
    }).compile();

    emailNotifyController = app.get<EmailNotifyController>(
      EmailNotifyController,
    );
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(emailNotifyController.getHello()).toBe('Hello World!');
    });
  });
});
