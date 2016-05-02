/** Created by hhj on 3/11/16. */
/* eslint-disable max-len */
import React, { PropTypes } from 'react'
import { List } from 'immutable'
import uniqBy from 'lodash/uniqBy'
import Avatar from 'material-ui/Avatar'
import colors from '../app/colors'
import { markPotencialniNepiop } from './markUtils'

export default class NepiOpy extends React.Component {
  static propTypes = {
    nepiOpy: PropTypes.instanceOf(List),
  };

  static defaultProps = {
    nepiOpy: List(),
  };

  render() {
    const { nepiOpy } = this.props
    const uniqNepiOpy = uniqBy(nepiOpy.toArray(), nepiOp => nepiOp.ixop)
    const slicedNepiOpy = uniqNepiOpy.slice(0, 10)

    const listItems = slicedNepiOpy.map(nepiOp =>
      <div style={{ paddingLeft: '1em' }} key={nepiOp.ixop}>
        {markPotencialniNepiop(nepiOp.ixop)} {markPotencialniNepiop(nepiOp.akronym)} "{nepiOp.nazevFirmy}"
      </div>
    )

    const divHeight = Math.max(Math.ceil(slicedNepiOpy.length / 2 * 1.6), 2)

    return listItems.length > 0 ?
      <div style={{ display: 'flex', alignItems: 'center', paddingLeft: '2em' }}>
        <Avatar size={20} backgroundColor={colors.green300} color={colors.grey50}>
          {uniqNepiOpy.length}
        </Avatar>
        <div style={{ display: 'flex', flexFlow: 'column wrap', justifyContent: 'center', height: `${divHeight}em` }}>
          {listItems}
        </div>
      </div>
      : <div />

  }
}
