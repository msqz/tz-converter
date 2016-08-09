import expect from 'expect';
import {timezoneConverterApp} from '../../src/app/reducers';
import {addTimezone} from '../../src/app/actions';

describe('timezones reducers', () => {
    const ZONE_NAME = 'ZONE';
    const ZONE_OFFSET = 120;

    it('should add timezone when ADD_TIMEZONE', () => {
        expect(
            timezoneConverterApp([], addTimezone(ZONE_NAME, ZONE_OFFSET))
        ).toEqual({
            clock: {},
            timezones: [{
                name: ZONE_NAME,
                offset: ZONE_OFFSET,
                id: 1
            }]
        });
    });

    it('should assign timezone unique id when ADD_TIMEZONE', () => {
        let state = {
            clock: {},
            timezones: []
        };

        state.timezones = state.timezones.concat(timezoneConverterApp(state, addTimezone(ZONE_NAME, ZONE_OFFSET)).timezones);
        state = timezoneConverterApp(state, addTimezone(ZONE_NAME, ZONE_OFFSET));

        expect(state.timezones)
            .toEqual([
                {
                    name: ZONE_NAME,
                    offset: ZONE_OFFSET,
                    id: 1
                },
                {
                    name: ZONE_NAME,
                    offset: ZONE_OFFSET,
                    id: 2
                }
            ]);
    });
});