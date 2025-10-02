import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import { db } from "src/db/schema"
import * as schema from "src/db/schema"


export const { handlers, signIn, signOut, auth } = NextAuth({ // we are destructuring the NextAuth object and exporting so other files can import them
  // adapter: DrizzleAdapter(db),
  adapter: DrizzleAdapter(db, {
    usersTable: schema.users,
    accountsTable: schema.accounts,
    sessionsTable: schema.sessions,
    verificationTokensTable: schema.verificationTokens,
  }),
  providers: [Google],
  callbacks:{ //call this function to check if user is authorized
    authorized : async ({auth}) => {{
      return !!auth // converts return value to boolean (auth is an object )
    }}
  },
  session: { strategy: "database" },
})


