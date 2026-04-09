import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import React, { cache } from 'react';
import Markdown from 'react-markdown';
import remarkBreaks from 'remark-breaks';
import remarkGfm from 'remark-gfm';

import { Link } from '@/i18n/navigation';
import { getProjectBySlugAndLanguage } from '@/lib/queries/projects';
import { createSeoMetadata, getMetadataBase } from '@/lib/seo/metadata';
import { createBreadcrumbSchema } from '@/lib/seo/schemas';
import { getSkills } from '@/lib/skills';

import styles from './page.module.scss';

const getProject = cache(async (slug: string, locale: string) =>
    getProjectBySlugAndLanguage(slug, locale)
);

export async function generateMetadata(
    { params }: { params: Promise<{ locale: string; slug: string }> }
): Promise<Metadata | undefined> {
    const { locale, slug } = await params;
    const project = await getProject(slug, locale);

    if (project) {
        const t = await getTranslations('metadata.project/[slug]');
        const title = t('title', { title: project.title });
        const keywords = project.seo_keywords.join(locale === 'zh-TW' ? '、' : ', ');

        return createSeoMetadata({
            locale,
            path: `/project/${slug}`,
            title,
            description: project.seo_description,
            keywords,
            image: project.cover_image_url
        });
    }

    return undefined;
}

export default async function Project(
    { params }: { params: Promise<{ locale: string; slug: string; }> }
): Promise<React.ReactNode> {
    const { locale, slug } = await params;
    const project = await getProject(slug, locale);
    const skillsData = getSkills(project?.tags ?? []);
    const content = project?.content?.replace(/\\n/g, '\n');

    if (!project) notFound();

    const baseUrl = getMetadataBase().toString();
    const projectUrl = `${baseUrl}/${locale}/project/${slug}`;

    const t = await getTranslations('metadata.breadcrumb');
    const tProject = await getTranslations('main.projectDetail');
    const breadcrumbSchema = createBreadcrumbSchema(locale, [
        { name: t('home'), path: '/' },
        { name: t('projects'), path: '/projects' },
        { name: project.title, path: `/project/${slug}` }
    ]);

    const creativeWorkSchema = {
        '@context': 'https://schema.org',
        '@type': 'CreativeWork',
        name: project.title,
        description: project.seo_description,
        url: projectUrl,
        author: {
            '@type': 'Person',
            name: locale === 'zh-TW' ? '朱晨霖' : 'Chen Lin Chu',
            url: baseUrl
        },
        datePublished: project.build_at,
        ...(project.updated_at && { dateModified: project.updated_at }),
        image: project.cover_image_url,
        keywords: project.seo_keywords.join(', ')
    };

    const device = project.device ?? 'desktop';
    const isMobileLike = device === 'mobile';
    const isTablet = device === 'tablet';
    const coverWrapperClassName = [
        styles.coverWrapper,
        isMobileLike ? styles.coverWrapperMobile : '',
        isTablet ? styles.coverWrapperTablet : ''
    ].filter(Boolean).join(' ');
    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <div className={styles.previewFrame}>
                    <div className={styles.previewHeader}>
                        <span className={styles.previewTitle}>{project.title}</span>
                    </div>
                    <div className={coverWrapperClassName}>
                        {isMobileLike ? (
                            <div className={styles.deviceFrame}>
                                <div className={styles.browserContent}>
                                    <Image
                                        className={styles.cover}
                                        src={project.cover_image_url}
                                        alt={project.title}
                                        fill
                                        sizes={
                                            '(max-width: 767px) 76vw, '
                                            + '(max-width: 1199px) 48vw, 420px'
                                        }
                                        priority
                                    />
                                </div>
                            </div>
                        ) : (
                            <div className={styles.browserContent}>
                                <Image
                                    className={styles.cover}
                                    src={project.cover_image_url}
                                    alt={project.title}
                                    fill
                                    sizes="(max-width: 767px) 92vw, (max-width: 1199px) 72vw, 800px"
                                    priority
                                />
                            </div>
                        )}
                    </div>
                </div>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
                />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(creativeWorkSchema) }}
                />
                <div className={styles.contentCard}>
                    <div className={styles.actions}>
                        <Link
                            className={styles.secondaryAction}
                            href="/projects"
                        >
                            {tProject('backToProjects')}
                        </Link>
                        {project.external_link && (
                            <Link
                                className={styles.primaryAction}
                                href={project.external_link}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {tProject('viewLive')}
                            </Link>
                        )}
                    </div>
                    <h1 className={styles.title}>{project.title}</h1>
                    <p className={styles.subtitle}>{project.subtitle}</p>
                    <div className={styles.skills}>
                        {skillsData.map((skill, index) => (
                            <Link
                                className={styles.skillLink}
                                key={index}
                                href={`/projects/${skill.fileName}`}
                            >
                                <Image
                                    className={styles.skillIcon}
                                    src={`/icons/${skill.fileName}.svg`}
                                    alt={skill.fileName}
                                    width={24}
                                    height={24}
                                />
                                {skill.fileName}
                            </Link>
                        ))}
                    </div>

                    <div className={styles.markdown}>
                        <Markdown remarkPlugins={[remarkGfm, remarkBreaks]}>
                            {content}
                        </Markdown>
                    </div>
                </div>
            </div>
        </div>
    );
}
