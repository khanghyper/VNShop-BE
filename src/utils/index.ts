import { pick } from 'lodash';

export const getInfoData = ({ fields = [], data = {} }: { fields: string[], data: any }) => {
  return pick(data, fields);
}