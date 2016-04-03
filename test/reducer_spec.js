import {Map, fromJS} from 'immutable';
import {expect} from 'chai';

import reducer from '../src/reducer';

describe('reducer', () => {

  it('handles set_entries', () => {
    const initialstate = Map();
    const action = {type: 'SET_ENTRIES', entries: ['trainspotting']};
    const nextstate = reducer(initialstate, action);

    expect(nextstate).to.equal(fromJS({
      entries: ['trainspotting']
    }));
  });

  it('handles next', () => {
    const initialstate = fromJS({
      entries: ['trainspotting', '28 days later']
    });
    const action = {type: 'NEXT'};
    const nextstate = reducer(initialstate, action);

    expect(nextstate).to.equal(fromJS({
      vote: {
        pair: ['trainspotting', '28 days later']
      },
      entries: []
    }));
  });

  it('handles vote', () => {
    const initialstate = fromJS({
      vote: {
        pair: ['trainspotting', '28 days later']
      },
      entries: []
    });
    const action = {type: 'VOTE', entry: 'trainspotting'};
    const nextstate = reducer(initialstate, action);

    expect(nextstate).to.equal(fromJS({
      vote: {
        pair: ['trainspotting', '28 days later'],
        tally: {trainspotting: 1}
      },
      entries: []
    }));
  });

  it('has an initial state', () => {
    const action = {type: 'SET_ENTRIES', entries: ['Trainspotting']};
    const nextState = reducer(undefined, action);
    expect(nextState).to.equal(fromJS({
      entries: ['Trainspotting']
    }));
  });

  it('can be used with reduce', () => {
    const actions = [
      {type: 'SET_ENTRIES', entries: ['Trainspotting', '28 Days Later']},
      {type: 'NEXT'},
      {type: 'VOTE', entry: 'Trainspotting'},
      {type: 'VOTE', entry: '28 Days Later'},
      {type: 'VOTE', entry: 'Trainspotting'},
      {type: 'NEXT'}
    ];
    const finalState = actions.reduce(reducer, Map());

    expect(finalState).to.equal(fromJS({
      winner: 'Trainspotting'
    }));
  });

});
