import TopBar from "@/components/top-bar"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useState } from "react"

const InventoryPage = () => {
  const [selected, setSelected] = useState<number | null>(null)
  return (
    <>
      <div className="bg-[#5a1e1a] h-[496] w-[400] min-h-screen flex items-center justify-center">
      <div className="bg-[#2b2b2b] rounded-lg border p-6 h-[496] w-[400] space-y-6 shadow-lg items-center">

      {/* Top bar */}
      <TopBar isHomePage={false}/>

      {/* Inventory ScrollArea */}
      <ScrollArea className="bg-[#1d1d1d] w-[90%] max-w-[600px] h-[300px] rounded-xl border border-gray-300 p-3 mx-auto">
        <div className="grid grid-cols-4 gap-3 justify-items-center">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className={`w-16 h-16 rounded-md border-2 ${
                i === selected ? 'border-white' : 'border-gray-600'
              } bg-[#3a3a3a] flex items-center justify-center text-white text-[10px] font-bold relative`
              }
              onClick={() => setSelected(i)}
            >
              {i === 0 && (
                <>
                  Owned DIH
                  <div className="absolute -top-1 -right-1 bg-red-500 text-white text-[8px] rounded-full w-4 h-4 flex items-center justify-center">
                    E
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Action Buttons */}
      <div className="flex gap-4 mt-2 items-center justify-center">
        <Button className="bg-green-500 text-white font-bold px-6 py-2 rounded-md shadow">
          Deploy
        </Button>
        <Button className="bg-green-500 text-white font-bold px-6 py-2 rounded-md shadow">
          Examine
        </Button>
      </div>
    </div>
    </div>
    </>
  )
}

export default InventoryPage