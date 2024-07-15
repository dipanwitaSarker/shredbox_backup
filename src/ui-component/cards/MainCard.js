import PropTypes from 'prop-types';
import { forwardRef } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Card,
  CardContent,
  // CardHeader,
  Divider,
  // Typography,
  Box,
  IconButton,
  CardHeader
  // Typography
} from '@mui/material';
import NoteAddOutlinedIcon from '@mui/icons-material/NoteAddOutlined';
import { useNavigate } from 'react-router';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';

// constant
const headerSX = {
  '& .MuiCardHeader-action': { mr: 0 }
};

// ==============================|| CUSTOM MAIN CARD ||============================== //
const HtmlTooltip = styled(({ className, ...props }) => <Tooltip {...props} classes={{ popper: className }} arrow />)(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9'
  }
}));
const MainCard = forwardRef(
  (
    {
      border = true,
      boxShadow,
      children,
      content = true,
      contentClass = '',
      contentSX = {},
      // darkTitle,
      // secondary,
      shadow,
      sx = {},
      title,
      isButton,
      url,
      isEnable,
      ...others
    },
    ref
  ) => {
    const theme = useTheme();
    const navigate = useNavigate();

    return (
      <Card
        ref={ref}
        {...others}
        sx={{
          border: border ? '1px solid' : 'none',
          borderColor: theme.palette.primary[200] + 25,
          ':hover': {
            boxShadow: boxShadow ? shadow || '0 2px 14px 0 rgb(32 40 45 / 8%)' : 'inherit'
          },
          position: 'relative',
          ...sx
        }}
      >
        {/* card header and action */}
        <Box
        // sx={{
        //   display: 'flex',
        //   alignItems: 'center',
        //   justifyContent: 'space-between',
        //   position: 'absolute',
        //   right: '-25px',
        //   zIndex: '11',
        //   top: '25px'
        // }}
        >
          {title == '' && <CardHeader sx={headerSX} title={''} />}
          {isEnable && isButton && (
            <HtmlTooltip title={'Add' + ' ' + title}>
              <IconButton
                sx={{
                  // mr: 5,
                  // position: 'absolute',
                  // right: '25px',
                  zIndex: 11,
                  position: 'absolute',
                  right: 20,
                  top: 10
                }}
                color="secondary"
                onClick={() => {
                  navigate(url);
                }}
              >
                <NoteAddOutlinedIcon />
              </IconButton>
            </HtmlTooltip>
          )}
        </Box>
        {/* content & header divider */}
        {title == '' && <Divider />}

        {/* card content */}
        {content && (
          <CardContent sx={contentSX} className={contentClass}>
            {children}
          </CardContent>
        )}
        {!content && children}
      </Card>
    );
  }
);

MainCard.propTypes = {
  border: PropTypes.bool,
  boxShadow: PropTypes.bool,
  children: PropTypes.node,
  content: PropTypes.bool,
  contentClass: PropTypes.string,
  contentSX: PropTypes.object,
  darkTitle: PropTypes.bool,
  secondary: PropTypes.oneOfType([PropTypes.node, PropTypes.string, PropTypes.object]),
  shadow: PropTypes.string,
  sx: PropTypes.object,
  title: PropTypes.oneOfType([PropTypes.node, PropTypes.string, PropTypes.object]),
  isButton: PropTypes.bool,
  url: PropTypes.string
};

export default MainCard;
