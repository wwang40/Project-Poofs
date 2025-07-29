import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useNavigate } from "react-router"
import { useState } from "react"
import { auth, db } from "@/firebase"
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth"
import { doc, setDoc, serverTimestamp } from "firebase/firestore"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isSignUp, setIsSignUp] = useState(false)

  const writeUserToFirestore = async (user: any) => {
    const userRef = doc(db, "users", user.uid)
    await setDoc(userRef, {
      email: user.email,
      name: user.displayName || "", 
      createdAt: serverTimestamp(),
    }, { merge: true }) 
  }

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const userCredential = isSignUp
        ? await createUserWithEmailAndPassword(auth, email, password)
        : await signInWithEmailAndPassword(auth, email, password)

      await writeUserToFirestore(userCredential.user)
      navigate("/home")
    } catch (error) {
      console.error(`${isSignUp ? "Sign up" : "Login"} failed`, error)
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>{isSignUp ? "Create an account" : "Login to your account"}</CardTitle>
          <CardDescription>
            {isSignUp
              ? "Enter your email below to create a new account"
              : "Enter your email below to login to your account"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleEmailAuth}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  {!isSignUp && (
                    <a
                      href="#"
                      className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                    >
                      Forgot your password?
                    </a>
                  )}
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full">
                  {isSignUp ? "Sign Up" : "Login"}
                </Button>
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              {isSignUp ? (
                <>
                  Already have an account?{" "}
                  <button
                    type="button"
                    className="underline underline-offset-4"
                    onClick={() => setIsSignUp(false)}
                  >
                    Login
                  </button>
                </>
              ) : (
                <>
                  Don&apos;t have an account?{" "}
                  <button
                    type="button"
                    className="underline underline-offset-4"
                    onClick={() => setIsSignUp(true)}
                  >
                    Sign up
                  </button>
                </>
              )}
            </div>
            <div className="mt-4 text-center text-sm">
              <button
                type="button"
                className="underline underline-offset-4"
                onClick={() => navigate(-1)}
              >
                back
              </button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
