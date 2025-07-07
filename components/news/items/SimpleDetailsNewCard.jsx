import React from "react";
import Image from "next/image";
import Link from "next/link";
import parse from 'html-react-parser';

const SimpleDetailsNewCard = ({ news, type, height }) => {
  return (
    <div className="bg-white shadow">
      <div className="group relative overflow-hidden">
        <div
          style={{ height: `${height}px` }}
          className={`w-full group-hover:scale-[1.1] transition-all duration-[1s] relative`}
        >
          <Image
            className="object-cover"
            fill
            src={
              news?.image
            }
            alt="images"
          />
        </div>
        <div
          className="w-full h-full block absolute left-0 top-0 invisible group-hover:visible bg-white cursor-pointer opacity-5 transition-all duration-300"

        ></div>
        <div className="left-5 absolute bottom-4 flex justify-start items-start gap-x-2 text-white font-semibold gap-y-2">
          <div className="px-[6px] py-[2px] rounded-sm text-[13px] bg-[#c80000]">
            Seria A
          </div>
          <div className="px-[6px] py-[2px] rounded-sm text-[13px] bg-[#c80000]">
            Calcio
          </div>
        </div>
      </div>
      <div className="p-5">
        <Link
          className="text-[15px] font-semibold text-[#333333] hover:text-[#c80000]"
          href={`/news/${news?.slug}`}
        >
          {news?.title}
        </Link>
        <div className="flex gap-x-2 text-xs font-normal text-slate-600">
          <span>{news?.date}</span>
          <span>{news?.writerName || "Без автор"}</span>
        </div>
        {type === "details-news" && (
          <div className="text-sm text-slate-600 pt-3 overflow-hidden" style={{maxHeight: '100px'}}>
            {parse(news?.description?.slice(0, 200) || "")}
          </div>
        )}
      </div>
    </div>
  );
};

export default SimpleDetailsNewCard;
