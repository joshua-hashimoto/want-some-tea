from functools import lru_cache

from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    application_name: str
    environment: str
    secret_key: str
    debug: int
    allowed_list: str
    log_level: str

    @property
    def allow_origins(self) -> list[str]:
        return self.allowed_list.split(",")


@lru_cache
def get_settings():
    return Settings()
