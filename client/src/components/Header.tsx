import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { HelpCircle } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-[#2C3E50] text-white py-4 shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link href="/">
            <h1 className="text-2xl font-bold cursor-pointer" style={{ fontFamily: '"IBM Plex Sans", sans-serif' }}>
              Cybersecurity Risk Assessment Tool
            </h1>
          </Link>
          <div className="hidden md:flex space-x-4">
            <Link href="/">
              <Button className="bg-[#3498DB] hover:bg-blue-600 text-white px-4 py-2 rounded font-medium transition">
                Dashboard
              </Button>
            </Link>
            <Link href="/documentation">
              <Button variant="ghost" className="text-white hover:text-[#3498DB] transition flex items-center gap-2">
                <HelpCircle className="h-4 w-4" />
                Help
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
