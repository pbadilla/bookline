import { redirect } from "next/navigation";

export default function LoginPage() {
  redirect("/signup?tab=login");
}
