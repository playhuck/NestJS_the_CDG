import { Body, Controller, Get, Param, Post } from '@nestjs/common';

@Controller('messages')
export class MessagesController {
  @Post('')
  async postMessages(@Body() body: any) {
    console.log(body);
  }

  @Get('')
  async getMessages(@Body() body: any) {
    console.log(body);
  }

  @Get('/:id')
  async getMessageById(@Param('id') id: any) {
    console.log(id);
  }
}
