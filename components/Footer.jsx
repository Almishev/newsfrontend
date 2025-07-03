import React from "react";
import Image from "next/image";
import logo from "../assets/logo.png";
import Link from "next/link";
import Category from "./Category";
import { FaFacebookF } from "react-icons/fa";
import { AiFillYoutube, AiOutlineTwitter } from "react-icons/ai";
import Gallery from "./news/Gallery";
import RecentNewsFooter from "./news/RecentNewsFooter";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <div className="w-full">
      <div className="bg-[#1e1919]">
        <div className="px-4 md:px-8 py-10 w-full gap-12 grid lg:grid-cols-4 grid-cols-1">
          <div className="w-full">
            <div className="w-full flex flex-col gap-y-[14px]">
              <Image
                className=""
                width={200}
                height={100}
                src={logo}
                alt="Serie A News Portal logo"
              />
              <h2 className="text-slate-300 font-bold text-lg">
                Фенски портал за Серия А
              </h2>
              <h2 className="text-slate-300">
                Фенски новинарски портал за Серия А! Стани автор и сподели новини за любимия си отбор – пиши на <a href="mailto:admin@pirinpixel.com" className="underline text-blue-300">admin@pirinpixel.com</a>.
              </h2>
              <h2 className="text-slate-300">
                Всичко за Milan, Juventus, Inter, Roma, Napoli, Lazio, Fiorentina и още – новини, анализи, трансфери и статистики на едно място.
              </h2>
              <h2 className="text-slate-300">
                Остани информиран за всичко, което се случва в Calcio! Твоят източник за новини от Серия А.
              </h2>
            </div>
          </div>
          <Gallery />
          <div>
            <Category categories={[]} titleStyle="text-white" />
          </div>
          <RecentNewsFooter />
        </div>
      </div>
      <div className="bg-[#262323]">
        <div className="px-4 md:px-8 py-5 flex flex-col md:flex-row gap-3 justify-between items-center">
          <div className="flex gap-y-2 text-gray-400 justify-start items-center">
            <span>Copyright © {year}</span>
            <span className="mx-2">|</span>
            <Link href={"#"}>Serie A News Portal</Link>
            <span className="ml-2 text-xs text-gray-400">Фенски портал – стани автор: <a href="mailto:admin@pirinpixel.com" className="underline text-blue-300">admin@pirinpixel.com</a></span>
          </div>
          <div className="flex gap-x-[4px]">
            <a
              className="w-[37px] h-[35px] text-white flex justify-center items-center bg-[#ffffff2b]"
              href="#"
              aria-label="Facebook"
            >
              <FaFacebookF />
            </a>
            <a
              className="w-[37px] text-white h-[35px] flex justify-center items-center bg-[#ffffff2b]"
              href="#"
              aria-label="Twitter"
            >
              <AiOutlineTwitter />
            </a>
            <a
              className="w-[37px] text-white h-[35px] flex justify-center items-center bg-[#ffffff2b]"
              href="#"
              aria-label="YouTube"
            >
              <AiFillYoutube />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
