/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as events from "../events.js";
import type * as nextjs from "../nextjs.js";
import type * as react from "../react.js";
import type * as storage from "../storage.js";
import type * as tables_eventCommunications from "../tables/eventCommunications.js";
import type * as tables_events from "../tables/events.js";
import type * as tables_linkedAccounts from "../tables/linkedAccounts.js";
import type * as tables_organizationMembers from "../tables/organizationMembers.js";
import type * as tables_organizations from "../tables/organizations.js";
import type * as tables_registrations from "../tables/registrations.js";
import type * as tables_sessions from "../tables/sessions.js";
import type * as tables_user from "../tables/user.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  events: typeof events;
  nextjs: typeof nextjs;
  react: typeof react;
  storage: typeof storage;
  "tables/eventCommunications": typeof tables_eventCommunications;
  "tables/events": typeof tables_events;
  "tables/linkedAccounts": typeof tables_linkedAccounts;
  "tables/organizationMembers": typeof tables_organizationMembers;
  "tables/organizations": typeof tables_organizations;
  "tables/registrations": typeof tables_registrations;
  "tables/sessions": typeof tables_sessions;
  "tables/user": typeof tables_user;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
