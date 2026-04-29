"use client";
import { useRouter } from "next/navigation";
import SplashScreen from "@/components/shared/SplashScreen";


export default function Home() {
  const router = useRouter();

  return <SplashScreen />;
}
