import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosClient from '../axios.js'

export default function SurveyAnswers() {
    const { slug } = useParams()
    const [survey, setSurvey] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if(slug) {
            setLoading(true)
            axiosClient.get(`/survey/get-by-slug/${slug}`)
            .then(({data}) => {
                setSurvey(data.data)
                console.log(data)
            })
        }
    }, [])

    return (
        <>
          {JSON.stringify(survey)}
        </>
    )
}