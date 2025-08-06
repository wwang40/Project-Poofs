import TopBar from "@/components/top-bar"
import { doc, increment, updateDoc } from "firebase/firestore"
import { db } from "@/firebase"
import { useAuth } from "@/hooks/useAuth"
import { Button } from "@/components/ui/button"


const PurchasePage = () => {
  const { user } = useAuth()


  const handleOnPurchase = async () => {
    if (!user) {
      console.error("No user signed in")
      return
  }
    try {
    const userRef = doc(db, "users", user.uid)
    await updateDoc(userRef, {
      coins: increment(100)
    })
    console.log("Coins successfully added")
  } catch (error) {
    console.error("Error purchasing coins:", error)
  }
  }


  return (
    <div className="bg-[#5a1e1a] min-h-screen h-[496] w-[400] flex items-center justify-center">
      <div className="bg-[#2b2b2b] rounded-lg border h-[496] w-[400] space-y-6 shadow-lg items-center">
        {/* Top bar */}
        <TopBar isHomePage={false}/>

        {/* Purchase Viewport */}
        <div className="bg-[#1d1d1d] w-[90%] max-w-[600px] h-[300px] rounded-xl border border-gray-300 p-3 mx-auto flex justify-center">
          <div>
            <Button className="bg-green-500 text-white font-bold px-6 py-2 rounded-md shadow" onClick={handleOnPurchase}>
              Purchase 100 coins | $10 USD
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PurchasePage
