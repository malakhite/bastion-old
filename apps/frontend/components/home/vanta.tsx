import { useEffect, useRef, useState } from 'react';
import FOG from 'vanta/dist/vanta.fog.min.js';
import * as THREE from 'three';
import { createStyles } from '@mantine/core';
import Intro from './intro';

const useStyles = createStyles({
	vanta: {
		pointerEvents: 'none',
		width: '100vw',
		height: '100vh',
	},
});

export default function Vanta() {
	const [vantaEffect, setVantaEffect] = useState<any>(null);
	const { classes } = useStyles();
	const vantaRef = useRef(null);

	useEffect(() => {
		if (!vantaEffect) {
			setTimeout(() => {
				setVantaEffect(
					FOG({
						el: vantaRef.current,
						mouseControls: true,
						touchControls: true,
						gyroControls: false,
						minHeight: 200.0,
						minWidth: 200.0,
						highlightColor: 0xff8888,
						midtoneColor: 0xff00ff,
						lowlightColor: 0xcc00cc,
						baseColor: 0xff,
						THREE,
					}),
				);
			}, 50);
		}

		return () => {
			if (vantaEffect) {
				vantaEffect.destroy();
			}
		};
	}, [vantaEffect]);

	return (
		<div ref={vantaRef} className={classes.vanta}>
			<Intro />
		</div>
	);
}
