import React, { useState, useEffect } from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { ProductInfo } from '../../utils/interfaces';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { ProductType } from '../../utils/constants';
import Skeleton from '@material-ui/lab/Skeleton';

const AccordionProductDetails = styled(AccordionDetails)`
  text-align: center;
  flex-direction: column;
`;

const TitleText = styled(Typography)`
  margin-bottom: 10px;
  margin-top: -15px;
`;

const MoreInfoText = styled(Typography)`
  margin-bottom: 10px;
`;

const MoreInfoSkeleton = styled(Skeleton)`
  height: 75px;
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

const toApiPlatformFormat = (type: string): string => {
  switch (type) {
    case ProductType.PS4:
      return 'playstation-4';
    case ProductType.Nintendo:
      return 'switch';
    case ProductType.PC:
    case ProductType.VR:
      return 'pc';
    case ProductType.Xbox:
      return 'XONE';
    default:
      return 'UNKNOWN';
  }
};

interface MetacriticInfo {
  availableOn: [string];
  description: string;
  developer: string;
  genre: [string];
  image: string;
  publisher: [string];
  rating: string;
  releaseDate: string;
  score: number;
  title: string;
}

interface MoreInfoAccordionProps {
  productInfo: ProductInfo | null;
  setIsPlaying?: (value: boolean) => void;
}

export const MoreInfoAccordion: React.FC<MoreInfoAccordionProps> = ({
  productInfo,
  setIsPlaying,
}) => {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(true);
  const [metaCriticInfo, setMetaCriticInfo] = useState<null | MetacriticInfo>(
    null
  );

  useEffect(() => {
    if (!productInfo || !process.env.GATSBY_METACRITIC_API_KEY) return;

    //needed to prevent errors being thrown if components is unmounted while in the process of 'fetching'
    let didCancel = false;

    setIsLoading(true);

    fetch(
      `https://chicken-coop.p.rapidapi.com/games/${
        productInfo.name
      }?platform=${toApiPlatformFormat(productInfo.type)}`,
      {
        method: 'GET',
        headers: {
          'x-rapidapi-host': 'chicken-coop.p.rapidapi.com',
          'x-rapidapi-key': process.env.GATSBY_METACRITIC_API_KEY,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (didCancel) return;
        else if (data && data.result && data.result !== 'No result') setMetaCriticInfo(data.result as MetacriticInfo);
        else setMetaCriticInfo(null);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        if (!didCancel) setIsLoading(false);
      });

    return () => {
      didCancel = true;
    };
  }, [productInfo, process.env.GATSBY_METACRITIC_API_KEY]);

  if (!productInfo) return null;
  return (
    <Accordion
      className={classes.accordion}
      onClick={() => setIsPlaying && setIsPlaying(false)}
    >
      <AccordionSummary
        style={{ display: 'flex'}}
        className={classes.summary}
        expandIcon={<ExpandMoreIcon style={{ color: 'white' }} />}
      >
        <Typography className={classes.heading}>MORE INFORMATION</Typography>
      </AccordionSummary>
      {isLoading ? (
        <SkeltonDetails />
      ) : metaCriticInfo !== null ? (
        <MetacriticDetails
          description={productInfo.description ? productInfo.description : ''}
          metacriticInfo={metaCriticInfo}
          platform={productInfo.type}
        />
      ) : (
        <ProductDetails productInfo={productInfo} />
      )}
    </Accordion>
  );
};

MoreInfoAccordion.propTypes = {
  productInfo: PropTypes.any,
  setIsPlaying: PropTypes.func,
};

const SkeltonDetails = () => (
  <AccordionProductDetails>
    <MoreInfoSkeleton />
  </AccordionProductDetails>
);

const ProductDetails: React.FC<MoreInfoAccordionProps> = ({ productInfo }) => {
  if (!productInfo) return null;
  return (
    <AccordionProductDetails>
      <TitleText>{`Title: ${productInfo.name}`}</TitleText>
      <Typography>{`Description: `}</Typography>
      <Typography>{productInfo.description}</Typography>
      <MoreInfoText>
        {productInfo ? `Platform: ${productInfo.type}` : ''}
      </MoreInfoText>
    </AccordionProductDetails>
  );
};

ProductDetails.propTypes = {
  productInfo: PropTypes.any,
};

interface MetacriticDetailsProps {
  metacriticInfo: MetacriticInfo;
  description: string;
  platform: string;
}

const MetacriticDetails: React.FC<MetacriticDetailsProps> = ({
  metacriticInfo,
  description,
  platform,
}) => (
  <AccordionProductDetails>
    <TitleText>{`Title: ${metacriticInfo.title}`}</TitleText>
    <Typography>{`Description: `}</Typography>
    <MoreInfoText>{description}</MoreInfoText>
    <MoreInfoText>{`Platform: ${platform}`}</MoreInfoText>
    <MoreInfoText>{`Developer: ${metacriticInfo.developer}`}</MoreInfoText>
    <MoreInfoText>{`Genres: ${metacriticInfo.genre.join(', ')}`}</MoreInfoText>
    <MoreInfoText>{`Release Date: ${metacriticInfo.releaseDate}`}</MoreInfoText>
    <MoreInfoText>{`Metacritic Score: ${metacriticInfo.score}`}</MoreInfoText>
    <MoreInfoText>{`Rating: ${metacriticInfo.rating}`}</MoreInfoText>
  </AccordionProductDetails>
);

MetacriticDetails.propTypes = {
  metacriticInfo: PropTypes.any.isRequired,
  description: PropTypes.string.isRequired,
  platform: PropTypes.string.isRequired,
};
