/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState, forwardRef } from 'react';
import PropTypes from 'prop-types';
import { styled } from "@mui/material/styles";
import { Dialog, Paper, Slide } from '@mui/material';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction='down' ref={ref} {...props} />;
});

const StyledPaper = styled(Paper)(() => ({
  backgroundColor: "var(--color-surface)",
  boxShadow: "var(--shadow-medium)",
  borderRadius: "var(--radius-base)",
  position: "fixed",
}));

const NavLink = styled('a', {
  shouldForwardProp: (prop) => prop !== 'noBorder',
})(({ noBorder }) => ({
  display: 'block',
  borderBottom: noBorder ? 'none' : '1px solid var(--color-primary-hover)',
  padding: '15px 20px',
  width: '200px',
  textDecoration: 'none',
  fontSize: '12pt',
  color: 'var(--color-text-primary)',
  transition: 'var(--transition-base)',
  '&:hover': {
    backgroundColor: 'var(--color-hover)',
  },
}));


function TransitionDialog(props) {
  const [drawerOpen, setOpen] = useState(props.open);
  const [activeTab, setTab] = useState(props.currentTab);
  const [anchor, setAnchor] = useState({ top: 50, left: 0 });

  useEffect(() => {
    if (activeTab !== false) {
      setTimeout(() => {
        setTab(props.currentTab);
      }, 500);
    } else {
      setTab(props.currentTab);
    }
  }, [props.currentTab]);

  useEffect(() => {
    if (props.open && props.currentTab?.name) {
      const els = document.evaluate(
        `//button[contains(., '${props.currentTab.name}')]`,
        document,
        null,
        XPathResult.ANY_TYPE,
        null
      );
      const el = els.iterateNext();
      if (el) {
        setAnchor({
          top: el.offsetTop + el.offsetHeight,
          left: el.offsetLeft + 150,
        });
      }
    }
    setOpen(props.open);
  }, [props.open]);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      open={drawerOpen}
      TransitionComponent={Transition}
      transitionDuration={400}
      onClose={handleClose}
      sx={{ zIndex: 1 }}
      elevation={0}
      hideBackdrop={true}
      disableScrollLock
    >
      <StyledPaper sx={{ top: anchor.top, left: anchor.left }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {typeof activeTab === 'object' &&
            activeTab?.subSections.map((page, index) => (
              <NavLink
                href={page.slug}
                key={page.name}
                noBorder={index === activeTab.subSections.length - 1}
              >
                {page.name}
              </NavLink>
            ))}
        </div>
      </StyledPaper>
    </Dialog>
  );
}

TransitionDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  currentTab: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool
  ]),
};

export default TransitionDialog;