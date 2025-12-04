/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ['class'],
	content: [
		'./pages/**/*.{ts,tsx}',
		'./components/**/*.{ts,tsx}',
		'./app/**/*.{ts,tsx}',
		'./src/**/*.{ts,tsx}',
	],
	theme: {
		container: {
			center: true,
			padding: {
				DEFAULT: '2rem',
				sm: '1rem',
				md: '1.5rem',
			},
			screens: {
				sm: '640px',
				md: '768px',
				lg: '1024px',
				xl: '1200px',
				'2xl': '1200px',
			},
		},
		extend: {
			colors: {
				primary: {
					50: '#E6F0FF',
					100: '#CCE0FF',
					500: '#0066FF',
					600: '#0052CC',
					900: '#003D99',
					DEFAULT: '#0066FF',
				},
				neutral: {
					50: '#FAFAFA',
					100: '#F5F5F5',
					200: '#E5E5E5',
					500: '#A3A3A3',
					700: '#404040',
					900: '#171717',
				},
				semantic: {
					success: '#10B981',
					warning: '#F59E0B',
					error: '#EF4444',
					info: '#3B82F6',
				},
			},
			fontFamily: {
				sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
			},
			fontSize: {
				hero: ['72px', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
				title: ['48px', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '700' }],
				subtitle: ['32px', { lineHeight: '1.3', letterSpacing: '0', fontWeight: '600' }],
				'body-large': ['20px', { lineHeight: '1.6', letterSpacing: '0', fontWeight: '400' }],
				body: ['16px', { lineHeight: '1.5', letterSpacing: '0', fontWeight: '400' }],
				small: ['14px', { lineHeight: '1.5', letterSpacing: '0', fontWeight: '400' }],
				caption: ['12px', { lineHeight: '1.4', letterSpacing: '0.01em', fontWeight: '400' }],
			},
			spacing: {
				'2': '8px',
				'4': '16px',
				'6': '24px',
				'8': '32px',
				'12': '48px',
				'16': '64px',
				'24': '96px',
				'32': '128px',
			},
			borderRadius: {
				md: '12px',
				lg: '16px',
				xl: '24px',
				full: '9999px',
			},
			boxShadow: {
				card: '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
				'card-hover': '0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05)',
				modal: '0 20px 25px rgba(0, 0, 0, 0.1), 0 10px 10px rgba(0, 0, 0, 0.04)',
			},
			transitionDuration: {
				fast: '200ms',
				base: '250ms',
				slow: '300ms',
			},
		},
	},
	plugins: [require('tailwindcss-animate')],
}
