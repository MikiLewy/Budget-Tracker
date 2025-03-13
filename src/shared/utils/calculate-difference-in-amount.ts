type Payload = {
  oldAmount: number;
  newAmount: number;
};

export const calculateDifferenceInAmount = ({ oldAmount, newAmount }: Payload) => {
  return Math.abs(oldAmount - newAmount);
};
