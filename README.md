# arc-boilerplate
総合的なウェブ用ボイラープレート


## 注意

babel-nodeを利用するためグローバルにbabelをインストール

```bash
$ npm i -g @babel/core @babel/cli

# yarnを利用する場合
$ yarn global add @babel/core @babel/cli
```

## インストール

`yarn install`  
※インストールには[yarn](https://yarnpkg.com/lang/ja/)を利用する

## タスク

`npm run xxx`もしくは`yarn run xxx`でタスク実行。  
必要なのは下記。

- 保存時にビルド実行：`npm run start`
- ビルド：`npm run build`
- リリース用ビルド：`npm run release`
- サーバ起動(※1)：`npm run serve -s` ※終了時にエラーを表示しないように`-s`が必須
- ユニットテスト：`npm run test`

※1:
phpサーバを利用する場合は、そのサーバ自体を立ち上げてからコマンドを実行する。  