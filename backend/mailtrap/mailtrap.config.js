import { MailtrapClient } from "mailtrap";
import dotenv from "dotenv";
dotenv.config();

const TOKEN = process.env.MAILTRAP_TOKEN;
const ENDPOINT = process.env.MAILTRAP_ENDPOINT;
//endpoint
export const mailtrapClient = new MailtrapClient({
    endpoint: process.env.MAILTRAP_ENDPOINT,
    token: process.env.MAILTRAP_TOKEN
});

export const sender = {
  email: "mailtrap@demomailtrap.com",
  name: "CHAT IIITA",
};
