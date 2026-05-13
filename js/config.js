tailwind.config = {
    darkMode: "class",
    theme: {
        extend: {
            "colors": {
                "tertiary-container": "#b82800",
                "surface-container-high": "#e7e7f5",
                "on-tertiary": "#ffffff",
                "primary-fixed": "#dde1ff",
                "surface-tint": "#0046fa",
                "surface-dim": "#d9d9e7",
                "surface-container": "#ededfb",
                "tertiary": "#8d1c00",
                "surface": "#fbf8ff",
                "on-error": "#ffffff",
                "secondary-fixed": "#e3e2e3",
                "on-secondary-fixed-variant": "#464748",
                "tertiary-fixed": "#ffdad2",
                "primary-fixed-dim": "#b9c3ff",
                "inverse-on-surface": "#f0effe",
                "outline-variant": "#c4c5da",
                "primary-container": "#0047ff",
                "on-tertiary-container": "#ffd1c6",
                "inverse-surface": "#2e303a",
                "error-container": "#ffdad6",
                "error": "#ba1a1a",
                "background": "#fbf8ff",
                "secondary": "#5e5e5f",
                "on-secondary": "#ffffff",
                "secondary-container": "#e3e2e3",
                "surface-container-lowest": "#ffffff",
                "on-surface-variant": "#434657",
                "surface-container-highest": "#e2e1f0",
                "on-primary-fixed-variant": "#0033c0",
                "on-surface": "#191b25",
                "on-error-container": "#93000a",
                "tertiary-fixed-dim": "#ffb4a2",
                "surface-variant": "#e2e1f0",
                "on-primary": "#ffffff",
                "on-background": "#191b25",
                "inverse-primary": "#b9c3ff",
                "primary": "#0035c5",
                "secondary-fixed-dim": "#c7c6c7",
                "on-primary-container": "#d4d9ff",
                "on-secondary-fixed": "#1b1c1d",
                "outline": "#747688",
                "surface-container-low": "#f3f2ff",
                "surface-bright": "#fbf8ff",
                "on-tertiary-fixed": "#3d0700",
                "on-secondary-container": "#646465",
                "on-tertiary-fixed-variant": "#8a1c00",
                "on-primary-fixed": "#001257"
            },
            "borderRadius": {
                "DEFAULT": "0.125rem",
                "lg": "0.25rem",
                "xl": "0.5rem",
                "full": "0.75rem"
            },
            "spacing": {
                "margin-desktop": "80px",
                "container-max-width": "1280px",
                "margin-mobile": "20px",
                "unit": "8px",
                "gutter": "24px",
                "margin-tablet": "40px",
                "section-padding": "120px"
            },
            "fontFamily": {
                "headline-lg-mobile": ["Geist"],
                "label-sm": ["Geist"],
                "display-lg": ["Geist"],
                "body-lg": ["Geist"],
                "headline-lg": ["Geist"],
                "headline-md": ["Geist"],
                "body-md": ["Geist"]
            },
            "fontSize": {
                "headline-lg-mobile": ["32px", { "lineHeight": "1.2", "letterSpacing": "-0.02em", "fontWeight": "600" }],
                "label-sm": ["12px", { "lineHeight": "1", "letterSpacing": "0.05em", "fontWeight": "600" }],
                "display-lg": ["72px", { "lineHeight": "1.1", "letterSpacing": "-0.04em", "fontWeight": "700" }],
                "body-lg": ["18px", { "lineHeight": "1.6", "letterSpacing": "0", "fontWeight": "400" }],
                "headline-lg": ["48px", { "lineHeight": "1.2", "letterSpacing": "-0.02em", "fontWeight": "600" }],
                "headline-md": ["32px", { "lineHeight": "1.3", "letterSpacing": "-0.01em", "fontWeight": "500" }],
                "body-md": ["16px", { "lineHeight": "1.6", "letterSpacing": "0", "fontWeight": "400" }]
            }
        }
    }
}
