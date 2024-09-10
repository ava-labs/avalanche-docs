"use client"

import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import { CheckIcon } from "lucide-react";

export const Pills: React.FC<{ items: { text: string }[] | undefined, selectable?: boolean, onSelectionChanged?: any }> = ({ items, selectable, onSelectionChanged }) => {
    return (
        <div className="flex flex-wrap items-center gap-4 text-xs">
            {items && items.map(item => (<Pill key={`pill-${item.text}`} item={item} selectable={selectable} onSelectionChanged={onSelectionChanged} />))}
        </div>
    );
};

export const Pill: React.FC<{ item: { text: string, selected?: boolean }, selectable?: boolean, onSelectionChanged?: any }> = ({ item, selectable, onSelectionChanged }) => {
    const variants = cva(
        "flex items-center gap-2 w-fit text-xs z-10 rounded-full px-3 py-1.5 font-medium text-muted-foreground border bg-secondary/50 select-none",
        {
            variants: {
                variant: {
                    "default": "bg-secondary/50",
                    "selectable": "cursor-pointer hover:bg-accent",
                    "selected": "cursor-pointer bg-accent"
                }
            }
        }
    );

    const select = () => {
        if (selectable === undefined || selectable === false) {
            return;
        }
        onSelectionChanged(item.text, !item.selected);
    }

    return (
        <div className={cn((variants({ variant: selectable && item.selected === true ? "selected" : selectable ? "selectable" : "default" })))} onClick={select}>
            {selectable && item.selected === true && <CheckIcon size={16} />}
            <span>{item.text}</span>
        </div>
    );
};