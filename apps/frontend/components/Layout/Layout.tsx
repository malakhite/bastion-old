import { useState } from 'react';
import {
	ActionIcon,
	AppShell,
	Burger,
	Header,
	MediaQuery,
	Navbar,
	Text,
	useMantineColorScheme,
	useMantineTheme,
} from '@mantine/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import Logo from '../Logo';

function Layout({ children }) {
	const [opened, setOpened] = useState(false);
	const { colorScheme, toggleColorScheme } = useMantineColorScheme();
	const dark = colorScheme === 'dark';
	const theme = useMantineTheme();

	return (
		<AppShell
			styles={(theme) => ({
				main: {
					backgroundColor:
						theme.colorScheme === 'dark'
							? theme.colors.dark[8]
							: theme.colors.gray[0],
				},
			})}
			// navbarOffsetBreakpoint controls when navbar should no longer be offset with padding-left
			navbarOffsetBreakpoint="sm"
			// fixed prop on AppShell will be automatically added to Header and Navbar
			fixed
			navbar={
				<Navbar
					p="md"
					// Breakpoint at which navbar will be hidden if hidden prop is true
					hiddenBreakpoint="sm"
					// Hides navbar when viewport size is less than value specified in hiddenBreakpoint
					hidden={!opened}
					// when viewport size is less than theme.breakpoints.sm navbar width is 100%
					// viewport size > theme.breakpoints.sm – width is 300px
					// viewport size > theme.breakpoints.lg – width is 400px
					width={{ sm: 300, lg: 400 }}
				>
					<Text>Application navbar</Text>
				</Navbar>
			}
			header={
				<Header height={70} p="md">
					{/* Handle other responsive styles with MediaQuery component or createStyles function */}
					<div
						style={{
							display: 'flex',
							justifyContent: 'space-between',
							alignItems: 'center',
							height: '100%',
						}}
					>
						<MediaQuery
							largerThan="sm"
							styles={{ display: 'none' }}
						>
							<Burger
								aria-label="open menu"
								opened={opened}
								onClick={() => setOpened((o) => !o)}
								size="sm"
								color={theme.colors.gray[6]}
								mr="xl"
							/>
						</MediaQuery>

						<Logo />

						<ActionIcon
							variant="outline"
							color={dark ? 'yellow' : 'blue'}
							onClick={() => toggleColorScheme()}
							title="Toggle color scheme"
						>
							{dark ? (
								<FontAwesomeIcon icon={faSun} />
							) : (
								<FontAwesomeIcon icon={faMoon} />
							)}
						</ActionIcon>
					</div>
				</Header>
			}
		>
			{children}
		</AppShell>
	);
}

export default Layout;
