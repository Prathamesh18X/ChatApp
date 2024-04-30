import {useState , useEffect} from 'react'

const useGetGroups = () => {
  const [loading , setLoading] = useState()
  const [groups , setGroups] = useState([])

  useEffect(() => {
    const getGroups = async () => {
      setLoading(true)
      try {
        const res = await fetch('/api/groups')
        const data = await res.json()
        if(data.error) throw new Error(data.error)
        setGroups(data)
      } catch (error) {
        console.log(error.message)
      } finally {
        setLoading(false)
      }
    }
    getGroups()
  }, []);
  return {loading , groups}
}

export default useGetGroups