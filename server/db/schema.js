import { pgTable, text, timestamp, pgEnum } from "drizzle-orm/pg-core";

export const organizationStatusEnum = pgEnum("organization_status", ["active", "expired"]);

export const organizations = pgTable("organizations", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  logoUrl: text("logo_url"),
  website: text("website_url"),
  industry: text("industry"),
  company_size: text("company_size"),
  description: text("description"),
  status: organizationStatusEnum("status").notNull().default("active"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
