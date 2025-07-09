import { Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';    
import { Button } from "@/components/ui/button";    
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem , DropdownMenuTrigger }  from "@/components/ui/dropdown-menu";
import { UserCircleIcon } from "@heroicons/react/24/outline";

export default function Navbar() {
    const logout = () => {
        localStorage.removeItem("token");
        window.location.href = "/login";
    };

    return(
        <nav className="bg-white dark:bg-gray-800 shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/dashboard" className="text-xl font-bold text-gray-900 dark:text-white">Blogger</Link>
                    </div>
                    <div className="flex items-center space-x-4">
                        <ThemeToggle />
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" aria-label="User Menu">
                                    <UserCircleIcon className="h-6 w-6 text-gray-900 dark:text-white" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </div>
        </nav>
    )



}