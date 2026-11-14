import { MenuGroup } from '@/types/component-types';
import { TbSmartHome } from 'react-icons/tb';
import { BsPeople } from 'react-icons/bs';
import { FaRegCircleUser } from 'react-icons/fa6';
import { checkRole } from '@/utils/check-role-utils';
import { MdOutlineWorkHistory } from 'react-icons/md';
import { PiClockUserBold } from 'react-icons/pi';

const menu: MenuGroup[] = [
    {
        groupLabel: 'Dashboard',
        items: [
            {
                title: 'Home',
                url: '/',
                icon: TbSmartHome,
                access: checkRole(['admin', 'user'])
            }
        ]
    },
    {
        groupLabel: 'Attendance',
        items: [
            {
                title: 'Attendance Log',
                url: '/attendance/attendance-log',
                icon: MdOutlineWorkHistory,
                access: checkRole('admin')
            },
            {
                title: 'My Attendance Log',
                url: '/attendance/my-attendance-log',
                icon: PiClockUserBold,
                access: checkRole(['admin', 'user'])
            }
        ]
    },
    {
        groupLabel: 'Master',
        items: [
            {
                title: 'Employee',
                url: '/master/employee',
                icon: BsPeople,
                access: checkRole('admin')
            },
            {
                title: 'User',
                url: '/master/user',
                icon: FaRegCircleUser,
                access: checkRole('admin')
            }
        ]
    }
];

export const getFilteredSidebarMenu = (menuConfig: MenuGroup[] = menu): MenuGroup[] => {
    return menuConfig
        .map((group) => {
            const filteredItems = group.items
                // Check parent access: if item.access is undefined/missing, treat it as true
                .filter((item) => item.access ?? true)
                .map((item) => {
                    const resolvedParentAccess = item.access ?? true;

                    if (!item.items) {
                        return {
                            ...item,
                            access: resolvedParentAccess
                        };
                    }

                    // Check sub-items access: if subItem.access is undefined/missing, treat as true
                    const filteredSubItems = item.items
                        .filter((subItem) => subItem.access ?? true)
                        .map((subItem) => ({
                            ...subItem,
                            access: subItem.access ?? true
                        }));

                    return {
                        ...item,
                        access: resolvedParentAccess,
                        items: filteredSubItems
                    };
                })
                // Remove parent menu dropdowns if all sub-items were hidden and parent has no url
                .filter((item) => !(item.items && item.items.length === 0 && !item.url));

            return {
                ...group,
                items: filteredItems
            };
        })
        .filter((group) => group.items.length > 0); // Remove empty groups
};
