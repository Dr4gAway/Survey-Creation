import { useStateContext } from "../contexts/ContextProvider"

export default function Toast() {
  const {toast, showToast} = useStateContext()

  return (
    <>
    {toast.show && (
      <div className="animate-fade-in-down w-[300] py-2 px-3 text-white rounded bg-emerald-500 fixed right-2 bottom-2 z-50">
        {toast.message}
      </div>
    )}
      
    </>
  )
}
