"use client";

import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { Card, CardHeader } from "../ui/card";
import { Button } from "../ui/button";
import { Icons } from "../icons";
import { InventoryItem } from "@/types";
import { useToast } from "@/hooks/use-toast";
import InventoryAPI from "@/api/InventoryAPI";
import { useCallback, useState } from "react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "../ui/hover-card";
import { Dialog, DialogClose, DialogContent, DialogHeader } from "../ui/dialog";
import { X } from "lucide-react";

export default function InventoryCard({
    food_item
}: {
    food_item: InventoryItem;
}) {
    const { toast } = useToast();
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);

    const deleteItem = useCallback(async() => {
        try {
            const response = await InventoryAPI.deleteItem(food_item.id);
            toast({
                'title': 'Item Deleted',
                'variant': 'default',
            });
        } catch (err: any) {
            toast({
                'title': 'Failted to delete item.',
                'description': err,
                'variant': 'destructive',
            });
        } finally {
            setIsDeleteDialogOpen(false);
        }
    }, [food_item]);

    return (
        <>
            <Card className="flex-col md:flex w-[500px] max-w-[600px] items-center justify-between">
                {/* Avatar */}
                <CardHeader className="flex flex-col items-center justify-center">
                    <Avatar className="w-24 h-24 rounded-full overflow-hidden">
                        <AvatarImage src="https://placehold.co/400" />
                    </Avatar>
                    <h2 className="text-2xl text-center">{food_item.local_name}</h2>
                    <i className="text-gl text-center">{food_item.scientific_name}</i>
                </CardHeader>

                {/* Details */}
                <div className="py-6 flex-1">
                    <div className="text-sm">
                        <p>Ditambahkan pada: {food_item.bought_at}</p>
                        <p>Segar sampai: {food_item.fresh_until}</p>
                        <p>Kuantitas: {food_item.quantity} gram</p>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex p-6 gap-2">
                    {/* <HoverCard>
                        <HoverCardContent className="w-auto">
                            <p className="text-sm">
                                Ubah
                            </p>
                        </HoverCardContent>
                        <HoverCardTrigger>
                            <Button
                            >
                                <Icons.Pencil />
                            </Button>
                        </HoverCardTrigger>
                    </HoverCard> */}
                    <HoverCard>
                        <HoverCardContent className="w-auto">
                            <p className="text-sm">
                                Hapus
                            </p>
                        </HoverCardContent>
                        <HoverCardTrigger>
                            <Button
                                variant="destructive"
                                onClick={async() => {
                                    setIsDeleteDialogOpen(true);
                                }}
                            >
                                <Icons.Trash />
                            </Button>
                        </HoverCardTrigger>
                    </HoverCard>
                </div>
            </Card>
            <Dialog open={isDeleteDialogOpen}>
                <DialogContent onCloseClick={() => setIsDeleteDialogOpen(false)}>
                    <DialogHeader>
                        <h2>Apakah Anda ingin menghapus barang ini?</h2>
                    </DialogHeader>
                    <div className="space-x-4">
                        <Button
                            variant="destructive"
                            onClick={deleteItem}
                        >
                            Hapus
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => setIsDeleteDialogOpen(false)}
                        >
                            Batal
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}