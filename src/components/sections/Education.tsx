import React from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";

import "react-vertical-timeline-component/style.min.css";

import { education } from "../../constants";
import { SectionWrapper } from "../../hoc";
import { Header } from "../atoms/Header";
import { TExperience } from "../../types";
import { config } from "../../constants/config";

const isActiveTimeline = (date: string) =>
  /present|current|expected/i.test(date);

const EducationCard: React.FC<TExperience> = (item) => {
  const dotClass = isActiveTimeline(item.date)
    ? "timeline-blink-dot timeline-blink-dot--active"
    : "timeline-blink-dot timeline-blink-dot--past";

  return (
    <VerticalTimelineElement
      contentStyle={{
        background: "#1d1836",
        color: "#fff",
      }}
      contentArrowStyle={{ borderRight: "7px solid  #232631" }}
      date={item.date}
      iconStyle={{
        background: "transparent",
        boxShadow: "none",
      }}
      icon={
        <div className="flex h-full w-full items-center justify-center">
          <span
            className={dotClass}
            aria-label="timeline marker"
          />
        </div>
      }
    >
      <div>
        <h3 className="text-[24px] font-bold text-white">{item.title}</h3>
        <p className="text-secondary text-[16px] font-semibold" style={{ margin: 0 }}>
          {item.companyName}
        </p>
      </div>

      <ul className="ml-5 mt-5 list-disc space-y-2">
        {item.points.map((point, index) => (
          <li
            key={`education-point-${index}`}
            className="text-white-100 pl-1 text-[14px] tracking-wider"
          >
            {point}
          </li>
        ))}
      </ul>
    </VerticalTimelineElement>
  );
};

const Education = () => {
  return (
    <>
      <Header useMotion={true} {...config.sections.education} />

      <div className="mt-20 flex flex-col">
        <VerticalTimeline>
          {education.map((item, index) => (
            <EducationCard key={index} {...item} />
          ))}
        </VerticalTimeline>
      </div>
    </>
  );
};

export default SectionWrapper(Education, "education");
