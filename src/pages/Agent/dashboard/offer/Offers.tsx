import { useState } from "react";
import { BadgeChat } from "./components/badgeChat";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Check, Send, Trash } from "lucide-react";
import { Input } from "@/components/ui/input";
import useOffers from "@/hooks/agent/useOffers";

export default function Offers() {
    const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
    const { offers } = useOffers();

    return (
        <div className="w-full h-full flex">

            {/* Sidebar */}
            <div className={`w-full md:w-1/4 h-full border-r divide-y overflow-y-auto ${selectedChatId ? "hidden md:block" : "block"}`}>
                {offers && offers.length > 0 ? (
                        offers.map((offer) => (
                        <BadgeChat
                            key={offer.id}
                            onClick={() => setSelectedChatId(String(offer.id))}
                            accountName={offer.account.firstName + ' ' + offer.account.lastName}
                        />
                    ))
                ) : (
                    <div className="p-4 text-center text-muted-foreground">Nessuna offerta trovata</div>
                )}
            </div>

            {/* Chat */}
            <div className={`w-full md:w-3/4 h-full ${!selectedChatId ? "hidden md:flex" : "flex"} flex-col`}>
                {selectedChatId && (
                    <div className="w-full flex gap-3 border-b p-2 items-center justify-start">
                        <Button
                            variant={"outline"}
                            size={"icon-lg"}
                            className="md:hidden border-b"
                            onClick={() => setSelectedChatId(null)}
                        >
                            <ArrowLeft />
                        </Button>
                        <div className="flex flex-col justify-center items-start gap-1">
                            <Label className="text-lg">Address Formatted</Label>
                            <Label>Account name</Label>
                        </div>
                    </div>
                )}
                <div className="flex-1 flex flex-col items-center justify-center text-foreground">
                    <div className="w-full h-full bg-blue-500">

                    </div>
                    <div className="w-full flex gap-2 p-2">
                        <Button size={"lg"} className="size-10 sm:w-fit sm:h-10 sm:px-4 sm:py-2">
                            <Check className="size-5" />
                            <Label className="hidden sm:block text-lg">Accetta</Label>
                        </Button>
                        <Button variant={"destructive"} size={"lg"} className="size-10 sm:w-fit sm:h-10 sm:px-4 sm:py-2">
                            <Trash className="size-5" />
                            <Label className="hidden sm:block text-lg">Rifiuta</Label>
                        </Button>
                        <div className="flex gap-1 w-full">
                            <Input
                                type="number"
                                min={0}
                                placeholder="Inserisci un prezzo..."
                                className="w-full h-full"
                            />
                            <Button variant={"outline"} size={"icon-lg"}>
                                <Send />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}