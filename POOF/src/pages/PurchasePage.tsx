import { Button } from "@/components/ui/button"
import { BadgeDollarSign } from "lucide-react"
import { Link, useNavigate } from "react-router"
import { getDatabase, ref, onValue} from "firebase/database";
import { useEffect, useState } from "react";

const PurchasePage = () => {
  const navigate = useNavigate()
  const [userCoins, setUserCoins] = useState<number | null>(null);

  useEffect(() => {
    const database = getDatabase();
    const userCurrencyRef = ref(database, 'Users/TestUser/ownedCoins');

    const unsubscribe = onValue(userCurrencyRef, (snapshot) => {
      const coins = snapshot.val();
      setUserCoins(coins ?? 0); // fallback to 0 if null/undefined
    });

    return () => unsubscribe(); // cleanup listener on unmount
  }, []);
  return (
    <>
        <div className="bg-[#5a1e1a] min-h-screen  h-[496] w-[400] flex items-center justify-center">
      <div className="bg-[#2b2b2b] rounded-lg border h-[496] w-[400] space-y-6 shadow-lg items-center">
      {/* Top bar */}
      <div className="w-full flex justify-between items-center px-4">
        <div className="flex items-center gap-2 bg-[#2b2b2b] px-3 py-1 rounded-xl border border-black shadow text-white font-semibold text-sm">
          <BadgeDollarSign
            width={20}
            height={20}
            className="inline-block"
          />
          {userCoins}
          <Link className="ml-1 text-yellow-300 font-bold text-lg" to='/purchase'>+</Link>
        </div>
        <Button onClick={() => navigate(-1)} className="bg-[#3d3d3d] text-white text-sm font-bold rounded-lg px-4 py-2 shadow border border-black">
          Back
        </Button>
      </div>

      {/*Purchase Viewport*/}
      <div className="bg-[#1d1d1d] w-[90%] max-w-[600px] h-[300px] rounded-xl border border-gray-300 p-3 mx-auto flex justify-center">
        <div>
          <Button className="bg-green-500 text-white font-bold px-6 py-2 rounded-md shadow">
            Purchase 100 coins | $10 USD
          </Button>
        </div>
      </div>
      </div>
      </div>
    </>
  )
}

export default PurchasePage