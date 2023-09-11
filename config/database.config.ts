import { registerAs } from "@nestjs/config";

export default registerAs('database', () => ({
  port: process.env.DATABASE_PORT || 5432,
  host: process.env.DATABASE_HOST,
}));