import { UserButton } from '@clerk/nextjs';

const ExpensesPage = () => {
  return (
    <div className="flex gap-2 items-center">
      ExpensesPage
      <UserButton />
    </div>
  );
};

export default ExpensesPage;
