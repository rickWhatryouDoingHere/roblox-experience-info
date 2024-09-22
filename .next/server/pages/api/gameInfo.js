"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/api/gameInfo";
exports.ids = ["pages/api/gameInfo"];
exports.modules = {

/***/ "axios":
/*!************************!*\
  !*** external "axios" ***!
  \************************/
/***/ ((module) => {

module.exports = require("axios");

/***/ }),

/***/ "(api)/./pages/api/gameInfo.js":
/*!*******************************!*\
  !*** ./pages/api/gameInfo.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ handler)\n/* harmony export */ });\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ \"axios\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);\n\nasync function handler(req, res) {\n    const { placeId  } = req.query;\n    try {\n        const universeResponse = await axios__WEBPACK_IMPORTED_MODULE_0___default().get(`https://apis.roblox.com/universes/v1/places/${placeId}/universe`);\n        const universeId = universeResponse.data.universeId;\n        const gameResponse = await axios__WEBPACK_IMPORTED_MODULE_0___default().get(`https://games.roblox.com/v1/games?universeIds=${universeId}`);\n        const gameData = gameResponse.data.data[0];\n        res.status(200).json({\n            playing: gameData.playing,\n            visits: gameData.visits,\n            name: gameData.name,\n            favoritedCount: gameData.favoritedCount\n        });\n    } catch (error) {\n        res.status(500).json({\n            error: \"An error occurred while fetching game data\"\n        });\n    }\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9wYWdlcy9hcGkvZ2FtZUluZm8uanMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQTBCO0FBRVgsZUFBZUMsT0FBTyxDQUFDQyxHQUFHLEVBQUVDLEdBQUcsRUFBRTtJQUM5QyxNQUFNLEVBQUVDLE9BQU8sR0FBRSxHQUFHRixHQUFHLENBQUNHLEtBQUs7SUFFN0IsSUFBSTtRQUNGLE1BQU1DLGdCQUFnQixHQUFHLE1BQU1OLGdEQUFTLENBQUMsQ0FBQyw0Q0FBNEMsRUFBRUksT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzNHLE1BQU1JLFVBQVUsR0FBR0YsZ0JBQWdCLENBQUNHLElBQUksQ0FBQ0QsVUFBVTtRQUVuRCxNQUFNRSxZQUFZLEdBQUcsTUFBTVYsZ0RBQVMsQ0FBQyxDQUFDLDhDQUE4QyxFQUFFUSxVQUFVLENBQUMsQ0FBQyxDQUFDO1FBQ25HLE1BQU1HLFFBQVEsR0FBR0QsWUFBWSxDQUFDRCxJQUFJLENBQUNBLElBQUksQ0FBQyxDQUFDLENBQUM7UUFFMUNOLEdBQUcsQ0FBQ1MsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDQyxJQUFJLENBQUM7WUFDbkJDLE9BQU8sRUFBRUgsUUFBUSxDQUFDRyxPQUFPO1lBQ3pCQyxNQUFNLEVBQUVKLFFBQVEsQ0FBQ0ksTUFBTTtZQUN2QkMsSUFBSSxFQUFFTCxRQUFRLENBQUNLLElBQUk7WUFDbkJDLGNBQWMsRUFBRU4sUUFBUSxDQUFDTSxjQUFjO1NBQ3hDLENBQUMsQ0FBQztLQUNKLENBQUMsT0FBT0MsS0FBSyxFQUFFO1FBQ2RmLEdBQUcsQ0FBQ1MsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDQyxJQUFJLENBQUM7WUFBRUssS0FBSyxFQUFFLDRDQUE0QztTQUFFLENBQUMsQ0FBQztLQUMvRTtDQUNGIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcm9ibG94LXZpc2l0b3ItY291bnQvLi9wYWdlcy9hcGkvZ2FtZUluZm8uanM/NGI0YSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgYXhpb3MgZnJvbSAnYXhpb3MnO1xuXG5leHBvcnQgZGVmYXVsdCBhc3luYyBmdW5jdGlvbiBoYW5kbGVyKHJlcSwgcmVzKSB7XG4gIGNvbnN0IHsgcGxhY2VJZCB9ID0gcmVxLnF1ZXJ5O1xuICBcbiAgdHJ5IHtcbiAgICBjb25zdCB1bml2ZXJzZVJlc3BvbnNlID0gYXdhaXQgYXhpb3MuZ2V0KGBodHRwczovL2FwaXMucm9ibG94LmNvbS91bml2ZXJzZXMvdjEvcGxhY2VzLyR7cGxhY2VJZH0vdW5pdmVyc2VgKTtcbiAgICBjb25zdCB1bml2ZXJzZUlkID0gdW5pdmVyc2VSZXNwb25zZS5kYXRhLnVuaXZlcnNlSWQ7XG4gICAgXG4gICAgY29uc3QgZ2FtZVJlc3BvbnNlID0gYXdhaXQgYXhpb3MuZ2V0KGBodHRwczovL2dhbWVzLnJvYmxveC5jb20vdjEvZ2FtZXM/dW5pdmVyc2VJZHM9JHt1bml2ZXJzZUlkfWApO1xuICAgIGNvbnN0IGdhbWVEYXRhID0gZ2FtZVJlc3BvbnNlLmRhdGEuZGF0YVswXTtcbiAgICBcbiAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7XG4gICAgICBwbGF5aW5nOiBnYW1lRGF0YS5wbGF5aW5nLFxuICAgICAgdmlzaXRzOiBnYW1lRGF0YS52aXNpdHMsXG4gICAgICBuYW1lOiBnYW1lRGF0YS5uYW1lLFxuICAgICAgZmF2b3JpdGVkQ291bnQ6IGdhbWVEYXRhLmZhdm9yaXRlZENvdW50XG4gICAgfSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmVzLnN0YXR1cyg1MDApLmpzb24oeyBlcnJvcjogJ0FuIGVycm9yIG9jY3VycmVkIHdoaWxlIGZldGNoaW5nIGdhbWUgZGF0YScgfSk7XG4gIH1cbn1cblxuIl0sIm5hbWVzIjpbImF4aW9zIiwiaGFuZGxlciIsInJlcSIsInJlcyIsInBsYWNlSWQiLCJxdWVyeSIsInVuaXZlcnNlUmVzcG9uc2UiLCJnZXQiLCJ1bml2ZXJzZUlkIiwiZGF0YSIsImdhbWVSZXNwb25zZSIsImdhbWVEYXRhIiwic3RhdHVzIiwianNvbiIsInBsYXlpbmciLCJ2aXNpdHMiLCJuYW1lIiwiZmF2b3JpdGVkQ291bnQiLCJlcnJvciJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(api)/./pages/api/gameInfo.js\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("(api)/./pages/api/gameInfo.js"));
module.exports = __webpack_exports__;

})();