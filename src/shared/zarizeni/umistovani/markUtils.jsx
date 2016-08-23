/** Created by hhj on 4/22/16. */
import React from 'react'
import MyDraggable from '@hhjcz/react-lib/lib/components/MyDraggable'
import colors from '../../app/colors'

const style = { background: colors.deepOrange100 }

export function markPotencialniNepiop(stringToMark, regExp = /((?:SA-)?(?:ETH)?\d{4,6})/) {

  if (typeof stringToMark !== 'string') stringToMark = JSON.stringify(stringToMark)
  if (!stringToMark || stringToMark.length === 0) return null

  const splitted = stringToMark.split(regExp)

  return splitted.reduce((markedElement, subElement) => {
    if (subElement.match(regExp)) {
      subElement = <MyDraggable value={subElement} style={style}>{subElement}</MyDraggable>
    }

    return <span>{markedElement}{subElement}</span>
  }, null)
}
