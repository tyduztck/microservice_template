import { IUser } from '../interfaces/users.interface';

const posts: IUser[] = [
  {
    username: 'ckteo',
    title: 'ckteo',
  },
  {
    username: 'test',
    title: 'test',
  },
];

export const getUserDataForTest = async( username: string ) => {
  return posts.filter((post) => post.username === username)
}