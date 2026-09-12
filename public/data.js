window.DS = {
  "semanticGroups": [
    {
      "group": "text",
      "tokens": [
        {
          "name": "primary",
          "var": "text-primary",
          "refVar": "gray-950",
          "hex": "#030712",
          "dark": "#F9FAFB",
          "purpose": "Main, highest-emphasis text — headings, primary labels."
        },
        {
          "name": "secondary",
          "var": "text-secondary",
          "refVar": "gray-700",
          "hex": "#364153",
          "dark": "#D1D5DC",
          "purpose": "Supporting text, lower emphasis than primary."
        },
        {
          "name": "muted",
          "var": "text-muted",
          "refVar": "gray-600",
          "hex": "#4A5565",
          "dark": "#99A1AF",
          "purpose": "Low-emphasis text — metadata, timestamps, hints."
        },
        {
          "name": "disabled",
          "var": "text-disabled",
          "refVar": "gray-400",
          "hex": "#99A1AF",
          "dark": "#4A5565",
          "purpose": "Text for unavailable / disabled UI."
        },
        {
          "name": "inverse",
          "var": "text-inverse",
          "refVar": "white",
          "hex": "#FFFFFF",
          "dark": "#030712",
          "purpose": "Text on dark / inverse surfaces."
        }
      ]
    },
    {
      "group": "icon",
      "tokens": [
        {
          "name": "primary",
          "var": "icon-primary",
          "refVar": "gray-950",
          "hex": "#030712",
          "dark": "#F9FAFB",
          "purpose": "Main / high-emphasis icon."
        },
        {
          "name": "secondary",
          "var": "icon-secondary",
          "refVar": "gray-700",
          "hex": "#364153",
          "dark": "#D1D5DC",
          "purpose": "Supporting icon."
        },
        {
          "name": "muted",
          "var": "icon-muted",
          "refVar": "gray-600",
          "hex": "#4A5565",
          "dark": "#99A1AF",
          "purpose": "Low-emphasis icon."
        },
        {
          "name": "disabled",
          "var": "icon-disabled",
          "refVar": "gray-400",
          "hex": "#99A1AF",
          "dark": "#4A5565",
          "purpose": "Disabled icon."
        },
        {
          "name": "inverse",
          "var": "icon-inverse",
          "refVar": "white",
          "hex": "#FFFFFF",
          "dark": "#030712",
          "purpose": "Icon on dark / inverse surface."
        }
      ]
    },
    {
      "group": "background",
      "tokens": [
        {
          "name": "default",
          "var": "background-default",
          "refVar": "white",
          "hex": "#FFFFFF",
          "dark": "#030712",
          "purpose": "Default surface."
        },
        {
          "name": "muted",
          "var": "background-muted",
          "refVar": "gray-50",
          "hex": "#F9FAFB",
          "dark": "#101828",
          "purpose": "Very subtle surface."
        },
        {
          "name": "light",
          "var": "background-light",
          "refVar": "gray-100",
          "hex": "#F3F4F6",
          "dark": "#101828",
          "purpose": "Light surface."
        },
        {
          "name": "subtle",
          "var": "background-subtle",
          "refVar": "gray-200",
          "hex": "#E5E7EB",
          "dark": "#1E2939",
          "purpose": "Subtle surface."
        },
        {
          "name": "strong",
          "var": "background-strong",
          "refVar": "gray-800",
          "hex": "#1E2939",
          "dark": "#E5E7EB",
          "purpose": "Strong dark surface."
        },
        {
          "name": "inverse",
          "var": "background-inverse",
          "refVar": "gray-950",
          "hex": "#030712",
          "dark": "#F9FAFB",
          "purpose": "Dark / inverse surface."
        }
      ]
    },
    {
      "group": "border",
      "tokens": [
        {
          "name": "subtle",
          "var": "border-subtle",
          "refVar": "gray-100",
          "hex": "#F3F4F6",
          "dark": "#1E2939",
          "purpose": "Low-emphasis separation."
        },
        {
          "name": "default",
          "var": "border-default",
          "refVar": "gray-200",
          "hex": "#E5E7EB",
          "dark": "#1E2939",
          "purpose": "Standard component boundary."
        },
        {
          "name": "emphasis",
          "var": "border-emphasis",
          "refVar": "gray-300",
          "hex": "#D1D5DC",
          "dark": "#364153",
          "purpose": "More visible boundary."
        },
        {
          "name": "strong",
          "var": "border-strong",
          "refVar": "gray-400",
          "hex": "#99A1AF",
          "dark": "#4A5565",
          "purpose": "Strong boundary."
        },
        {
          "name": "inverse",
          "var": "border-inverse",
          "refVar": "white",
          "hex": "#FFFFFF",
          "dark": "#1E2939",
          "purpose": "Border on dark / inverse surfaces."
        },
        {
          "name": "warning-subtle",
          "var": "border-warning-subtle",
          "refVar": "amber-100",
          "hex": "#FEF3C6",
          "dark": "#7B3306",
          "purpose": "Warning boundary, subtle."
        },
        {
          "name": "warning",
          "var": "border-warning",
          "refVar": "amber-200",
          "hex": "#FEE685",
          "dark": "#973C00",
          "purpose": "Warning boundary (default)."
        },
        {
          "name": "warning-strong",
          "var": "border-warning-strong",
          "refVar": "amber-300",
          "hex": "#FFD230",
          "dark": "#BB4D00",
          "purpose": "Warning boundary, strong."
        },
        {
          "name": "negative-subtle",
          "var": "border-negative-subtle",
          "refVar": "red-100",
          "hex": "#FFE2E2",
          "dark": "#82181A",
          "purpose": "Error boundary, subtle."
        },
        {
          "name": "negative",
          "var": "border-negative",
          "refVar": "red-200",
          "hex": "#FFC9C9",
          "dark": "#9F0712",
          "purpose": "Error boundary (default)."
        },
        {
          "name": "negative-strong",
          "var": "border-negative-strong",
          "refVar": "red-300",
          "hex": "#FFA2A2",
          "dark": "#C10007",
          "purpose": "Error boundary, strong."
        },
        {
          "name": "positive-subtle",
          "var": "border-positive-subtle",
          "refVar": "green-100",
          "hex": "#DCFCE7",
          "dark": "#0D542B",
          "purpose": "Positive boundary, subtle."
        },
        {
          "name": "positive",
          "var": "border-positive",
          "refVar": "green-200",
          "hex": "#B9F8CF",
          "dark": "#016630",
          "purpose": "Positive boundary (default)."
        },
        {
          "name": "positive-strong",
          "var": "border-positive-strong",
          "refVar": "green-300",
          "hex": "#7BF1A8",
          "dark": "#008236",
          "purpose": "Positive boundary, strong."
        }
      ]
    },
    {
      "group": "action",
      "tokens": [
        {
          "name": "primary",
          "var": "action-primary",
          "refVar": "sky-600",
          "hex": "#0084D1",
          "dark": "#00A6F4",
          "purpose": "Main CTA / action (default state)."
        },
        {
          "name": "primary-hover",
          "var": "action-primary-hover",
          "refVar": "sky-700",
          "hex": "#0069A8",
          "dark": "#0084D1",
          "purpose": "Hover feedback. Dark mode resolves darker than Primary so hover doesn't lighten."
        },
        {
          "name": "primary-clicked",
          "var": "action-primary-clicked",
          "refVar": "sky-800",
          "hex": "#00598A",
          "dark": "#74D4FF",
          "purpose": "Pressed / clicked feedback. PLACEHOLDER — set from real interaction design."
        },
        {
          "name": "primary-soft",
          "var": "action-primary-soft",
          "refVar": "sky-100",
          "hex": "#DFF2FE",
          "dark": "#052F4A",
          "purpose": "Lower-emphasis primary treatment."
        }
      ]
    },
    {
      "group": "information",
      "tokens": [
        {
          "name": "text",
          "var": "information-text",
          "refVar": "blue-900",
          "hex": "#1C398E",
          "dark": "#8EC5FF",
          "purpose": "Information text / strong communication."
        },
        {
          "name": "icon",
          "var": "information-icon",
          "refVar": "blue-500",
          "hex": "#2B7FFF",
          "dark": "#51A2FF",
          "purpose": "Information indicator / icon."
        },
        {
          "name": "border",
          "var": "information-border",
          "refVar": "blue-200",
          "hex": "#BEDBFF",
          "dark": "#193CB8",
          "purpose": "Information boundary."
        },
        {
          "name": "surface",
          "var": "information-surface",
          "refVar": "blue-100",
          "hex": "#DBEAFE",
          "dark": "#162456",
          "purpose": "Light information surface."
        },
        {
          "name": "background",
          "var": "information-background",
          "refVar": "blue-50",
          "hex": "#EFF6FF",
          "dark": "#162456",
          "purpose": "Subtle information background."
        }
      ]
    },
    {
      "group": "warning",
      "tokens": [
        {
          "name": "text",
          "var": "warning-text",
          "refVar": "amber-900",
          "hex": "#7B3306",
          "dark": "#FFD230",
          "purpose": "Warning message / content."
        },
        {
          "name": "icon",
          "var": "warning-icon",
          "refVar": "amber-500",
          "hex": "#FE9A00",
          "dark": "#FFB900",
          "purpose": "Warning indicator."
        },
        {
          "name": "surface",
          "var": "warning-surface",
          "refVar": "amber-100",
          "hex": "#FEF3C6",
          "dark": "#461901",
          "purpose": "Light warning surface."
        },
        {
          "name": "background",
          "var": "warning-background",
          "refVar": "amber-50",
          "hex": "#FFFBEB",
          "dark": "#461901",
          "purpose": "Subtle warning background."
        }
      ]
    },
    {
      "group": "negative",
      "tokens": [
        {
          "name": "text",
          "var": "negative-text",
          "refVar": "red-900",
          "hex": "#82181A",
          "dark": "#FFA2A2",
          "purpose": "Error / destructive text."
        },
        {
          "name": "icon",
          "var": "negative-icon",
          "refVar": "red-500",
          "hex": "#FB2C36",
          "dark": "#FF6467",
          "purpose": "Error / destructive indicator."
        },
        {
          "name": "surface",
          "var": "negative-surface",
          "refVar": "red-100",
          "hex": "#FFE2E2",
          "dark": "#460809",
          "purpose": "Light negative surface."
        },
        {
          "name": "background",
          "var": "negative-background",
          "refVar": "red-50",
          "hex": "#FEF2F2",
          "dark": "#460809",
          "purpose": "Subtle negative background."
        }
      ]
    },
    {
      "group": "positive",
      "tokens": [
        {
          "name": "text",
          "var": "positive-text",
          "refVar": "green-900",
          "hex": "#0D542B",
          "dark": "#7BF1A8",
          "purpose": "Positive / success text."
        },
        {
          "name": "icon",
          "var": "positive-icon",
          "refVar": "green-500",
          "hex": "#00C950",
          "dark": "#05DF72",
          "purpose": "Positive indicator."
        },
        {
          "name": "surface",
          "var": "positive-surface",
          "refVar": "green-100",
          "hex": "#DCFCE7",
          "dark": "#032E15",
          "purpose": "Light positive surface."
        },
        {
          "name": "background",
          "var": "positive-background",
          "refVar": "green-50",
          "hex": "#F0FDF4",
          "dark": "#032E15",
          "purpose": "Subtle positive background."
        }
      ]
    }
  ],
  "primitiveScales": [
    {
      "family": "gray",
      "steps": [
        {
          "step": "50",
          "var": "gray-50",
          "hex": "#F9FAFB"
        },
        {
          "step": "100",
          "var": "gray-100",
          "hex": "#F3F4F6"
        },
        {
          "step": "200",
          "var": "gray-200",
          "hex": "#E5E7EB"
        },
        {
          "step": "300",
          "var": "gray-300",
          "hex": "#D1D5DC"
        },
        {
          "step": "400",
          "var": "gray-400",
          "hex": "#99A1AF"
        },
        {
          "step": "500",
          "var": "gray-500",
          "hex": "#6A7282"
        },
        {
          "step": "600",
          "var": "gray-600",
          "hex": "#4A5565"
        },
        {
          "step": "700",
          "var": "gray-700",
          "hex": "#364153"
        },
        {
          "step": "800",
          "var": "gray-800",
          "hex": "#1E2939"
        },
        {
          "step": "900",
          "var": "gray-900",
          "hex": "#101828"
        },
        {
          "step": "950",
          "var": "gray-950",
          "hex": "#030712"
        }
      ]
    },
    {
      "family": "red",
      "steps": [
        {
          "step": "50",
          "var": "red-50",
          "hex": "#FEF2F2"
        },
        {
          "step": "100",
          "var": "red-100",
          "hex": "#FFE2E2"
        },
        {
          "step": "200",
          "var": "red-200",
          "hex": "#FFC9C9"
        },
        {
          "step": "300",
          "var": "red-300",
          "hex": "#FFA2A2"
        },
        {
          "step": "400",
          "var": "red-400",
          "hex": "#FF6467"
        },
        {
          "step": "500",
          "var": "red-500",
          "hex": "#FB2C36"
        },
        {
          "step": "600",
          "var": "red-600",
          "hex": "#E7000B"
        },
        {
          "step": "700",
          "var": "red-700",
          "hex": "#C10007"
        },
        {
          "step": "800",
          "var": "red-800",
          "hex": "#9F0712"
        },
        {
          "step": "900",
          "var": "red-900",
          "hex": "#82181A"
        },
        {
          "step": "950",
          "var": "red-950",
          "hex": "#460809"
        }
      ]
    },
    {
      "family": "orange",
      "steps": [
        {
          "step": "50",
          "var": "orange-50",
          "hex": "#FFF7ED"
        },
        {
          "step": "100",
          "var": "orange-100",
          "hex": "#FFEDD4"
        },
        {
          "step": "200",
          "var": "orange-200",
          "hex": "#FFD6A8"
        },
        {
          "step": "300",
          "var": "orange-300",
          "hex": "#FFB86A"
        },
        {
          "step": "400",
          "var": "orange-400",
          "hex": "#FF8904"
        },
        {
          "step": "500",
          "var": "orange-500",
          "hex": "#FF6900"
        },
        {
          "step": "600",
          "var": "orange-600",
          "hex": "#F54900"
        },
        {
          "step": "700",
          "var": "orange-700",
          "hex": "#CA3500"
        },
        {
          "step": "800",
          "var": "orange-800",
          "hex": "#9F2D00"
        },
        {
          "step": "900",
          "var": "orange-900",
          "hex": "#7E2A0C"
        },
        {
          "step": "950",
          "var": "orange-950",
          "hex": "#441306"
        }
      ]
    },
    {
      "family": "amber",
      "steps": [
        {
          "step": "50",
          "var": "amber-50",
          "hex": "#FFFBEB"
        },
        {
          "step": "100",
          "var": "amber-100",
          "hex": "#FEF3C6"
        },
        {
          "step": "200",
          "var": "amber-200",
          "hex": "#FEE685"
        },
        {
          "step": "300",
          "var": "amber-300",
          "hex": "#FFD230"
        },
        {
          "step": "400",
          "var": "amber-400",
          "hex": "#FFB900"
        },
        {
          "step": "500",
          "var": "amber-500",
          "hex": "#FE9A00"
        },
        {
          "step": "600",
          "var": "amber-600",
          "hex": "#E17100"
        },
        {
          "step": "700",
          "var": "amber-700",
          "hex": "#BB4D00"
        },
        {
          "step": "800",
          "var": "amber-800",
          "hex": "#973C00"
        },
        {
          "step": "900",
          "var": "amber-900",
          "hex": "#7B3306"
        },
        {
          "step": "950",
          "var": "amber-950",
          "hex": "#461901"
        }
      ]
    },
    {
      "family": "yellow",
      "steps": [
        {
          "step": "50",
          "var": "yellow-50",
          "hex": "#FEFCE8"
        },
        {
          "step": "100",
          "var": "yellow-100",
          "hex": "#FEF9C2"
        },
        {
          "step": "200",
          "var": "yellow-200",
          "hex": "#FFF085"
        },
        {
          "step": "300",
          "var": "yellow-300",
          "hex": "#FFDF20"
        },
        {
          "step": "400",
          "var": "yellow-400",
          "hex": "#FDC700"
        },
        {
          "step": "500",
          "var": "yellow-500",
          "hex": "#F0B100"
        },
        {
          "step": "600",
          "var": "yellow-600",
          "hex": "#D08700"
        },
        {
          "step": "700",
          "var": "yellow-700",
          "hex": "#A65F00"
        },
        {
          "step": "800",
          "var": "yellow-800",
          "hex": "#894B00"
        },
        {
          "step": "900",
          "var": "yellow-900",
          "hex": "#733E0A"
        },
        {
          "step": "950",
          "var": "yellow-950",
          "hex": "#432004"
        }
      ]
    },
    {
      "family": "lime",
      "steps": [
        {
          "step": "50",
          "var": "lime-50",
          "hex": "#F7FEE7"
        },
        {
          "step": "100",
          "var": "lime-100",
          "hex": "#ECFCCA"
        },
        {
          "step": "200",
          "var": "lime-200",
          "hex": "#D8F999"
        },
        {
          "step": "300",
          "var": "lime-300",
          "hex": "#BBF451"
        },
        {
          "step": "400",
          "var": "lime-400",
          "hex": "#9AE600"
        },
        {
          "step": "500",
          "var": "lime-500",
          "hex": "#7CCF00"
        },
        {
          "step": "600",
          "var": "lime-600",
          "hex": "#5EA500"
        },
        {
          "step": "700",
          "var": "lime-700",
          "hex": "#497D00"
        },
        {
          "step": "800",
          "var": "lime-800",
          "hex": "#3C6300"
        },
        {
          "step": "900",
          "var": "lime-900",
          "hex": "#35530E"
        },
        {
          "step": "950",
          "var": "lime-950",
          "hex": "#192E03"
        }
      ]
    },
    {
      "family": "green",
      "steps": [
        {
          "step": "50",
          "var": "green-50",
          "hex": "#F0FDF4"
        },
        {
          "step": "100",
          "var": "green-100",
          "hex": "#DCFCE7"
        },
        {
          "step": "200",
          "var": "green-200",
          "hex": "#B9F8CF"
        },
        {
          "step": "300",
          "var": "green-300",
          "hex": "#7BF1A8"
        },
        {
          "step": "400",
          "var": "green-400",
          "hex": "#05DF72"
        },
        {
          "step": "500",
          "var": "green-500",
          "hex": "#00C950"
        },
        {
          "step": "600",
          "var": "green-600",
          "hex": "#00A63E"
        },
        {
          "step": "700",
          "var": "green-700",
          "hex": "#008236"
        },
        {
          "step": "800",
          "var": "green-800",
          "hex": "#016630"
        },
        {
          "step": "900",
          "var": "green-900",
          "hex": "#0D542B"
        },
        {
          "step": "950",
          "var": "green-950",
          "hex": "#032E15"
        }
      ]
    },
    {
      "family": "emerald",
      "steps": [
        {
          "step": "50",
          "var": "emerald-50",
          "hex": "#ECFDF5"
        },
        {
          "step": "100",
          "var": "emerald-100",
          "hex": "#D0FAE5"
        },
        {
          "step": "200",
          "var": "emerald-200",
          "hex": "#A4F4CF"
        },
        {
          "step": "300",
          "var": "emerald-300",
          "hex": "#5EE9B5"
        },
        {
          "step": "400",
          "var": "emerald-400",
          "hex": "#00D492"
        },
        {
          "step": "500",
          "var": "emerald-500",
          "hex": "#00BC7D"
        },
        {
          "step": "600",
          "var": "emerald-600",
          "hex": "#009966"
        },
        {
          "step": "700",
          "var": "emerald-700",
          "hex": "#007A55"
        },
        {
          "step": "800",
          "var": "emerald-800",
          "hex": "#006045"
        },
        {
          "step": "900",
          "var": "emerald-900",
          "hex": "#004F3B"
        },
        {
          "step": "950",
          "var": "emerald-950",
          "hex": "#002C22"
        }
      ]
    },
    {
      "family": "cyan",
      "steps": [
        {
          "step": "50",
          "var": "cyan-50",
          "hex": "#ECFEFF"
        },
        {
          "step": "100",
          "var": "cyan-100",
          "hex": "#CEFAFE"
        },
        {
          "step": "200",
          "var": "cyan-200",
          "hex": "#A2F4FD"
        },
        {
          "step": "300",
          "var": "cyan-300",
          "hex": "#53EAFD"
        },
        {
          "step": "400",
          "var": "cyan-400",
          "hex": "#00D3F3"
        },
        {
          "step": "500",
          "var": "cyan-500",
          "hex": "#00B8DB"
        },
        {
          "step": "600",
          "var": "cyan-600",
          "hex": "#0092B8"
        },
        {
          "step": "700",
          "var": "cyan-700",
          "hex": "#007595"
        },
        {
          "step": "800",
          "var": "cyan-800",
          "hex": "#005F78"
        },
        {
          "step": "900",
          "var": "cyan-900",
          "hex": "#104E64"
        },
        {
          "step": "950",
          "var": "cyan-950",
          "hex": "#053345"
        }
      ]
    },
    {
      "family": "sky",
      "steps": [
        {
          "step": "50",
          "var": "sky-50",
          "hex": "#F0F9FF"
        },
        {
          "step": "100",
          "var": "sky-100",
          "hex": "#DFF2FE"
        },
        {
          "step": "200",
          "var": "sky-200",
          "hex": "#B8E6FE"
        },
        {
          "step": "300",
          "var": "sky-300",
          "hex": "#74D4FF"
        },
        {
          "step": "400",
          "var": "sky-400",
          "hex": "#00BCFF"
        },
        {
          "step": "500",
          "var": "sky-500",
          "hex": "#00A6F4"
        },
        {
          "step": "600",
          "var": "sky-600",
          "hex": "#0084D1"
        },
        {
          "step": "700",
          "var": "sky-700",
          "hex": "#0069A8"
        },
        {
          "step": "800",
          "var": "sky-800",
          "hex": "#00598A"
        },
        {
          "step": "900",
          "var": "sky-900",
          "hex": "#024A70"
        },
        {
          "step": "950",
          "var": "sky-950",
          "hex": "#052F4A"
        }
      ]
    },
    {
      "family": "blue",
      "steps": [
        {
          "step": "50",
          "var": "blue-50",
          "hex": "#EFF6FF"
        },
        {
          "step": "100",
          "var": "blue-100",
          "hex": "#DBEAFE"
        },
        {
          "step": "200",
          "var": "blue-200",
          "hex": "#BEDBFF"
        },
        {
          "step": "300",
          "var": "blue-300",
          "hex": "#8EC5FF"
        },
        {
          "step": "400",
          "var": "blue-400",
          "hex": "#51A2FF"
        },
        {
          "step": "500",
          "var": "blue-500",
          "hex": "#2B7FFF"
        },
        {
          "step": "600",
          "var": "blue-600",
          "hex": "#155DFC"
        },
        {
          "step": "700",
          "var": "blue-700",
          "hex": "#1447E6"
        },
        {
          "step": "800",
          "var": "blue-800",
          "hex": "#193CB8"
        },
        {
          "step": "900",
          "var": "blue-900",
          "hex": "#1C398E"
        },
        {
          "step": "950",
          "var": "blue-950",
          "hex": "#162456"
        }
      ]
    },
    {
      "family": "indigo",
      "steps": [
        {
          "step": "50",
          "var": "indigo-50",
          "hex": "#EEF2FF"
        },
        {
          "step": "100",
          "var": "indigo-100",
          "hex": "#E0E7FF"
        },
        {
          "step": "200",
          "var": "indigo-200",
          "hex": "#C6D2FF"
        },
        {
          "step": "300",
          "var": "indigo-300",
          "hex": "#A3B3FF"
        },
        {
          "step": "400",
          "var": "indigo-400",
          "hex": "#7C86FF"
        },
        {
          "step": "500",
          "var": "indigo-500",
          "hex": "#615FFF"
        },
        {
          "step": "600",
          "var": "indigo-600",
          "hex": "#4F39F6"
        },
        {
          "step": "700",
          "var": "indigo-700",
          "hex": "#432DD7"
        },
        {
          "step": "800",
          "var": "indigo-800",
          "hex": "#372AAC"
        },
        {
          "step": "900",
          "var": "indigo-900",
          "hex": "#312C85"
        },
        {
          "step": "950",
          "var": "indigo-950",
          "hex": "#1E1A4D"
        }
      ]
    },
    {
      "family": "violet",
      "steps": [
        {
          "step": "50",
          "var": "violet-50",
          "hex": "#F5F3FF"
        },
        {
          "step": "100",
          "var": "violet-100",
          "hex": "#EDE9FE"
        },
        {
          "step": "200",
          "var": "violet-200",
          "hex": "#DDD6FF"
        },
        {
          "step": "300",
          "var": "violet-300",
          "hex": "#C4B4FF"
        },
        {
          "step": "400",
          "var": "violet-400",
          "hex": "#A684FF"
        },
        {
          "step": "500",
          "var": "violet-500",
          "hex": "#8E51FF"
        },
        {
          "step": "600",
          "var": "violet-600",
          "hex": "#7F22FE"
        },
        {
          "step": "700",
          "var": "violet-700",
          "hex": "#7008E7"
        },
        {
          "step": "800",
          "var": "violet-800",
          "hex": "#5D0EC0"
        },
        {
          "step": "900",
          "var": "violet-900",
          "hex": "#4D179A"
        },
        {
          "step": "950",
          "var": "violet-950",
          "hex": "#2F0D68"
        }
      ]
    }
  ]
};
