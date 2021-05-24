<template>
  <div class="ma-7">
    <v-container>
      <v-row>
        <v-col>
          <h1 class="primary--text mb-4">Vidolleについて</h1>
          <p>YouTube動画のプレイリストを作成して、ノートを登録することができるアプリです。</p>
          <p>主にYouTube動画を見て学習する場合に、役立ちます。</p>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <h2 class="primary--text mb-4">ログイン機能</h2>
          <p>プレイリストや登録している動画、ノートの内容が他人に見られないようにログイン機能を備えています。</p>
          <p>ログイン中のデータは、タブを閉じたり、ブラウザを閉じたりなどをしない限りはリロードしても保持される仕組みです。</p>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <h2 class="primary--text mb-4">プレイリスト機能</h2>
          <p>ログイン後、まずプレイリストを作成します。</p>
          <p>プレイリストは、動画をまとめるためのフォルダのような役割を果たします。</p>
          <p>プレイリストの名前とその補足情報を登録することができます。</p>
          <p>追加、削除、編集、完了に加えて、いつまでに見るのかという締切日を設定することができます。</p>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <h2 class="primary--text mb-4">YouTube動画管理機能</h2>
          <p>プレイリストごとにYouTube動画を登録することができます。</p>
          <p>YouTube動画の登録には、URLとタイトルを直接入力して登録するか、アプリ内で検索して登録することができます。</p>
          <p>登録したYouTube動画についても追加、削除、編集、完了に加えて、いつまでに見るのかという締切日を設定することができます。</p>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <h2 class="primary--text mb-4">ノート機能</h2>
          <p>登録した各YouTube動画に対して、ノートを登録することができます。</p>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <h2 class="primary--text mb-4">検索機能</h2>
          <p>プレイリスト一覧のページでもYouTube動画一覧のページでも、登録しているタイトルを検索して、マッチしたものだけを表示することができます。</p>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>

export default {
  name: 'About'
}
</script>
