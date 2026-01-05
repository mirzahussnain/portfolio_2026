import { TimelineItem } from "@/src/types";
import React from "react";

const Timeline = ({data:timelineData}:{data:TimelineItem[]}) => {
  return (
    <div className="relative pl-4 md:pl-0">
      <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-white/10 -ml-px hidden md:block"></div>
      <div className="absolute left-6 top-2 bottom-0 w-0.5 bg-white/10 md:hidden"></div>

      <div className="flex flex-col gap-12">
        {timelineData.map((item, index) => (
          <div
            key={item._id}
            className={`relative grid md:grid-cols-2 gap-8 items-center`}
          >
            <div
              className={`${
                index % 2 === 0
                  ? "md:text-right order-2 md:order-1 pl-12 md:pl-0"
                  : "order-2 pl-12 md:pl-0 md:col-start-2"
              }`}
            >
              <div
                className={`glass-card p-6 rounded-2xl relative transition-all duration-300  group
                    ${
                      item.category === "education"
                        ? "hover:border-purple-400 border-l-4 border-l-purple-400"
                        : "hover:border-blue-400"
                    }`}
              >
                <div className="flex flex-col gap-4">
                  <div
                    className={`flex justify-between items-start ${
                      index % 2 === 0 ? "md:flex-row-reverse" : ""
                    }`}
                  >
                    <div
                      className={`${index % 2 === 0 ? "md:text-right" : ""}`}
                    >
                      <h3 className="text-xl font-bold text-white mb-1">
                        {item.title}
                      </h3>
                      <h4 className={`${item.category==='work' && 'hidden'} text-sm font-medium text-white mb-1`}>{item.major}</h4>
                      <p
                        className={`${
                          item.category === "education"
                            ? "text-purple-300 "
                            : "text-blue-400"
                        } font-medium`}
                      >
                        {item.place}
                      </p>
                    </div>
                    <span className="bg-primary/20 text-primary text-xs font-bold px-2 py-1 rounded h-fit">
                      {item.period}
                    </span>
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {item.description}
                  </p>
                  <div
                    className={`flex flex-wrap gap-2 mt-1 ${
                      index % 2 === 0 ? "md:justify-end" : ""
                    }`}
                  >
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] font-semibold text-slate-300 bg-white/5 border border-white/10 px-2 py-1 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-background-dark border-4 border-white/10 flex items-center justify-center z-20 order-1 shadow-[0_0_15px_rgba(13,185,242,0.5)]">
              <span className="material-symbols-outlined text-primary text-sm">
                {item.icon}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
