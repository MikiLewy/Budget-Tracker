import { RefreshCcw } from 'lucide-react';

import { TooltipContent } from '@/components/ui/tooltip';
import { Tooltip, TooltipTrigger } from '@/components/ui/tooltip';
import { TooltipProvider } from '@/components/ui/tooltip';

const RecurringTransactionInfo = () => {
  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger>
          <RefreshCcw size={14} className="text-muted-foreground" />
        </TooltipTrigger>
        <TooltipContent side="right">Recurring transaction</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default RecurringTransactionInfo;
