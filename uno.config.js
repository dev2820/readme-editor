import presetWebFonts from '@unocss/preset-web-fonts';
import presetWind from '@unocss/preset-wind';
import presetAnimations from 'unocss-preset-animations';
import { presetShadcn } from 'unocss-preset-shadcn';
import { defineConfig } from 'vite';

import { colors } from './theme';

export default defineConfig({
  presets: [
    presetWind(),
    presetAnimations(),
    presetShadcn({
      color: 'red',
    }),
    presetWebFonts({
      provider: 'google',
      fonts: {
        mono: ['Fira Code', 'Fira Mono:400,700'],
      },
    }),
  ],
  content: {
    pipeline: {
      include: [
        /\.(vue|svelte|[jt]sx|mdx?|astro|elm|php|phtml|html)($|\?)/,
        'src/**/*.{js,ts}',
      ],
    },
  },
  theme: {
    colors: {
      /**
       * semantic tokens
       */
      primary: colors.teal[500],
      primaryForeground: colors.white,
      secondary: colors.green[200],
      secondaryForeground: colors.black,
      accent: colors.emerald[500],
      accentForeground: colors.black,
      background: colors.grey[100],
      foreground: colors.black,
      input: colors.teal[500],
      info: colors.blue[500],
      infoForeground: colors.black,
      success: colors.green[500],
      successForeground: colors.black,
      warning: colors.orange[500],
      warningForeground: colors.black,
      error: colors.red[500],
      errorForeground: colors.black,
      /**
       * color palette
       */
      black: colors.black,
      white: colors.white,
      slate: {
        DEFAULT: colors.slate[500],
        ...colors.slate,
      },
      grey: {
        DEFAULT: colors.grey[500],
        ...colors.grey,
      },
      zinc: {
        DEFAULT: colors.zinc[500],
        ...colors.zinc,
      },
      neutral: {
        DEFAULT: colors.neutral[500],
        ...colors.neutral,
      },
      stone: {
        DEFAULT: colors.stone[500],
        ...colors.stone,
      },
      red: {
        DEFAULT: colors.red[500],
        ...colors.red,
      },
      orange: {
        DEFAULT: colors.orange[500],
        ...colors.orange,
      },
      amber: {
        DEFAULT: colors.amber[500],
        ...colors.amber,
      },
      yellow: {
        DEFAULT: colors.yellow[500],
        ...colors.yellow,
      },
      lime: {
        DEFAULT: colors.lime[500],
        ...colors.lime,
      },
      green: {
        DEFAULT: colors.green[500],
        ...colors.green,
      },
      emerald: {
        DEFAULT: colors.emerald[500],
        ...colors.emerald,
      },
      teal: {
        DEFAULT: colors.teal[500],
        ...colors.teal,
      },
      cyan: {
        DEFAULT: colors.cyan[500],
        ...colors.cyan,
      },
      sky: {
        DEFAULT: colors.sky[500],
        ...colors.sky,
      },
      indigo: {
        DEFAULT: colors.indigo[500],
        ...colors.indigo,
      },
      violet: {
        DEFAULT: colors.violet[500],
        ...colors.violet,
      },
      purple: {
        DEFAULT: colors.purple[500],
        ...colors.purple,
      },
      fuchsia: {
        DEFAULT: colors.fuchsia[500],
        ...colors.fuchsia,
      },
      pink: {
        DEFAULT: colors.pink[500],
        ...colors.pink,
      },
      rose: {
        DEFAULT: colors.rose[500],
        ...colors.rose,
      },
    },
  },
});
