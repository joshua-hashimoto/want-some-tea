import logging

from app.configs.settings import get_settings

settings = get_settings()


LOGGING = {
    "version": 1,
    "disable_existing_loggers": False,
    "formatters": {
        "application": {
            "format": "[%(levelname)s] %(asctime)s "
            "%(message)s %(funcName)s "
            "%(pathname)s:%(lineno)d "
        },
    },
    "handlers": {
        "stream": {
            "level": settings.log_level,
            "class": "logging.StreamHandler",
            "formatter": "application",
        },
    },
    "loggers": {
        "": {
            "handlers": ["stream"],
            "level": settings.log_level,
            "propagate": False,
        },
    },
}


def get_logger() -> logging.Logger:
    logging.config.dictConfig(LOGGING)
    logger = logging.getLogger(__name__)
    return logger
