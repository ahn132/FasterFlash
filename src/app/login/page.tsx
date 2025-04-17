import LoginForm from "@/app/components/LoginForm";

export default function LoginPage() {
    return (
        <div className="p-8 max-w-sm mx-auto">
            <h1 className="text-2xl font-bold mb-4">Welcome back</h1>
            <LoginForm />
        </div>
    );
}
