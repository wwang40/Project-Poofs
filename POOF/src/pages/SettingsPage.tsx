import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { BadgeDollarSign } from "lucide-react"
import { useState } from "react"
import { Link, useNavigate } from "react-router"


const SettingsPage = () => {
  const [on, toggle] = useState(false)
  const navigate = useNavigate()
  return (
      <div className="bg-[#5a1e1a] h-[496] w-[400] flex items-center justify-center">
      <div className="bg-[#2b2b2b] h-[496] w-[400] rounded-lg border p-6 space-y-6 shadow-lg">
      {/* Top bar */}
      <div className="w-full flex justify-between items-center px-4">
        <div className="flex items-center gap-2 bg-[#2b2b2b] px-3 py-1 rounded-xl border border-black shadow text-white font-semibold text-sm">
          <BadgeDollarSign
            width={20}
            height={20}
            className="inline-block"
          />
          00000000
          <Link className="ml-1 text-yellow-300 font-bold text-lg" to='/purchase'>+</Link>
        </div>
        <Button onClick={() => navigate(-1)} className="bg-[#3d3d3d] text-white text-sm font-bold rounded-lg px-4 py-2 shadow border border-black">
          Back
        </Button>
      </div>
      
        {/* Project POOF Title */}
        <div className="flex justify-center">
          <Button asChild
            className="bg-[#3d3d3d] text-white text-3xl font-bold rounded-lg px-6 py-2 shadow border border-black"
          >
            <Link to='/inventory'>Project POOF</Link>
          </Button>
        </div>

        {/* Toggle Switch */}
        <div className="bg-gray-500 rounded-lg px-4 py-4 space-y-1 flex items-center justify-between">
          <div>
            <Label className="text-white text-md font-medium">Enable POOF</Label>
            <p className="text-gray-300 text-xs">ALLOWS POOF ON SCREEN</p>
          </div>
          <Switch checked={on} onCheckedChange={toggle} />
        </div>

      </div>
    </div>
  )
}

export default SettingsPage