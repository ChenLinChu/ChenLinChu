import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import React from 'react';

import { Link } from '@/i18n/navigation';
import type { Project } from '@/types/project';

import Styles from './index.module.scss';

export default async function ProjectContainer(
    { project }: { project: Project }
): Promise<React.ReactNode> {
    const t = await getTranslations('main.page.block.projects');
    const device = project.device ?? 'desktop';
    const isMobileLike = device === 'mobile';
    const isTablet = device === 'tablet';
    const coverLinkClassName = [
        Styles.coverLink,
        isMobileLike ? Styles.coverLinkMobile : '',
        isTablet ? Styles.coverLinkTablet : ''
    ].filter(Boolean).join(' ');

    return (
        <div className={Styles.container}>
            <article className={Styles.cardFrame}>
                <div className={Styles.cardHeader}>
                    <span className={Styles.cardTitle}>{project.title}</span>
                </div>
                <Link
                    className={coverLinkClassName}
                    href={`/project/${project.seo_slug}`}
                >
                    {isMobileLike ? (
                        <div className={Styles.deviceFrame}>
                            <div className={Styles.browserContent}>
                                <Image
                                    className={Styles.cover}
                                    src={project.cover_image_url}
                                    alt={project.title}
                                    fill
                                    sizes="(max-width: 767px) 78vw, (max-width: 1199px) 48vw, 420px"
                                />
                            </div>
                        </div>
                    ) : (
                        <div className={Styles.browserContent}>
                            <Image
                                className={Styles.cover}
                                src={project.cover_image_url}
                                alt={project.title}
                                fill
                                sizes="(max-width: 767px) 92vw, (max-width: 1199px) 48vw, 560px"
                            />
                        </div>
                    )}
                </Link>
                <div className={Styles.cardBody}>
                    <Link
                        className={Styles.titleLink}
                        href={`/project/${project.seo_slug}`}
                    >
                        <h3 className={Styles.title}>{project.title}</h3>
                    </Link>
                    <p className={Styles.subtitle}>{project.subtitle}</p>
                    <div className={Styles.tagsRow}>
                        <span className={Styles.tagsLabel}>{t('technologies')}</span>
                        <div className={Styles.tags}>
                            {project.tags.slice(0, 4).map((skillTag, tagIndex) => (
                                <Link
                                    className={Styles.tag}
                                    href={`/projects/${skillTag}`}
                                    key={tagIndex}
                                >
                                    {skillTag}
                                </Link>
                            ))}
                            {project.tags.length > 4 && (
                                <span className={Styles.moreDesktop}>
                                    +{project.tags.length - 4}
                                </span>
                            )}
                            {project.tags.length > 3 && (
                                <span className={Styles.moreMobile}>
                                    +{project.tags.length - 3}
                                </span>
                            )}
                        </div>
                    </div>
                    <p className={Styles.buildAt}>
                        {t('buildAt', { company: project.build_at })}
                    </p>
                    {project.external_link && (
                        <Link
                            className={Styles.externalLink}
                            href={project.external_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={t('externalLinkAriaLabel', {
                                title: project.title
                            })}
                        >
                            <Image
                                className={Styles.externalLinkIcon}
                                src={'/icons/External Link.svg'}
                                alt={t('externalLinkIconAlt')}
                                width={16}
                                height={16}
                            />
                        </Link>
                    )}
                </div>
            </article>
        </div>
    );
}
