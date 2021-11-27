import React from 'react';
import { Grid, InputBase, Paper, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/material/styles';
import { ReactSelect as Select } from 'components/common/Select';
import { expertiseOptions } from 'data';
import UserCard from 'components/UserCard';
import { useRecoilState, useRecoilValue } from 'recoil';
import { expertiseState, topicState } from 'store';
import { SERVER_URL } from 'config.keys';
import axios from 'axios';
import { MentorSchemaType } from 'types';
import { useQuery } from 'react-query';
import { shuffleArray } from 'utils/helper';
import Loader from 'react-loader-spinner';

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
  paddingRight: '3rem',
});

const getMentors = async (expertise: string, topic: number) => {
  const expertise_ = expertise === undefined ? 'All' : expertise;
  const { data: response } = await axios.get<Partial<MentorSchemaType[]>>(
    `${SERVER_URL}/api/get-mentors`,
    {
      params: {
        expertise: expertise_,
        topic,
      },
    },
  );
  // @ts-ignore
  return shuffleArray(response);
};

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
  console.log(data.slice(0, 3));
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
        <Grid item xs={6} sm={4} className="search_wrapper">
          <TextAreaWrapper>
            <SearchIcon sx={{ color: 'darkgrey' }} />
            <InputBase
              className="Search_Input"
              placeholder="Search by Company, Position"
              inputProps={{ 'aria-label': 'Search by Company Position' }}
            />
          </TextAreaWrapper>
        </Grid>
        <Grid item xs={6} sm={4} lg={3} className="search_wrapper">
          <Paper sx={{ display: 'flex', minWidth: '240px' }}>
            <Select
              name="Expertise"
              sx={{ fontSize: '20px' }}
              options={expertiseOptions}
              value={expertise}
              onChange={setExpertise}
              isSearchable={true}
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
