'use strict';

function calculateSelectionUpdate(selection, currentValue, newValue) {

  var start = selection.start,
      end = selection.end,
      add,
      remove,
      idx;

  // keep everything SELECTED
  if (end !== start && end === currentValue.length) {
    return range(start, newValue.length);
  }

  // handle ADDITION / REMOVAL
  else {

    add = currentValue.length < newValue.length;
    remove = currentValue.length > newValue.length;

    if (remove) {

      // search from start
      for (idx = 0; idx < start; idx++) {

        if (currentValue.charAt(idx) !== newValue.charAt(idx)) {
          return range(idx);
        }
      }

      // search from end
      for (idx = currentValue.length; idx > start; idx--) {
        if (currentValue.charAt(idx) !== newValue.charAt(idx)) {
          return range(start);
        }
      }
    }

    if (add) {

      // search from cursor to start
      for (idx = start; idx > 0; idx--) {

        if (currentValue.charAt(idx - 1) !== newValue.charAt(idx - 1)) {
          return range(idx);
        }
      }

      // search cursor to end
      for (idx = start; idx < newValue.length; idx++) {
        if (currentValue.charAt(idx) !== newValue.charAt(idx)) {
          return range(idx + (newValue.length - currentValue.length));
        }
      }

    }
  }

  return selection;
}

module.exports.calculateSelectionUpdate = calculateSelectionUpdate;


function range(start, end) {
  return {
    start: start,
    end: end === undefined ? start : end
  };
}