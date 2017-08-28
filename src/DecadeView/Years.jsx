import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Flex from '../Flex';
import Year from './Year';

import { getBeginOfDecadeYear } from '../shared/dates';
import { getTileActivityFlags } from '../shared/utils';
import { isMaxDate, isMinDate, isValue } from '../shared/propTypes';

export default class Years extends Component {
  get start() {
    const { activeStartDate } = this.props;
    return getBeginOfDecadeYear(activeStartDate);
  }

  get end() {
    return this.start + 9;
  }

  render() {
    const { end, start } = this;
    const { maxDate, minDate, onChange, value, valueType } = this.props;

    const years = [];
    for (let year = start; year <= end; year += 1) {
      const date = new Date(year, 0, 1);

      years.push(
        <Year
          {...getTileActivityFlags(value, valueType, date, 'year')}
          date={date}
          key={year}
          maxDate={maxDate}
          minDate={minDate}
          onChange={onChange}
          year={year}
        />,
      );
    }

    return (
      <Flex
        className="react-calendar__decade-view__years"
        count={3}
        wrap
      >
        {years}
      </Flex>
    );
  }
}

Years.propTypes = {
  activeStartDate: PropTypes.instanceOf(Date).isRequired,
  maxDate: isMaxDate,
  minDate: isMinDate,
  onChange: PropTypes.func,
  value: isValue,
  valueType: PropTypes.string,
};
