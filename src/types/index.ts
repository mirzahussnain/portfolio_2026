


export interface ContactDetails{
  email:string;
  githubUrl?:string,
  linkedInUrl?:string,
  twitterUrl?:string,
  phone?:string
}

export interface About{
  name:string;
  title:string[],
  avatarUrl?:string,
  description:string,
  resumeUrl?:string
  contactDetails:ContactDetails

}


export interface ProjectUrl{
  demo?:string,
  code:string,
  image?:string,
  image_public_id?:string,
}

export interface Project {
  _id?: string;
  title: string;
  date:string;
  url:ProjectUrl;
  description: string;
  stack: string[];
  version?: string;
  icon?: string;
}

export interface Experience {
  _id?: string;
  role: string;
  company: string;
  starting_date:string;
  ending_date: string;
  responsibilities: string;
  skills: string[];
  icon?: string;
}

export interface Education{
  _id?:string;
  description:string;
  starting_date:string;
  ending_date:string;
  grade:string;
  institution:string;
  major:string;
  title:string;
  type:'degree' | 'professional-certification' | 'diploma'
}

export interface Skill {
  _id?: string;
  name: string;
  category: 'programming'|'frontend' | 'backend' | 'fullstack' | 'cloud' | 'tools';
  level?: 'expert' | 'advanced' | 'intermediate' | 'beginner';
  icon: string;
  colorClass?: string;
  order?:number | string;
}

export interface TimelineItem {
  _id: string;
  category: 'work' | 'education'; // specific flag for styling
  title: string;
  place: string;
  major?:string,
  description: string;
  tags: string[];
  icon: string;
  sortDate: number; 
  period:string,
}

export type ViewState = 'main' | 'admin' | 'signin';
