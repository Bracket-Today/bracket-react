const truncate = (body, limit, trailing) => {
  if (!body) return '';
  if (!limit) return body;
  if (body.length <= limit) return body;

  return `${body.substring(0, limit)}${trailing || '...'}`;
}

export default truncate;
