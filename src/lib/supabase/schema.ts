import {
  pgTable,
  uuid,
  numeric,
  varchar,
  integer,
} from "drizzle-orm/pg-core";

export const students = pgTable("students", {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  name: varchar("name").notNull(),
  totalMarks: numeric("total_marks").notNull(),
  age: integer("age").notNull(),
  grade: varchar("grade").notNull(),
  email: varchar("email").notNull(),
});