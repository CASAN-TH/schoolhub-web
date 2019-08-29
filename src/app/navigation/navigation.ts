import { FuseNavigation } from '@fuse/types';

export const navigation: FuseNavigation[] = [
    {
        id       : 'applications',
        title    : 'Applications',
        translate: 'NAV.APPLICATIONS',
        type     : 'group',
        children : [
            {
                id       : 'sample',
                title    : 'Sample',
                translate: 'NAV.STUDENTS.TITLE',
                type     : 'item',
                icon     : 'contact_phone',
                url      : '/students',
                badge    : {
                    title    : '25',
                    translate: 'NAV.STUDENTS.BADGE',
                    bg       : '#F44336',
                    fg       : '#FFFFFF'
                }
            }
        ]
    }
];
