import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';
import React from 'react';

interface CustomButtonProps {
    label: string;
    className?: string; // Optional className prop
    text?: string; // Optional className prop
    icon?: LucideIcon;
}

const CustomButton: React.FC<CustomButtonProps> = ({ label, className, text, icon: Icon }) => {
    if (text !== "outline") {
        return (
            <Button
                className={cn(
                    'text-white hover:text-white bg-[hsl(16,76%,45%)] hover:bg-[hsl(16,76%,45%)] rounded-[30px] px-6 py-4 text-[16px] font-bold cursor-pointer transition-all duration-200 ease-in border-[2px] border-[hsl(16,76%,45%)] hover:pt-[10px]',
                    className,
                )}
                variant='outline'
            >
                {Icon && <Icon className="w-4 h-4 mr-2" />}
                {label}
            </Button>
        );
    } else {
        return (
            <Button
                className={cn(
                    'text-[hsl(16,76%,45%)] bg-transparent rounded-[30px] px-6 py-4 text-[16px] font-bold cursor-pointer transition-all duration-200 ease-in border-[2px] border-[hsl(16,76%,45%)] hover:pt-[10px] hover:bg-transparent',
                    className,
                )}
            >
                {label}
            </Button>
        );
    }
}

export default CustomButton;
