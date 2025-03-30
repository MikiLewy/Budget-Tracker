export const clerkMock = () => ({
  useUser: vi.fn().mockImplementation(() => ({
    id: '123',
    email: 'test@test.com',
    firstName: 'Test',
    lastName: 'User',
    imageUrl: 'https://example.com/image.png',
  })),
});
