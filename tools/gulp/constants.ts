import {join} from 'path';

export const PROJECT_ROOT = join(__dirname, '../..');
export const SOURCE_ROOT = join(PROJECT_ROOT, 'src');
export const COMPONENTS_DIR = join(SOURCE_ROOT, 'lib');
export const COMPONENTS_STYLES_DIR = join(SOURCE_ROOT, 'lib/styles');

export const DIST_ROOT = join(PROJECT_ROOT, 'dist');
export const DIST_COMPONENTS_ROOT = join(DIST_ROOT, 'paletxUI');
export const DIST_STYLES_ROOT = join(DIST_ROOT, 'paletxUI/styles');
export const DIST_FONTS_ROOT = join(DIST_ROOT, 'paletxUI/fonts');
export const NODE_MODULES_ROOT = join(PROJECT_ROOT, 'node_modules');

export const HTML_MINIFIER_OPTIONS = {
  collapseWhitespace: true,
  removeComments: true,
  caseSensitive: true,
  removeAttributeQuotes: false
};

export const SASS_AUTOPREFIXER_OPTIONS = {
  browsers: [
    'last 2 versions',
    'not ie <= 10',
    'not ie_mob <= 10',
  ],
  cascade: false,
};

export const NPM_VENDOR_FILES = [
  '@angular', 'core-js/client', 'hammerjs', 'rxjs', 'systemjs/dist',
  'zone.js/dist', 'traceur', 'ng2-translate', 'primeng', 'echarts', 'prismjs'
];
