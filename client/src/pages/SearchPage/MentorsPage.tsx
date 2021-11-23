import React, { useState } from 'react';
import { Grid, InputBase, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/material/styles';
import { ReactSelect as Select } from 'components/common/Select';
import { expertiseOptions } from 'data';

const index = () => {
  const [selectedOption, setSelectedOption] = useState<unknown>(null);
  const TextAreaWrapper = styled(Paper)({
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'black !important',
    width: 400,

    '.Search_Input': {
      fontSize: '16px',
      padding: '0px 6px',
      width: '100%',
    },
  });

  const [expertise, setExpertise] = useState('All');
  console.log(expertise);
  return (
    <Grid container>
      <Grid item xs={6} sm={4} sx={{ display: 'flex', alignItems: 'center' }}>
        <TextAreaWrapper>
          <SearchIcon sx={{ color: 'darkgrey' }} />
          <InputBase
            className="Search_Input"
            placeholder="Search by Company, Position"
            inputProps={{ 'aria-label': 'Search by Company Position' }}
          />
        </TextAreaWrapper>
      </Grid>
      <Grid item xs={6} sm={2}>
        <Select
          name="Expertise"
          // @ts-ignore
          onChange={({ value }) => setExpertise(value)} // Value - label
          options={expertiseOptions}
          isSearchable={true}
          classNamePrefix="select"
          placeholder={<span>Filter by Expertise</span>}
        />
      </Grid>
    </Grid>
  );
};

export default index;
