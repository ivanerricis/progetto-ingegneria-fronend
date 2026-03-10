import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Advertisements() {
    const navigate = useNavigate()

    return (
        <div className="w-full h-full">
            <Button variant={"outline"} onClick={() => navigate("/agent/dashboard/create-advertisement")}>
                <Plus />
                Aggiungi annuncio
            </Button>
        </div>
    );
}