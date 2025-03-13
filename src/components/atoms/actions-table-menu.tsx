'use client';

import { MoreVertical } from 'lucide-react';

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export interface Action {
  key: string;
  label: string;
  onClick: () => void;
  disabled?: boolean;
  tooltipTitle?: string;
}

interface Props {
  actions: Action[];
}

const ActionsTableMenu = ({ actions }: Props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0 ml-auto">
          <span className="sr-only">Open menu</span>
          <MoreVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {actions.map(action => (
          <TooltipProvider key={action.key} delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <span>
                  <DropdownMenuItem
                    disabled={action.disabled}
                    aria-disabled={action.disabled}
                    key={action.key}
                    onClick={action.onClick}>
                    {action.label}
                  </DropdownMenuItem>
                </span>
              </TooltipTrigger>
              {action.tooltipTitle && action.disabled ? (
                <TooltipContent side="left">{action.tooltipTitle ?? ''}</TooltipContent>
              ) : null}
            </Tooltip>
          </TooltipProvider>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ActionsTableMenu;
