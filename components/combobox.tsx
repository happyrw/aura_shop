"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

type Option = {
    value: string;
    label: string;
};

type ComboboxProps = {
    value: string;
    onChange: (value: string) => void;
    options: Option[];
    disabled?: boolean;
};

export function Combobox({ value, onChange, options, disabled }: ComboboxProps) {
    const [open, setOpen] = React.useState(false);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="brock w-full justify-between outline-none border-0 border-b-2 border-black focus:border-b-4 focus:border-orange-700"
                    disabled={disabled}
                >
                    {value
                        ? options.find((option) => option.value === value)?.label
                        : "Select an option..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full md:w-[600px]">
                <Command>
                    <CommandInput placeholder="Search option..." disabled={disabled} />
                    <CommandEmpty>No option found.</CommandEmpty>
                    <CommandGroup>
                        {options.map((option) => (
                            <CommandList key={option.value}>
                                <CommandItem
                                    key={option.value}
                                    value={option.value}
                                    onSelect={(currentValue) => {
                                        if (!disabled) {
                                            onChange(currentValue === value ? "" : currentValue);
                                            setOpen(false);
                                        }
                                    }}
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            value === option.value ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                    {option.label}
                                </CommandItem>
                            </CommandList>
                        ))}
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
