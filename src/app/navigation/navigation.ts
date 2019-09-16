import { FuseNavigation } from '@fuse/types';

export const navigation: FuseNavigation[] = [
    {
        id       : 'applications',
        title    : 'Applications',
        translate: 'NAV.APPLICATIONS',
        type     : 'group',
        children : [
            {
                id       : 'admissions',
                title    : 'Admissions',
                translate: 'NAV.ADMISSIONS.TITLE',
                type     : 'item',
                icon     : 'group',
                url      : '/admissions',
                badge    : {
                    title    : '25',
                    translate: 'NAV.STUDENTS.BADGE',
                    bg       : '#F44336',
                    fg       : '#FFFFFF'
                }
            },
            {
                id       : 'students',
                title    : 'Students',
                translate: 'NAV.STUDENTS.TITLE',
                type     : 'item',
                icon     : 'group',
                url      : '/students',
                badge    : {
                    title    : '25',
                    translate: 'NAV.STUDENTS.BADGE',
                    bg       : '#F44336',
                    fg       : '#FFFFFF'
                }
            },
            {
                id       : 'courses',
                title    : 'Courses',
                translate: 'NAV.COURSES.TITLE',
                type     : 'item',
                icon     : 'assessment',
                url      : '/courses',
                badge    : {
                    title    : '25',
                    translate: 'NAV.COURSES.BADGE',
                    bg       : '#F44336',
                    fg       : '#FFFFFF'
                }
            }
            
        ]
    }
];
