import axios from "axios"

export interface Session {
  sessionId: string;
  startTs: Date;
}

export const createSession = async (): Promise<Session> => {
  const { data: result } = await axios.post<Session>('http://localhost:3000/api/v1/sessions');
  console.log(result);
  return result;
}

export const getSession = async (sessionId: string): Promise<Session> => {
  const { data: result } = await axios.get<Session>(`http://localhost:3000/api/v1/sessions/${sessionId}`);
  console.log(result);
  return result;
}