import React, { useEffect, useState } from 'react';
import {
  styled,
  Grid,
  Avatar,
  IconButton,
  Typography,
  Box,
  Tooltip,
} from '@mui/material';
import { Favorite, LinkedIn, Flag } from '@mui/icons-material';
import { lightGreen } from '@mui/material/colors';
import PaginatedBookingCard from 'components/PaginatedBookingCard';
import ShowMoreText from 'react-show-more-text';
import Divider from '@mui/material/Divider';
import { commaString } from 'utils/helper';
import { ReactSelect as Select } from 'components/common';
import { motivationOptions } from 'data';
import Appbar from 'components/Appbar';
import axios from 'axios';
import { MentorSchemaType, Topic } from 'types';
import { useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { SERVER_URL } from 'config.keys';
import Loader from 'components/Loader';
import { topics as topicData, countryCodetoName } from 'data';
import { useRecoilState, useRecoilValue } from 'recoil';
import { authState, mentorState } from 'store';
import Stats from 'components/UserPage/Stats';
import Tips from 'components/UserPage/Tips';
import Experiences from 'components/UserPage/Experiences';
import { toast } from 'react-toastify';
import Footer from 'components/Footer/Footer';

interface IProps {
  active: boolean;
}

const ActiveBadge: React.FC<IProps> = ({ active }) => (
  <Box
    sx={{
      display: 'inline-block',
      width: '10px',
      height: '10px',
      mr: '2px',
      borderRadius: '50%',
      backgroundColor: active ? 'success.main' : 'warning.main',
    }}
  />
);

const TextWrapper = styled('div')`
  width: 100%;
  .show-more {
    font-weight: 400;
    color: #d4d4d4;
    font-size: 16px;
  }

  .show-more-anchor {
    color: grey;
  }
  .show-more-anchor:hover {
    color: palevioletred;
  }
  .MuiTypography-root {
    font-family: 'Circular Std';
  }
`;

const Banner = styled('div')`
  background-color: #7f5a83;
  background-image: linear-gradient(120deg, #7f5a83 0%, #0d324d 74%);
  /* background-image: linear-gradient(90deg, #3512b2, #d18873); */

  width: 100%;
  height: 180px;
`;
const Container = styled(Grid)`
  position: relative;
  width: 100%;
  /* background: #393939; */
  font-family: inter;
`;

const PhotoWrapper = styled('div')`
  padding: 16px;
  display: flex;
  flex-direction: row;

  div {
    padding: 2px 8px;
  }
`;

const Photo = styled('div')`
  width: 50px;
  .MuiAvatar-root {
    height: 100px;
    width: 100px;
    position: absolute;
    top: 0px;
    left: 0px;
    transform: translate(0, -50%);
  }
`;

const getMentor = async (id: string | undefined) => {
  const { data: response } = await axios.get<MentorSchemaType>(
    `${SERVER_URL}/api/get-mentor`,
    {
      params: {
        id,
      },
    },
  );
  return response;
};

const likeMentor = async (id: string | undefined) => {
  const { data: response } = await axios.get<{ liked: boolean }>(
    `${SERVER_URL}/api/like/${id}`,
    {
      withCredentials: true,
    },
  );
  return response;
};

const getTopics = (topicNums: number[]) =>
  topicNums.map((el) => topicData[Number(el)]);

let likeDebounceTimer: any;

const UserPage = () => {
  const queryClient = useQueryClient();
  const auth = useRecoilValue(authState);
  const [isExpanded, setIsExpanded] = useState(false);
  const [motivation, setMotivation] = useState('All');
  const { id } = useParams();

  useEffect(() => {
    if (auth.user?.liked_mentors?.includes(id || '')) {
      setHeart('error');
      setLiked(true);
    } else {
      setHeart('inherit');
      setLiked(false);
    }
  }, [auth.user]);

  if (typeof id === 'undefined') return <div />;
  const { isLoading, data } = useQuery(['mentor', id], () => getMentor(id));
  const [mentorData, setMentorData] = useRecoilState(mentorState);
  const [liked, setLiked] = useState(false);
  const [heart, setHeart] = useState<'error' | 'inherit'>(
    liked ? 'error' : 'inherit',
  );
  const likeMutation = useMutation(
    ['likeMentor', id],
    (id: string) => likeMentor(id),
    {
      onSuccess: (data) => {
        if (data.liked) {
          setHeart('error');
          setLiked(true);
        } else {
          setHeart('inherit');
          setLiked(false);
        }

        queryClient.invalidateQueries('getStats');
      },
      onError: () => {
        toast.error('You must be logged in to like a mentor');
      },
    },
  );
  const [page, setPage] = useState(1);

  if (isLoading) return <Loader />;

  if (typeof data === 'undefined') return <div />;

  if (!isLoading && mentorData !== data) setMentorData(data);

  const {
    first_name,
    last_name,
    avatar: { url: image_link },
    bio,
    linkedIn,
    experiences,
    expertise,
    is_mentoring,
    topics: topicNums,
    countryCode,
  } = data;

  const name = `${first_name} ${last_name}`;
  const topics: Topic[] = getTopics(topicNums);

  const debounceLike = () => {
    if (!auth.isLoggedIn) {
      toast.error('You must be logged in to like a mentor');
      return;
    }

    setHeart(heart === 'inherit' ? 'error' : 'inherit');
    clearTimeout(likeDebounceTimer);

    likeDebounceTimer = setTimeout(() => {
      if (!liked && heart === 'inherit') {
        likeMutation.mutate(id);
      }

      if (liked && heart === 'error') {
        likeMutation.mutate(id);
      }
    }, 600);
  };

  return (
    <>
      <Appbar />
      <Grid container>
        <Grid item xs={12}>
          <Banner />
        </Grid>
        <Grid
          item
          container
          xs={12}
          md={7}
          sx={{ color: '#f5f5f5' }}
          justifyContent="space-between"
          pl={{ xs: 2, md: 10 }}
          pr={{ xs: 2, sm: 0 }}>
          <Container item>
            <PhotoWrapper>
              <Photo>
                <Avatar
                  src={image_link}
                  sx={{
                    bgcolor: lightGreen[500],
                    padding: '0px !important',
                    border: '5px solid #3E3E42',
                  }}>
                  N
                </Avatar>
              </Photo>
              <span style={{ flexGrow: 1 }}></span>
              {linkedIn && (
                <IconButton
                  target="_blank"
                  href={linkedIn}
                  aria-label="linkedIn"
                  size="large"
                  color="primary">
                  <LinkedIn fontSize="inherit" />
                </IconButton>
              )}
              <Tooltip title="Like">
                <IconButton
                  onClick={() => {
                    debounceLike();
                  }}
                  aria-label="like"
                  size="large"
                  color={heart}>
                  <Favorite fontSize="inherit" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Report">
                <IconButton aria-label="report" size="large" color="inherit">
                  <Flag fontSize="inherit" />
                </IconButton>
              </Tooltip>
            </PhotoWrapper>

            <TextWrapper>
              <Typography
                variant="h5"
                fontWeight={700}
                sx={{ display: 'flex', alignItems: 'center' }}>
                Hi, I m {name}
                {countryCode ? (
                  <Tooltip title={countryCodetoName[countryCode.toUpperCase()]}>
                    <img
                      style={{ paddingLeft: '8px' }}
                      src={`https://flagcdn.com/96x72/${countryCode.toLowerCase()}.png`}
                      srcSet={`https://flagcdn.com/192x144/${countryCode.toLowerCase()}.png 2x`}
                      width="32"
                      height="24"
                    />
                  </Tooltip>
                ) : (
                  <></>
                )}
              </Typography>
              <Typography fontWeight={600} sx={{ py: 1 }}>
                {experiences[0].role} at {experiences[0].company}
              </Typography>
              <ShowMoreText
                /* Default options */
                lines={3}
                className="show-more"
                more="Show more"
                less="Show less"
                anchorClass="show-more-anchor"
                onClick={() => setIsExpanded(!isExpanded)}
                expanded={false}
                truncatedEndingComponent={'... '}>
                {bio}
              </ShowMoreText>
            </TextWrapper>
            <Grid container sx={{ py: 2 }}>
              <Grid
                container
                direction="column"
                item
                xs={12}
                md={6}
                mb={2}
                spacing={1}>
                <Grid item fontWeight={700}>
                  Expertise
                </Grid>
                <Grid item>{commaString(expertise)}</Grid>
              </Grid>
              <Grid
                container
                direction="column"
                item
                xs={12}
                md={6}
                spacing={1}>
                <Grid item fontWeight={700}>
                  {<ActiveBadge active={is_mentoring} />}{' '}
                  {is_mentoring ? 'Mentoring' : 'Currently not mentoring'}
                </Grid>
                <Grid item>
                  {is_mentoring
                    ? 'Mentor is currently mentoring'
                    : 'Mentor is currently unavailable'}
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} mb={2}>
              <Experiences experiences={experiences} />
            </Grid>
            <Grid item xs={12} display={{ md: 'none' }}>
              <Stats />
            </Grid>
            <Divider />

            {/* adding select here */}
            <Grid item xs={12} md={4} sx={{ paddingTop: '1rem' }}>
              <div style={{ margin: '1rem 0rem' }}>
                <Select
                  menuPlacement="auto"
                  name="Topic"
                  options={motivationOptions}
                  // @ts-ignore
                  onChange={({ value }) => {
                    setMotivation(value);
                    setPage(1);
                  }} // Value - label
                  isSearchable={true}
                  classNamePrefix="select"
                  placeholder={<span>Filter by Motivation</span>}
                />
              </div>
            </Grid>
            <Grid item container width="100%">
              <PaginatedBookingCard
                motivation={motivation}
                topics={topics}
                page={page}
                setPage={setPage}
              />
            </Grid>
          </Container>
        </Grid>
        <Grid
          container
          item
          md={5}
          p={2}
          display={{ xs: 'none', md: 'block' }}
          spacing={4}>
          <Grid item xs={12}>
            <Stats />
          </Grid>
          <Grid item xs={12}>
            <Tips />
          </Grid>
        </Grid>
      </Grid>
      <Footer />
    </>
  );
};

export default UserPage;
