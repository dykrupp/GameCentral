import React from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { ProductInfo } from '../../utils/interfaces';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    accordion: {
      width: '100%',
      backgroundColor: theme.palette.primary.main,
      color: 'white',
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
    summary: {
      '& .MuiAccordionSummary-content': {
        justifyContent: 'center',
      },
    },
  })
);

//TODO -> Get MetaCritic informatino via 'chickenCoop' api

interface MoreInfoAccordionProps {
  productInfo: ProductInfo | null;
}

export const MoreInfoAccordion: React.FC<MoreInfoAccordionProps> = ({
  productInfo,
}) => {
  const classes = useStyles();

  return (
    <Accordion className={classes.accordion} disabled={productInfo === null}>
      <AccordionSummary
        className={classes.summary}
        expandIcon={<ExpandMoreIcon style={{ color: 'white' }} />}
      >
        <Typography className={classes.heading}>MORE INFORMATION</Typography>
      </AccordionSummary>
      <AccordionDetails style={{ flexDirection: 'column' }}>
        <Typography style={{ marginBottom: '10px' }}>
          {productInfo ? `Name: ${productInfo.name}` : ''}
        </Typography>
        <Typography style={{ marginBottom: '10px' }}>
          {productInfo ? `Platform: ${productInfo.type}` : ''}
        </Typography>
        <Typography>{`Description: `}</Typography>
        <Typography>{productInfo ? productInfo.description : ''}</Typography>
      </AccordionDetails>
    </Accordion>
  );
};

MoreInfoAccordion.propTypes = {
  productInfo: PropTypes.any,
};
