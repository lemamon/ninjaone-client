import { describe, it, expect, vi } from 'vitest';
import { screen, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'
import { DeviceProvider } from './contexts'

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

describe('App', () => {
  it('should render header and main content', () => {
    render(
      <DeviceProvider>
        <App />
      </DeviceProvider>
    );

    expect(screen.getByText('devices')).toBeInTheDocument();
    expect(screen.getByText('addDevice')).toBeInTheDocument();
  });

  it('should open add device modal when clicking add device button', async () => {
    render(
      <DeviceProvider>
        <App />
      </DeviceProvider>
    );

    await userEvent.click(screen.getByRole('button', { name: /addDevice/i }));
    expect(screen.getByRole('heading', { name: /addDevice/i })).toBeInTheDocument();
  });

  it('should close modal when clicking close button', async () => {
    render(
      <DeviceProvider>
        <App />
      </DeviceProvider>
    );

    await userEvent.click(screen.getByRole('button', { name: /addDevice/i }));
    await userEvent.click(screen.getByText('cancel'));
    expect(screen.queryByRole('heading', { name: /addDevice/i })).not.toBeInTheDocument();
  });
});