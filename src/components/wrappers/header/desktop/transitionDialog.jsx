/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types'
import { forwardRef } from 'react'
import { Dialog, Paper, Slide } from '@mui/material';
import '../../../../App.css';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction='down' ref={ref} {...props} 
  />;
});

function TransitionDialog(props) {
    const [drawerOpen, setOpen] = useState(props.open);
    const [activeTab, setTab] = useState(props.currentTab);
    const [anchor, setAnchor] = useState({ top: 50, left: 0 });

    useEffect(() => {
        if (activeTab !== false) {
            setTimeout(() => {
                setTab(props.currentTab);
            }, 500);
        } else setTab(props.currentTab);
    }, [props.currentTab]);

    useEffect(() => {
        if (props.open && props.currentTab?.name) {
            const els = document.evaluate(`//button[contains(., '${props.currentTab.name}')]`, document, null, XPathResult.ANY_TYPE, null);
            const el = els.iterateNext();
            setAnchor({
                top: el.offsetTop + el.offsetHeight,
                left: el.offsetLeft + 150,
            });
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
            onClose={() => handleClose}
            sx={{ zIndex: 1 }}
            elevation={0}
            hideBackdrop={true}
            disableScrollLock
            className='app-styleguide app'
        >
            <Paper sx={{
                backgroundColor: '#fffff',
                position: 'fixed',
                top: anchor.top,
                left: anchor.left
            }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    { 
                        typeof activeTab === 'object' ? 
                            activeTab?.subSections.map((page) => (
                                <a
                                    href={page.slug}
                                    key={page.name}
                                    className='navDialog'
                                    style={{
                                        borderBottom: '1px solid rgba(0, 0, 0, 0.25)',
                                        padding: '15px 20px',
                                        width: '200px',
                                        textWrap: 'wrap',
                                        textDecoration: 'none',
                                        fontSize: '12pt',
                                        color: 'black'
                                    }}
                                >
                                    { page.name }
                                </a>
                            )) : 
                            null
                    }
                </div>
            </Paper>
        </Dialog>
  );
}

TransitionDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    currentTab: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.bool
    ]),
}
export default TransitionDialog;