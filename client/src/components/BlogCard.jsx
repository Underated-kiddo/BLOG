import { Card, CardContent,CardFooter,CardHeader,CardTitle } from "@/components/ui/card";
import { CheckCircleIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button";

export default function BlogCard({ blog, onToggle, onDelete }) {
    return(
        <Card 
            className={`relative animation-fade ${
                blog.posted ? "opacity-70" : ""
            }`}
        >
            <CardHeader>
                <CardTitle className={`text-lg font-semibold ${
                    blog.posted ? "line-through text-muted-foreground" : ""
                }`}
            >
                    {blog.title}
                </CardTitle>
            </CardHeader>

            <CardContent>
                <p className="text-sm text-muted-foreground">
                    {blog.description}
                </p>
            </CardContent>

            <CardFooter className="flex justify-end gap-2">
                <Button
                size="icon"
                variant={blog.posted ? "outline" : "secondary"}
                onClick={() => onToggle(blog._id)}
                >
                    <CheckCircleIcon className="h-5 w-5" />
                </Button>
                <Button
                size="icon"
                variant="destructive"
                onClick={() => onDelete(blog._id)}
                >
                    <TrashIcon className="h-5 w-5"/>
                </Button>
            </CardFooter>
            </Card>
    );  
} 