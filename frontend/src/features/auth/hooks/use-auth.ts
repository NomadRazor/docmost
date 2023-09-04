import { useState } from "react";
import { login, register } from "@/features/auth/services/auth-service";
import { useRouter } from "next/navigation";
import { useAtom } from "jotai";
import { authTokensAtom } from "@/features/auth/atoms/auth-tokens-atom";
import { currentUserAtom } from "@/features/user/atoms/current-user-atom";
import { ILogin, IRegister } from "@/features/auth/types/auth.types";
import toast from "react-hot-toast";

export default function useAuth() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const [, setCurrentUser] = useAtom(currentUserAtom);
  const [authToken, setAuthToken] = useAtom(authTokensAtom);

  const handleSignIn = async (data: ILogin) => {
    setIsLoading(true);

    try {
      const res = await login(data);
      setIsLoading(false);
      setAuthToken(res.tokens);

      router.push("/home");
    } catch (err) {
      setIsLoading(false);
      toast.error(err.response?.data.message)
    }
  };

  const handleSignUp = async (data: IRegister) => {
    setIsLoading(true);

    try {
      const res = await register(data);
      setIsLoading(false);

      setAuthToken(res.tokens);

      router.push("/home");
    } catch (err) {
      setIsLoading(false);
      toast.error(err.response?.data.message)
    }
  };

  const hasTokens = () => {
    return !!authToken;
  };

  const handleLogout = async () => {
    setAuthToken(null);
    setCurrentUser(null);
  }

  return { signIn: handleSignIn, signUp: handleSignUp, isLoading, hasTokens };
}
