export const currentUserKeys = {
  all: ['current-user'] as const,
  detail: (clerkId: string) => [...currentUserKeys.all, { clerkId }] as const,
};
