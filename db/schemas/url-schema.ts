import {
  pgTable,
  uuid,
  varchar,
  text,
  timestamp,
  integer,
  boolean,
} from "drizzle-orm/pg-core";
import { user } from "@/db/schemas/better-auth-schema"; // adjust to your actual users table

export const urlTable = pgTable(
  "urls",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),

    slug: varchar("slug", { length: 50 }).notNull().unique(),

    destinationUrl: text("destination_url").notNull(),

    clickCount: integer("click_count").default(0).notNull(),

    isActive: boolean("is_active").default(true).notNull(),

    expiresAt: timestamp("expires_at"),

    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  // },
  // (table) => [
  //   // dashboard: "my links, newest first"
  //   index("urls_user_created_idx").on(table.userId, table.createdAt),
  // ],
);

// export const clicks = pgTable(
//   "clicks",
//   {
//     id: uuid("id").defaultRandom().primaryKey(),

//     urlId: uuid("url_id")
//       .notNull()
//       .references(() => urlTable.id, { onDelete: "cascade" }),

//     ipAddress: varchar("ip_address", { length: 45 }),

//     country: varchar("country", { length: 100 }),
//     city: varchar("city", { length: 100 }),
//     browser: varchar("browser", { length: 100 }),
//     os: varchar("os", { length: 100 }),
//     device: varchar("device", { length: 100 }),

//     referrer: text("referrer"),

//     clickedAt: timestamp("clicked_at").defaultNow().notNull(),
//   },
//   (table) => [
//     // "clicks for this URL, most recent first"
//     index("clicks_url_clicked_idx").on(table.urlId, table.clickedAt),
//   ],
// );
