import React, { useState, useEffect } from "react";
import styles from "../../style/PeriodSelector.module.sass";
import ChevronDownSvgIcon from "../Icons/ChevronDownSvgIcon";

interface Period {
  key: string;
  label: string;
}

interface PeriodSelectorProps {
  onChange?: (langCode: string) => void;
  defLang: string;
}

const periods: Period[] = [
  { key: "today", label: "Today" },
  { key: "yesterday", label: "Yesterday" },
  { key: "week", label: "Last 7 Days" },
  { key: "month", label: "Last 30 Days" },
  { key: "all", label: "All Time" }
];

const PeriodSelector: React.FC<PeriodSelectorProps> = ({ onChange, defPeriod }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedPeriod, setSelectedPeriod] = useState<string>(defPeriod || "yesterday");

  // useEffect(() => {
  //   const browserLang = navigator.language || (navigator as any).userLanguage;
  //   const match = periods.find(lang => lang.key === browserLang);
  //   if (match) {
  //     setSelectedLang(match.code);
  //     onChange?.(match.code);
  //   }
  // }, [onChange]);

//   const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     const value = e.target.value;
//     setSelectedPeriod(value);
//     onChange?.(value);
//   };

  const handleChange = (newValue) => {
    setSelectedPeriod(newValue);
    // onChange?.(value);
    setIsOpen(false);
  };

  return (
    <div className={styles["dropdown-wrapper"]}>
        <div className={styles["dropdown-btn"]} onClick={() => setIsOpen(!isOpen)}>
            {selectedPeriod}
            <ChevronDownSvgIcon className="icon without-margin"/>
        </div>
        {isOpen && (
            <ul className={`${styles["dropdown-menu"]} description`}>
                {periods.map(period => (
                    <li key={period.key} className="flex-row center flex-start description light" value={period.key} onClick={e => handleChange(period.key)}>
                        {period.label}
                    </li>
                ))}
            </ul>
        )}
    </div>


    // <select value={selectedPeriod} className={styles["ext-dropdown"]} onChange={handleChange}>
    //   {periods.map(period => (
    //     <option key={period.key} value={period.key}>
    //       {period.label}
    //     </option>
    //   ))}
    // </select>
  );
};


export default PeriodSelector;