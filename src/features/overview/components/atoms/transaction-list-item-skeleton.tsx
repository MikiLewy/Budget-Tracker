import { Skeleton } from '@/components/ui/skeleton';

const TransactionListItemSkeleton = () => {
  return (
    <div className="flex items-center justify-between mb-2 gap-4 w-full">
      <div className="flex items-center gap-4 w-full">
        <Skeleton className="w-10 h-10 rounded-full " />
        <div className="flex flex-col gap-1 w-full max-w-xs">
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-4 w-full" />
        </div>
      </div>
      <div className="w-10">
        <Skeleton className="h-5 w-full" />
      </div>
    </div>
  );
};

export default TransactionListItemSkeleton;
