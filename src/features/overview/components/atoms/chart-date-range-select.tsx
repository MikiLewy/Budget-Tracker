import { Select, SelectGroup, SelectContent, SelectTrigger, SelectValue, SelectItem } from '@/components/ui/select';

export type ChartDateRangeOption = 'all' | '30' | '7';

interface Props {
  value: ChartDateRangeOption;
  onChange: (value: ChartDateRangeOption) => void;
}

const selectOptions = [
  {
    label: 'All time',
    value: 'all',
  },
  {
    label: 'Last 30 days',
    value: '30',
  },
  {
    label: 'Last 7 days',
    value: '7',
  },
];

const ChartDateRangeSelect = ({ value, onChange }: Props) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a date range" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {selectOptions.map(option => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default ChartDateRangeSelect;
