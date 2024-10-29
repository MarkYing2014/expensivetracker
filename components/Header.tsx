import { SignedIn, SignedOut, SignInButton, SignOutButton } from "@clerk/nextjs";
import { UserButton } from "@clerk/nextjs";
import { checkUser } from "@/lib/checkUser";

const Header = async () => {
    try {
        const user = await checkUser();
        console.log("User data in header:", user);

        return ( 
            <nav className="navbar">
                <div className="navbar-container">
                    <h1>Expense Tracker</h1>
                </div>
                <div className="navbar-actions">        
                    <SignedIn>
                        <UserButton />
                    </SignedIn>
                    <SignedOut>
                        <SignInButton />
                    </SignedOut>
                </div>
            </nav>  
        );
    } catch (error) {
        console.error("Error in Header:", error);
        return (
            <nav className="navbar">
                <div className="navbar-container">
                    <h1>Expense Tracker</h1>
                </div>
                <div className="navbar-actions">
                    <SignInButton />
                </div>
            </nav>
        );
    }
}
 
export default Header;