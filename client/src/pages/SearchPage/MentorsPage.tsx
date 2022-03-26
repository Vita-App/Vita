import React from 'react';
import { Grid, InputBase, Paper, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/material/styles';
import { ReactSelect as Select } from 'components/common';
import { expertiseOptions } from 'data';
import UserCard from 'components/UserCard';
import { useRecoilState, useRecoilValue } from 'recoil';
import { expertiseState, topicState } from 'store';
import { useQuery } from 'react-query';
import Loader from 'react-loader-spinner';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { getMentors } from 'utils/api-helper';

const GridWrapper = styled(Grid)({
  '.search_wrapper': {
    display: 'flex',
    alignItems: 'center',
  },
});

const StyledBox = styled(Box)({
  width: '100%',
  height: '15vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  '& svg': {
    fill: 'lightgray',
  },
});

const TextAreaWrapper = styled(Paper)({
  marginLeft: '16px',
  padding: '2px 4px',
  display: 'flex',
  alignItems: 'center',
  backgroundColor: 'black !important',
  width: 400,

  '.Search_Input': {
    fontSize: '20px',
    padding: '0px 6px',
    width: '100%',
  },
});

const CardContainer = styled(Grid)({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, 300px)',
  justifyContent: 'space-between',
  marginTop: '3rem',
});

// @ts-ignore
const RenderCards = ({
  isLoading,
  data,
}: {
  isLoading: boolean;
  data: any[];
}) => {
  if (isLoading || typeof data === 'undefined') return <div />;

  const users = data.slice(0, 50);
  return (
    <CardContainer container>
      {users.map((user, index) => (
        <UserCard
          key={index}
          // @ts-ignore
          user={user}
        />
      ))}
    </CardContainer>
  );
};

const MentorsPage = () => {
  const [expertise, setExpertise] = useRecoilState(expertiseState);
  // @ts-ignore
  const expertiseValue = expertise?.value;
  const topic = useRecoilValue(topicState);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('md'));

  const { isLoading, data } = useQuery(['mentors', expertiseValue, topic], () =>
    getMentors(expertiseValue, topic),
  );
  const content =
    isLoading === false ? (
      <RenderCards
        isLoading={isLoading}
        // @ts-ignore
        data={data}
      />
    ) : (
      <StyledBox>
        <Loader type="ThreeDots" color="#00BFFF" height={80} width={80} />
      </StyledBox>
    );

  return (
    <>
      <GridWrapper container spacing={2}>
        <Grid item xs={10} sm={4} className="search_wrapper">
          <TextAreaWrapper>
            <SearchIcon sx={{ color: 'darkgrey' }} />
            <InputBase
              disabled
              className="Search_Input"
              placeholder="Search by Company, Position"
              inputProps={{
                'aria-label': 'Search by Company Position',
              }}
            />
          </TextAreaWrapper>
        </Grid>
        <Grid item xs={12} sm={4} lg={3} className="search_wrapper">
          <Paper
            sx={{ display: 'flex', minWidth: '240px', marginLeft: '16px' }}>
            <Select
              menuPlacement="auto"
              name="Expertise"
              sx={{ fontSize: '20px' }}
              options={expertiseOptions}
              value={expertise}
              onChange={setExpertise}
              isSearchable={matches}
              classNamePrefix="select"
              placeholder={<span>Filter by Expertise</span>}
            />
          </Paper>
        </Grid>
      </GridWrapper>
      {content}
    </>
  );
};

export default MentorsPage;
