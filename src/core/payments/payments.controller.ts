import { Body, Controller, Get, Post } from '@nestjs/common';
import { PaymentsService } from './payments.service';
@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}
  @Get('plans')
  getPlans() {
    return this.paymentsService.getPlans();
  }

  @Post('intent')
  createIntent(@Body() body: { plan: string; user: string }) {
    return this.paymentsService.createIntent(body.plan, body.user);
  }
}
