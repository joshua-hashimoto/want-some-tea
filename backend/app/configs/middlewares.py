from fastapi import FastAPI, Request, status
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import ValidationError

from app.configs.settings import get_settings
from app.resources.exception_handlers import (
    BadRequestException,
    UnauthorizedException,
    UnprocessableException,
)
from app.resources.logger import get_logger

settings = get_settings()

logger = get_logger()


def setup_middleware(app: FastAPI):
    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.allow_origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    @app.middleware("http")
    async def unified_api_error(request: Request, call_next):
        try:
            response = await call_next(request)
            if response.status_code == status.HTTP_401_UNAUTHORIZED:
                unauthorized_exception = UnauthorizedException()
                return JSONResponse(
                    status_code=unauthorized_exception.status_code,
                    content={"detail": unauthorized_exception.detail},
                )
            return response
        except RequestValidationError as request_validation_err:
            logger.error(request_validation_err)
            exception = BadRequestException()
            return JSONResponse(
                status_code=exception.status_code, content={"detail": exception.detail}
            )
        except ValidationError as validation_error:
            logger.error(validation_error)
            exception = UnprocessableException()
            return JSONResponse(
                status_code=exception.status_code,
                content={"detail": exception.detail},
            )
        except Exception as err:
            logger.error(err)
            exception = BadRequestException()
            return JSONResponse(
                status_code=exception.status_code, content={"detail": exception.detail}
            )
