import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link"; 

export default function Home() {
  return (
   <div>
    <h2>Recruitbot - AI Interview Platform</h2>
    <Link href="/auth">
      <Button>Click Me</Button>
    </Link>
   </div>
  );
}