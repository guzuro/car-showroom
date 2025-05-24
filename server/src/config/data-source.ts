import "reflect-metadata";
import { DataSource } from "typeorm";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";
import dotenv from "dotenv";
dotenv.config();

const postgresConfig: PostgresConnectionOptions = {
  type: "postgres",
  host: process.env.POSTGRES_HOST,
  port: +process.env.POSTGRES_PORT!,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_NAME,
};

export const AppDataSource = new DataSource({
  ...postgresConfig,
  synchronize: true,
  logging: false,
  entities: ["../**/*.entity.{js,ts}"],
  migrations: ["src/migrations/**/*{.ts,.js}"],
});
