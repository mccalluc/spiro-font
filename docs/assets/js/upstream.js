// List external dependencies here.
// - If we need to move to a different CDN, it's all in one place.
// - Individual files don't need to track the version we're using.
//
// Vue is an exception: We want a different version in development and production,
// and I'm not sure how to get that conditionality in here without breaking mocha,
// so it's still pulled in as global in the HTML.

export {default as Raphael} from 'https://cdn.skypack.dev/raphael@2.3.0';
export {default as opentype} from 'https://cdn.skypack.dev/opentype.js@1.3.4';
export {default as jsts} from 'https://cdn.skypack.dev/jsts@2.3.0';