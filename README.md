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
