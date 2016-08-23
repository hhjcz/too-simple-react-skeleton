/** Created by hhj on 4/25/16. */
import React, { PropTypes } from 'react'
import Panel from 'react-bootstrap/lib/Panel'
import IconButton from 'material-ui/IconButton'
import MyIcon from '@hhjcz/react-lib/lib/components/MyIcon'
import colors from '../../app/colors'

export default class NedavneLokality extends React.Component {
  static propTypes = {
    lokality: PropTypes.object
  };

  static defaultProps = {};

  constructor(...props) {
    super(...props)
    this.state = {
      open: false
    }
  }

  render() {
    const self = this
    return (
      <div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <IconButton
            tooltip={this.state.open ? 'sbalit' : 'rozbalit'}
            onTouchTap={function() { self.setState({ open: !self.state.open }) }}
          >
            <MyIcon color={colors.green100}>{this.state.open ? 'expand_less' : 'expand_more'}</MyIcon>
          </IconButton>
          nedávno přiřazené lokality
        </div>
        <Panel collapsible expanded={this.state.open}>

          TODO - sem prijde seznam nedavno pouzivanych lokalit s moznosti ji priradit aktualnimu zarizni
          - pujde pres POST do api/zarizeni/:id/umisteni (nutno udelat redirect v routes.php do api/umisteni/)

        </Panel>
      </div>
    )
  }
}
