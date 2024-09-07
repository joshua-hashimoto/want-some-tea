from fastapi import FastAPI, HTTPException, Request, status


def setup_exception_handlers(app: FastAPI):
    app.add_exception_handler(ApiError, api_error_handler)


class ApiError(Exception):
    status_code: int = status.HTTP_404_NOT_FOUND
    detail: str = "エラーが発生しました"

    def __init__(self, detail: str | None = None) -> None:
        self.detail = detail if detail is not None else self.detail


class BadRequestException(ApiError):
    status_code: int = status.HTTP_400_BAD_REQUEST
    detail: str = "エラーが発生しました"


class UnauthorizedException(ApiError):
    status_code = status.HTTP_401_UNAUTHORIZED
    detail = "認証に失敗しました"


class UnprocessableException(ApiError):
    status_code = status.HTTP_422_UNPROCESSABLE_ENTITY
    detail: str = "処理を実行できませんでした"


class DoesNotExistException(ApiError):
    status_code: int = status.HTTP_400_BAD_REQUEST
    detail: str = "リクエストしたデータは存在しません"


async def api_error_handler(request: Request, err: ApiError):
    raise HTTPException(status_code=err.status_code, detail=err.detail)
