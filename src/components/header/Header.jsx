import {
    faBed,
    faCalendarDays,
    faCar,
    faPerson,
    faPlane,
    faTaxi,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from 'react'
import { useState } from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import './header.css'
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

export default function Header(props) {

    const [destination,setDestination] = useState();

    const [DateHeader, setDate] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
        }
    ]);
    const [isOpenDate, setOpenDate] = useState(false)
    const navigate = useNavigate();

    const [isOpenOption, setIsOpenOption] = useState(false)
    const [options, setOptions] = useState({
        adult: 1,
        children: 0,
        room: 1
    })

    function handleSubmit(){
        navigate("/hotels",{state:{
            destination : destination,
            date : DateHeader,
            options:options
        }})
    }

    function handelOptionsClick(attribute, op) {

        setOptions((prev) => {
            return {
                ...prev,
                [attribute]: (op === '+') ? options[attribute]++ : options[attribute]--
            }
        });
    }

    return (
        <div className='header'>
            <div className={props.type ==="list"?"headerContainer listMode":"headerContainer"} >
                <div className='headerList'>
                    <div className="headerListItem active">
                        <FontAwesomeIcon icon={faBed} />
                        <span>Stays</span>
                    </div>
                    <div className="headerListItem">
                        <FontAwesomeIcon icon={faPlane} />
                        <span>Flights</span>
                    </div>
                    <div className="headerListItem">
                        <FontAwesomeIcon icon={faCar} />
                        <span>Car rentals</span>
                    </div>
                    <div className="headerListItem">
                        <FontAwesomeIcon icon={faBed} />
                        <span>Attractions</span>
                    </div>
                    <div className="headerListItem">
                        <FontAwesomeIcon icon={faTaxi} />
                        <span>Airport taxis</span>
                    </div>
                </div>
                {props.type !=="list" && (<>
                <h1 className="headerTitle">
                    A lifetime of discounts? It's Genius.
                </h1>
                <p className="headerDesc">
                    Get rewarded for your travels – unlock instant savings of 10% or
                    more with a free Lamabooking account
                </p>
                <button className="headerBtn">Sign in / Register</button>
                <div className="headerSearch">
                    <div className="headerSearchItem">
                        <FontAwesomeIcon icon={faBed} className="headerIcon" />
                        <input
                            type="text"
                            placeholder="Where are you going?"
                            className="headerSearchInput"
                            onChange={(e)=>setDestination(e.target.value)}

                        />
                    </div>
                    <div className="headerSearchItem">
                        <FontAwesomeIcon icon={faCalendarDays} className="headerIcon" />
                        <span
                            onClick={() => setOpenDate(!isOpenDate)}
                            className="headerSearchText"
                        >{`${format(DateHeader[0].startDate, "MM/dd/yyyy")} to ${format(DateHeader[0].endDate, "MM/dd/yyyy")}`}

                        </span>
                        {isOpenDate && (<DateRange
                            className="date"
                            editableDateInputs={true}
                            onChange={item => setDate([item.selection])}
                            moveRangeOnFirstSelection={false}
                            ranges={DateHeader}
                            minDate={new Date()}
                        />)
                        }
                    </div>
                    <div className="headerSearchItem " >
                        <FontAwesomeIcon icon={faPerson} className="headerIcon" />
                        <span onClick={() => setIsOpenOption(!isOpenOption)} className="headerSearchText">{`${options.adult} adult ${options.children} children ${options.room} room`}</span>
                        {isOpenOption && (
                            <div className="options">
                                <div className="optionItem">
                                    <span className="optionText">Adult</span>                                    <div className="optionCounter">
                                        <button disabled={options.adult <= 1} onClick={() => handelOptionsClick("adult", '-')} className="optionCounterButton">-</button>
                                        <span className="optionCounterNumber">
                                            {options.adult}
                                        </span>
                                        <button onClick={() => handelOptionsClick("adult", '+')} className="optionCounterButton">+</button>
                                    </div>
                                </div>

                                <div className="optionItem">
                                    <span className="optionText">Children</span>                                    <div className="optionCounter">
                                        <button disabled={options.room <= 1} onClick={() => handelOptionsClick("children", '-')} className="optionCounterButton">-</button>
                                        <span className="optionCounterNumber">
                                            {options.children}
                                        </span>
                                        <button onClick={() => handelOptionsClick("children", '+')} className="optionCounterButton">+</button>
                                    </div>
                                </div>

                                <div className="optionItem">
                                    <span className="optionText">Room</span>                                    <div className="optionCounter">
                                        <button disabled={options.children <= 1} onClick={() => handelOptionsClick("room", '-')} className="optionCounterButton">-</button>
                                        <span className="optionCounterNumber">
                                            {options.room}
                                        </span>
                                        <button onClick={() => handelOptionsClick("room", '+')} className="optionCounterButton">+</button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="headerSearchItem">
                        <button className="headerBtn" onClick={handleSubmit}>Search</button>
                    </div>
                </div> </>)}
            </div>
        </div>
    )
}
