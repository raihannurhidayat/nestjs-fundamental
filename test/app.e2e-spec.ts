import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('should can coba', () => {
    return request(app.getHttpServer()).get('/api/users/coba').expect('hallo');
  });

  it('should can say hello', () => {
    // const result = request(app.getHttpServer()).get('/api/users/sample');

    // expect(result).toBe('get success');
    return request(app.getHttpServer())
      .get('/api/users/sample')
      .expect(200)
      .expect('get success');
  });

  it('should can say hello', async () => {
    const result = await request(app.getHttpServer())
      .get('/api/users/hello')
      .query({
        name: 'raihan',
        age: 12,
      });

    expect(result.status).toBe(200);
    expect(result.text).toBe('Hello raihan yang umur nya 12');
  });
});
