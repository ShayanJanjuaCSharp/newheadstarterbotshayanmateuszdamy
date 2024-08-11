import NextAuth from "next-auth/next";
import GoogleProvider from 'next-auth/providers/google';
import { connectDB } from "@/utils/db";
import User from "@/models/user";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async session({session}){
            const sessionUser = await User.findOne({email: session.user.email})
            session.user.id = sessionUser._id;
            return session;
        },
        async signIn({profile}){
            try{
                await connectDB()
                const userExist = await User.findOne({email: profile.email})
                if(!userExist){
                    const user = await User.create({
                        email: profile.email,
                        name: profile.name,
                        image: profile.picture
                    })
                }
                return true
            }
            catch(error){
                return false
            }

        },


        
    }
    
})

export {handler as GET, handler as POST}