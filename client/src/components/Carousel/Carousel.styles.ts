import { Paper, styled, Grid, IconButton } from '@mui/material';

export const ArrowSpace = styled('div')`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 1rem;
`;

export const ArrowButton = styled('button')`
  background: transparent;
  border: none;
  border-radius: 50%;
  height: 30px;
  width: 30px;
  font-weight: bold;
  line-height: 1rem;
  margin: 1rem 1.5rem;
  cursor: pointer;
`;

export const Wrapper = styled(Paper)`
  height: 400px;
  width: 300px;
  position: relative;
  border-radius: 16px;
  margin-right: 0;
  cursor: pointer;
`;

export const StyledImage = styled('img')`
  display: flex;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center center;
  background-color: #131313;
  border-radius: 16px;
`;

export const AbsoluteGrid = styled(Grid)`
  padding: 5px;
  background: rgb(0, 0, 0, 0.4);
  border-radius: 16px;
  position: absolute;
  flex-direction: column-reverse;
  width: 100%;
  height: 100%;
  top: 0px;
  left: 0px;

  .MuiSvgIcon-root {
    padding-right: 4px;
  }

  .MuiGrid-item {
    padding: 4px;
    display: flex;
    align-content: center;
  }

  .CarouselCard_text {
    font-size: 24px;
    font-weight: 700;
    padding: 8px px;
  }
  .CarouselCard_topics {
    text-overflow: ellipsis;
  }
`;

export const StyledIconButton = styled(IconButton)(
  ({ theme }) => `
  background: rgb(57,57,57,0.4);
  textTransform: none;
  color: #f5f5f5;
  border: 1px solid ${theme.palette.grey[800]};
  fontWeight: 700;
  &:hover: {
    opacity: 1;
    backgroundColor: #424040;
  },
  `,
);

export const CarouselDiv = styled('div')`
  margin: 2rem;
  background: inherit;
  .swiper-button-prev {
    display: none;
  }
  .swiper-button-next {
    display: none;
  }
`;
