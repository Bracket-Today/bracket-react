const truncate = (body, limit, trailing) => {
  if (!body) return '';
  if (!limit) return body;
  if (body.length <= limit) return body;

  if ('string' !== typeof trailing) {
    trailing = '...';
  }

  return `${body.substring(0, limit)}${trailing}`;
}

export default truncate;
