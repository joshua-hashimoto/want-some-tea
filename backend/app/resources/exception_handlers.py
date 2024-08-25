from fastapi import FastAPI, Request, status
from fastapi.responses import JSONResponse


def setup_exception_handlers(app: FastAPI):
    app.add_exception_handler(HttpException, http_exception_handler)
    app.add_exception_handler(BadRequestException, bad_request_exception_handler)
    app.add_exception_handler(DoesNotExistException, does_not_exist_exception_handler)
    app.add_exception_handler(UnauthorizedException, unauthorized_exception_handler)


class HttpException(Exception):
    def __init__(self, message: str, detail: str):
        self.message = message
        self.detail = detail


async def http_exception_handler(request: Request, exc: HttpException):
    return JSONResponse(
        status_code=status.HTTP_400_BAD_REQUEST,
        content={
            "message": exc.message,
            "detail": exc.detail,
        },
    )


class BadRequestException(Exception):
    def __init__(
        self,
        message: str = "Invalid request",
        detail: str = "The data you have sent was invalid",
    ):
        self.message = message
        self.detail = detail


async def bad_request_exception_handler(request: Request, exc: HttpException):
    return JSONResponse(
        status_code=status.HTTP_400_BAD_REQUEST,
        content={
            "message": exc.message,
            "detail": exc.detail,
        },
    )


class DoesNotExistException(Exception):
    def __init__(self, type):
        self.type = type


async def does_not_exist_exception_handler(
    request: Request, exc: DoesNotExistException
):
    return JSONResponse(
        status_code=status.HTTP_404_NOT_FOUND,
        content={
            "message": "data does not exist.",
            "detail": f"{exc.type} with the given id does not exist.",
        },
    )


class UnauthorizedException(Exception):
    pass


async def unauthorized_exception_handler(request: Request, exc: DoesNotExistException):
    return JSONResponse(
        status_code=status.HTTP_401_UNAUTHORIZED,
        content={
            "message": "data does not exist.",
            "detail": "Incorrect username or password.",
        },
        headers={"WWW-Authenticate": "Bearer"},
    )
