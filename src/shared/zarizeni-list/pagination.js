/**
 * Created by hhj on 12/18/15.
 */
import {Record} from 'immutable'

export class Pagination extends Record({
  page: 1,
  perPage: 10,
  total: 0,
  totalPages: 3,
}) {
}

export const gotoPage = (pagination, page) => {
  return new Pagination({...pagination.toObject(), page: page})
}

export const nextPage = (pagination) => {
  if (pagination.page >= pagination.totalPages) return pagination;
  return new Pagination({...pagination.toObject(), page: pagination.page + 1})
}

export const previousPage = (pagination) => {
  if (pagination.page <= 1) return pagination;
  return new Pagination({...pagination.toObject(), page: pagination.page - 1})
}

export default Pagination
