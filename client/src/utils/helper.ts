/* eslint-disable no-bitwise */
export const commaString = (words: string[] | undefined) => {
  let result = '';
  if (typeof words === 'undefined') return result;

  for (const word of words) {
    result = result + word + ', ';
  }

  return result.slice(0, -2);
};

export const range = (from: number, to: number, step: number = 1) =>
  [...Array(Math.floor((to - from) / step) + 1)].map((_, i) => from + i * step);

/*
Returns max videobox size
Responsive but slow to render TODO replace with faster soulution
? from stackoverflow for squares,modified for rect with aspect ratio
*/
export const getVideoBoxSize = (
  X: number,
  Y: number,
  n: number,
  aspect_ratio = 1,
) => {
  // Total number of tiles
  const tile_count: number = n;
  // Height of rectangle
  const b: number = Y;
  // Width of rectanlge
  const a: number = X;

  // Divide the area but the number of tiles to get the max area a tile could cover
  // this optimal size for a tile will more often than not make the tiles overlap, but
  // a tile can never be bigger than this size
  let sizeX: number = Math.sqrt((b * a * aspect_ratio) / tile_count);
  // Find the number of whole tiles that can fit into the height
  let numberOfPossibleWholeTilesH: number = Math.floor(
    (b * aspect_ratio) / sizeX,
  );
  // Find the number of whole tiles that can fit into the width
  let numberOfPossibleWholeTilesW: number = Math.floor(a / sizeX);
  // Works out how many whole tiles this configuration can hold
  let total: number = numberOfPossibleWholeTilesH * numberOfPossibleWholeTilesW;

  // If the number of number of whole tiles that the max size tile ends up with is less than the require number of
  // tiles, make the maxSize smaller and recaluate
  while (total < tile_count) {
    sizeX--;
    numberOfPossibleWholeTilesH = Math.floor((b * aspect_ratio) / sizeX);
    numberOfPossibleWholeTilesW = Math.floor(a / sizeX);
    total = numberOfPossibleWholeTilesH * numberOfPossibleWholeTilesW;
  }

  return {
    x: sizeX,
    y: sizeX / aspect_ratio,
  };
};

export const transformSdp = (sdp: string, bandwidth: number) => {
  const modifier = 'TIAS';
  bandwidth = (bandwidth >>> 0) * 1000;

  sdp = sdp.replace(new RegExp('b=' + modifier + ':.*\r\n'), '');
  sdp = sdp.replace(/(m=video.*\r\n)/g, `$1b=${modifier}:${bandwidth}\r\n`);

  return sdp;
};

export const blankVideo = ({ width = 640, height = 480 } = {}) => {
  const canvas = Object.assign(document.createElement('canvas'), {
    width,
    height,
  });
  canvas.getContext('2d')?.fillRect(0, 0, width, height);
  const stream = (canvas as any).captureStream() as MediaStream;
  return Object.assign(stream.getVideoTracks()[0], { enabled: false });
};

export const silence = () => {
  const ctx = new AudioContext();
  const oscillator = ctx.createOscillator();
  const dst = oscillator.connect(ctx.createMediaStreamDestination());
  oscillator.start();
  const stream = (dst as any).stream as MediaStream;
  const track = Object.assign(stream.getAudioTracks()[0], { enabled: false });
  track.stop();
  return track;
};

export const shuffleArray = <T>(array_: T[]) => {
  const array = [...array_];
  let currentIndex = array.length;
  let randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // swapping 2 variables
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};
