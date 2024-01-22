export interface User {
  _id: string;
  username: string;
  firstName: string;
  lastName: string;
  type: string;
  interests: string[];
  blocked: string[];
}
