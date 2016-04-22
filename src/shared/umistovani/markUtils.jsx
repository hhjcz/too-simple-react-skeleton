/** Created by hhj on 4/22/16. */
import React from 'react'
import MyDraggable from '../lib/MyDraggable'
import colors from '../app/colors'

const style = { background: colors.deepOrange100 }

export function markPotencialniNepiop(string) {
  if (!string) return null

  const regExp = /(\d{4,6})/

  const splitted = JSON.stringify(string).split(regExp)

  const marked = splitted.reduce((markedElement, match) => {
    if (match.match(regExp)) {
      markedElement = (<span>
        {markedElement}
        <MyDraggable value={match} style={style}> {match} </MyDraggable>
      </span>)
    } else {
      markedElement = <span>{markedElement}{match}</span>
    }

    return markedElement
  }, null)

  return marked
}
