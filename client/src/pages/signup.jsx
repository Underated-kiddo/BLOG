import { useState }  from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter,CardHeader, CardTitle } from "@/components/ui/card";
import API from "../services/api";
import {Link } from  "react-router-dom";

export default function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    
    const handleSignup = async () =>  {
        if(!email || !password || !role) return alert("All fields required");
        setLoading(true);
        try {
            const res = await API.post("/auth/signup", {email, password, role});
            localStorage.setItem("token",res.data.token);
            navigate("/dashboard");
        } catch (err) {
            alert(err.response?.data?.message || "signup failed");
        } finally{
            setLoading(false);
        }
    };

    return(
        <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-grey">
            <Card className="w-full max-w-md shadow-xl animate-fade">
                <CardHeader>
                    <CardTitle className="text-center text-2ml font-bold">Sign  up</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Input 
                        type="email"
                        placeholder="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <Input 
                        type="password"
                        placeholder="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <div className="flex flex-col space-y-2">
                        <label className="font-medium">Select Role:</label>
                        <div className="flex space-x-4">
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="role"
                                    value="Admin"
                                    checked={role === "Admin"}
                                    onChange={() => setRole("Admin")}
                                    className="mr-2"
                                />
                                Admin
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="role"
                                    value="Blogger"
                                    checked={role === "Blogger"}
                                    onChange={() => setRole("Blogger")}
                                    className="mr-2"
                                />
                                Blogger
                            </label>
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button onClick={handleSignup} disabled={loading} className="w-full">
                        {loading ? "Signing in ..." : "Sign up"}
                    </Button>
                </CardFooter>

                <p className="text-sm text-center text-zinc-600 dart:text-zinc-300 mt-4">
                    Already have an account ? {" "}
                    <Link to="/login" className="text-blue hover:underline">
                    Log in
                    </Link>
                </p>
            </Card>
        </div>
    );
}