import { useState } from "react";
import '../component/css/search.css';
import { useSelector, useDispatch } from "react-redux";
import { featchSearch, setSector, setexpirence } from "../slicer/searchSlice";

function RecommendationFilter({ display_1, display_2 = 'flex', display_3 = 'flex', sectorValue }) {
    const [selectedValue1, setSelectedValue1] = useState('');
    const [selectedValue2, setSelectedValue2] = useState('');
    const [selectedValue3, setSelectedValue3] = useState('');
    // setSector = sectorValue

    const dispatch = useDispatch();

    const sector = useSelector((state) => state.search.sector)

    const [value, setValue] = useState(sectorValue)

    const options1 = ["All", "ENTREPRENEUR", "STUDENT", "BUSINESS", "SERVICE_PROVIDER", "FREELANCER", "EMPLOYEE", "RECRUITER", "INVESTOR", "NETWORK"];
    const options2 = ["any", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const options3 = ["all", "Option X", "Option Y", "Option Z"];

    const handleSelect2 = (event) => {
        setSelectedValue2(event.target.value);
    };

    const handleSelect3 = (event) => {
        setSelectedValue3(event.target.value);
    };

    const handleSector = (event) => {
        setValue(event.target.value)
        dispatch(setSector(event.target.value))
        dispatch(featchSearch());
    }

  return (
    <div className='py-3 flex flex-row gap-4 w-full items-start justify-center pl-3 lg:pr-20'>
            <div className="relative w-[150px]">
                <button
                    className={`${display_1} justify-between items-center px-4 py-2`}
                    id="filter-sector-1"
                >
                    Sector
                </button>
                <select
                    value={sector}
                    onChange={(e) => handleSector(e)}
                    className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-10 appearance-none px-4 py-2"
                // aria-labelledby="filter-sector-1"
                >
                    {options1.map((option, index) => (
                        <option key={index} value={option} >{option}</option>
                    ))}
                </select>
            </div>

            <div className="relative w-[150px]">
                <button
                    className={`${display_2} justify-between items-center px-4 py-2`}
                    id="filter-sector-2"
                >
                    expirence

                </button>
                <select

                    onChange={(e) => dispatch(setexpirence(e.target.value))}
                    className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-10 appearance-none px-4 py-2"
                    aria-labelledby="filter-sector-2"
                >
                    {options2.map((option, index) => (
                        <option key={index} value={option}>{option}</option>
                    ))}
                </select>
            </div>

            <div className="relative w-[150px]">
                <button
                    className={`${display_3} justify-between items-center px-4 py-2 `}
                    id="filter-jobtype"
                >
                    JobType
                </button>
                <select
                    value={selectedValue3}
                    onChange={handleSelect3}
                    className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-10 appearance-none px-4 py-2"
                    aria-labelledby="filter-jobtype"
                >
                    {options3.map((option, index) => (
                        <option key={index} value={option}>{option}</option>
                    ))}
                </select>
            </div>
        </div>
  )
}

export default RecommendationFilter