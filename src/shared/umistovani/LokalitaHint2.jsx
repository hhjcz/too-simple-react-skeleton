/** Created by hhj on 3/1/16. */
import React, { PropTypes } from 'react'
import { reduxForm } from 'redux-form'

const fields = ['id', 'name']

export class LokalitaHint2 extends React.Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
  };

  static defaultProps = {};

  render() {
    const { fields: { id } } = this.props
    return (
      <form>
        <div>
          <input type="text" {...id} />
        </div>
      </form>
    )
  }
}

export default reduxForm(
  {
    form: 'lokalitaHint2',
    fields
  },
)(LokalitaHint2)
