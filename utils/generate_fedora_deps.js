/**
 * One-off helper: prints fedora-x64 lib2package entries from ubuntu24.04-x64 lib2package.
 * Run: node utils/generate_fedora_deps.js
 */
const fs = require('fs');
const path = require('path');

const debToRpm = {
  'libasound2t64': 'alsa-lib',
  'libasound2': 'alsa-lib',
  'libatk1.0-0t64': 'atk',
  'libatk1.0-0': 'atk',
  'libatk-bridge2.0-0t64': 'at-spi2-atk',
  'libatk-bridge2.0-0': 'at-spi2-atk',
  'libatomic1': 'libatomic',
  'libatspi2.0-0t64': 'at-spi2-core',
  'libatspi2.0-0': 'at-spi2-core',
  'libcairo-gobject2': 'cairo-gobject',
  'libcairo2': 'cairo',
  'libcups2t64': 'cups-libs',
  'libcups2': 'cups-libs',
  'libdbus-1-3': 'dbus-libs',
  'libdbus-glib-1-2': 'dbus-glib',
  'libdrm2': 'libdrm',
  'libenchant-2-2': 'enchant2',
  'libepoxy0': 'libepoxy',
  'libevent-2.1-7t64': 'libevent',
  'libevent-2.1-7': 'libevent',
  'libflite1': 'flite',
  'libfontconfig1': 'fontconfig',
  'libfreetype6': 'freetype',
  'libgbm1': 'mesa-libgbm',
  'libgdk-pixbuf-2.0-0': 'gdk-pixbuf2',
  'libgles2': 'mesa-libGLES',
  'libglib2.0-0t64': 'glib2',
  'libglib2.0-0': 'glib2',
  'libgstreamer-gl1.0-0': 'gstreamer1-plugins-base',
  'libgstreamer-plugins-bad1.0-0': 'gstreamer1-plugins-bad-free',
  'libgstreamer-plugins-base1.0-0': 'gstreamer1-plugins-base',
  'libgstreamer1.0-0': 'gstreamer1',
  'libgtk-3-0t64': 'gtk3',
  'libgtk-3-0': 'gtk3',
  'libgtk-4-1': 'gtk4',
  'libharfbuzz-icu0': 'harfbuzz-icu',
  'libharfbuzz0b': 'harfbuzz',
  'libhyphen0': 'hyphen',
  'libicu74': 'libicu',
  'libicu76': 'libicu',
  'libjpeg-turbo8': 'libjpeg-turbo',
  'libjpeg62-turbo': 'libjpeg-turbo',
  'liblcms2-2': 'lcms2',
  'libmanette-0.2-0': 'libmanette',
  'libnspr4': 'nspr',
  'libnss3': 'nss',
  'libopus0': 'opus',
  'libpango-1.0-0': 'pango',
  'libpangocairo-1.0-0': 'pango',
  'libpng16-16t64': 'libpng',
  'libpng16-16': 'libpng',
  'libsecret-1-0': 'libsecret',
  'libsoup-3.0-0': 'libsoup3',
  'libvpx9': 'libvpx',
  'libwayland-client0': 'wayland-client',
  'libwayland-egl1': 'wayland-client',
  'libwayland-server0': 'wayland-server',
  'libwebp7': 'libwebp',
  'libwebpdemux2': 'libwebp',
  'libwoff1': 'woff2',
  'libx11-6': 'libX11',
  'libx11-xcb1': 'libX11-xcb',
  'libxcb-shm0': 'libxcb',
  'libxcb1': 'libxcb',
  'libxcomposite1': 'libXcomposite',
  'libxcursor1': 'libXcursor',
  'libxdamage1': 'libXdamage',
  'libxext6': 'libXext',
  'libxfixes3': 'libXfixes',
  'libxi6': 'libXi',
  'libxkbcommon0': 'libxkbcommon',
  'libxml2': 'libxml2',
  'libxrandr2': 'libXrandr',
  'libxrender1': 'libXrender',
  'libxslt1.1': 'libxslt',
  'libxtst6': 'libXtst',
  'libavif16': 'libavif',
  'libavif13': 'libavif',
  'libavcodec60': 'ffmpeg-free',
  'libavcodec61': 'ffmpeg-free',
  'libx264-164': 'x264-libs',
  'libx264-163': 'x264-libs',
  'gstreamer1.0-libav': 'gstreamer1-plugin-libav',
  'gstreamer1.0-plugins-bad': 'gstreamer1-plugins-bad-free',
  'gstreamer1.0-plugins-base': 'gstreamer1-plugins-base',
  'gstreamer1.0-plugins-good': 'gstreamer1-plugins-good',
};

const nativeDepsPath = path.join(__dirname, '../packages/playwright-core/src/server/registry/nativeDeps.ts');
const text = fs.readFileSync(nativeDepsPath, 'utf8');
const m = text.match(/'ubuntu24\.04-x64':[\s\S]*?lib2package: \{([\s\S]*?)\n    \}/);
const entries = [...m[1].matchAll(/'([^']+)': '([^']+)'/g)];
const fedoraLib2 = {};
for (const [, lib, debPkg] of entries) {
  const rpm = debToRpm[debPkg];
  if (!rpm)
    throw new Error(`No RPM mapping for deb ${debPkg} (${lib})`);
  fedoraLib2[lib] = rpm;
}
console.log(JSON.stringify(fedoraLib2, null, 2));
