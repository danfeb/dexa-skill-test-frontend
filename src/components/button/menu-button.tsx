import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import GhostButton from '@/components/button/ghost-button';
import { IoClose, IoMenu } from 'react-icons/io5';
import React, { useState } from 'react';
import { MenuButtonProps } from '@/interfaces/button-interfaces';

const MenuButton: React.FC<MenuButtonProps> = ({
    label,
    loading,
    className,
    size = 'default',
    disabled,
    menu,
    customIcon
}) => {
    const [open, setOpen] = useState(false);

    return (
        <DropdownMenu open={open} onOpenChange={setOpen} disabled={disabled}>
            <DropdownMenuTrigger
                render={
                    <GhostButton //
                        icon={
                            customIcon ? (
                                customIcon
                            ) : open ? (
                                <IoClose className={'size-4'} />
                            ) : (
                                <IoMenu className={'size-4'} />
                            )
                        }
                        label={label}
                        loading={loading}
                        className={className}
                        size={size}
                        disabled={disabled}
                    />
                }
            />
            <DropdownMenuContent className={'min-w-[6rem]'}>
                {menu.map((item) => {
                    return (
                        <DropdownMenuItem onClick={item.onClick} variant={item.variant}>
                            {item.icon}
                            {item.label}
                        </DropdownMenuItem>
                    );
                })}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default MenuButton;
