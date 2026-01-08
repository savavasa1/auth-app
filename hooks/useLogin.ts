import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export const useLogin = () => {
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      // Call NextAuth signIn which will use our custom backend authentication
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false, // Handle redirect manually
      });

      if (result?.ok) {
        // Successful login - redirect to /logged
        router.push("/logged");
      } else {
        // Handle login failure
        console.error("Login failed:", result?.error);
      }
    } catch (error) {
      console.error("An error occurred during login:", error);
    }
  };

  return { handleSubmit };
};
