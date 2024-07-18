import { Injectable } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { Connection } from '../connection/connection';
import { MailService } from '../mail/mail.service';

@Injectable()
export class MemberService {
  constructor(private readonly moduleRed: ModuleRef) {}

  getConnectionName() {
    const connection = this.moduleRed.get(Connection);
    return connection.getName();
  }

  sendEmail() {
    const mailService = this.moduleRed.get(MailService);
    return mailService.send();
  }
}
