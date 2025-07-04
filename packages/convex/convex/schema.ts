import { defineSchema } from "convex/server";

import { linkedAccountsTable } from "./tables/linkedAccounts";
import { sessionsTable } from "./tables/sessions";
import { usersTable } from "./tables/user";

export default defineSchema({
  users: usersTable,
  linkedAccounts: linkedAccountsTable,
  sessions: sessionsTable,
});
