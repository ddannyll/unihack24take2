import { useAuthStore } from "@/features/stores/authStore";
import { Button, Divider, Input, Link } from "@nextui-org/react";
import { IconBrandGoogle } from "@tabler/icons-react";
import { useState } from "react";

export default function Login() {
  const [submitLoading, setSubmitLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { actions: authActions } = useAuthStore();
  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    (async () => {
      try {
        await authActions.login(email, password);
      } catch {
        try {
          await authActions.register(email, password, password);
        } catch {
          console.log("lol rip");
        }
      }
    })();
  };

  return (
    <div className="flex w-full mt-20 justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="flex w-full max-w-lg flex-col gap-unit-4 px-unit-md"
      >
        <h1 className="mb-unit-md text-4xl font-medium text-foreground-800">
          Sign in
        </h1>
        <Input
          label="Email"
          type="email"
          isRequired
          value={email}
          onValueChange={setEmail}
        />
        <Input
          label="Password"
          type="password"
          isRequired
          value={password}
          onValueChange={setPassword}
        />

        <Button
          color="primary"
          className="font-medium"
          size="lg"
          type="submit"
          isLoading={submitLoading}
        >
          Continue
        </Button>
        <div className="text-right text-small text-foreground-500">
          <Link href="/forgotPassword" size="sm">
            Forgot Password?
          </Link>
        </div>
        <div className="relative my-unit-md">
          <Divider />
          <span className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-unit-sm text-small text-foreground-500">
            OR
          </span>
        </div>
        <Button
          variant="bordered"
          size="lg"
          className="text-foreground-500"
          onPress={() => {}}
        >
          <IconBrandGoogle stroke={1.2} />
          Continue with Google
        </Button>
      </form>
    </div>
  );
}
