import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		fontSize: {
  			'step--2': 'clamp(0.7813rem, 0.7747rem + 0.0326vw, 0.8rem)',
  			'step--1': 'clamp(0.9375rem, 0.9158rem + 0.1087vw, 1rem)',
  			'step-0': 'clamp(1.125rem, 1.0815rem + 0.2174vw, 1.25rem)',
  			'step-1': 'clamp(1.35rem, 1.2761rem + 0.3696vw, 1.5625rem)',
  			'step-2': 'clamp(1.62rem, 1.5041rem + 0.5793vw, 1.9531rem)',
  			'step-3': 'clamp(1.944rem, 1.771rem + 0.8651vw, 2.4414rem)',
  			'step-4': 'clamp(2.3328rem, 2.0827rem + 1.2504vw, 3.0518rem)',
  			'step-5': 'clamp(2.7994rem, 2.4462rem + 1.7658vw, 3.8147rem)'
  		},
  		fontFamily: {
  			heading: ['var(--font-heading)']
  		},
  		spacing: {
  			'3xs': 'clamp(0.3125rem, 0.3125rem + 0vw, 0.3125rem)',
  			'2xs': 'clamp(0.5625rem, 0.5408rem + 0.1087vw, 0.625rem)',
  			'xs': 'clamp(0.875rem, 0.8533rem + 0.1087vw, 0.9375rem)',
  			's': 'clamp(1.125rem, 1.0815rem + 0.2174vw, 1.25rem)',
  			'm': 'clamp(1.6875rem, 1.6223rem + 0.3261vw, 1.875rem)',
  			'l': 'clamp(2.25rem, 2.163rem + 0.4348vw, 2.5rem)',
  			'xl': 'clamp(3.375rem, 3.2446rem + 0.6522vw, 3.75rem)',
  			'2xl': 'clamp(4.5rem, 4.3261rem + 0.8696vw, 5rem)',
  			'3xl': 'clamp(6.75rem, 6.4891rem + 1.3043vw, 7.5rem)',
  			'3xs-2xs': 'clamp(0.3125rem, 0.2038rem + 0.5435vw, 0.625rem)',
  			'2xs-xs': 'clamp(0.5625rem, 0.4321rem + 0.6522vw, 0.9375rem)',
  			'xs-s': 'clamp(0.875rem, 0.7446rem + 0.6522vw, 1.25rem)',
  			's-m': 'clamp(1.125rem, 0.8641rem + 1.3043vw, 1.875rem)',
  			'm-l': 'clamp(1.6875rem, 1.4049rem + 1.413vw, 2.5rem)',
  			'l-xl': 'clamp(2.25rem, 1.7283rem + 2.6087vw, 3.75rem)',
  			'xl-2xl': 'clamp(3.375rem, 2.8098rem + 2.8261vw, 5rem)',
  			'2xl-3xl': 'clamp(4.5rem, 3.4565rem + 5.2174vw, 7.5rem)'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
