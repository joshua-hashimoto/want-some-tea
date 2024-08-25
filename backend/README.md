# Want Some Tea? API

## 目次

- [Want Some Tea? API](#want-some-tea-api)
  - [目次](#目次)
  - [Dev Note](#dev-note)
    - [FastAPIの認証の流れについて](#fastapiの認証の流れについて)

## Dev Note

### FastAPIの認証の流れについて

FastAPIの認証は、慣れれば問題ないが慣れるまではその手順について混乱しやすい。
そのため、このメモを作成する。

まず、認証を必要とするエンドポイント `/users/me`が存在するとする。

この`/users/me`には、FastAPIのDependencyが設定されている。

```python
@app.get("/users/me")
async def read_users_me(
    current_user: Annotated[User, Depends(get_current_active_user)],
):
    return current_user
```

※このDependsはAnnotatedを使って宣言されている。意味は`current_user: User = Depends(get_current_active_user)`と同じ

このDependsを見に行くと、以下のようになっているとする。

```python
async def get_current_active_user(token: Annotated[str, Depends(oauth2_scheme)]):
    user = fake_decode_token(token)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return user
```

このDependsも、`oauth2_scheme`をDependsとして持っている。
この`oauth2_scheme`はOAuth2の仕様に則るように以下のように設定されている。

```python
from fastapi.security import OAuth2PasswordBearer

oauth2_scheme = OAuth2PasswordBearer(tokenUrl=f"token")
```

ここからが混乱するところ。
まず、ユーザーをログインさせるためのエンドポイントを用意する。

```python
@router.post("/token")
async def login(form_data: Annotated[OAuth2PasswordRequestForm, Depends()]):
    user_dict = fake_users_db.get(form_data.username)
    if not user_dict:
        raise HTTPException(status_code=400, detail="Incorrect username or password")
    user = UserInDB(**user_dict)
    hashed_password = fake_hash_password(form_data.password)
    if not hashed_password == user.hashed_password:
        raise HTTPException(status_code=400, detail="Incorrect username or password")

    return {"access_token": user.username, "token_type": "bearer"}
```

このエンドポイントはユーザーのログインとトークンの発行を担当する。
ユーザーはこのエンドポイントを使用することができる。

このエンドポイントが`oauth2_scheme`の`tokenUrl`に設定される。

`get_current_active_user`をDependsに持ってるエンドポイントにユーザーがアクセスすると、Dependsを登っていって、`oauth2_scheme`に辿り着く。
`oauth2_scheme`は送信されているトークンを取得し、トークンを返却する。
このトークンを`get_current_active_user`が受け取る。`get_current_active_user`は受け取ったトークンを使い認証を行う。
もしユーザーが不正な場合は`get_current_active_user`がエラーを返却する。
なので、`get_current_active_user`をDependsにしてるエンドポイントは認証がないとアクセスできないようになる。

逆に、認証が通った場合は`get_current_active_user`はユーザー情報を元のエンドポイントに返却する。
この情報を使うこともできるし、できなくても認証は通ったので正式なリクエストと言える。

流れは以下の通り。

```console
get_current_active_userがDependsに設定されているエンドポイントを実行
↓
get_current_active_user
↓
oauth2_scheme
↓
oauth2_schemeに設定されているエンドポイントを実行
※この時、APIとして実行されない = HTTP通信は発生しない
↓
oauth2_schemeに設定されているエンドポイントからトークンを返却
※OAuth2の仕様により、access_tokenに設定された値がDependsに返却される
↓
get_current_active_userはトークンを受け取り、これを使ってユーザーを取得する
↓
Dependsを呼び出したエンドポイントはget_current_active_userの返却値を受け取る
↓
Dependsを呼び出したエンドポイントはoauth2_schemeの実行を通ったことにより認証を通過する
```

これをさらに概念的に変換すると、

```console
認証がDependsに設定されているエンドポイントを実行
↓
Dependsに設定されている認証を実行(この例ではOAuth2PasswordBearer)
↓
認証を行い、問題なければトークンを返却
↓
エンドポイントの処理の実行が開始される
```
