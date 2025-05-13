import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import { error } from "console";
import { ZodError } from "zod";

@Catch(ZodError, HttpException)
export class ErrorFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        const response = host.switchToHttp().getResponse();
        if (exception instanceof ZodError) {
            response.status(400).json({
                status: 400,
                message: exception.errors.map((issue) =>
                    `${issue.path}.${issue.message}`
                ),
            });
        }else if (exception instanceof HttpException) {
            response.status(exception.getStatus()).json({
                errors: exception.getStatus(),
                message: exception.message,
            });
        } else {
            response.status(500).json({
                errors: exception.message,
            });
        }
    }
}