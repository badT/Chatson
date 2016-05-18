import TweenMax from 'gsap/src/minified/TweenMax.min';

export const addCommas = (count) => {
  const numString = count.toString().split('').reverse()
    .map((digit, i) => {
      let newDigit = digit;
      if (i && i % 3 === 0) newDigit += ',';
      return newDigit;
    })
    .reverse()
    .join('');
  return numString;
};

export const animateBars = (emoColors, delays) => {
  Object.keys(emoColors).forEach(emo => {
    setTimeout(() => {
      TweenMax.fromTo(`.${emo}-bar`, 2, { opacity: 0, y: 100 }, { opacity: 1, y: 0, delay: delays[emo], ease: Power3.easeInOut });
    }, 250);
  });
};
