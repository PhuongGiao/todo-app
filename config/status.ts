export type TStatus = {
  id: number;
  title: string;
  value: string;
};
export const STATUSES: TStatus[] = [
  { id: 1, title: 'All', value: 'all' },
  { id: 2, title: 'Todo', value: 'todo' },
  { id: 3, title: 'Done', value: 'done' },
];
