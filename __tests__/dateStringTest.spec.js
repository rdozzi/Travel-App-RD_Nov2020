import { dateString } from '../src/client/js/dateString.js';

describe('Test dateString function', () => {
    test('Check that updateUI returns a string', () => {
        const day = 3;
        const month = 12;
        const year = 2020;

        expect(typeof(dateString(day, month, year))).toEqual('string');
        expect(dateString(day, month, year)).toEqual('2020-12-03');
    });
});