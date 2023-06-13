import { PlusCircleIcon } from "@heroicons/react/24/outline";
import SurveyListItem from "../components/SurveyListItem";
import TButton from "../components/core/TButton";
import PageComponent from "../components/pageComponent";
import { useEffect, useState } from "react";
import axiosClient from "../axios";
import PaginationLinks from "../components/PaginationLinks";
import { useStateContext } from "../contexts/ContextProvider";

export default function Surveys() { 
  const [surveys, setSurveys] = useState([]);
  const [meta, setMeta] = useState({});
  const [loading, setLoading] = useState(false);
  const {showToast} = useStateContext();

  console.log(surveys);

  const getSurveys = (url) => {
    setLoading(true)
    url = url || '/survey'

    axiosClient.get(url)
    .then(({data}) => {
      console.log(data)
      setSurveys(data.data)
      setMeta(data.meta)
      setLoading(false)
    })
  }

  const onDeleteClick = (id) => {
    if (window.confirm('Are you sure you want to delete this survey?')) {
      axiosClient.delete(`/survey/${id}`)
      .then(() => {
        getSurveys()
        showToast(`deleted Survey with id: ${id}`)
      })
    }
  }

  const onPageClick = (link) => {
    getSurveys(link.url)
  }

  useEffect(() =>{
    getSurveys()
  }, [])

    return (
      <PageComponent title="Surveys" 
       >
        {loading && (
          <div className="text-center font-bold text-lg">
          loading
        </div>)}

        {!loading && surveys.length === 0 && (
          <div className="text-center font-bold text-lg">
            You don't have any surveys created!
          </div>
        )}

        {!loading && (
          <div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
            { surveys.map(survey => (
              <SurveyListItem survey={survey} key={survey.id} onDeleteClick={onDeleteClick} />
              ))
            }
          </div>
          {surveys.length > 0 && <PaginationLinks meta={meta} onPageClick={onPageClick}/>}
        </div>
        )}
      </PageComponent>
    );
}