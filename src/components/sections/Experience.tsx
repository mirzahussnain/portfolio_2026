
// import { INITIAL_EXPERIENCE } from '@/src/lib/constants';
import { getYear, stringToDate, toTime } from '@/src/lib/utils';
import { RootState } from '@/src/redux/store';
import type { Education, Experience, TimelineItem } from '@/src/types';
import React, { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import Timeline from '../ui/Timeline';


const Experience: React.FC = () => {
 // ✅ Good: Only re-renders if these specific slices change
const experiences = useSelector((state: RootState) => state.experiences);
const educations = useSelector((state: RootState) => state.educations);

 
  const timelineData=useMemo(()=>{
    const workItems:TimelineItem[]=experiences.map((exp:Experience)=>({
      _id:exp._id,
      category:'work',
      title:exp.role,
      place:exp.company,
      period:`${getYear(stringToDate(exp.starting_date))} - ${getYear(stringToDate(exp.ending_date))}`,
      description:exp.responsibilities,
      tags:exp.skills || [],
      icon:exp.icon || 'work',
      sortDate:toTime(stringToDate(exp.ending_date))
    }))

    const eduItems:TimelineItem[]=educations.map((edu:Education)=>({
      _id:edu._id,
      category:'education',
      title:edu.title,
      place:edu.institution,
      period: `${getYear(stringToDate(edu.starting_date))} - ${getYear(stringToDate(edu.ending_date))}`,
      tags:[
        edu.grade?`Grade: ${edu.grade}`: null,
        edu.type?`Qualification Type: ${edu.type.replace('-',' ')}`:null,
      ].filter(Boolean) as string[],
      major:edu.major,
      description:edu.description,
      icon:'school',
      sortDate:toTime(stringToDate(edu.ending_date))
    }))
   
    return [...workItems,...eduItems].sort((a,b)=>b.sortDate - a.sortDate);
  },[experiences,educations])
 
  
  return (
    <section id="experience" className="py-24 px-6 relative bg-background-dark overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="flex flex-col gap-3  max-sm:items-center">
            <div className="flex items-center gap-2 mb-2 ">
              <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider border border-primary/20">Resume</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white leading-[1.1] max-sm:text-center">
              Experience & <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-blue-400">Education</span>
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mt-2 max-sm:text-center">
              My professional journey through software engineering, highlighting key roles, academic achievements, and the technologies I've mastered.
            </p>
          </div>
          <button className="group flex items-center justify-center gap-3 glass-card hover:bg-white/10 text-white py-3 px-6 rounded-xl transition-all font-semibold">
            <span className="material-symbols-outlined text-primary group-hover:scale-110 transition-transform">download</span>
            <span>Download CV</span>
          </button>
        </div>

       <Timeline data={timelineData}/>
      </div>
    </section>
  );
};

export default Experience;
