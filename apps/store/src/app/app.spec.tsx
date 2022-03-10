import {findByTestId, findByText, render} from '@testing-library/react';

import {BrowserRouter} from 'react-router-dom';

import App from './app';

// mock f()
function mockFetch(data) {
    return jest.fn().mockImplementation(() => {
        return Promise.resolve({
            ok: true,
            json: () => data
        })
    })
}

describe('App', () => {
    beforeEach(() => {
        window.fetch = mockFetch([]);
    });

    it('should render successfully', async () => {
        const {baseElement}: HTMLElement = render(
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        );

        // to fix error: An update to App inside a test was not wrapped in act(...)
        const element = await findByTestId(baseElement, 'app-container');

        expect(element).toBeTruthy();
    });

    it('should have a greeting as the title', async () => {
        // this default approach without "baseElement" throws "An update to App inside a test ..." error
        // const {getByText} = render(...)
        // expect(getByText(/Board Game Hoard/gi)).toBeTruthy();

        const {baseElement}: HTMLElement = render(
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        );

        expect(await findByText(baseElement, /Board Game Hoard/gi)).toBeTruthy();
    });
});
