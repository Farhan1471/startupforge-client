import React from 'react';
import StartupProfile from './StartupProfile';
import { getUserSession } from '@/lib/core/session';
import { getFounderStartup } from '@/lib/api/startups';

const StartupPage = async () => {

    const user = await getUserSession();
    const company = await getFounderStartup(user?.id);

    return (
        <div>
            <StartupProfile founder={user} founderEmail={user?.email} founderStartup={company}></StartupProfile>
        </div>
    );
};

export default StartupPage;