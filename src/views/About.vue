<template>
  <v-main class="my-3 mx-3 main-pt">
    <v-container>
      <v-row justify="center">
        <v-col cols="12" sm="11" md="10" lg="8">
          <div class="mb-10">
            <h1 class="primary--text mb-4">Vidolleについて</h1>
            <p>YouTube動画のプレイリストを作成して、ノートを登録することができるアプリです。</p>
            <p>主にYouTube動画を見て学習する場合に、役立ちます。</p>
          </div>

          <div class="mb-10">
            <h2 class="primary--text mb-4">ログイン機能</h2>
            <p>プレイリストや登録している動画、ノートの内容が他人に見られないようにログイン機能を備えています。</p>
            <p>ログイン中のデータは、タブを閉じたり、ブラウザを閉じたりなどをしない限りはリロードしても保持される仕組みです。</p>
          </div>

          <div class="mb-10">
            <h2 class="primary--text mb-4">プレイリスト機能</h2>
            <p>ログイン後、まずプレイリストを作成します。</p>
            <p>プレイリストは、動画をまとめるためのフォルダのような役割を果たします。</p>
            <p>プレイリストの名前とその補足情報を登録することができます。</p>
            <p>追加、削除、編集、完了に加えて、いつまでに見るのかという締切日を設定することができます。</p>
          </div>

          <div class="mb-10">
            <h2 class="primary--text mb-4">YouTube検索機能</h2>
            <p>YouTube動画の登録には、URLとタイトルを直接入力して登録するか、アプリ内で検索して登録することができます。</p>
          </div>

          <div class="mb-10">
            <h2 class="primary--text mb-4">YouTube動画管理機能</h2>
            <p>プレイリストごとにYouTube動画を登録することができます。</p>
            <p>登録したYouTube動画についても追加、削除、編集、完了に加えて、いつまでに見るのかという締切日を設定することができます。</p>
          </div>

          <div class="mb-10">
            <h2 class="primary--text mb-4">ノート機能</h2>
            <p>登録した各YouTube動画に対して、ノートを登録することができます。</p>
          </div>

          <div class="mb-10">
            <h2 class="primary--text mb-4">検索機能</h2>
            <p>プレイリスト一覧のページでもYouTube動画一覧のページでも、登録しているタイトルを検索して、マッチしたものだけを表示することができます。</p>
          </div>

          <div class="mb-10">
            <h2 class="primary--text mb-4">ERR_BLOCKED_BY_CLIENTが出る場合</h2>
            <p>コンソールにてERR_BLOCKED_BY_CLIENTとエラーが出る場合で、「adservice.google」と確認できる場合、アドブロック系の拡張機能によるエラーの可能性があります。</p>
            <p>当アプリに広告は入っていないので、あったんアドブロック系の拡張機能を停止してから当アプリをご活用ください。</p>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>

export default {
  name: 'About'
}
</script>

<style lang="sass" scoped>
 .main-pt
   padding-top: 0px !important
</style>