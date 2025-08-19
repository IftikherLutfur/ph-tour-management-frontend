import { Link } from "react-router";
import { Button } from "../components/ui/button";

export function Unauthorized () {
    return (
        <div className="text-5xl text-center min-h-screen items-center my-20">
            <h1>You are not authorized to access</h1>
            <Link to={"/"}>
            <Button>
                Go to the home
            </Button>
            </Link>

        </div>
    );
};

