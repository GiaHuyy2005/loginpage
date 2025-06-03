import '@testing-library/jest-dom';
// jest.setup.ts
global.alert = jest.fn();
beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {});
});
