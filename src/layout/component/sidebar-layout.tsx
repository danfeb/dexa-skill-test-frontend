import React from 'react';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    useSidebar
} from '@/components/ui/sidebar';
import { Show } from '@/components/conditional-rendering/show';
import { FaRegCopyright } from 'react-icons/fa6';
import { Link, useLocation } from 'react-router-dom';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { IoChevronForward } from 'react-icons/io5';
import { SidebarProps } from '@/interfaces/layout-interfaces';

const SidebarLayout: React.FC<SidebarProps> = ({ listMenu }) => {
    const { open, setOpen, isMobile } = useSidebar();

    const pathname = useLocation().pathname;

    return (
        <div
            className="fixed inset-y-0 left-0 z-50 border-0"
            onMouseEnter={() => {
                if (!isMobile) setOpen(true);
            }}
            onMouseLeave={() => {
                if (!isMobile) setOpen(false);
            }}
        >
            <Sidebar
                collapsible="icon"
                className="h-full md:w-[14rem]"
                style={{
                    border: 'none'
                }}
            >
                <SidebarHeader className={'h-14 flex justify-center items-center'}>
                    <div className="flex w-full items-center">
                        <Show>
                            <Show.When isTrue={open}>
                                <img
                                    src={`/public/assets/logoipsum-358.svg`}
                                    alt={'Logo-Text'}
                                    className={'w-32'}
                                />
                            </Show.When>
                            <Show.Else>
                                <img
                                    src={`/public/assets/logoipsum-359.svg`}
                                    alt={'Logo-Single'}
                                    className={'w-7'}
                                />
                            </Show.Else>
                        </Show>
                    </div>
                </SidebarHeader>

                <SidebarContent>
                    {listMenu.map((group: any, groupIdx: number) => (
                        <SidebarGroup key={groupIdx}>
                            <SidebarGroupLabel>{group.groupLabel}</SidebarGroupLabel>
                            <SidebarMenu>
                                {group.items.map((item: any) => {
                                    const Icon = item.icon;
                                    const hasSubItems = Boolean(
                                        item.items && item.items.length > 0
                                    );

                                    const isItemActive = pathname === item.url;
                                    const isAnySubActive = item.items?.some(
                                        (subItem: any) => pathname === subItem.url
                                    );

                                    if (!hasSubItems) {
                                        return (
                                            <SidebarMenuItem key={item.title}>
                                                <SidebarMenuButton
                                                    isActive={isItemActive}
                                                    className={
                                                        'text-muted-foreground hover:text-muted-foreground data-active:text-primary data-active:font-medium data-active:bg-transparent data-active:hover:text-primary'
                                                    }
                                                    tooltip={item.title}
                                                    render={
                                                        <Link to={item.url}>
                                                            {Icon && (
                                                                <Icon //
                                                                    className="shrink-0"
                                                                />
                                                            )}
                                                            <span>{item.title}</span>
                                                        </Link>
                                                    }
                                                />
                                            </SidebarMenuItem>
                                        );
                                    }

                                    return (
                                        <Collapsible
                                            key={`${item.title}-${isAnySubActive}`}
                                            defaultOpen={item.isActive || isAnySubActive}
                                            className="group/collapsible"
                                            render={
                                                <SidebarMenuItem>
                                                    <CollapsibleTrigger
                                                        render={
                                                            <SidebarMenuButton
                                                                isActive={isAnySubActive}
                                                                tooltip={item.title}
                                                                className={
                                                                    'text-muted-foreground hover:text-muted-foreground data-active:text-primary data-active:font-medium data-active:bg-transparent data-active:hover:text-primary'
                                                                }
                                                            >
                                                                {Icon && (
                                                                    <Icon className="size-4 shrink-0" />
                                                                )}
                                                                <span>{item.title}</span>
                                                                <IoChevronForward className="ml-auto size-4 transition-transform duration-200 group-data-open/collapsible:rotate-90" />
                                                            </SidebarMenuButton>
                                                        }
                                                    />
                                                    <CollapsibleContent>
                                                        <SidebarMenuSub>
                                                            {item.items?.map((subItem: any) => {
                                                                const isSubActive =
                                                                    pathname === subItem.url;
                                                                return (
                                                                    <SidebarMenuSubItem
                                                                        key={subItem.title}
                                                                    >
                                                                        <SidebarMenuSubButton
                                                                            isActive={isSubActive}
                                                                            className={
                                                                                'text-muted-foreground hover:text-muted-foreground data-active:text-primary data-active:font-medium data-active:hover:text-primary'
                                                                            }
                                                                            render={
                                                                                <Link
                                                                                    to={subItem.url}
                                                                                >
                                                                                    <span>
                                                                                        {
                                                                                            subItem.title
                                                                                        }
                                                                                    </span>
                                                                                </Link>
                                                                            }
                                                                        />
                                                                    </SidebarMenuSubItem>
                                                                );
                                                            })}
                                                        </SidebarMenuSub>
                                                    </CollapsibleContent>
                                                </SidebarMenuItem>
                                            }
                                        />
                                    );
                                })}
                            </SidebarMenu>
                        </SidebarGroup>
                    ))}
                </SidebarContent>

                <SidebarFooter className={'border-t border-gray-200 text-gray-400'}>
                    <Show>
                        <Show.When isTrue={open}>
                            <div className={'flex gap-1 w-full items-center text-sm'}>
                                <FaRegCopyright />
                                <span className={'text-xs'}>Lorem ipsum.</span>
                            </div>
                        </Show.When>
                        <Show.Else>
                            <div className={'flex w-full items-center justify-center text-sm'}>
                                <FaRegCopyright />
                            </div>
                        </Show.Else>
                    </Show>
                </SidebarFooter>
            </Sidebar>
        </div>
    );
};

export default SidebarLayout;
