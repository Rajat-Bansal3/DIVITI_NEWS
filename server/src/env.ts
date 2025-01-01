import z from "zod";

const envSchema = z.object({
	NODE_ENV: z.enum(["DEVELOPMENT", "PRODUCTION", "TESTING"]).default("DEVELOPMENT"),
	PORT: z.coerce.number().default(3000),
	MONGO_URI: z.string().nonempty("MONGO_URI is required."),
	SALT: z.coerce.number().default(10),
	JWT_SECRET: z.string().nonempty("JWT_SECRETE cant be empty"),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
	console.error("❌ Invalid environment configuration:", parsedEnv.error.format());
	throw new Error("Environment validation failed. Please check your .env file.");
}

export const env = parsedEnv.data;
