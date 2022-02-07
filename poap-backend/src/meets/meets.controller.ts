import { Controller, Get } from '@nestjs/common';

@Controller('meets')
export class MeetsController {
    @Get()
    friends(): string {
        return 'This action returns all met friends';
    }
}
