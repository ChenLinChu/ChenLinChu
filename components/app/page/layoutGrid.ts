export const HOME_GRID_COLUMNS = {
    section1: {
        profile: {
            default: '1 / span 3',
            xl: '1 / span 3',
            lg: '1 / span 8'
        },
        localTime: {
            default: '4 / span 3',
            xl: '4 / span 3',
            lg: '4 / span 5'
        },
        localeSwitch: {
            default: '7 / span 2',
            xl: '7 / span 2',
            lg: '1 / span 4'
        },
        map: {
            default: '4 / span 2',
            xl: '4 / span 2',
            lg: '5 / span 4'
        },
        toggleTheme: {
            default: '6 / span 2',
            xl: '6 / span 2',
            lg: '1 / span 3'
        },
        spotify: {
            default: '6 / span 3',
            xl: '6 / span 3',
            lg: '1 / span 8'
        },
        resume: {
            default: '8 / span 1',
            xl: '8 / span 1',
            lg: '1 / span 2'
        }
    },
    section2: {
        linkedIn: {
            default: '1 / span 1',
            xl: '1 / span 1',
            lg: '3 / span 2'
        },
        mail: {
            default: '1 / span 1',
            xl: '1 / span 1',
            lg: '5 / span 2'
        },
        gitHub: {
            default: '1 / span 1',
            xl: '1 / span 1',
            lg: '7 / span 2'
        },
        skillsTree: {
            default: '2 / span 3',
            xl: '2 / span 3',
            lg: '1 / span 8',
            md: '1 / span 8'
        },
        experience: {
            default: '5 / span 4',
            xl: '5 / span 4',
            lg: '1 / span 8',
            md: '1 / span 8'
        }
    },
    sectionProjects: {
        alternatingStart: {
            default: [1, 5],
            xl: [1, 5]
        },
        span: 4,
        stacked: {
            lg: '1 / span 8'
        }
    }
} as const;

export function getAlternatingProjectColumn(
    breakpoint: 'default' | 'xl',
    index: number
): string {
    const [first, second] =
    HOME_GRID_COLUMNS.sectionProjects.alternatingStart[breakpoint];
    const start = index % 2 === 0 ? first : second;

    return `${start} / span ${HOME_GRID_COLUMNS.sectionProjects.span}`;
}

export const HOME_GRID_ROWS = {
    section1: {
        profile: {
            default: '1 / span 3',
            xl: '1 / span 3',
            lg: '1 / span 3'
        },
        localTime: {
            default: '1 / span 1',
            xl: '1 / span 1',
            lg: '4 / span 1'
        },
        localeSwitch: {
            default: '1 / span 1',
            xl: '1 / span 1',
            lg: '5 / span 1'
        },
        map: {
            default: '2 / span 2',
            xl: '2 / span 2',
            lg: '5 / span 1'
        },
        toggleTheme: {
            default: '3 / span 1',
            xl: '3 / span 1',
            lg: '4 / span 1'
        },
        spotify: {
            default: '2 / span 1',
            xl: '2 / span 1',
            lg: '6 / span 1'
        },
        resume: {
            default: '3 / span 1',
            xl: '3 / span 1',
            lg: '7 / span 1'
        }
    },
    section2: {
        skillsTree: {
            default: '4 / span 3',
            xl: '4 / span 3',
            lg: '8 / span 3',
            md: '8 / span 3'
        },
        experience: {
            default: '4 / span 4',
            xl: '4 / span 4',
            lg: '11 / span 4',
            md: '11 / span 4'
        }
    },
    sectionProjects: {
        startRow: {
            default: 7,
            xl: 7,
            lg: 15,
            md: 15
        },
        rowSpan: 4
    }
} as const;
