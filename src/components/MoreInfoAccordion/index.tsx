import React from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { ProductInfo } from '../../utils/interfaces';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const AccordionProductDetails = styled(AccordionDetails)`
  text-align: center;
  flex-direction: column;
`;

const TitleText = styled(Typography)`
  margin-bottom: 10px;
  margin-top: -15px;
`;

const PlatformText = styled(Typography)`
  margin-bottom: 10px;
`;

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
        marginLeft: '30px',
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
      <AccordionProductDetails>
        <TitleText>{productInfo ? `Title: ${productInfo.name}` : ''}</TitleText>
        <PlatformText>
          {productInfo ? `Platform: ${productInfo.type}` : ''}
        </PlatformText>
        <Typography>{`Description: `}</Typography>
        <Typography>{productInfo ? productInfo.description : ''}</Typography>
      </AccordionProductDetails>
    </Accordion>
  );
};

MoreInfoAccordion.propTypes = {
  productInfo: PropTypes.any,
};
