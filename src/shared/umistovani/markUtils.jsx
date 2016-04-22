/** Created by hhj on 4/22/16. */
import React from 'react'
import MyDraggable from '../lib/MyDraggable'
import colors from '../app/colors'

export function markPotencialniNepiop(string) {
  if (!string) return null
  // TODO - works with single match - should do multiple with /\d{4,6}/gi
  const match = string.match(/\d{4,6}/)
  let marked = string
  if (match) {
    marked = (
      <span>
        {string.substring(0, match.index)}
        <MyDraggable value={match} style={{ background: colors.deepOrange100 }}>
          {match[0]}
        </MyDraggable>
        {string.substring(match.index + match[0].length, string.length)}
      </span>
    )
  }

  return marked
}
