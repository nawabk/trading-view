import React, { useState, useEffect } from 'react';

import { formatDate } from '../utils/shared';

const Range = ({ range, applyTimeRange }) => {
  const [from, setFrom] = useState({ date: '', hrs: 0, min: 0, sec: 0 });
  const [to, setTo] = useState({ date: '', hrs: 0, min: 0, sec: 0 });
  const [changeRange, setChangeRange] = useState(false);

  useEffect(() => {
    if (range) {
      setFrom({
        date: formatDate(range.from),
        hrs: range.from.getHours(),
        min: range.from.getMinutes(),
        sec: range.from.getSeconds()
      });
      setTo({
        date: formatDate(range.to),
        hrs: range.to.getHours(),
        min: range.to.getMinutes(),
        sec: range.to.getSeconds()
      });
    }
  }, [range]);

  const formSubmitHandler = e => {
    e.preventDefault();
    const fromDate = Date.parse(from.date);
    const toDate = Date.parse(to.date);
    if (toDate - fromDate < 0) {
      console.log('to Date cannot be less than from date');
      return;
    }
    applyTimeRange(from, to);
  };
  return (
    <div className='range-container'>
      <h2 className='range-heading'>
        Change Time Range{' '}
        {!changeRange ? (
          <i
            className='fa fa-chevron-down'
            aria-hidden='true'
            onClick={() => setChangeRange(true)}
          ></i>
        ) : (
          <i
            className='fa fa-chevron-up'
            aria-hidden='true'
            onClick={() => setChangeRange(false)}
          ></i>
        )}
      </h2>
      {changeRange && (
        <form className='range' onSubmit={formSubmitHandler}>
          <div className='form-group'>
            <label htmlFor='from' className='form-label'>
              From
            </label>
            <input
              type='date'
              className='form-input'
              id='from'
              value={from.date}
              required
              onChange={e => {
                setFrom(prevState => ({
                  ...prevState,
                  date: e.target.value
                }));
              }}
            />
            <div className='range-time'>
              <input
                type='number'
                className='form-time'
                placeholder='HH'
                value={from.hrs}
                required
                min='0'
                max='23'
                onChange={e =>
                  setFrom(prevState => ({
                    ...prevState,
                    hrs: e.target.value
                  }))
                }
              />
              <input
                type='number'
                className='form-time'
                placeholder='MM'
                required
                min='0'
                max='59'
                value={from.min}
                onChange={e =>
                  setFrom(prevState => ({
                    ...prevState,
                    mins: e.target.value
                  }))
                }
              />
              <input
                type='number'
                className='form-time'
                placeholder='SS'
                value={from.sec}
                required
                min='0'
                max='59'
                onChange={e =>
                  setFrom(prevState => ({
                    ...prevState,
                    sec: e.target.value
                  }))
                }
              />
            </div>
          </div>
          <div className='form-group'>
            <label htmlFor='to' className='form-label'>
              To
            </label>
            <input
              type='date'
              className='form-input'
              id='to'
              value={to.date}
              required
              onChange={e =>
                setTo(prevState => ({
                  ...prevState,
                  date: e.target.value
                }))
              }
            />
            <div className='range-time'>
              <input
                type='number'
                className='form-time'
                placeholder='HH'
                value={to.hrs}
                required
                min='0'
                max='23'
                onChange={e =>
                  setTo(prevState => ({
                    ...prevState,
                    hrs: e.target.value
                  }))
                }
              />
              <input
                type='number'
                className='form-time'
                placeholder='MM'
                value={to.min}
                required
                min='0'
                max='59'
                onChange={e =>
                  setTo(prevState => ({
                    ...prevState,
                    min: e.target.value
                  }))
                }
              />
              <input
                type='number'
                className='form-time'
                placeholder='SS'
                value={to.sec}
                required
                min='0'
                max='59'
                onChange={e =>
                  setTo(prevState => ({
                    ...prevState,
                    sec: e.target.value
                  }))
                }
              />
            </div>
          </div>
          <button className='btn'>Apply</button>
        </form>
      )}
    </div>
  );
};

export default Range;
