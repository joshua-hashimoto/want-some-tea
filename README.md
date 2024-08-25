# want-some-tea

## プロジェクトのゴール

- アプリケーションを1から作成する
- 一部機能は実装しないことで勉強会後に自主学習で実装する余地を作る
  - これに必要な機能は実装する
- 古今のスタンダードになりつつあるパッケージを使用してアプリケーションを作成する
- UTの実装方法や考え方を習得する

## Tech Stack

- [Docker](https://www.docker.com/ja-jp/)
- [Nginx](https://nginx.org)
- [pnpm](https://pnpm.io)
- [Vite](https://ja.vitejs.dev)
- [Vitest](https://vitest.dev)
- [Ant Design](https://ant.design)
- [FastAPI](https://fastapi.tiangolo.com)
- [TortoiseORM](https://tortoise.github.io)

## Technical Memo

### packageを追加した場合

このプロジェクトではDockerを使用しています。dockerのキャッシュが重くならないようにDockerビルドした際にその時点の`node_modules`をコピーして、それ以降はサイドビルドがない場合はその`node_modules`を使用し続けます。これによりパフォーマンスは上がりますが、packageを追加した場合は再度ビルドしないとそれが反映されないという問題があります。新しいpackageを入れた場合は再度ビルドを走らせてください。

```console
docker compose up -d --build
```

`--build`でdocker composeを起動する前にDockerをビルドします。

### 認証の考え方について

このプロジェクトでは、認証トークンは**Cookie**を使っている。

このCookieに入ってる認証にはHttpOnlyが設定されているため、JavaScriptからは確認できない。

ではFEではユーザーが認証しているかどうかをどのように制御するか？

結論: **しない**

基本的にユーザーがリクエストしたリソースの呼び出しを行う。

例えば、ユーザーが直接 `/profile`という画面上のリソースにアクセスしたとする。

この時、FEとしてはこのユーザーがログインしているかどうかは関心ごとではない。

この画面にアクセスした際にAPIが呼び出され、このAPI呼び出しが初めてユーザーが認証しているかに対して関心が出る。

もしこの時ユーザーが認証済みであれば(Cookieにトークンが入っていれば)そのままAPIからデータを取得して画面に表示する。

もしユーザーが認証していなければ(Cookieにトークンが入っていなければ)この時に認証エラーがAPIから返ってくる。FEはもしAPIが認証エラーを出した場合、ユーザーをログイン画面に強制遷移させる。

こうすることで

- 認証なしでアクセスできないリソースにユーザーはアクセスできない
- FEは認証を気にしなくて良い
- SessionStorage、LocalStorageにトークンが含まれない
- CookieはHttpOnlyなのでJavaScriptからアクセスできず、セキュリティが向上する
- 認証の責務がBEになるので、認証による制限をかけやすい

## docker-compose.yml

```yml
networks:
  dev:
    driver: bridge

services:
  nginx:
    restart: always
    build:
      dockerfile: Dockerfile.dev
      context: ./nginx
    ports:
      - 5176:80
    volumes:
      - ./nginx:/etc/nginx/conf.d/
    depends_on:
      - client
  client:
    build:
      dockerfile: Dockerfile.dev
      context: ./frontend
    environment:
      - VITE_API_URL=http://localhost:5176
    volumes:
      - /app/node_modules # container内のnode_modulesを使用
      - ./frontend:/app
    expose:
      - 5173
    stdin_open: true
  backend:
    build:
      dockerfile: Dockerfile.dev
      context: ./backend
    command: uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
    environment:
      APPLICATION_NAME: want-some-tea
      ENVIRONMENT: development
      SECRET_KEY: 
      DEBUG: 1
      ALLOWED_LIST: localhost
    volumes:
      - ./backend:/app
    ports:
      - 8000:8000
    depends_on:
      - db
  db:
    image: postgres:11
    volumes:
      - postgres_data:/var/lib/postgresql/data/
    environment:
      POSTGRES_HOST_AUTH_METHOD: trust
      POSTGRES_USER: want-some-tea
      POSTGRES_PASSWORD: want-some-tea
      POSTGRES_DB: want-some-tea

volumes:
  postgres_data:
```
