import React, { useState, useEffect } from 'react';

import { createPostAPIData, getAPICall } from '../common-util/service'
import { SportsUtil } from '../common-util/sports-util'

import InfoBanner from '../reuseable-component/InfoBanner';
import CommonModal from '../reuseable-component/commonModal';
export default function SportPolling() {
    //declration of state/variable
    const [sports, setSPorts] = useState([]);
    const [sportByCategory, setSportByCategory] = useState([]);
    const [category, setCategory] = useState();
    const [entries, setEntries] = useState([])
    const [displayQuestion, setDisplayQuestion] = useState({});
    const [homeTeam, setHomeTeam] = useState([]);
    const [awayTeam, setAwayTeam] = useState([]);
    const [showError, setShowError] = useState(false);

    const getSportsCategories = () => {
        //UNCOMMENT THIS FOR READING JSON FILE FROM LOCAL
        fetch('data.json', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then(function (response) {
            console.log(response)
            return response.json();
        })
            .then(function (sportJson) {
                //   console.log('sportJson===', sportJson)
                setSPorts(sportJson);
            })
        //UNCOMMENT THIS SECTION FOR API CALL FROM SERVICE
        //  getAPICall('/users')
        // .then((result) => {
        //     console.log('Data---->',result)
        //     const sportList = result.data;
        //     setSPorts(sportList);
        // }).catch((exception) => { console.log('SPORTS_LIST_ERROR') })
    }

    //
    const getSportDataCategory = () => {
        if (sports.length) {
            //Grouping data by sports
            const grouped = SportsUtil.groupBy(sports, sport => sport.sport)
            //get random Category from the Group
            let randomCategory = SportsUtil.randomCateory(grouped)
            setCategory(randomCategory);
            if (randomCategory) {
                //based upon the random category ,get all the mathced value from the sport json
                const matchedList = grouped.get(randomCategory)
                setEntries(matchedList);


            }
        }
    }

    const getDisplayQuestionData = () => {
        if (entries.length) {

            let displayQuestion = SportsUtil.randomCountryQuestion(entries);
            setDisplayQuestion(displayQuestion)
        }
    }

    //will be invoking inside method on mounting of component
    useEffect(() => {
        getSportsCategories()
        if (sports.length) {
            getSportDataCategory();
        }
    }, [])
    useEffect(() => {
        if (entries.length) {
            getDisplayQuestionData()
        }

    }, [entries])

    const updateHomeTeam = (homeName) => {
        console.log('homeName', homeName)

        setHomeTeam(homeName)
        if (homeTeam) {
            const result = createPostAPIData('POST', 'homeTeam', homeTeam)
            switch (result.httpStatus) {
                case 200:
                    getDisplayQuestionData();
                    removedFromList(homeTeam);
                case 400:
                    setShowError(true)
                default:
                    setShowError(false)
                    break;
            }
        }

    }
    //
    const updateAwayTeam = (awayName) => {
        setAwayTeam(awayName)
        if (awayTeam) {
            const result = createPostAPIData('POST', 'awayTeam', awayTeam)
            switch (result.httpStatus) {
                case 200:
                    getDisplayQuestionData();
                    removedFromList(awayTeam);
                case 400:
                    setShowError(true)
                default:
                    setShowError(false)
                    break;
            }
        }

    }

    const removedFromList = (name, category) => {
        let localSports = sports;
        const test = localSports.filter(item => item.homeName !== name)
        // console.log('test-----', test)
    }

    return <div className="content">
        {category ? <div className='rectangle'>
            <div className='align-center '><b> POLL</b></div>
            <p className='align-center'> Which team do you think will win in {category} ?</p>
            {displayQuestion !== '' ?
                <div className='align-center'>
                    <button className='button-primary' onClick={() => updateHomeTeam(displayQuestion.homeName)}>{displayQuestion.homeName}
                    </button> &nbsp;&nbsp;
                    <button className='button-primary' >Draw
                    </button>&nbsp;&nbsp;
                    <button className='button-primary' onClick={() => updateAwayTeam(displayQuestion.awayName)}>{displayQuestion.awayName}
                    </button></div>
                : null}
        </div> : <InfoBanner message={'OOPS, Please try after sometime.'} header={'Error!!'} />}
        {showError ? <commonModal header={'Error'} message={'Issue Occured while saving the request'} close={setShowError(false)} /> : null}
    </div>
}

