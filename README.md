# vidolleについて

YouTube動画のプレイリストを作成して、ノートを登録することができるWebアプリです。

主にYouTube動画を見て学習する場合に、役立ちます。  

## 機能面について

### ログイン機能
プレイリストや登録している動画、ノートの内容が他人に見られないようにログイン機能を備えています。

ログイン中のデータは、タブを閉じたり、ブラウザを閉じたりなどをしない限りはリロードしても保持される仕組みです。  

### プレイリスト機能
ログイン後、まずプレイリストを作成します。

プレイリストは、動画をまとめるためのフォルダのような役割を果たします。

プレイリストの名前とその補足情報を登録することができます。

追加、削除、編集、完了に加えて、いつまでに見るのかという締切日を設定することができます。  
  

### YouTube検索機能
YouTube動画の登録には、URLとタイトルを直接入力して登録するか、アプリ内で検索して登録することができます。  

### YouTube動画管理機能
プレイリストごとにYouTube動画を登録することができます。

登録したYouTube動画についても追加、削除、編集、完了に加えて、いつまでに見るのかという締切日を設定することができます。  

### ノート機能
登録した各YouTube動画に対して、ノートを登録することができます。  

### 検索機能
プレイリスト一覧のページでもYouTube動画一覧のページでも、登録しているタイトルを検索して、マッチしたものだけを表示することができます。  

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
