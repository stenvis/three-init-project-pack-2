const 
   HTML_FONT_COUNT = 1,
   THREE_FONT_COUNT = 0,
   fontCount = HTML_FONT_COUNT + THREE_FONT_COUNT;

const loadFonts = {
   start,
   getReadyCount,
   fontCount,
};

let ready_count;

function getReadyCount() {
   return ready_count;
}; 

function start(done) {
   ready_count = 0;

   const fontFile = new FontFace(
   	"montserrat",
	   "url('/assets/fonts/Montserrat-Medium.woff2')",
   );

   fontFile.load().then(res => {
      document.fonts.add(fontFile);
      ready_count += 1; 
      done();
   })
};

export default loadFonts;