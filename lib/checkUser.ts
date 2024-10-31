import { currentUser, auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { User } from "@prisma/client";

export const checkUser = async (): Promise<User | null> => {
    try {
        const { userId } = await auth();
        
        if (!userId) return null;
        
        const user = await currentUser();
      

        if (!user) return null;

        const dbUser = await db.user.findUnique({   
            where: {
                clerkUserID: user.id,
            },
        });

        if (!dbUser) {
            const firstName = user.firstName || '';
            const lastName = user.lastName || '';
            const name = `${firstName} ${lastName}`.trim() || 'Unknown User';

            if (!user.emailAddresses || user.emailAddresses.length === 0) {
                throw new Error('No email address found for user');
            }

            const newUser = await db.user.create({
                data: {
                    clerkUserID: user.id,
                    name: name,
                    imageUrl: user.imageUrl || null,
                    email: user.emailAddresses[0].emailAddress,
                },
            });
            console.log("Created new user:", newUser);
            return newUser;
        }

        return dbUser;
    } catch (error) {
        console.error("Error in checkUser:", error);
        throw error;
    }
}
