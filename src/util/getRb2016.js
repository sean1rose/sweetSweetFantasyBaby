import runningbacks from '../../ffdata/huddle2016rb(non-keyed).json';
import Fuse from 'fuse.js';
// http://fusejs.io/

const getRb2016 = {
  all: () => { return runningbacks},
  get: (id) => {
    var options = {keys: ['PLAYER'], threshold: 0.3};
    var fuse = new Fuse(runningbacks, options);
    // returns an array w/ results (hopefully only 1 result)
    return fuse.search(id);
  }
};

export default getRb2016;