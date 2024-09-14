import { useState } from "react";
import { SlArrowDown } from "react-icons/sl";
import '../component/css/search.css';
import { useSelector, useDispatch } from "react-redux";
import { featchSearch, setSector, setexpirence, setTag } from "../slicer/searchSlice";
import { cities } from "./Cities";
import { tagsConst } from "./Tags";

function Filters({ display_1, display_2 = 'flex', display_3 = 'flex', sectorValue }) {
    const [selectedValue1, setSelectedValue1] = useState('');
    const [selectedValue2, setSelectedValue2] = useState('');
    const [selectedValue3, setSelectedValue3] = useState('');
    // setSector = sectorValue

    const dispatch = useDispatch();

    const sector = useSelector((state) => state.search.sector)

    const [value, setValue] = useState(sectorValue)

    const options1 = ["All", "ENTREPRENEUR", "STUDENT", "STARTUP", "LEGALITIES", "EMPLOYEE", "RECRUITER", "INVESTOR", "INFLUENCER", "MARKETING"];
    const options2 = ["any", 1, 2, 3, 4];
    const options3 = ["all", "student", "designer", "openToWork"];

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
                    className={` justify-between items-center px-4 py-2`}
                    id="filter-sector-1"
                >
                    Sector
                </button>
                <select
                    value={sector}
                    onChange={(e) => handleSector(e)}
                    className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg appearance-none px-4 py-2"
                    aria-labelledby="filter-sector-1"
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
                    Experience

                </button>
                <select

                    onChange={(e) => { dispatch(setexpirence(e.target.value)); dispatch(featchSearch()) }}
                    className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg appearance-none px-4 py-2"
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

                    General Tags
                </button>
                <select
                    onChange={(e) => { dispatch(setTag(e.target.value)); dispatch(featchSearch()) }}
                    className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg appearance-none px-4 py-2"
                    aria-labelledby="filter-jobtype">
                    <option value="" disabled style={{ color: 'grey' }}>
                        all
                    </option>
                    {
                        tagsConst[sector]?.map((data) => (
                            <option key={data} value={data}>#{data}</option>
                        ))
                    }
                    {
                        tagsConst['Networking and Collaboration Hashtags']?.map((data) => (
                            <option key={data} value={data}>#{data}</option>
                        ))
                    }
                    {
                        tagsConst['Location-specific']?.map((data) => (
                            <option key={data} value={data}>#{data}</option>
                        ))
                    }
                </select>
            </div>

            <div className="relative w-[150px]">
                <button
                    className={`${display_3} justify-between items-center px-4 py-2 `}
                    id="filter-jobtype"
                >

                    Sector Tags
                </button>
                <select
                    onChange={(e) => { dispatch(setTag(e.target.value)); dispatch(featchSearch()) }}
                    className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg appearance-none px-4 py-2"
                    aria-labelledby="filter-jobtype">
                    <option value="" disabled style={{ color: 'grey' }}>
                        all
                    </option>
                    {
                        tagsConst['Sector-Specific Hashtags']?.map((data) => (
                            <option key={data} value={data}>#{data}</option>
                        ))
                    }
                </select>
            </div>

            <div className="relative w-[150px]">
                <button
                    className={`${display_3} justify-between items-center px-4 py-2 `}
                    id="filter-jobtype"
                >
                    Location
                </button>
                <select
                    value={selectedValue3}
                    onChange={(e) => dispatch(setTag(e.target.value))}
                    className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg appearance-none px-4 py-2"
                    aria-labelledby="filter-jobtype">
                    <option value="" disabled style={{ color: 'grey' }}>
                        Choose City
                    </option>
                    {cities.map((option, index) => (
                        <option key={index} value={option} >{option}</option>
                    ))}
                </select>
            </div>

        </div>
    );
}

export default Filters;
