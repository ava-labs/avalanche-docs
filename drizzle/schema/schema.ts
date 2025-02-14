import { HackathonActivity, Partner, Track } from '@/types/hackathons';
import { sql } from 'drizzle-orm';
import { date, integer, jsonb, pgTable, text, varchar } from 'drizzle-orm/pg-core';
export const hackathons = pgTable("hackathons", {
    id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
    title: varchar("title", { length: 255 }).notNull(),
    description: text("description").notNull(),
    date: date("date").notNull(),
    location: varchar("location", { length: 255 }).notNull(),
    total_prizes: integer("total_prizes"),
    tags: jsonb("tags").$type<string[]>(),
    status: varchar("status", { length: 50 }).notNull(),
    registration_deadline: date("registration_deadline").notNull(),
    address: varchar("address", { length: 255 }),
    agenda: jsonb("agenda").$type<HackathonActivity[]>(),
    partners: jsonb("partners").$type<Partner[]>(),
    tracks: jsonb("tracks").$type<Track[]>(),
  });
  