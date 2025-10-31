import { useEffect, useState } from "react";
import ChevronDownSvgIcon from "../../components/Icons/ChevronDownSvgIcon";
import { getUserVisitedUrls } from "../../utils/supabase.ts";
import { getFormattedValue } from "../../utils/globalFuncs.ts";

const AnalysisTab = ({session}) => {

    const [arrUserVisitedUrls, setArrUserVisitedUrls] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        if (session?.user?.id){
            fetchUserVisitedUrls(session?.user?.id);
            setCurrentUser(session.user);
        }

        // return () => {

        // }
    }, [session])

    async function fetchUserVisitedUrls(userId){
        if (userId) {
            let result = await getUserVisitedUrls(userId);
            setArrUserVisitedUrls(result);
            console.log("Total user urls:", result);
        }
    }

    return (
        <section className="page analysis">
            <div className="page-content analysis-content flex-col center">
                <div className="flex-col full-width main-info">
                    <div className="toolbar flex-row full-width flex-start center">
                        <div className="dropdown-btn">
                            Today
                            <ChevronDownSvgIcon className="icon without-margin"/>
                        </div>
                    </div>
                    <div className="stastistics-table flex-row space-between center">
                        <div className="statistic-block">
                            <div className="key">Sites Scanned</div>
                            <div className="value">165</div>
                        </div>
                        <div className="cols-separator"></div>
                        <div className="statistic-block">
                            <div className="key">Today Emails Scanned</div>
                            <div className="value">0</div>
                        </div>
                        <div className="cols-separator"></div>
                        <div className="statistic-block">
                            <div className="key">Times Spent</div>
                            <div className="value">02:30:00</div>
                        </div>
                        <div className="cols-separator"></div>
                        <div className="statistic-block">
                            <div className="key">News Scanned</div>
                            <div className="value">500</div>
                        </div>
                    </div>

                    <div className="visits-info flex-col">
                        <div className="table visited-urls">
                            <div className="table-header flex-row flex-start description light">Browser Chrome | {currentUser?.email}</div>
                            <div className="table-body">
                                {
                                    arrUserVisitedUrls.map((item, index) => (
                                        <div key={`url_${index}`} className="table-row flex-row flex-start center full-width">
                                            <div className="table-cell icon without-margin">
                                                <img src={item.icon} className="favicon" alt="Website Icon"/>
                                            </div>
                                            <div className="table-cell title flex-start">
                                                <div className="site-title description">{item.title}</div>
                                                <div className="site-category description light"> | Other</div>
                                            </div>
                                            <div className="table-cell visits-info description light">
                                                {item.visit_count}x | {getFormattedValue(item.visit_duration)}
                                            </div>
                                            <div className="table-cell statistics-chart">

                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
};

export default AnalysisTab;