import { useEffect, useState } from "react";
import { MONEYMARKET } from "../../utils/config"
import useFetch from "../topSports/useFetch"
import MainCard from "../topStoriesNews/MainCard";

const CurrencyCard = () => {
    const [stateCard,setStateCard] = useState(0)
    const {data,loading,error} = useFetch(MONEYMARKET,"currency")
    const tabs = data?.tabListDetails;
    const {crypto,
        currencies,
        market,
        recommend,
        watchlist} = tabs || {}
    console.log("currency",data)
    const forTitle = {
        "crypto":crypto,
        "currencies":currencies,
        "market":market,
        "recommend":recommend,
        "watchlist":watchlist
    }
    const itr = ["crypto","currencies","market","recommend","watchlist"]
    const handleCardsForw = () => {
        if(stateCard<itr.length-2){
            setStateCard(stateCard+1)
        }
    }
    const handleCardsBack = () => {
        if(stateCard>0){
            setStateCard(stateCard-1)
        }
    }
    console.log("change look--",itr[stateCard])

    return (
        <>
            {tabs&&(<MainCard handleCardsBack={handleCardsBack} handleCards={handleCardsForw} title={`${itr[stateCard]}`} crypto={forTitle[itr[stateCard]].quoteItems} activeStepCurrency={stateCard}/>)}
        </>
    )
}

export default CurrencyCard