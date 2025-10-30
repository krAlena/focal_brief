const AnalysisTab = () => {

    return (
        <section className="page analysis">
            <div className="page-content analysis-content flex-col center">
                <div className="flex-col full-width main-info">
                    <div className="toolbar flex-row full-width flex-start center">
                        <div className="dropdown-btn">
                            Yesterday
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
                </div>
            </div>
        </section>
    )
};

export default AnalysisTab;