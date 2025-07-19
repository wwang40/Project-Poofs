import { LoginForm } from "@/components/login-form"

const UserAuthenticationPage = () => {
  return (
    <>
    <div className="bg-[#5a1e1a] h-[496] w-[400] flex items-center justify-center">
    <div className="bg-[#2b2b2b] h-[496] w-[400] rounded-lg border border-white p-6 space-y-6 shadow-lg">
        <LoginForm className="dark">
        </LoginForm>
    </div>
    </div>
    </>
  )
}

export default UserAuthenticationPage