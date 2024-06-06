import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { SiCodechef, SiLeetcode, SiGeeksforgeeks } from "react-icons/si";
import { FaLinkedinIn, FaYoutube, FaGithub, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="py-2 px-4 bg-slate-100 z-30 sm:flex items-center gap-2 border-t border-slate-200  sm:bg-white dark:bg-zinc-950 dark:border-zinc-800">
      <h1 className="flex justify-center items-center gap-2 pb-2 truncate">
        <span>Made by</span>
        <span className="text-xl font-medium tracking-tight truncate transition-colors dark:text-zinc-50">
          @Neet Dhameliya
        </span>
      </h1>
      <div className="sm:ml-auto flex items-center justify-center gap-2 ">
        <Link to="https://www.linkedin.com/in/neet-dhameliya/" target="_blank">
          <Button variant="outline" size="icon">
            <FaLinkedinIn className="h-6 w-6" />
            <span className="sr-only">Linkedin</span>
          </Button>
        </Link>
        <Link to="https://github.com/NEET64" target="_blank">
          <Button variant="outline" size="icon">
            <FaGithub className="h-6 w-6" />
            <span className="sr-only">Github</span>
          </Button>
        </Link>
        <Link to="https://leetcode.com/u/Neet0110/" target="_blank">
          <Button variant="outline" size="icon">
            <SiLeetcode className="h-6 w-6" />
            <span className="sr-only">Leetcode</span>
          </Button>
        </Link>
        <Link to="https://www.codechef.com/users/neet110" target="_blank">
          <Button variant="outline" size="icon">
            <SiCodechef className="h-6 w-6" />
            <span className="sr-only">Codechef</span>
          </Button>
        </Link>
        <Link
          to="https://www.geeksforgeeks.org/user/neetdhameliya0110/"
          target="_blank">
          <Button variant="outline" size="icon">
            <SiGeeksforgeeks className="h-6 w-6" />
            <span className="sr-only">GeeksForGeeks</span>
          </Button>
        </Link>
        <Link
          to="https://www.youtube.com/channel/UCNuH1iZwWLqYICfjghHNUKg"
          target="_blank">
          <Button variant="outline" size="icon">
            <FaYoutube className="h-6 w-6" />
            <span className="sr-only">Youtube</span>
          </Button>
        </Link>
        <Link to="https://www.instagram.com/_just_neet_/" target="_blank">
          <Button variant="outline" size="icon">
            <FaInstagram className="h-6 w-6" />
            <span className="sr-only">Instagram</span>
          </Button>
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
