export interface Project {
    id: number;
    name: string;
  }
  
  export interface WBS {
    id: number;
    name: string;
    projectId: number;
    show:boolean;
  }
  
  export interface Task {
    id: number;
    name: string;
    projectId: number;
    wbsId: number;
  }
  