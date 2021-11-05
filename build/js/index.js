/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/constants.js":
/*!*****************************!*\
  !*** ./src/js/constants.js ***!
  \*****************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"TRANSITION_DURATION\": () => (/* binding */ TRANSITION_DURATION),\n/* harmony export */   \"AUTO_SWITCH_INTERVAL\": () => (/* binding */ AUTO_SWITCH_INTERVAL),\n/* harmony export */   \"ClassName\": () => (/* binding */ ClassName),\n/* harmony export */   \"Fade\": () => (/* binding */ Fade)\n/* harmony export */ });\nconst TRANSITION_DURATION = 1000;\n\nconst AUTO_SWITCH_INTERVAL = 5000;\n\nconst ClassName = {\n  Slider: 'slider',\n  ButtonsContainer: 'slider__controls',\n  PrevButton: 'slider__control--prev',\n  NextButton: 'slider__control--next',\n  Slide: 'slider__item',\n  Page: 'slider__page',\n  CurrentSlide: 'slider__item--current',\n  CurrentPage: 'slider__page--current',\n};\n\nconst Fade = {\n  In: 'fade-in',\n  Out: 'fade-out',\n};\n\n\n//# sourceURL=webpack://bem-02/./src/js/constants.js?");

/***/ }),

/***/ "./src/js/index.js":
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _slider_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./slider.js */ \"./src/js/slider.js\");\n\n\n_slider_js__WEBPACK_IMPORTED_MODULE_0__.init();\n\n\n//# sourceURL=webpack://bem-02/./src/js/index.js?");

/***/ }),

/***/ "./src/js/slider.js":
/*!**************************!*\
  !*** ./src/js/slider.js ***!
  \**************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"init\": () => (/* binding */ init)\n/* harmony export */ });\n/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils.js */ \"./src/js/utils.js\");\n/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constants.js */ \"./src/js/constants.js\");\n\n\n\nlet currentIndex = null;\nlet isTransition = false;\n\nconst sliderNode = document.querySelector(`.${_constants_js__WEBPACK_IMPORTED_MODULE_1__.ClassName.Slider}`);\nconst buttonsContainerNode = document.querySelector(`.${_constants_js__WEBPACK_IMPORTED_MODULE_1__.ClassName.ButtonsContainer}`);\nconst prevButtonNode = buttonsContainerNode.querySelector(`.${_constants_js__WEBPACK_IMPORTED_MODULE_1__.ClassName.PrevButton}`);\nconst nextButtonNode = buttonsContainerNode.querySelector(`.${_constants_js__WEBPACK_IMPORTED_MODULE_1__.ClassName.NextButton}`);\n\nconst slideNodes = sliderNode.querySelectorAll(`.${_constants_js__WEBPACK_IMPORTED_MODULE_1__.ClassName.Slide}`);\nconst pageNodes = sliderNode.querySelectorAll(`.${_constants_js__WEBPACK_IMPORTED_MODULE_1__.ClassName.Page}`);\n\nconst maxIndex = pageNodes.length - 1;\n\nconst increaseIndex = () => {\n  currentIndex++;\n  if (currentIndex > maxIndex) {\n    currentIndex = 0;\n  }\n};\n\nconst decreaseIndex = () => {\n  currentIndex--;\n  if (currentIndex < 0) {\n    currentIndex = maxIndex;\n  }\n};\n\nconst switchSlide = async (changeIndex) => {\n  if (isTransition) {\n    return;\n  }\n\n  isTransition = true;\n\n  sliderNode.classList.remove(_constants_js__WEBPACK_IMPORTED_MODULE_1__.Fade.In);\n  sliderNode.classList.add(_constants_js__WEBPACK_IMPORTED_MODULE_1__.Fade.Out);\n\n  await (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.asyncDelay)(_constants_js__WEBPACK_IMPORTED_MODULE_1__.TRANSITION_DURATION);\n  slideNodes[currentIndex].classList.remove(_constants_js__WEBPACK_IMPORTED_MODULE_1__.ClassName.CurrentSlide);\n  pageNodes[currentIndex].classList.remove(_constants_js__WEBPACK_IMPORTED_MODULE_1__.ClassName.CurrentPage);\n\n  changeIndex();\n\n  slideNodes[currentIndex].classList.add(_constants_js__WEBPACK_IMPORTED_MODULE_1__.ClassName.CurrentSlide);\n  pageNodes[currentIndex].classList.add(_constants_js__WEBPACK_IMPORTED_MODULE_1__.ClassName.CurrentPage);\n\n  sliderNode.classList.remove(_constants_js__WEBPACK_IMPORTED_MODULE_1__.Fade.Out);\n  sliderNode.classList.add(_constants_js__WEBPACK_IMPORTED_MODULE_1__.Fade.In);\n  await (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.asyncDelay)(_constants_js__WEBPACK_IMPORTED_MODULE_1__.TRANSITION_DURATION);\n\n  isTransition = false;\n};\n\nconst onPrevButtonNodeClick = async () => {\n  switchSlide(decreaseIndex);\n};\n\nconst onNextButtonNodeClick = async () => {\n  switchSlide(increaseIndex);\n};\n\nconst init = async ({ autoPlay = true } = {}) => {\n  isTransition = true;\n\n  currentIndex = 0;\n\n  slideNodes[currentIndex].classList.add(_constants_js__WEBPACK_IMPORTED_MODULE_1__.ClassName.CurrentSlide);\n  pageNodes[currentIndex].classList.add(_constants_js__WEBPACK_IMPORTED_MODULE_1__.ClassName.CurrentPage);\n\n  sliderNode.classList.remove(_constants_js__WEBPACK_IMPORTED_MODULE_1__.Fade.Out);\n  sliderNode.classList.add(_constants_js__WEBPACK_IMPORTED_MODULE_1__.Fade.In);\n  await (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.asyncDelay)(_constants_js__WEBPACK_IMPORTED_MODULE_1__.TRANSITION_DURATION);\n\n  isTransition = false;\n\n  prevButtonNode.addEventListener('click', onPrevButtonNodeClick );\n  nextButtonNode.addEventListener('click', onNextButtonNodeClick);\n\n  if (autoPlay) {\n    setInterval(() => {\n      switchSlide(increaseIndex);\n    }, _constants_js__WEBPACK_IMPORTED_MODULE_1__.AUTO_SWITCH_INTERVAL);\n  }\n};\n\n\n\n\n//# sourceURL=webpack://bem-02/./src/js/slider.js?");

/***/ }),

/***/ "./src/js/utils.js":
/*!*************************!*\
  !*** ./src/js/utils.js ***!
  \*************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"asyncDelay\": () => (/* binding */ asyncDelay)\n/* harmony export */ });\nconst asyncDelay = (delay)=> new Promise((resolve) => setTimeout(() => resolve(), delay));\n\n\n//# sourceURL=webpack://bem-02/./src/js/utils.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/js/index.js");
/******/ 	
/******/ })()
;