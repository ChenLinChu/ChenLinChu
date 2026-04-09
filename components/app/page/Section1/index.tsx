import React from 'react';

import LocaleSwitch from '@/components/app/page/Section1/LocaleSwitch';
import Map from '@/components/app/page/Section1/Map';
import Profile from '@/components/app/page/Section1/Profile';
import Resume from '@/components/app/page/Section1/Resume';
import ToggleTheme from '@/components/app/page/Section1/ToggleTheme';
import Block from '@/components/shared/Block';

import { HOME_GRID_COLUMNS, HOME_GRID_ROWS } from '../layoutGrid';
import LocalTime from './LocalTime';
import SpotifyNowPlaying from './SpotifyNowPlaying';

export default function Section1(): React.ReactNode {
    return (
        <>
            {/* Profile */}
            <Block
                column={{
                    ...HOME_GRID_COLUMNS.section1.profile
                }}
                row={{
                    ...HOME_GRID_ROWS.section1.profile
                }}
            >
                <Profile />
            </Block>

            {/* Local Time */}
            <Block
                column={{
                    ...HOME_GRID_COLUMNS.section1.localTime
                }}
                row={{
                    ...HOME_GRID_ROWS.section1.localTime
                }}
            >
                <LocalTime />
            </Block>

            {/* Locale Switch */}
            <Block
                column={{
                    ...HOME_GRID_COLUMNS.section1.localeSwitch
                }}
                row={{
                    ...HOME_GRID_ROWS.section1.localeSwitch
                }}
            >
                <LocaleSwitch />
            </Block>

            {/* Map */}
            <Block
                column={{
                    ...HOME_GRID_COLUMNS.section1.map
                }}
                row={{
                    ...HOME_GRID_ROWS.section1.map
                }}
                noPadding
            >
                <Map />
            </Block>

            {/* Toggle Theme */}
            <Block
                column={{
                    ...HOME_GRID_COLUMNS.section1.toggleTheme
                }}
                row={{
                    ...HOME_GRID_ROWS.section1.toggleTheme
                }}
            >
                <ToggleTheme />
            </Block>

            {/* Spotify Now Playing */}
            <Block
                column={{
                    ...HOME_GRID_COLUMNS.section1.spotify
                }}
                row={{
                    ...HOME_GRID_ROWS.section1.spotify
                }}
            >
                <SpotifyNowPlaying />
            </Block>

            {/* Resume */}
            <Block
                column={{
                    ...HOME_GRID_COLUMNS.section1.resume
                }}
                row={{
                    ...HOME_GRID_ROWS.section1.resume
                }}
            >
                <Resume />
            </Block>
        </>
    );
}
