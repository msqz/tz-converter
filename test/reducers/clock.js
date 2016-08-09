import expect from 'expect';
import {timezoneConverterApp} from '../../src/app/reducers';
import {tick, setTime, runClock, haltClock} from '../../src/app/actions';


describe('clock reducers', () => {
    const now = new Date();
    it('should tick the clock when TICK', () => {

        let state = {
            clock: {
                now: now,
                isTicking: true
            },
            timezones: []
        };
        expect(timezoneConverterApp(state, tick()))
            .toEqual({
                clock: {
                    now: new Date(now.getTime() + 1000),
                    isTicking: true
                },
                timezones: []
            });
    });


    it('should run clock when RUN_CLOCK', () => {
        let state = {
            clock: {
                now: now,
                isTicking: false
            },
            timezones: []
        };

        expect(timezoneConverterApp(state, runClock()))
            .toEqual({
                clock: {
                    now: now,
                    isTicking: true
                },
                timezones: []
            })
    });


    it('should halt clock when HALT_CLOCK', () => {
        let state = {
            clock: {
                now: now,
                isTicking: true
            },
            timezones: []
        };

        expect(timezoneConverterApp(state, haltClock()))
            .toEqual({
                clock: {
                    now: now,
                    isTicking: false
                },
                timezones: []
            })
    });


    it('should set clock time when SET_TIME', () => {
        let state = {
            clock: {
                now: now,
                isTicking: true
            },
            timezones: []
        };

        let rightNow = new Date(now.getTime() + 1000);
        expect(timezoneConverterApp(state, setTime(rightNow)))
            .toEqual({
                clock: {
                    now: rightNow,
                    isTicking: true
                },
                timezones: []
            })
    });
});