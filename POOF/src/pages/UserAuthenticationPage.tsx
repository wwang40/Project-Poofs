import { useEffect } from "react"
import { useNavigate } from "react-router"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "@/firebase"
import { LoginForm } from "@/components/login-form"

const UserAuthenticationPage = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/home")
      }
    })
    return () => unsubscribe() // Cleanup the listener
  }, [navigate])

  return (
    <div className="bg-[#5a1e1a] h-[496px] w-[400px] flex items-center justify-center">
      <div className="bg-[#2b2b2b] h-[496px] w-[400px] rounded-lg border p-6 space-y-6 shadow-lg">
        {/* Project POOF Title */}
        <div className="flex justify-center">
          <h1 className="scroll-m-20 text-white text-center text-4xl font-extrabold tracking-tight text-balance">
            Project POOF
          </h1>
        </div>
        <LoginForm className="dark" />
      </div>
    </div>
  )
}

export default UserAuthenticationPage