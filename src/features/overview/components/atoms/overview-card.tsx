import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Props {
  title: string;
  icon: React.ReactNode;
  value: string | number;
  caption?: string;
}

const OverviewCard = ({ title, icon, value, caption }: Props) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {caption ? <p className="text-xs text-muted-foreground">{caption}</p> : null}
      </CardContent>
    </Card>
  );
};

export default OverviewCard;
