import React from 'react';
import {Tabs, TabList, Tab, TabPanel} from 'react-tabs'
import OurPackages from './OurPackages/OurPackages';
import TourGuides from './TourGuides/TourGuides';
import TourGuidesTab from './TourGuides/TourGuides';

const TourismTravelGuideSection = () => {
    return (
        <div>
            <div>
                <h2 className='text-4xl font-bold cinzel-font dark:text-zinc-400 text-zinc-700 text-center mb-6 underline'>Packages and Travel Guide</h2>
            </div>
            <section>
                <Tabs>
                    <TabList className="flex space-x-4 justify-center mb-10">
                        <Tab
                            className="py-2 px-4 cursor-pointer focus:outline-none uppercase font-bold"
                            selectedClassName="py-2 px-4 cursor-pointer border-b-4 border-[#BB8506] text-[#BB8506]"
                        >
                            Our Packages
                        </Tab>
                        <Tab
                            className="py-2 px-4 cursor-pointer focus:outline-none uppercase font-bold"
                            selectedClassName="py-2 px-4 cursor-pointer border-b-4 border-[#BB8506] text-[#BB8506]"
                        >
                            Meet Our Tour Guides
                        </Tab>
                        
                    </TabList>

                    {/* our packages tab  */}
                    <TabPanel>
                        <OurPackages></OurPackages>
                    </TabPanel>

                    {/* meet our tour guides tab  */}
                    <TabPanel>
                        <TourGuidesTab></TourGuidesTab>
                    </TabPanel>
                </Tabs>
            </section>
        </div>
    );
};

export default TourismTravelGuideSection;