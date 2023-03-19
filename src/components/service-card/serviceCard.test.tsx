import * as React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { CardComponent } from './serviceCard';

describe('CardComponent', () => {
  const svgExample = (
    <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="50" height="50" rx="5" fill="#009688" />
    </svg>
);

  test('renders card with SVG, title, and subtitle', () => {
    render(<CardComponent svg={svgExample} title="Card Title" subtitle="Card Subtitle" />);

    expect(screen.getByText('Card Title')).toBeInTheDocument();
    expect(screen.getByText('Card Subtitle')).toBeInTheDocument();
    expect(screen.getByTestId('card-svg')).toContainElement(screen.getByRole('img'));
  });

  test('triggers onClick event when card is clicked', () => {
    const onClick = jest.fn();
    render(<CardComponent svg={svgExample} title="Card Title" subtitle="Card Subtitle" onClick={onClick} />);

    fireEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
