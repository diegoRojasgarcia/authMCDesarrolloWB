import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    if (status === HttpStatus.BAD_REQUEST) {
      const res: any = exception.getResponse();
      return { status, error: res.message };
    }
    response.status(status).json({
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
