import Form from "./Form";
import { useActionState, useState } from "react";
import InputContainer from "./InputContainer";
import Label from "./Label";
import Input from "./Input";
import { useAuthContext } from "../store/auth-context";

function AuthForm(){
    const [authMode, setAuthMode] = useState("login");
    const authCtx = useAuthContext();
    const [error ,setError] = useState();

    function handleSwitchAuthMode() {
        setAuthMode((prevMode) => (prevMode === "login" ? "signup" : "login"));
    }

    async function handleSubmit(_,formData) {
        setError(null);
        const email = formData.get("email");
        const password = formData.get("password");  

        try {
            if (authMode === "signup") {
                await authCtx.signup(email, password);
            }else {
                await authCtx.login(email, password);
            }
        }catch (error) {
            setError(error.message || "An error occurred. Please try again.");
        }
    }

    const [, action, isPending] = useActionState(handleSubmit);

    return (
        <Form action={action} className="max-w-[25rem] mx-auto">
             <InputContainer>
                <Label htmlFor="email">Email</Label>
                <Input type="email" id="email" name="email" />
            </InputContainer>
            <InputContainer>
                <Label htmlFor="password">Password</Label>
                <Input type="password" id="password" name="password" />
            </InputContainer>

            {error && <p className="text-red-300 mt-3">{error}</p>}

            <p className="flex flex-col gap-3 mt-4">
                <button disabled={isPending} 
                className="bg-sky-400 text-black py-2 rounded-lg hover:bg-sky-500 disabled:cursor-not-allowed disabled:bg-stone-400 disabled:text-stone-600">
                    {!isPending && authMode === "login" ? "Login" : "Sign Up"}
                    {isPending ? "Submitting..." : ""}
                </button>
                <button disabled={isPending} 
                type="button"
                onClick={handleSwitchAuthMode} 
                className="text-sky-400 hover:text-sky-500">
                    Switch to {authMode === "login" ? " Sign Up" : " Login"}
                </button>
            </p>
        </Form>
    );
}

export default AuthForm;