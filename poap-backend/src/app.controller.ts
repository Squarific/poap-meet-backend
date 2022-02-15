import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { recoverPersonalSignature, normalize } from '@metamask/eth-sig-util';

class VerifyResponse {
  correct: boolean;
}

export class VerifySignatureDTO {
  from: string;
  challenge: string;
  signature: string;
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('verifySignature')
  verifySignature(@Body() verifySignatureDTO: VerifySignatureDTO): VerifyResponse {
    try {
      const recoveredAddr = recoverPersonalSignature({
        data: `0x${Buffer.from(verifySignatureDTO.challenge, 'utf8').toString('hex')}`,
        signature: verifySignatureDTO.signature,
      });

      return { correct: recoveredAddr === normalize(verifySignatureDTO.from) };
    } catch (err) {
      return { correct: false };
    }
  }
}
