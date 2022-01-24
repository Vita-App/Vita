import { Paper, styled, Grid } from '@mui/material';

// const Typography: React.CSSProperties = {
//   color: 'black',
//   fontFamily: "'Circular Std', sans-serif",
//   letterSpacing: '0.05rem',
//   margin: '0',
// };

// const Heading = styled('h4')`
//   color: black;
//   font-family: 'Circular Std', sans-serif;
//   letter-spacing: 0.05rem;
//   margin: 1rem 0;
//   font-size: 1.5rem;
// `;

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

// const Button = styled('button')`
//   background: transparent;
//   border: 1px solid #636363;
//   font-family: 'Circular Std', sans-serif;
//   letter-spacing: 0.05rem;
//   border-radius: 0.5rem;
//   height: 33px
//   width: 100px;
//   tranform: translateY(-3px);
//   margin: 1rem;
//   padding: 0.5rem;
//   pointer: cursor;
// `;

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
