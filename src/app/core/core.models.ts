export interface User {
  name: string;
  email: string;
  avatarUrl: string;
  createdAt: Date;
  projects: ProjectBrieffing[];
  invitations: ProjectInvitation[];
}
export interface AuthInfo {
  accessToken: string,
  email: string,
  expiresIn: number,
  uuid: string,
}

export interface UserInfo {
  uuid: string;
  name: string;
  avatarUrl: string;
}

export interface ToastData {
  title: string;
  message: string;
  variant: string;
}
export interface TeamToastData extends ToastData {
  user: UserInfo;
  task: string;
}


export interface ProjectInfo {
  name: string,
  _id: string,
}

export interface ProjectBrieffing {
  name: string,
  bannerUrl: string,
  _id: string,
  users: string[]
};

export interface Project {
  _id: string;
  name: string;
  admins?: string[];
  users?: string[];
  categories?: any[];
  private?: boolean;
  activeTasks?: string[];
  uuid?: string;
  tasks?: Task[];
  createdAt?: Date;
  startAt?: Date;
  deadline?: Date;
  workSessions?: WorkSession[];
  sprints?: Sprint[];
  activeSprint?: string;
  stats: any[];
}

export interface Sprint {
  _id?: string,
  startsAt: Date,
  endsAt: Date,
  tasks?: string[],
  reward?: string,
}
export interface Task {
  name: string,
  categories?: string[],
  uuid?: string,
  createdAt?: Date,
  ellapsedTime?: Number
  completed?: Boolean,
  _id?: string,
  status?: string,
}
export interface WorkSession {
  _id: string,
  uuid: string,
  taskId: string,
  startedAt: Date,
  endedAt?: Date,
  //in socket notification
  projectId?: string,
}

export interface ProjectInvitation {
  _id: string;
  author: string;
  project: string;
  sendTo: string;
  createdAt: Date;
  confirmedAt?: any;
  rejectedAt?: any;
}
