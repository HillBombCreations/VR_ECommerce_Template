import { useRef, useEffect, useState } from 'react';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';

const LightTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }}/>
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: 'rgba(93, 136, 66, 0.9)',
    boxShadow: theme.shadows[3],
    fontSize: theme.typography.pxToRem(14),
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(1),
    maxWidth: 220,
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.common.white,
  },
}));

const OverflowToolTip = (props) => {
  const textElementRef = useRef();
  const [hoverStatus, setHover] = useState(false);

  const compareSize = () => {
    const compare = textElementRef.current.scrollWidth > textElementRef.current.clientWidth;
    setHover(compare);
  };

  useEffect(() => {
    compareSize();
    window.addEventListener('resize', compareSize);
    return () => window.removeEventListener('resize', compareSize);
  }, []);

  return (
    <LightTooltip
      title={props.string}
      arrow
      disableHoverListener={!hoverStatus}
      placement={props.placement || 'top'}
    >
      <div 
        ref={textElementRef}
        style={{
          whiteSpace: 'nowrap',
          overflow: 'hidden', 
          textOverflow: 'ellipsis',
          color: 'black',
          cursor: props.cursor || (hoverStatus ? 'pointer' : 'default'),
          width: '100%',
          display: 'block',
          textAlign: 'center'
        }}
      >
        {props.string}
      </div>
    </LightTooltip>
  );
};

export default OverflowToolTip;
OverflowToolTip.propTypes = {
  cursor: PropTypes.bool.isRequired,
  string: PropTypes.string.isRequired,
  placement: PropTypes.string.isRequired
};