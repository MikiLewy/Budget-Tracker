import { ReactNode } from 'react';

import PageContentContainer from './page-content-container';
import PageHeader from './page-header';

interface Props {
  children: ReactNode;
}

const Page = ({ children }: Props) => {
  return <main className="flex flex-col grow">{children}</main>;
};

export default Page;

Page.Header = PageHeader;
Page.ContentContainer = PageContentContainer;
