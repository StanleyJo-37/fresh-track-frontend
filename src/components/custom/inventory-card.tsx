import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { Card, CardHeader } from "../ui/card";
import { Button } from "../ui/button";
import { Icons } from "../icons";
import { InventoryCardProps } from "@/types";

export default function InventoryCard({
    food_item
}: {
    food_item: InventoryCardProps;
}) {
    

    return (
        <Card className="flex-col md:flex max-w-[600px] items-center justify-between">
            {/* Avatar */}
            <CardHeader>
                <Avatar className="w-24 h-24 rounded-full overflow-hidden">
                    <AvatarImage src="https://placehold.co/400" />
                </Avatar>
            </CardHeader>

            {/* Details */}
            <div className="py-6 flex-1">
                <h2 className="text-2xl">Bak Choy</h2>
                <i className="text-gl">Brassica rapa subsp. chinensis</i>
                <div className="text-sm">
                <p>Added at : {new Date().toLocaleDateString()}</p>
                <p>Fresh till : {new Date().toLocaleDateString()}</p>
                </div>
            </div>

            {/* Actions */}
            <div className="flex p-6 gap-2">
                <Button>
                    <Icons.Pencil />
                </Button>
                <Button variant="destructive">
                    <Icons.Trash />
                </Button>
            </div>
        </Card>
    );
}