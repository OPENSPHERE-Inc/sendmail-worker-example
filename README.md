# Cloudflare メール送信 Worker サンプルコード

本リポジトリは OPENSPHERE Inc. blog 記事 [Cloudflare フリープランだけでメールフォームを実装する方法](https://blog.opensphere.co.jp/posts/cloudflare001) のサンプルコードです。

## 必要環境

- Node.js v18.20.3
- yarn v4.2.2

## デプロイ

まず、リポジトリをクローンしたら `yarn` を実行してください。

次に、`wrangler.toml` を編集して下さい。

```toml
name = "sendmail-worker-example"
main = "src/index.ts"
compatibility_date = "2024-06-05"
compatibility_flags = ["nodejs_compat"]
workers_dev = false

send_email = [
	{ name = "SEB" },
]

[vars]
SENDER = { name = "Contact Mail Sender", addr = "sender@example.jp" }
RECIPIENT = { name = "Contact Mail Recipient", addr = "recipient@example.jp" }
```

- `name = "sendmail-worker-example"` - Worker 名を書き換えてください
- `SENDER = { name = "Contact Mail Sender", addr = "sender@example.jp" }` - 送信元情報を書き換えてください。
- `RECIPIENT = { name = "Contact Mail Recipient", addr = "recipient@example.jp" }` - 宛先情報を書き換えてください。

wrangler で Cloudflare にログインしてください。

```shell
$ npx wrangler login
```

準備が出来たら、次のコマンドで Cloudflare Workers にデプロイ可能です。

```shell
$ yarn deploy
```

## その他

内容に不備などあれば issue までお知らせください。
