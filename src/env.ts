import { validateEnv } from "#base";
import { z } from "zod";

export const env = validateEnv(z.object({
    BOT_TOKEN: z.string("Discord Bot Token is required").min(1),
    ROBLOX_COOKIE: z.string("Roblox Bot Token is required").min(1),
    WEBHOOK_LOGS_URL: z.url().optional(),
    GUILD_ID: z.string().optional(),
    FIREBASE_PATH: z.string("Firebase account path is required").min(1)
}));