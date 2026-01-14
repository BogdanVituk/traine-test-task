import { useAppSelector } from "@/hooks"

const GlobalError = () => {
  const error = useAppSelector(s => s.superheros.error)

  if (!error) return null

  return (
    <div className="bg-red-500 text-white p-3 text-center">
      {error}
    </div>
  )
}


export default GlobalError;