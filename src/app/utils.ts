import {format, parseISO} from 'date-fns'
import { enUS } from 'date-fns/locale'

const formatDate = (dateString: string | undefined) => {
  if(!dateString) return '';

  const data = parseISO(dateString);

  return format(data, 'MMM dd, yyyy', {locale: enUS});
}

export default formatDate;