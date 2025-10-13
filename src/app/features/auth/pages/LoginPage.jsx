import LoginForm from "../components/LoginForm";
import Background from "@/components/ui/Background";

function LoginPage () {
    return(
    <>
        <Background className="h-screen flex items-center justify-center">
            <div className="w-[468px] h-[448px] border border-[#1E2939] rounded-3xl">
                <LoginForm></LoginForm>
            </div>
        </Background>
    </>
    );
}

export default LoginPage;


