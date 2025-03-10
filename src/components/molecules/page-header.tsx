import { ReactNode } from 'react';

interface Props {
  title: string;
  description?: string;
  children?: ReactNode;
}

const PageHeader = ({ title, children, description }: Props) => {
  return (
    <header className="flex items-center justify-between mt-5 mb-10">
      <div className="flex flex-col gap-0.5">
        <h3 className="text-2xl font-medium">{title}</h3>
        {description ? <p className="text-sm text-muted-foreground">{description}</p> : null}
      </div>
      {children}
    </header>
  );
};

export default PageHeader;
