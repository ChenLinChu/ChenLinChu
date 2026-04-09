import React from 'react';

import Block from '@/components/shared/Block';

import { HOME_GRID_COLUMNS, HOME_GRID_ROWS } from '../layoutGrid';
import Experience from './Experience';
import GitHubIcon from './GitHubIcon';
import LinkedInIcon from './LinkedInIcon';
import MailIcon from './MailIcon';
import SkillsTree from './SkillsTree';

export default function Section2(): React.ReactNode {
    return (
        <>
            {/* LinkedIn */}
            <Block
                column={{
                    ...HOME_GRID_COLUMNS.section2.linkedIn
                }}
                row={{
                    default: '4 / span 1',
                    xl: '4 / span 1',
                    lg: '7 / span 1'
                }}
            >
                <LinkedInIcon />
            </Block>

            {/* Email */}
            <Block
                column={{
                    ...HOME_GRID_COLUMNS.section2.mail
                }}
                row={{
                    default: '5 / span 1',
                    xl: '5 / span 1',
                    lg: '7 / span 1'
                }}
            >
                <MailIcon />
            </Block>

            {/* GitHub */}
            <Block
                column={{
                    ...HOME_GRID_COLUMNS.section2.gitHub
                }}
                row={{
                    default: '6 / span 1',
                    xl: '6 / span 1',
                    lg: '7 / span 1'
                }}
            >
                <GitHubIcon />
            </Block>

            {/* Skills Tree */}
            <Block
                column={{
                    ...HOME_GRID_COLUMNS.section2.skillsTree
                }}
                row={{
                    ...HOME_GRID_ROWS.section2.skillsTree
                }}
                noPadding
            >
                <SkillsTree />
            </Block>

            {/* Career Experience */}
            <Block
                column={{
                    ...HOME_GRID_COLUMNS.section2.experience
                }}
                row={{
                    ...HOME_GRID_ROWS.section2.experience
                }}
            >
                <Experience />
            </Block>
        </>
    );
}
