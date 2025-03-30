export const drizzleMock = () => ({
  drizzle: () => vi.fn().mockImplementation(() => ({})),
});
