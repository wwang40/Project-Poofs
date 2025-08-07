import './App.css'
import { Button } from './components/ui/button'
import { Link } from 'react-router'
import { Switch } from './components/ui/switch'
import { Label } from './components/ui/label'
import { useEffect, useState } from 'react'
import { useAuth } from "./hooks/useAuth" 
import { useNavigate } from "react-router"
import UserAuthenticationPage from './pages/UserAuthenticationPage'
import { signOut } from 'firebase/auth'
import { auth } from './firebase'
import TopBar from './components/top-bar'

function App() {
  const [POOF, togglePOOF] = useState(false)
  const { user } = useAuth()
  const navigate = useNavigate()


  useEffect(() => {
    chrome.storage.local.get(['POOF'], (result) => {
      const POOFValue = result.POOF ?? false
      togglePOOF(POOFValue)
    })
  }, [])

  const handleSignOut = async () => {
    try {
      await signOut(auth)
      navigate("/")
    } catch (error) {
      console.error("Sign-out error:", error)
    }
  }

  const onclick = async () => {
    togglePOOF(!POOF)
    chrome.storage.local.set({ POOF: !POOF }, () => {
      chrome.runtime.sendMessage({ type: 'POOF_UPDATE', value: !POOF });
      console.log("POOF set to", !POOF)
    })
  }

  if (!user) {
    return <UserAuthenticationPage />
  }

  return (
    <div className="bg-[#5a1e1a] h-[496] w-[400] flex items-center justify-center">
      <div className="bg-[#2b2b2b] h-[496] w-[400] rounded-lg border p-6 space-y-6 shadow-lg">
        {/* Top bar */}
        <TopBar isHomePage={true}/>

        {/* Project POOF Title */}
        <div className="flex justify-center">
          <h1 className="scroll-m-20 text-white text-center text-4xl font-extrabold tracking-tight text-balance">
            Project POOF
          </h1>
        </div>

        {/* Toggle Switch */}
        <div className="bg-gray-500 rounded-lg px-4 py-4 space-y-1 flex items-center justify-between">
          <div>
            <Label className="text-white text-md font-medium">Enable POOF</Label>
            <p className="text-gray-300 text-xs">ALLOWS POOF ON SCREEN</p>
          </div>
          <Switch checked={POOF} onCheckedChange={onclick} />
        </div>

        {/* SignOut Button */}
        <div className="flex justify-center">
          <Button
            className="bg-[#3d3d3d] text-white text-2xl font-bold rounded-lg px-10 py-3 shadow border border-black"
            onClick={handleSignOut}
          >
            Sign Out
          </Button>
        </div>

        {/* Gatcha Button */}
        <div className="flex justify-center">
          <Button
            asChild
            className="bg-[#3d3d3d] text-white text-2xl font-bold rounded-lg px-10 py-3 shadow border border-black"
          >
            <Link to="/gatcha">GATCHA</Link>
          </Button>
        </div>

        {/* Settings Button */}
        <div className="flex justify-center">
          <Button
            asChild
            className="bg-[#3d3d3d] text-white text-sm font-bold rounded px-4 py-1 shadow border border-black"
          >
            <Link to="/settings">Settings</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default App
