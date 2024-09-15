import plugin from 'tailwindcss/plugin';

export default plugin(({ addComponents, theme }) => {
    addComponents({
        '.markdown': {
            mark: {
                paddingInline: theme('spacing[0.5]'),
                fontWeight: theme('fontWeight.semibold'),
                color: theme('colors.gray[200]'),
                background: theme('colors.assistant-color'),
            },
            // class to return the reference in the text of the remarkRehype plugin
            '.data-footnote-backref': {
                color: theme('colors.sky[600]'),
                '&:hover': {
                    textDecorationLine: 'underline',
                    textDecorationThickness: theme('spacing.px'),
                    textUnderlineOffset: theme('spacing[0.5]'),
                },
            },
            '[data-footnote-ref]::before': {
                content: "'['",
            },
            '[data-footnote-ref]::after': {
                content: "']'",
            },
            '.footnotes': {
                ol: {
                    paddingLeft: theme('spacing.5'), // alternative to the bug listStylePosition: 'inside'
                    'li p': {
                        margin: theme('spacing.0'),
                    },
                },
            },
        }

    });
})
