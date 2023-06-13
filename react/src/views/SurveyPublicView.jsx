import axiosClient from '../axios'
import { useEffect, useState } from 'react'
import { json, useParams } from 'react-router-dom'
import PublicQuestionView from '../components/PublicQuestionView'

export default function SurveyPublicView() {
  let answers = {}
  const [surveyFinished, setSurveyFinished] = useState(false)
  const [survey, setServey] = useState({questions: []})
  const [loading, setLoading] = useState(false)
  const { slug } = useParams()

  useEffect(() => {
    setLoading(true)
    axiosClient.get(`survey/get-by-slug/${slug}`)
    .then(({data}) => {
      setServey(data.data);
      setLoading(false)
    })
    .catch(() => {
      setLoading(false)
    })
  }, []);

  function onSubmit(ev) {
    ev.preventDefault();
    console.log(answers)

    axiosClient.post(`/survey/${survey.id}/answer`, {
      answers
    })
    .then(response => {
      debugger
      setSurveyFinished(true)
    })
  }

  function answerChanged(question, value) {
    answers[question.id] = value;
    console.log(question, value);
  }

  return (
    <>
      {loading && (
        <div className="text-center font-bold text-lg justify-center">
        loading
      </div>
      )}

      {!loading &&(
        <form onSubmit={ev => onSubmit(ev)} className='container mx-auto'>
          <div className='grid grid-cols-6'>
            <div className='mr-4'>
              <img src={survey.image_url} alt="" />
            </div>
            <div className='col-span-5'>
              <h1 className='text-3xl mb-3 font-bold'>{survey.title}</h1>
              <p className='text-gray-500 text-sm'>{survey.expire_date}</p>
              <p className='text-gray-500 text-sm'>{survey.description}</p>
            </div>
          </div>

        {surveyFinished && (
          <div className='py-8 px-6 bg-emerald-500 text-white w-[600px] mx-auto'>
            Thank you for participating in the survey
          </div>
        )}

        {!surveyFinished && (
          <>
            <div>
              {console.log(survey.questions)}
              {survey.questions?.map((question, index) => (
                <PublicQuestionView
                  key={question.id}
                  question={question}
                  answerChanged={val => answerChanged(question, val)}
                  index={index} />
              ))}
            </div>

            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Submit
            </button>
          </>
        )}

        </form>
      )}
    </>
  )
}
