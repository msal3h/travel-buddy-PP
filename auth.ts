import NextAuth from "next-auth"
import Google from "next-auth/providers/google"


export const { handlers, signIn, signOut, auth } = NextAuth({ // we are destructuring the NextAuth object and exporting so other files can import them
  providers: [Google],
  callbacks:{ //call this function to check if user is authorized
    authorized : async ({auth}) => {{
      return !!auth // converts return value to boolean (auth is an object )
    }}
  }
})


