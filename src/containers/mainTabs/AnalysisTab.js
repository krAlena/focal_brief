import { useEffect, useRef, useState } from "react";
import ChevronDownSvgIcon from "../../components/Icons/ChevronDownSvgIcon";
import { getGeneralStatistics, getGeneralStatisticsNew, getUserVisitedUrls } from "../../utils/supabase.ts";
import { getFormattedValue } from "../../utils/globalFuncs.ts";
import PeriodSelector from "../../components/common/PeriodSelector.tsx";
import { TimerTracker } from "../../components/common/TimerTracker.tsx";

const AnalysisTab = ({session}) => {

    const [arrUserVisitedUrls, setArrUserVisitedUrls] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const [selectedPeriod, setSelectedPeriod] = useState("today");
    const [generalStatistics, setGeneralStatistics] = useState(null);
    const timerRef = useRef(null);
    const intervalRef = useRef(null);
    const [formattedTime, setFormattedTime] = useState("00:00:00");

    useEffect(() => {
        if (session?.user?.id){
            fetchUserVisitedUrls(session?.user?.id, selectedPeriod);
            fetchGeneralStats(session?.user?.id);
            setCurrentUser(session.user);
        }

        // return () => {

        // }
    }, [session])

    async function fetchGeneralStats(userId){
        console.log("fetchGeneralStats general stats for user:", userId);
        console.log("session:", session);
        if (userId) {
            let generalStats = await getGeneralStatisticsNew(userId);
            // daily_duration
            // daily_unique_urls
            // total_duration
            // total_unique_urls
            if (generalStats?.total_duration){
                runTimer(generalStats.total_duration);
            }
            console.log("General statistics NEW:", generalStats);
            setGeneralStatistics(generalStats);
        }
    }

    function runTimer(initialSeconds) {
        console.log('runTimer initialSeconds:', initialSeconds);
        if (timerRef.current) {
            timerRef.current.stop();
            timerRef.current = null;
        }
        initialSeconds = Math.floor((initialSeconds || 0));
        timerRef.current = new TimerTracker({ initialSeconds });
        timerRef.current.start();

        if (intervalRef.current) clearInterval(intervalRef.current);
            intervalRef.current = setInterval(() => {
            if (timerRef.current) {
                setFormattedTime(timerRef.current.getFormattedValue());
            }
        }, 1000);
    }

    async function fetchUserVisitedUrls(userId, selectedPeriod){
        if (userId) {
            let selectedDatesRange = getPeriodDateRange(selectedPeriod);
            let startDate = selectedDatesRange.startDate?.toISOString().slice(0, 10) || "1970-01-01";
            let endDate = selectedDatesRange.endDate?.toISOString().slice(0, 10);

            let result = await getUserVisitedUrls(userId, startDate, endDate);
            setArrUserVisitedUrls(result);
            console.log("Total user urls:", result);
        }
    }

    const getPeriodDateRange = (periodKey) => {
        let startDate = new Date();
        let endDate = new Date();

        switch (periodKey) {
            case "today":
                // startDate and endDate are today
                break;
            case "yesterday":
                startDate.setDate(startDate.getDate() - 1);
                endDate.setDate(endDate.getDate() - 1);
                break;
            case "week":
                startDate.setDate(startDate.getDate() - 7);
                break;
            case "month":
                startDate.setDate(startDate.getDate() - 30);
                break;
            case "all":
                startDate = null;
                // endDate = null;
                break;
            default:
                // default to today
                break;
        }

        return {startDate, endDate};
    }

    const handlePeriodChange = (periodKey) => {
        setSelectedPeriod(periodKey);
        console.log('session user id:', currentUser?.id);
        
        if (currentUser?.id){
            fetchUserVisitedUrls(currentUser?.id, periodKey);
        }
    };

    return (
        <section className="page analysis">
            <div className="page-content analysis-content flex-col center">
                <div className="flex-col full-width main-info">
                    <div className="toolbar flex-row full-width flex-start center">
                        <PeriodSelector
                            defPeriod={selectedPeriod}
                            onChange={(periodKey) => handlePeriodChange(periodKey)}
                        />
                    </div>
                    <div className="stastistics-table flex-row space-between center">
                        <div className="statistic-block">
                            <div className="key">Sites Scanned</div>
                            <div className="value">{generalStatistics?.total_unique_urls || 0}</div>
                        </div>
                        <div className="cols-separator"></div>
                        <div className="statistic-block">
                            <div className="key">Today Emails Scanned</div>
                            <div className="value">0</div>
                        </div>
                        <div className="cols-separator"></div>
                        <div className="statistic-block">
                            <div className="key">Times Spent</div>
                            <div className="value">{formattedTime}</div>
                        </div>
                        <div className="cols-separator"></div>
                        <div className="statistic-block">
                            <div className="key">News Scanned</div>
                            <div className="value">0</div>
                        </div>
                    </div>

                    <div className="visits-info flex-col">
                        <div className="table visited-urls">
                            <div className="table-header flex-row flex-start description light">Browser Chrome | {currentUser?.email}</div>
                            <div className="table-body">
                                {
                                    arrUserVisitedUrls.map((item, index) => (
                                        <div key={`url_${index}`} className="table-row flex-row flex-start center full-width">
                                            <div className="table-cell title flex-start">
                                                <img className="favicon" src={item.icon} alt="Website Icon"/>
                                                <div className="site-title description">{item.title}</div>
                                                <div className="site-category description light"> | Other</div>
                                            </div>
                                            <div className="table-cell visits description light">
                                                {item.visit_count}x | {getFormattedValue(item.visit_duration)}
                                            </div>
                                            <div className="table-cell statistics-chart">
                                                <div className="chart-bckg"></div>
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