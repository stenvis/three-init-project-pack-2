import VERSION from "/js/storage/version.js";
import DOM from '/js/storage/dom.js';

const { app_version } = DOM;

app_version.innerText = `v${VERSION}`;

export default '';