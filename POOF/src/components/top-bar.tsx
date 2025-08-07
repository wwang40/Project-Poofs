import { useEffect, useState } from "react"
import { useNavigate, Link } from "react-router"
import { BadgeDollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/hooks/useAuth"
import { db } from "@/firebase"
import { doc, onSnapshot } from "firebase/firestore"

const TopBar = ({isHomePage}: {isHomePage:boolean}) => {
  const { user} = useAuth()
  const [userCoins, setUserCoins] = useState<number | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) {
      setUserCoins(null)
      return
    }

    const userRef = doc(db, "users", user.uid)
    const unsubscribe = onSnapshot(userRef, (docSnap) => {
      if (docSnap.exists()) {
        setUserCoins(docSnap.data().coins ?? 0)
      } else {
        setUserCoins(0)
      }
    })

    return () => unsubscribe()
  }, [user])

  if (!user) {
    return (
      <div className="w-full flex justify-between items-center px-4 text-red-500 text-sm">
        Not signed in
      </div>
    )
  }

  return (
    <div className="w-full flex justify-between items-center px-4">
      <div className="flex items-center gap-2 bg-[#2b2b2b] px-3 py-1 rounded-xl border border-black shadow text-white font-semibold text-sm">
        <BadgeDollarSign width={20} height={20} className="inline-block" />
        {userCoins}
        <Link className="ml-1 text-yellow-300 font-bold text-lg" to="/purchase">
          +
        </Link>
      </div>
      {isHomePage ?      
      <Button
        asChild
        className="bg-[#3d3d3d] text-white text-sm font-bold rounded-lg px-4 py-2 shadow border border-black"
      >
        <Link to="/inventory">Owned Poofs</Link>
      </Button>
      :
      <Button
        onClick={() => navigate(-1)}
        className="bg-[#3d3d3d] text-white text-sm font-bold rounded-lg px-4 py-2 shadow border border-black"
      >
        Back
      </Button>}

    </div>
  )
}

export default TopBar

