from fastapi import FastAPI

from app.configs.database import lifespan
from app.configs.middlewares import setup_middleware

from .auth import setup_auth
from .rooms import setup_rooms
from .users import setup_users

"""NOTE
Docker + Nginxを使っていてかつ、FastAPI内部のルーティングとNginxのバックエンドへの
ルーティングに差分がある場合、そのままでは/docsを開いてもドキュメントにアクセスできない。
この問題を解決する場合、root_pathをNginxのルーティングと合わせて設定すると良い。
"""
app = FastAPI(
    docs_url="/docs",
    redoc_url="/redoc",
    openapi_url="/openapi.json",
    root_path="/api/v1",
    lifespan=lifespan,
)

setup_middleware(app)
setup_auth(app)
setup_users(app)
setup_rooms(app)
