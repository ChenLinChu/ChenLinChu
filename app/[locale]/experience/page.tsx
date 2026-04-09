import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import React from 'react';

import experience from '@/lib/experience';
import { createSeoMetadata } from '@/lib/seo/metadata';
import { createBreadcrumbSchema } from '@/lib/seo/schemas';

import Styles from './page.module.scss';

export async function generateMetadata(
    { params }: { params: Promise<{ locale: string }> }
): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations('metadata.experience');

    return createSeoMetadata({
        locale,
        path: '/experience',
        title: t('title'),
        description: t('description'),
        keywords: t('keywords')
    });
}

export default async function Experience(
    { params }: { params: Promise<{ locale: string }> }
): Promise<React.ReactNode> {
    const { locale } = await params;
    const t = await getTranslations('main.experience');
    const tBreadcrumb = await getTranslations('metadata.breadcrumb');
    const breadcrumbSchema = createBreadcrumbSchema(locale, [
        { name: tBreadcrumb('home'), path: '/' },
        { name: tBreadcrumb('experience'), path: '/experience' }
    ]);
    return (
        <div className={Styles.wrapper}>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <section className={Styles.showcase}>
                <div className={Styles.hero}>
                    <h1 className={Styles.heroTitle}>{t('pageTitle')}</h1>
                    <p className={Styles.heroSubtitle}>{t('pageSubtitle')}</p>
                </div>
                <div className={Styles.timeline}>
                    {experience.map((item, index) => {
                        const start = `${item.startDate.year}-${item.startDate.month}`;
                        const dateRange =
                            item.endDate.year === null
                                ? `${start} – ${t('dateFormat.present')}`
                                : `${start} – ${item.endDate.year}-${item.endDate.month}`;
                        const content = t.raw(`content.${item.company}_${item.position}`) as {
                            title: string;
                            list: string[];
                        }[];

                        return (
                            <article
                                className={Styles.timelineCard}
                                key={index}
                            >
                                <div className={Styles.timelineHead}>
                                    <h2 className={Styles.role}>
                                        {t(`positions.${item.position}`)}
                                    </h2>
                                    <p className={Styles.company}>
                                        {t(`companies.${item.company}`)}
                                    </p>
                                    <p className={Styles.date}>{dateRange}</p>
                                </div>
                                <div className={Styles.timelineBody}>
                                    {content.map((section, sectionIndex) => (
                                        <section
                                            className={Styles.section}
                                            key={sectionIndex}
                                        >
                                            <h3 className={Styles.sectionTitle}>
                                                {section.title}
                                            </h3>
                                            <ul className={Styles.sectionList}>
                                                {section.list.map((listItem, listIndex) => (
                                                    <li key={listIndex}>{listItem}</li>
                                                ))}
                                            </ul>
                                        </section>
                                    ))}
                                </div>
                            </article>
                        );
                    })}
                </div>
            </section>
        </div>
    );
}
