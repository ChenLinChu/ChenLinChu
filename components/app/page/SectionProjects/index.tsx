import React from 'react';

import {
    getAlternatingProjectColumn,
    HOME_GRID_COLUMNS,
    HOME_GRID_ROWS
} from '@/components/app/page/layoutGrid';
import Block from '@/components/shared/Block';
import ProjectContainer from '@/components/shared/ProjectContainer';
import { getProjectsByLanguage } from '@/lib/queries/projects';

export default async function SectionProjects({
    params
}: {
  params: Promise<{ locale: string }>;
}): Promise<React.ReactNode> {
    const { locale } = await params;
    const projects = await getProjectsByLanguage(locale);

    return (
        <>
            {projects.map((project, index) => (
                <Block
                    key={index}
                    noPadding
                    column={{
                        default: getAlternatingProjectColumn('default', index),
                        xl: getAlternatingProjectColumn('xl', index),
                        lg: HOME_GRID_COLUMNS.sectionProjects.stacked.lg
                    }}
                    row={{
                        default: `${
                            HOME_GRID_ROWS.sectionProjects.startRow.default
                            + Math.floor(index / 2) * 4
                            + (index % 2)
                        } / span ${HOME_GRID_ROWS.sectionProjects.rowSpan}`,
                        xl: `${
                            HOME_GRID_ROWS.sectionProjects.startRow.xl
                            + Math.floor(index / 2) * 4
                            + (index % 2)
                        } / span ${HOME_GRID_ROWS.sectionProjects.rowSpan}`,
                        lg: `${
                            HOME_GRID_ROWS.sectionProjects.startRow.lg + index * 4
                        } / span ${HOME_GRID_ROWS.sectionProjects.rowSpan}`,
                        md: `${
                            HOME_GRID_ROWS.sectionProjects.startRow.md + index * 4
                        } / span ${HOME_GRID_ROWS.sectionProjects.rowSpan}`
                    }}
                >
                    <ProjectContainer project={project} />
                </Block>
            ))}
        </>
    );
}
