import quarterbacks from '../../ffdata/huddle2016qb(non-keyed).json';
import Fuse from 'fuse.js';
// http://fusejs.io/

const getQb2016 = {
  all: () => { return quarterbacks},
  get: (id) => {
    var options = {keys: ['PLAYER'], threshold: 0.3};
    var fuse = new Fuse(quarterbacks, options);
    // returns an array w/ results (hopefully only 1 result)
    return fuse.search(id);
  }
};

export default getQb2016;