import TopBar from "@/components/top-bar"
import { Button } from "@/components/ui/button"
import { BadgeDollarSign } from "lucide-react"
import { Link } from "react-router"
import { useEffect, useState } from "react"
import { useAuth } from "@/hooks/useAuth"
import { db } from "@/firebase"
import { doc, onSnapshot, updateDoc } from "firebase/firestore"

export default function GatchaPage() {
  const {user} = useAuth();
  const [results, setResults] = useState<number[]>([]);
  const [userCoins, setUserCoins] = useState<number>(0)


  useEffect(() => {
    if (!user) {
      setUserCoins(0)
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
  async function updateUserCoins(userId: string, newAmount: number) {
  const userRef = doc(db, "users", userId)
  await updateDoc(userRef, { coins: newAmount })
  }
  const handleRoll = async (rollCount: number) => {
    if (!user || userCoins < rollCount) {
      alert("Not enough coins!")
      return
    }

    const newResults: number[] = []
    for (let i = 0; i < rollCount; i++) {
      const roll = Math.floor(Math.random() * 100) + 1
      newResults.push(roll)
    }

    setResults(newResults)

    const updatedCoins = userCoins - rollCount
    setUserCoins(updatedCoins)
    await updateUserCoins(user.uid, updatedCoins)
  }

  return (
    <div className="bg-[#5a1e1a] min-h-screen flex items-center justify-center">
      <div className="bg-[#2b2b2b] rounded-lg border p-6 w-[400px] space-y-6 shadow-lg items-center">
        {/*Topbar*/}
        <TopBar isHomePage={false} />
        
        {/*Gatcha Viewport*/}
        <div className="bg-[#1d1d1d] w-[90%] max-w-[600px] h-[220px] rounded-xl border border-gray-300 p-2 flex flex-wrap gap-1 justify-center items-center mx-auto">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="w-10 h-10 rounded-full"
              style={{ backgroundColor: getBallColor(i) }}
            />
          ))}
        </div>

          {/*Gatcha Results View*/}
        {results.length > 0 && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div
              onClick={() => setResults([])}
              className="bg-white p-6 rounded-lg shadow-lg text-center cursor-pointer"
            >
              <h2 className="text-lg font-bold mb-2">You rolled:</h2>
              <div className="flex flex-wrap justify-center gap-4 text-xl font-mono">
                {results.map((result, idx) => (
                  <div className="align-middle">
                  <div
                    key={idx}
                    className={`w-12 h-12 rounded-full text-black flex items-center justify-center font-bold border`}
                    style={{ backgroundColor: getRarityColor(result) }}
                  >
                    {result}
                  </div>
                  <div className="text-sm mt-1" style={{color:getRarityColor(result)}}>{getRarityLabel(result)}</div>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-sm text-gray-600">(click anywhere to dismiss)</p>
            </div>
          </div>
        )}
        
        {/*Rolling Buttons*/}
        <div className="flex flex-col gap-4">
          <Button
            onClick={() => handleRoll(1)}
            className="bg-[#f3f3f3] text-black text-md font-bold rounded-xl px-6 py-2 shadow border border-black flex items-center gap-2"
          >
            <BadgeDollarSign width={20} height={20} />
            x1 | Roll x 1
          </Button>

          <Button
            onClick={() => handleRoll(10)}
            className="bg-[#f3f3f3] text-black text-md font-bold rounded-xl px-6 py-2 shadow border border-black flex items-center gap-2"
          >
            <BadgeDollarSign width={20} height={20} />
            x10 | Roll x 10
          </Button>

          <Button
            asChild
            className="bg-[#406332] text-white text-sm font-bold rounded-lg px-4 py-2 shadow border border-black"
          >
            <Link to="/inventory">Owned POOF</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

function getBallColor(index: number) {
  const colors = ["#3CB043", "#1E90FF", "#FFA500", "#800080", "#B22222"]
  return colors[index % colors.length]
}

function getRarityColor(value: number): string {
  if (value <= 60) return "#a9a9a9";     
  if (value <= 88) return "#1e90ff";      
  if (value <= 98) return "#800080";       
  return "#ffd700";                        
}

function getRarityLabel(value: number): string {
  if (value <= 60) return "Common"
  if (value <= 88) return "Rare"
  if (value <= 98) return "Epic"
  return "Legendary"
}