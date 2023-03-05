# React App on GitHub Pages

フロントエンドフレームワーク(React)を利用して開発したアプリケーションを GitHub Pages で公開するサンプル


## Overview

React に代表されるフロントエンドフレームワークを利用して作ったアプリケーションは静的コンテンツとしてビルドできるので、理論上は GitHub Pages で公開して動かすことが可能である（認証サーバーや API サーバーなどは別として）。

だが実際にはいくつかの課題がある：

- GitHub Pages で公開するウェブコンテンツはコンテンツルートが `/` ではなく `/リポジトリ名` となる。その前提でアプリケーションが作られている必要がある

- 上の問題に絡んで、React アプリケーションのルーティングに React Router が使われている場合は、その部分を考慮した上でパス設定を対応させる必要がある

- 同 React アプリケーションに限らないが、開発中は localhost を使って動作確認を行い、出来上がったものが GitHub Pages で公開されることになる。この２つの環境で同じように動作する必要がある。

これらの問題点を解決するサンプルとして公開する。


## Contents

このサンプルは以下２つの内容を含む：

- GitHub Pages 対応する前の React アプリケーション

  - リポジトリ内の `v0.1` タグを付けたもの

    - ソースコードクローン( `$ git clone https://github.com/dotnsf/react-on-ghpages` )後にチェックアウトする場合は `$ git checkout refs/tags/v0.1`

    - これだけをクローンする場合は `$ git clone --depth 1 --branch v0.1 https://github.com/dotnsf/react-on-ghpages`

  - GitHub Pages 対応を意識せずに作った React アプリケーション

  - `/`, `/a`, `/b` という３つのパスで、それぞれ `Page0`, `PageA`, `PageB` の３つの画面を切り替えることができる

    - このパスの切替に `react-router-dom` パッケージ内の React Router(`BrowserRouter`, `Routes`, `Route`) を使っている

    - `src/App.js` 参照

- GitHub Pages 対応した後の React アプリケーション

  - リポジトリ内の `v0.2` タグを付けたもの（これがメイン）

    - ソースコードクローン( `$ git clone https://github.com/dotnsf/react-on-ghpages` )で取得できるもの

  - 上述の React アプリケーションを GitHub Pages にデプロイしても動くよう改良したもの

    - localhost でも同様に動く


## How to use

### GitHub Pages 対応する前の React アプリケーション

- ソースコードを入手（以下２通りのいずれか）

  - ソースコード全体を取得後、タグを切り替える場合

    - `$ git clone https://github.com/dotnsf/react-on-ghpages`

    - `$ cd react-on-ghpages`

    - `$ git checkout refs/tags/v0.1`

  - 対象の（ `v0.1` タグの）ソースコードだけを取得する場合

    - `$ git clone --depth 1 --branch v0.1 https://github.com/dotnsf/react-on-ghpages`

    - `$ cd react-on-ghpages`

- localhost で実行

  - `$ npm install`

  - `$ npm run start`

  - ブラウザで `http://localhost:3000` にアクセス

- この時点では `build/` フォルダを GitHub Pages としてデプロイしても正しく動かない

  - ファイルパスがおかしい

  - そもそも `build/` フォルダは `.gitignore` で指定されているので、登録が面倒


### GitHub Pages 対応した後の React アプリケーション

- ソースコードを入手

  - `$ git clone https://github.com/dotnsf/react-on-ghpages`

  - `$ cd react-on-ghpages`

- `package.json` の 21 行目、`PUBLIC_URL=` の値を自分が GitHub Pages で動かす際の URL パスに変更する

  - 例えば GitHub Pages の URL が `https://xxxx.github.io/react-on-ghpages` （`xxxx` は GitHub ユーザー名）の場合であれば `PUBLIC_URL=/react-on-ghpages` とする

- localhost で実行

  - `$ npm install`

  - `$ npm run start`

  - ブラウザで `http://localhost:3000` にアクセス


### Build & Deploy to GitHub Pages

- GitHub Pages 対応済みブランチをビルドする
  
  - （念のため）`$ git checkout main`

  - `$ npm run build`

- ビルドした GitHub Pages 対応済みブランチを GitHub Pages にデプロイする

  - `$ npm run deploy`

- GitHub Pages 上で実行

  - 例えば上述と同じ場合の条件であれば、ブラウザで `https://xxxx.github.io/react-on-ghpages` にアクセス


## Key implementations

- `package.json` の `build` スクリプト内で環境変数(`PUBLIC_URL`)を指定してビルドしている（ここで単に localhost で実行する時と GitHub Pages 上にデプロイして実行する時とで異なる挙動になるのを実現している）

- `src/App.js` 内のルーティングのパスに上記環境変数 `PUBLIC_URL` を使ってパスを指定するようにしている

  - 例: \<Route path={\`${process.env.PUBLIC_URL}/a\`} element={\<PageA /\>} /\>

    - 環境変数 `PUBLIC_URL=/react-on-ghpages` が指定されている場合、path の値は `/react-on-ghpages/a` になる（GitHub Pages で動かす場合）
    - 環境変数 `PUBLIC_URL` が指定されていない場合、path の値は `/a` になる（localhost で動かす場合）

- 同様に `src/pages/Page0.js`, `src/pages/PageA.js`, `src/pages/PageB.js` でも互いのページに行き来する時の行先パスに環境変数 `PUBLIC_URL` を参照するように変更

- `package.json` に `postbuild` スクリプトを用意し、ビルドの最後に `build/index.html` を `build/404.html` にコピーしている。GitHub Pages だとトップページ以外のページの URL が変わるため、そのままだと 404 エラーが発生してしまう。404 エラーと判定されても、正しいページ内容が表示されるよう `404.html` 側を `index.html` で上書きする形で対応

  - これらにより `$ npm run build` を実行すると GitHub Pages 用の環境変数が設定された状態でビルドされる

  - ビルドではなく（ビルド前でもビルド後でも） `$ npm run start` を実行した場合は環境変数が設定されず、そのまま localhost で実行される **（２つの環境向けに使い分けできる形が実現できている）**

- `package.json` に `deploy` スクリプトを用意し、環境変数 `PUBLIC_URL` が設定された状態（つまり GitHub Pages 向けにビルドした状態）のビルド結果を GitHub Pages に push できるよう準備

  - `$ npm run deploy` で GitHub Pages 向けにビルドしてデプロイできる



## References

- [めっちゃ簡単！GitHub Pagesに Reactアプリを公開する方法](https://www.sukerou.com/2022/03/github-pages-react.html)


## Copyright

2023 [K.Kimura @ Juge.Me](https://github.com/dotnsf) all rights reserved.
