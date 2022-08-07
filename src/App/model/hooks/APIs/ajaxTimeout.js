import { TIMEOUT } from '../../../../configs/config';

const ajaxTimeout = function () {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(
        new Error(`Request took too long! Timeout after ${TIMEOUT} second`)
      );
    }, TIMEOUT * 1000);
  });
};

export default ajaxTimeout;
