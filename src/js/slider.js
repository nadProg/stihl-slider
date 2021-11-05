import { asyncDelay } from './utils.js';
import { ClassName, Fade, TRANSITION_DURATION, AUTO_SWITCH_INTERVAL } from './constants.js';

let currentIndex = null;
let isTransition = false;

const sliderNode = document.querySelector(`.${ClassName.Slider}`);
const buttonsContainerNode = document.querySelector(`.${ClassName.ButtonsContainer}`);
const prevButtonNode = buttonsContainerNode.querySelector(`.${ClassName.PrevButton}`);
const nextButtonNode = buttonsContainerNode.querySelector(`.${ClassName.NextButton}`);

const slideNodes = sliderNode.querySelectorAll(`.${ClassName.Slide}`);
const pageNodes = sliderNode.querySelectorAll(`.${ClassName.Page}`);

const maxIndex = pageNodes.length - 1;

const increaseIndex = () => {
  currentIndex++;
  if (currentIndex > maxIndex) {
    currentIndex = 0;
  }
};

const decreaseIndex = () => {
  currentIndex--;
  if (currentIndex < 0) {
    currentIndex = maxIndex;
  }
};

const switchSlide = async (changeIndex) => {
  if (isTransition) {
    return;
  }

  isTransition = true;

  sliderNode.classList.remove(Fade.In);
  sliderNode.classList.add(Fade.Out);

  await asyncDelay(TRANSITION_DURATION);
  slideNodes[currentIndex].classList.remove(ClassName.CurrentSlide);
  pageNodes[currentIndex].classList.remove(ClassName.CurrentPage);

  changeIndex();

  slideNodes[currentIndex].classList.add(ClassName.CurrentSlide);
  pageNodes[currentIndex].classList.add(ClassName.CurrentPage);

  sliderNode.classList.remove(Fade.Out);
  sliderNode.classList.add(Fade.In);
  await asyncDelay(TRANSITION_DURATION);

  isTransition = false;
};

const onPrevButtonNodeClick = async () => {
  switchSlide(decreaseIndex);
};

const onNextButtonNodeClick = async () => {
  switchSlide(increaseIndex);
};

const init = async ({ autoPlay = true } = {}) => {
  isTransition = true;

  currentIndex = 0;

  slideNodes[currentIndex].classList.add(ClassName.CurrentSlide);
  pageNodes[currentIndex].classList.add(ClassName.CurrentPage);

  sliderNode.classList.remove(Fade.Out);
  sliderNode.classList.add(Fade.In);
  await asyncDelay(TRANSITION_DURATION);

  isTransition = false;

  prevButtonNode.addEventListener('click', onPrevButtonNodeClick );
  nextButtonNode.addEventListener('click', onNextButtonNodeClick);

  if (autoPlay) {
    setInterval(() => {
      switchSlide(increaseIndex);
    }, AUTO_SWITCH_INTERVAL);
  }
};

export {init};
