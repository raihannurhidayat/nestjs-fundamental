import {
  Body,
  Controller,
  Get,
  Header,
  HttpCode,
  HttpException,
  HttpRedirectResponse,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Redirect,
  Req,
  Res,
  UseFilters,
  UsePipes,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { UserService } from './user.service';
import { Connection } from './connection/connection';
import { MailService } from './mail/mail.service';
import { UserRepository } from './user-repository/user-repository';
import { MemberService } from './member/member.service';
import { User } from '@prisma/client';
import { ValidationFilter } from 'src/validation/validation.filter';
import {
  LoginUserRequest,
  LoginUserRequestValidation,
} from 'src/model/login.model';
import { ValidationPipe } from 'src/validation/validation.pipe';

@Controller('/api/users')
export class UserController {
  constructor(
    private readonly service: UserService,
    private readonly connection: Connection,
    private readonly mailService: MailService,
    private readonly userRepository: UserRepository,
    @Inject('EmailService') private emailService: MailService,
    private readonly memberService: MemberService,
  ) {}

  @UsePipes(new ValidationPipe(LoginUserRequestValidation))
  @Post('/login')
  login(
    @Query("name") name: string,
    @Body()
    request: LoginUserRequest,
  ) {
    return request.username;
  }

  // request http
  @Post()
  post(): string {
    return 'Post Created';
  }

  @Get('/sayhello')
  // @UseFilters(ValidationFilter)
  sayHelloService(@Query('name') name: string): string {
    return this.service.sayHello(name);
  }

  @Get('/connection')
  async connections(): Promise<string> {
    this.mailService.send();
    this.emailService.send();
    console.log(this.memberService.getConnectionName());
    return this.connection.getName();
  }

  @Get('/create')
  async create(
    @Query('firstName') firstName: string,
    @Query('lastName') lastName: string,
  ): Promise<User> {
    if (!firstName) {
      throw new HttpException(
        {
          code: 400,
          errors: 'Firstname is required',
        },
        400,
      );
    }
    return await this.userRepository.save(firstName, lastName);
  }

  @Get('coba')
  sayCoba(): string {
    return 'hallo';
  }

  @Get('/hello')
  @HttpCode(200)
  async sayHello(
    @Query('name') name: string,
    @Query('age') age: number,
  ): Promise<string> {
    return `Hello ${name || 'guest'} yang umur nya ${age}`;
  }

  @Get('/sample')
  @HttpCode(200)
  get(): string {
    return 'get success';
  }

  @Get('/params/:id')
  getParamsId(@Param('id') id: string): string {
    return `this Id ${id}`;
  }

  // response http
  @Get('/response/sample-response')
  sampleResponse(@Res() response: Response) {
    response.status(200).json({
      message: 'Success to updated',
    });
  }

  @Get('response/sample-response-decorator')
  @Header('Content-Type', 'application/json')
  @HttpCode(200)
  sampleResponseDecorator(): Record<string, string> {
    return {
      data: 'Hello world',
    };
  }

  @Get('/redirect')
  @Redirect()
  redirect(): HttpRedirectResponse {
    return {
      url: '/api/users/sample',
      statusCode: 201,
    };
  }

  // cookie
  @Get('/set-cookie')
  setCookie(@Query('name') name: string, @Res() response: Response) {
    response.cookie('name', name);
    response.status(201).send('Success create cookie');
  }

  @Get('/get-cookie')
  getCookie(@Req() request: Request) {
    return request.cookies['name'];
  }

  // view
  @Get('view/hello')
  viewHello(@Query('name') name: string, @Res() response: Response) {
    response.render('index.html', {
      nama: name,
    });
  }

  // mengambil semua request nya dalam variabel request
  @Get('/:id')
  getId(
    @Req() request: Request,
    @Param('id', ParseIntPipe) id: number,
  ): string {
    console.log(id * 100);
    return `this Id ${request.query.nama}`;
  }
}
