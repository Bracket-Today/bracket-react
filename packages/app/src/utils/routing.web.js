import React from 'react';
import { Link as BaseLink } from 'react-router-dom';
export {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom';

export const Link = ({ style, children, ...props }) => {
  style = { textDecoration: 'none', ...style };

  return (
    <BaseLink style={style} {...props}>{children}</BaseLink>
  );
};
