import { Grid } from '@mui/material';
import React from 'react';
import { styled, Button } from '@mui/material';
import { expertiseOptions, motivationOptions } from 'data';
import { motivationState, expertiseState } from 'store';
import { useRecoilState } from 'recoil';
import { Link, ReactSelect as Select } from 'components/common';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const StyledButton = styled(Button)`
  background-size: 200%;
  font-weight: 700;
  color: #f5f5f5;
  font-size: 1rem;
  background-image: linear-gradient(90deg, #3512b2, #d18873);
  box-shadow:
    0 2px 1px transparent,
    0 4px 2px transparent,
    0 8px 4px transparent,
    0 16px 8px transparent,
    0 32px 16px transparent;
  transition: all 0.8s cubic-bezier(0.32, 1.32, 0.42, 0.68);

  /* transition: all 0.8s cubic-bezier(0.32, 1.32, 0.42, 0.68); */
  :hover {
    transform: scale(1.05);
    /* transform: linear-gradient(230deg, #35249b, #8b13c3 50%, #ea577a); */
  }
`;

const StyledGrid = styled(Grid)({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-around',
  width: '100%',
  p: 2,
  // BackgroundColor: 'greyx`',
});

const Seachbox = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('md'));
  const [motivation, setMotivation] = useRecoilState(motivationState);
  const [expertise, setExpertise] = useRecoilState(expertiseState);
  return (
    <>
      <Grid container item>
        <StyledGrid item xs={12}>
          <Select
            menuPlacement="auto"
            name="Motivation"
            sx={{ fontSize: '20px', padding: '8px 8px', color: 'white' }}
            options={motivationOptions}
            value={motivation}
            onChange={setMotivation}
            isSearchable={matches}
            classNamePrefix="select"
            placeholder={<span>Filter by Motivation</span>}
          />
          <Select
            name="Expertise"
            menuPlacement="auto"
            sx={{
              fontSize: '20px',
              margin: '8px 8px',
              color: 'white',
              '.select__menu': {
                width: '90%',
              },
            }}
            options={expertiseOptions}
            value={expertise}
            onChange={setExpertise}
            isSearchable={matches}
            classNamePrefix="select"
            placeholder={<span>Filter by Expertise</span>}
          />
        </StyledGrid>
      </Grid>
      <Grid
        container
        item
        sx={{
          placeContent: 'center',
          padding: '1rem',
        }}>
        <Link to="/search">
          <StyledButton variant="contained">Find a Mentor ⚡</StyledButton>
        </Link>
      </Grid>
    </>
  );
};

export default Seachbox;
