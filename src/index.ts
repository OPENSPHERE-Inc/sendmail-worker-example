import { EmailMessage } from "cloudflare:email";
import { createMimeMessage, Mailbox } from "mimetext/browser";

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		try {
			const formData = await request.formData();

			const company = formData.get("company");
			const name = String(formData.get("name"));
			const email = String(formData.get("email"));
			const tel = formData.get("tel");
			const message = formData.get("message");

			const textContent = `【会社名】\n${company}\n\n` +
				`【名前】\n${name}\n\n` +
				`【E-Mail】\n${email}\n\n`+
				`【電話番号】\n${tel}\n\n` +
				`【問い合わせ内容】\n${message}\n\n`;

			const mimeMessage = createMimeMessage();
			mimeMessage.setSender(env.SENDER);
			mimeMessage.setRecipient(env.RECIPIENT);
			mimeMessage.setSubject(`お問い合わせがありました ${company}, ${name}`);
			mimeMessage.addMessage({
				contentType: 'text/plain',
				data: textContent
			});
			mimeMessage.setHeader("Reply-To", new Mailbox({ name, addr: email }));

			await env.SEB.send(new EmailMessage(
				env.SENDER.addr,
				env.RECIPIENT.addr,
				mimeMessage.asRaw()
			));

			return new Response("Send mail succeeded.", { status: 200 });

		} catch (e) {
			console.log("An exception occurred.", e);
			return new Response(`Send mail failed.`, { status: 500 });
		}
	}
};
