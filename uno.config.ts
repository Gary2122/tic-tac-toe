// uno.config.ts
import {
    defineConfig,
    presetAttributify,
    presetIcons,
    presetTypography,
    presetUno,
    presetWebFonts,
    transformerDirectives,
    transformerVariantGroup,
} from 'unocss';
import presetRemToPx from '@unocss/preset-rem-to-px';
const customTheme = {
    colors: {
        cBlack: '#000',
        cWhite: '#fff',
        cPrimary: '#443ef7',
        cPrimaryH: '#2525cf',
        cPrimaryL: '#6060ff',
        cPrimaryL2: '#ebefff',
        cSuccess: '#28ce8e',
        cSuccessH: '#28ce8e',
        cSuccessL: '#c9f3e3',
        cSuccessL2: '#e4fcf3',
        cWarning: '#fb942d',
        cWarningH: '#fb942d',
        cWarningL: '#fb942d',
        cWarningL2: '#fb942d',
        cDanger: '#ff5233',
        cDangerH: '#d94026',
        cDangerL: '#ffdcd6',
        cDangerL2: '#ffeae6',
        cText: '#090e29',
        cTextL: '#5b6799',
        cTextL2: '#a0a9c5',
        cTextL3: '#d8dff0',
        cTextL4: '#ebefff',
        cTextL5: '#f5f7fc',
    },
};

export default defineConfig({
    theme: {
        ...customTheme,
    },
    rules: [
        [
            /^(\w{0,1})flex-(\w{1})(\w{1})(\w{0,2})$/,
            ([, i, j, a, lw]) => {
                const flexMap = {
                    jc: {
                        s: 'flex-start',
                        e: 'flex-end',
                        c: 'center',
                        a: 'space-around',
                        b: 'space-between',
                    },
                    ai: {
                        s: 'flex-start',
                        e: 'flex-end',
                        c: 'center',
                        t: 'stretch',
                    },
                };
                const obj: Record<string, string> = {};
                if (lw === 'l') {
                    obj['flex-direction'] = 'column';
                }
                if (lw === 'w') {
                    obj['flex-wrap'] = 'wrap';
                }
                if (lw === 'lw' || lw === 'wl') {
                    obj['flex-wrap'] = 'wrap';
                    obj['flex-direction'] = 'column';
                }
                if (flexMap.jc[j] && flexMap.ai[a]) console.log();
                return {
                    display: i === 'i' ? 'inline-flex' : 'flex',
                    'justify-content': flexMap.jc[j],
                    'align-items': flexMap.ai[a],
                    ...obj,
                };
            },
        ],
        [
            /^ft-(\w+)$/,
            ([, c], { theme }) => {
                if (customTheme.colors[c]) return { color: theme.colors[c] };
            },
        ],
        [
            /^bg-(\w+)$/,
            ([, c], { theme }) => {
                if (customTheme.colors[c])
                    return { 'background-color': theme.colors[c] };
            },
        ],
        [
            /^bd-(\w+)$/,
            ([, word], { theme }) => {
                const [c, d, t] = word.split('_');
                const matches = (d || '').match(/\d+/);
                const extractedNumber = matches ? parseInt(matches[0], 10) : 1;
                if (customTheme.colors[c])
                    return {
                        border: `${extractedNumber}px ${t || 'solid'} ${theme.colors[c]}`,
                    };
            },
        ],
        [
            /^fs-(\d+)$/,
            ([, d]) => {
                return {
                    'font-size': `${d}px`,
                };
            },
        ],
        [
            /^g-(\d+)$/,
            ([, d]) => {
                return {
                    gap: `${d}px`,
                };
            },
        ],
        [
            /^br-(\d+)$/,
            ([, d]) => {
                return {
                    'border-radius': `${d}px !important`,
                };
            },
        ],
    ],
    shortcuts: [],
    presets: [
        presetUno(),
        presetAttributify(),
        presetIcons(),
        presetTypography(),
        presetWebFonts({
            provider: 'google', // 默认提供者
            fonts: {},
        }),
        presetRemToPx({ baseFontSize: 4 }), //px单位
    ],
    transformers: [
        transformerDirectives({ throwOnMissing: true, enforce: 'default' }),
        transformerVariantGroup(),
    ],
    blocklist: ['list-item'],
});
