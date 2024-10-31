import { SignedIn, SignedOut, SignInButton} from "@clerk/nextjs";
import { UserButton } from "@clerk/nextjs";


const Header = async () => {
    try {
      
        

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