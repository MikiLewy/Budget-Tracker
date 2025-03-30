import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}
const Tabs = ({ children }: Props) => {
  return <ul className="flex items-center gap-6 border-b">{children}</ul>;
};

export default Tabs;
