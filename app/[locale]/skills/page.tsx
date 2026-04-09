import type { Metadata } from 'next';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import React from 'react';

import { skillsData } from '@/components/app/skills/skillsData';
import { Link } from '@/i18n/navigation';
import { createSeoMetadata } from '@/lib/seo/metadata';
import { createBreadcrumbSchema } from '@/lib/seo/schemas';

import Styles from './page.module.scss';

export async function generateMetadata(
    { params }: { params: Promise<{ locale: string }> }
): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations('metadata.skills');

    return createSeoMetadata({
        locale,
        path: '/skills',
        title: t('title'),
        description: t('description'),
        keywords: t('keywords')
    });
}

export default async function SkillsPage(
    { params }: { params: Promise<{ locale: string }> }
): Promise<React.ReactElement> {
    const { locale } = await params;
    const t = await getTranslations('main.skills');
    const tBreadcrumb = await getTranslations('metadata.breadcrumb');
    const breadcrumbSchema = createBreadcrumbSchema(locale, [
        { name: tBreadcrumb('home'), path: '/' },
        { name: tBreadcrumb('skills'), path: '/skills' }
    ]);

    return (
        <main className={Styles.container}>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <section className={Styles.showcase}>
                <div className={Styles.hero}>
                    <h1 className={Styles.heroTitle}>{t('pageTitle')}</h1>
                    <p className={Styles.heroSubtitle}>{t('pageSubtitle')}</p>
                </div>
                <div className={Styles.groups}>
                    {skillsData.map((block) => (
                        <section
                            className={Styles.groupCard}
                            key={block.title}
                        >
                            <h2 className={Styles.groupTitle}>
                                {t(block.title)}
                            </h2>
                            <div className={Styles.skillChips}>
                                {block.skills.map((skill) => {
                                    const iconClassName = [
                                        Styles.skillChipIcon,
                                        skill.isBlackIcon ? Styles.skillChipIconWhite : ''
                                    ].filter(Boolean).join(' ');

                                    return (
                                        <Link
                                            className={Styles.skillChip}
                                            href={`/projects/${skill.fileName}`}
                                            key={skill.fileName}
                                        >
                                            <Image
                                                className={iconClassName}
                                                src={`/icons/${skill.fileName}.svg`}
                                                alt={skill.fileName}
                                                width={18}
                                                height={18}
                                            />
                                            {skill.fileName}
                                        </Link>
                                    );
                                })}
                            </div>
                        </section>
                    ))}
                </div>
                <div className={Styles.footerHint}>
                    {t('footerHint')}
                </div>
            </section>
        </main>
    );
}
