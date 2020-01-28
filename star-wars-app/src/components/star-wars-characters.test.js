import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { getData as mockGetData } from '../api';
import StarWarsCharacters from './StarWarsCharacters';

// test('renders buttons', async () => {
//     const { getByText, getAllByText } = render(<StarWarsCharacters />);

//     getByText(/next/i);
//     getByText(/previous/i);

//     await wait(() => expect(getAllByText(/next/i)))
// })

jest.mock('../api');

test('renders a character', async () => {
    mockGetData.mockResolvedValueOnce({
        next: 'next',
        previous: 'previous',
        results: [
            {
                name: 'test name'
            },
            {
                name: 'another name'
            }
        ]
    })

    const { getByText } = render(<StarWarsCharacters />);

    expect(mockGetData).toHaveBeenCalledTimes(1);

    await wait(() => getByText(/test name/i));
    await wait(() => getByText(/another name/i));
})

