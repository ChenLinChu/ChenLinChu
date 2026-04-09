import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import React from 'react';

import Block from '@/components/shared/Block';
import ProjectContainer from '@/components/shared/ProjectContainer';
import { Link } from '@/i18n/navigation';
import { getSkills } from '@/lib/skills';
import type { Project } from '@/types/project';

import Styles from './index.module.scss';

export default async function ProjectList(
    { projects }: { projects: Project[] }
): Promise<React.ReactNode> {
    const allTags = Array.from(new Set(projects?.flatMap(project => project.tags) ?? []));
    const skillsData = getSkills(allTags);
    const t = await getTranslations('main');

    if (!projects) notFound();
    else return (
        <div className={Styles.container}>
            <Block
                column={{
                    default: '5 / span 4',
                    lg: '1 / span 8'
                }}
                row={{
                    default: '1 / span 1',
                    lg: '1 / span 1'
                }}
            >
                <div className={Styles.titleContainer}>
                    <h1 className={Styles.title}>{t('projects/[tag].title')}</h1>

                    <div className={Styles.skillsViewport}>
                        <div
                            className={Styles.skillsTrack}
                            style={{
                                '--skills-count': skillsData.length
                            } as React.CSSProperties}
                        >
                            <div className={Styles.skillsGroup}>
                                {skillsData.map((skill) => (
                                    <Link
                                        className={Styles.skillLink}
                                        key={`primary-${skill.fileName}`}
                                        href={`/projects/${skill.fileName}`}
                                    >
                                        {skill.fileName}
                                    </Link>
                                ))}
                            </div>
                            <div
                                className={Styles.skillsGroup}
                                aria-hidden="true"
                            >
                                {skillsData.map((skill) => (
                                    <Link
                                        className={Styles.skillLink}
                                        key={`duplicate-${skill.fileName}`}
                                        href={`/projects/${skill.fileName}`}
                                        tabIndex={-1}
                                    >
                                        {skill.fileName}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </Block>

            {projects.map((project, index) => (
                <Block
                    key={index}
                    noPadding
                    column={{
                        default: `${index % 2 === 0 ? 1 : 5} / span 4`,
                        lg: '1 / span 8'
                    }}
                    row={{
                        default: `${1 + Math.floor(index / 2) * 4 + (index % 2)} / span 4`,
                        lg: `${2 + index * 4} / span 4`
                    }}
                >
                    <ProjectContainer project={project} />
                </Block>
            ))}
        </div>
    );
}
